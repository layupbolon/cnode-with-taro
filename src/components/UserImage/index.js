import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import './index.less';

class UserImage extends Component {
	render() {
		const { imageUrl, width = 40, height = 40 } = this.props;
		return (
			<View
				className="userImage"
				style={{
					backgroundImage: 'url(' + imageUrl + ')',
					width: `${width}px`,
					height: `${height}px`
				}}
			/>
		);
	}
}

export default UserImage;
