import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux';

import Head from './components/Head';
import List from './components/List';
import './index.less';

class Index extends Component {
	config = {
		navigationBarTitleText: '首页'
	};

	componentWillReceiveProps(nextProps) {
		// console.log(this.props, nextProps);
	}

	componentWillUnmount() {}

	componentDidShow() {
		this.props.dispatch({
			type: 'topicList/getTopicData'
		});
	}

	componentDidHide() {}

	render() {
		return (
			<View className="index">
				<Head />
				<List />
			</View>
		);
	}
}

export default connect()(Index);
