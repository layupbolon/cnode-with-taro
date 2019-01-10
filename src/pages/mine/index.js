import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtNavBar } from 'taro-ui'

import { NotLogin } from '../../components'
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

class Mine extends Component {
	config = {
		navigationBarTitleText: '我的'
	}

	componentDidShow() {
		const storageResult = localStorage.getItem('User')
		if (storageResult) {
			const user = JSON.parse(storageResult)
			if (user) {
				const { dispatch } = this.props
				dispatch({ type: 'user/getUserData', payload: { userName: user.loginname } })
			}
		}
	}
	render() {
		if (!localStorage.getItem('User')) {
			return (
				<View className="MineContainer">
					<AtNavBar color="#000" title="消 息" leftText={''} fixed={true} />
					<NotLogin />
				</View>
			)
		}

		// const { dispatch, userData } = this.props

		// return (
		// 	<Fragment>
		// 		<Nav
		// 			title={'个人中心'}
		// 			showBackIcon={false}
		// 			showSignOutIcon={true}
		// 			rightIconFunc={() => {
		// 				Alert('退出', '确定退出登录？', [
		// 					{ text: '取消', onPress: () => console.log('cancel') },
		// 					{
		// 						text: '确定',
		// 						onPress: () =>
		// 							dispatch({
		// 								type: 'login/logout',
		// 								payload: {
		// 									cb: () => {
		// 										router.replace('/topicList')
		// 									}
		// 								}
		// 							})
		// 					}
		// 				])
		// 			}}
		// 		/>
		// 		<UserInfo userData={userData} />
		// 		<Footer selectedIndex={3} />
		// 	</Fragment>
		// )
	}
}

export default connect()(Mine)
