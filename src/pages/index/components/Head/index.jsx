import Taro, { Component } from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import { AtSegmentedControl } from 'taro-ui';

import './index.less';

class Head extends Component {
	mapTabNameToCode(value) {
		switch (+value) {
			case 0:
				return 'all';
			case 1:
				return 'good';
			case 2:
				return 'share';
			case 3:
				return 'ask';
			case 4:
				return 'job';
			case 5:
				return 'dev';
			default:
				return 'all';
		}
	}

	handleClick(value) {
		const tag = this.mapTabNameToCode(value);

		const { dispatch } = this.props;
		dispatch({
			type: 'topicList/initState'
		});
		dispatch({
			type: 'topicList/changeState',
			payload: {
				tab: tag,
				headSelectedIndex: value
			}
		});
		dispatch({
			type: 'topicList/getTopicData'
		});
	}

	render() {
		const { selectedIndex } = this.props;
		let dataSource = [ '全部', '精华', '分享', '问答', '招聘' ];
		if (process.env.NODE_ENV === 'development') {
			dataSource.push('测试');
		}
		return (
			<AtSegmentedControl
				className='head'
				current={selectedIndex}
				values={dataSource}
				onClick={this.handleClick.bind(this)}
			/>
		);
	}
}

function mapStateToProp({ topicList }) {
	const { headSelectedIndex } = topicList;
	return {
		selectedIndex: headSelectedIndex
	};
}

export default connect(mapStateToProp)(Head);
