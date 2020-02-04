# img

加强版 img 标签，仿微信小程序 image 标签，多种裁剪、缩放模式，异步加载图片，支持重新加载图片

## 例子

例：

```
import Img from '@dyb881/img';
import '@dyb881/img/lib/style.css';

// 直接使用
<Img src="" />
// 不显示图片，只显示占位div
<Img src="" show={false} />
// 提示内容或按钮自定义
<Img src="" loadedTip="加载中" reloadTip="重新加载" />
// 可以完整地将图片显示出来
<Img src="" mode="aspectFit" style={{width: 100, height: 100}} />
// 可以完整地将图片显示出来, 并靠左上角
<Img src="" mode={['aspectFit', 'left', 'top']} style={{width: 100, height: 100}} />
// 不缩放图片, 只显示图片的左上边区域
<Img src="" mode={['left', 'top']} style={{width: 100, height: 100}} />
```

## 输入参数

```
interface IProps {
  src?: string; // 图片地址
  mode?: 'none' | mode | mode[]; // 裁剪、缩放模式 default none
  show?: boolean; // 显示图片 default true
  loadedTip?: React.ReactNode; // 加载提示内容 default 加载中
  reloadTip?: React.ReactNode; // 刷新提示内容 default 重新加载
  [key: string]: any;
}
```

## mode

### 注！只有在 className 或 style 设置了高宽才能生效

### mode 的值可以为数组，任意组合以下模式

scaleToFill 缩放模式，不保持纵横比缩放图片，使图片的宽高完全拉伸至填满 image 元素<br>
aspectFit 缩放模式，保持纵横比缩放图片，使图片的长边能完全显示出来。也就是说，可以完整地将图片显示出来。<br>
aspectFill 缩放模式，保持纵横比缩放图片，只保证图片的短边能完全显示出来。也就是说，图片通常只在水平或垂直方向是完整的，另一个方向将会发生截取。<br>
top 裁剪模式，不缩放图片，只显示图片的顶部区域<br>
bottom 裁剪模式，不缩放图片，只显示图片的底部区域<br>
center 裁剪模式，不缩放图片，只显示图片的中间区域<br>
left 裁剪模式，不缩放图片，只显示图片的左边区域<br>
right 裁剪模式，不缩放图片，只显示图片的右边区域<br>
