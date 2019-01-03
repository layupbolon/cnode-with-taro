import Taro, { Component } from '@tarojs/taro';
import { ScrollView, View } from '@tarojs/components';
import { AtActivityIndicator } from 'taro-ui';
import { connect } from '@tarojs/redux';

import ListItem from '../ListItem';
import './index.less';

@connect(({ topicList }) => {
	return {
		dataSource: topicList.topicDatasource
	};
})
export default class List extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false
		};
		this.onScrollToLower = this.onScrollToLower.bind(this);
	}
	onScrollToLower() {
		if (this.state.isLoading) {
			return;
		}
		Promise.resolve()
			.then(() => this.setState({ isLoading: true }))
			.then(() => this.props.dispatch({ type: 'topicList/getNextPageTopicData' }))
			.then(() => {
				this.setState({ isLoading: false });
			});
	}

	render() {
		const { dataSource } = this.props;
		const { isLoading } = this.state;
		return (
			<View className="listWrap">
				<ScrollView
					scrollY
					scrollWithAnimation
					scrollTop="0"
					style='height:86vh;'
					lowerThreshold="30"
					onScrollToLower={this.onScrollToLower}
				>
					{dataSource.map((item, index) => {
						return <ListItem rowData={item} key={index} />;
					})}
				</ScrollView>
				{isLoading && (
					<View className="loading">
						<AtActivityIndicator />
					</View>
				)}
			</View>
		);
	}
}
