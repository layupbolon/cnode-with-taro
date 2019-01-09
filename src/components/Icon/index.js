import Taro, { Component } from '@tarojs/taro';
import { AtIcon } from 'taro-ui';
import { View } from '@tarojs/components';

import '../../styles/Iconfont/iconfont.css';
import './index.less';

class Icon extends Component {
	render() {
		const { iconType, iconClassName, fontSize = 16,iconColor='#ffffff' } = this.props;
		if (iconType) {
			return (
				<View className={'icon-' + iconType + '-background ' + iconClassName}>
					<AtIcon className="iconfont" prefixClass="icon" value={iconType} size={fontSize} color={iconColor} />
				</View>
			);
		} else {
			return null;
		}
	}
}

export default Icon;
