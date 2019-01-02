import Taro, { Component } from '@tarojs/taro';
import { AtIcon } from 'taro-ui';

import '../../styles/Iconfont/iconfont.css';
import './index.less';

class Icon extends Component {
    render(){
        const { iconType, fontSize = 16 } = this.props;
        if (iconType) {
            return (
                <AtIcon prefixClass='icon' value={iconType} size={fontSize} color='#F00'></AtIcon>
            );
        }
        else {
            return null;
        }
    }
}

export default Icon;
