import React from 'react';
import { getImg } from '@dyb881/file';
import './style.less';

// 裁剪、缩放模式
type mode = 'scaleToFill' | 'aspectFit' | 'aspectFill' | 'top' | 'bottom' | 'center' | 'left' | 'right';

export interface IProps {
  src?: string; // 图片地址
  mode?: 'none' | mode | mode[]; // 裁剪、缩放模式 default none
  show?: boolean; // 显示图片 default true
  loadedTip?: React.ReactNode; // 加载提示内容
  reloadTip?: React.ReactNode; // 刷新提示内容
  [key: string]: any;
}

interface IState {
  src: string;
  openMode: boolean; // 开启裁剪、缩放模式
  modeStyle: any; // 模式样式
  loading: boolean;
  show: boolean;
  err: boolean;
}

export default class extends React.Component<IProps, IState> {
  box?: HTMLDivElement;

  state = {
    src: '',
    openMode: false,
    modeStyle: {},
    loading: false,
    show: false,
    err: false,
  };

  componentDidMount() {
    const { clientWidth, clientHeight } = this.box!;
    this.setState({ openMode: !!(clientWidth && clientHeight), show: true }, () => {
      const { src, show = true } = this.props;
      src && show && this.load();
    });
  }

  getSnapshotBeforeUpdate(prevProps: IProps) {
    const { src, show = true } = this.props;
    const { src: pSrc, show: pShow = true } = prevProps;
    return {
      isNewSrc: src !== pSrc, // 是否新的图片地址
      isToShow: show && !pShow, // 是否从空到有
    };
  }

  componentDidUpdate(_prevProps: IProps, _prevState: IState, update: any) {
    const { isNewSrc, isToShow } = update;
    if (isNewSrc || isToShow) {
      this.load(); // 更新或展示图片
    }
  }

  load = () =>
    this.loadImg().catch(() => {
      this.setState({ err: true });
    });

  loadImg = async () => {
    this.setState({ loading: true, err: false });

    const { src, mode = 'none' } = this.props;
    const { openMode } = this.state;
    const { src: imgSrc, width, height } = await getImg(src!);

    const modeStyle: any = {};

    if (openMode) {
      const { clientWidth, clientHeight } = this.box!;
      const widthRatio = width / clientWidth;
      const heightRatio = height / clientHeight;

      if (mode.includes('aspectFit')) {
        modeStyle[widthRatio > heightRatio ? 'width' : 'height'] = '100%';
      }
      if (mode.includes('aspectFill')) {
        modeStyle[widthRatio < heightRatio ? 'width' : 'height'] = '100%';
      }
    }

    this.setState({
      loading: false,
      src: imgSrc,
      modeStyle,
    });
  };

  render() {
    const {
      className,
      style,
      mode = 'none',
      loadedTip = '加载中',
      reloadTip = '重新加载',
      src: _src,
      show: _show,
      ...props
    } = this.props;
    const { src, openMode, loading, show, modeStyle, err } = this.state;
    const boxClassAndStyle = { className: ['dyb-img', className].join(' '), style };

    // 使用空元素确定组件尺寸
    if (!show) return <div {...boxClassAndStyle} ref={box => this.box || (this.box = box!)} />;

    // 不开启裁剪、缩放模式
    if (!openMode || mode === 'none') {
      return loading ? loadedTip : <img {...boxClassAndStyle} src={src} alt="" {...props} />;
    }

    const modeClass = !Array.isArray(mode) ? `dyb-img-mode-${mode}` : mode.map(i => `dyb-img-mode-${i}`).join(' ');
    boxClassAndStyle.className += ` dyb-img-box ${modeClass}`;

    let res = <img src={src} style={modeStyle} alt="" />;

    if (loading) res = <div className="dyb-img-loading">{loadedTip}</div>;

    if (err)
      res = (
        <div className="dyb-img-reload" onClick={this.load}>
          {reloadTip}
        </div>
      );

    return (
      <div {...boxClassAndStyle} {...props}>
        {res}
      </div>
    );
  }
}
