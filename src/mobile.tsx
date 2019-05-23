import React from 'react';
import { Icon } from 'antd-mobile';
import Img, { IProps } from './react_component';

const ImgMobile: React.SFC<IProps> = props => <Img loadedTip={<Icon type="loading" />} {...props} />;

export default ImgMobile;
