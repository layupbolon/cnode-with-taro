import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

import './index.less'

class NotLogin extends Component {
	goToLogin = () => {
		Taro.navigateTo({
			url: '/pages/login/index'
		})
	}

	render() {
		return (
			<View className="notLogin">
				您还未登录，请先
				<Text className="loginText" onClick={this.goToLogin}>
					登录
				</Text>
			</View>
		)
	}
}

export default NotLogin
