import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtNavBar, AtInput, AtButton, AtMessage } from 'taro-ui'

import './index.less'

/*  Taro ==> 微信小程序

    componentWillMount  => page.onLoad || app. onLaunch
    componentDidMount  => page.onReady || app.onLaunch 在componentWillMount后执行
    componentDidShow  => onShow
    componentDidHide  => onHide
    componentDidCatchError  => onError
    componentDidNotFound  => onPageNotFound
    onTabItemTap  => 当前是 tab 页时，点击 tab 时触发
    componentWillPreload  => 预加载，只在微信小程序中可用
    */

class Login extends Component {
	constructor(props) {
		super(props)
		this.state = {
			value: ''
		}
	}
	config = {
		navigationBarTitleText: '登录'
	}

	handleChange = (value) => {
		this.setState({ value })
	}

	handleGoBack = () => {
		Taro.navigateBack({ delta: 1 })
	}

	render() {
		const { dispatch } = this.props
		const { value } = this.state

		return (
			<View>
				<AtNavBar
					onClickLeftIcon={this.handleGoBack}
					color="#000"
					title="登 录"
					leftText={'返回'}
					leftIconType={'chevron-left'}
					fixed={true}
				/>
				<AtMessage />
				<View className="login">
					<AtInput
						className="input"
						value={value}
						onChange={this.handleChange}
						type="text"
						placeholder="Access Token"
					/>
					<AtButton
						className="btn"
						type="primary"
						onClick={() => {
							dispatch({
								type: 'login/login',
								payload: {
									accesstoken: value,
									cb: (isSuccess, msg) => {
										if (isSuccess) {
											Taro.atMessage({
												message: msg,
												type: 'success'
											})
											Taro.redirectTo({
												url: '../mine/index'
											})
										} else {
											Taro.atMessage({
												message: msg,
												type: 'error'
											})
										}
									}
								}
							})
						}}
					>
						登录
					</AtButton>
				</View>
			</View>
		)
	}
}

export default connect()(Login)
