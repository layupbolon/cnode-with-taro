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

		if (!dataSource || !dataSource.id) return null;

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
					<View className="topicReply">
						共<Text>{dataSource.reply_count}</Text>条回复
					</View>
					<View className='repliesContainer'>
						{replies.map((item, index) => {
							return (
								<View className="replyContainer">
									<View className="userImg">
										<UserImage style={{ margin: '10px' }} imageUrl={item.author.avatar_url} />
									</View>
									<View className="replyDetail">
										<Text className='floorIndex'>#{index + 1}</Text>
										<View className='replyInfo'>
											<Text
												onClick={() => {
													// <Link className={styles.replyInfo_left_name}
													// to={`/user/${item.author.loginname}`}
												}}
											>
												{item.author.loginname}
											</Text>
											<Text>{dataFormat(item.create_at)}</Text>
										</View>
										<View className="content markdown-body">
											<RichText nodes={item.content} />
										</View>
										<View className='icons'>
											<View>
												<Icon
													iconType={'dianzan'}
													iconClassName="logo"
													fontSize={25}
												/>
											</View>
											<View>
												<Icon
													iconType={'huifu'}
													iconClassName="logo"
													fontSize={25}
												/>
											</View>
										</View>
									</View>
								</View>
							);
						})}
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
