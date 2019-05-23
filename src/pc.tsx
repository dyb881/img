import React from 'react';
import { Icon } from 'antd';
import Img, { IProps } from './react_component';

const ImgPc: React.SFC<IProps> = props => (
  <Img loadedTip={<Icon type="loading" />} reloadTip={<Icon type="reload" />} {...props} />
);

export default ImgPc;
