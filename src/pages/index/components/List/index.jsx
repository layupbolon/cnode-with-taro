import Taro, { Component } from '@tarojs/taro';
import { ScrollView } from '@tarojs/components';
import { connect } from '@tarojs/redux';

import ListItem from '../ListItem';

class List extends Component {
	render() {
		const { dataSource } = this.props;
		console.log('dataSource: ', dataSource);

		return (
			<ScrollView
				scrollY
				scrollWithAnimation
				scrollTop="0"
				style="height: calc(93vh-50px);margin-top:7vh;"
				lowerThreshold="20"
				upperThreshold="20"
				// onScrollToUpper={this.onScrollToUpper}
				// onScrollToLower={this.onScrollToLower}
				// onScroll={this.onScroll}
			>
				{dataSource.map((item, index) => {
					return <ListItem rowData={item} key={index} />;
				})}
			</ScrollView>
		);
	}
}

function mapStateToProps(state) {
	const { topicDatasource } = state.topicList;
	return {
		dataSource: topicDatasource
	};
}

export default connect(mapStateToProps)(List);
