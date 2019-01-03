import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';

import { Icon, UserImage } from '../../../../components';
import { dataFormat } from '../../../../utils';
import './index.less';

class ListItem extends Component {
	handleGoToDetailPage = () => {
		const { rowData } = this.props;
		Taro.navigateTo({
			url: `/pages/detail/index?id=${rowData.id}`
		});
	};

	render() {
		const { rowData } = this.props;

		return (
			<View className="listitem_wrap" onClick={this.handleGoToDetailPage}>
				<View className="listitem_up">
					<Icon iconType={rowData.top ? 'top' : rowData.good ? 'good' : rowData.tab} iconClassName="icon" />
					<Text className="listitem_up_h4"> {rowData.title} </Text>
				</View>
				<View className="listitem_down">
					<View className="left">
						<UserImage imageUrl={rowData.author.avatar_url} />
						<View className="autherInfo">
							<Text> {rowData.author.loginname} </Text> <Text> {dataFormat(rowData.create_at)} </Text>
						</View>
					</View>
					<View className="right">
						<Text>
							{rowData.reply_count}
							/{rowData.visit_count}
						</Text>
						<Text> {dataFormat(rowData.last_reply_at)} </Text>
					</View>
				</View>
			</View>
		);
	}
}

export default ListItem;
