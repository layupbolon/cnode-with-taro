import Taro, { Component } from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import { View, Text, RichText } from '@tarojs/components';
import { AtNavBar } from 'taro-ui';
import 'github-markdown-css';

import { Icon, UserImage, Comment } from '../../components';
import { dataFormat } from '../../utils';
import './index.less';

class Detail extends Component {
	componentWillMount() {
		console.log('this.$router.params: ', this.$router.params);
	}

	componentDidShow() {
		const { dispatch } = this.props;
		const id = this.$router.params.id;

		const storageResult = localStorage.getItem('User');
		if (storageResult) {
			const userInfo = JSON.parse(storageResult);
			dispatch({
				type: 'topicDetail/getTopicDetailData',
				payload: { id: id, accesstoken: userInfo.accesstoken }
			});
		} else {
			dispatch({ type: 'topicDetail/getTopicDetailData', payload: { id: id } });
		}
	}

	handleGoBack() {
		Taro.navigateBack({ delta: 1 });
	}

	render() {
		const { dataSource, replies, dispatch } = this.props;
		console.log('dataSource: ', dataSource);

		if (!dataSource || !dataSource.id) return null;

        // const json = parser.getRichTextJson(dataSource.content)
		// console.log('dataSource.content: ', dataSource.content);
		// console.log('json.children: ', json.children);

		const storageResult = localStorage.getItem('User');

		return (
			<View className="topicDetailContainer">
				<AtNavBar onClickLeftIcon={this.handleGoBack} color="#000" title="详 情" leftText="返回" fixed={true} />
				<View className="detailContainer">
					<View className="infoContainer">
						<View className="infoTitle">
							<View className="userImage">
								<UserImage imageUrl={dataSource.author.avatar_url} />
							</View>
							<View className="info">
								<View className="line">
									<Text
										className="authorName"
										onClick={() => {
											// to={`/user/${dataSource.author.loginname}`}
										}}
									>
										{dataSource.author.loginname}
									</Text>
									<Text>{dataFormat(dataSource.create_at)}</Text>
								</View>
								<View className="line">
									<Text>
										阅读：{dataSource.visit_count} 回复：{dataSource.reply_count}
									</Text>
								</View>
							</View>
						</View>
						<View className="logo">
							<Icon
								iconType={dataSource.top ? 'top' : dataSource.good ? 'good' : dataSource.tab}
								iconClassName="logo"
								fontSize={25}
							/>
						</View>
					</View>
					<View className="topicTitle">{dataSource.title}</View>
                    <View className="content markdown-body">
                        <RichText nodes={dataSource.content} />
                    </View>
					
					{/* <View className="content markdown-body" dangerouslySetInnerHTML={{ __html: dataSource.content }} /> */}
					<View className="topicReply">
						共<Text>{dataSource.reply_count}</Text>条回复
					</View>

					{storageResult && <Comment topic_id={dataSource.id} />}
				</View>
			</View>
		);
	}
}

function mapStateToProps({ topicDetail }) {
	return {
		dataSource: topicDetail.dataSource,
		replies: topicDetail.replyItems
	};
}

export default connect(mapStateToProps)(Detail);
