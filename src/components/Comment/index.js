import Taro, { Component } from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import { AtTextarea, AtButton } from 'taro-ui';
import { View } from '@tarojs/components';

import './index.less';
import { getUserInfo } from '../../utils';

class Comment extends Component {
    constructor() {
        super(...arguments);
        this.state = {
        content: ''
        };
    }

	handleTextAreaChange = (e) => {
	  this.setState({ content: e.target.value });
	};

	handleBtnClick = () => {
	  const { content } = this.state;
	  const { dispatch, topic_id, reply_id, commetTo } = this.props;
	  const userInfo = getUserInfo();

	  let submitData = {
	    topic_id,
	    accesstoken: userInfo.accesstoken,
	    content: content
	  };
	  if (reply_id) {
	    submitData.reply_id = reply_id;
	    submitData.content = `[@${commetTo}](/user/${commetTo}) ${content}`;
	  }
	  submitData.content += '\n\rFrom [cnode-with-umi](https://github.com/layupbolon/cnode-with-umi)';
	  dispatch({
	    type: 'topicDetail/submitReply',
	    payload: {
	      submitData,
	      cb: () => {
	        //   router.go(0);
	        // TODO 页面刷新
	      }
	    }
	  });
	};

	render() {
	  const { content } = this.state;
	  const { commetTo } = this.props;

	  return (
	    <View className='comment'>
	      <View className='input'>
	        <AtTextarea placeholder={commetTo ? `@${commetTo}` : '回复支持Markdown语法,请注意标记代码'} value={content} onChange={this.handleTextAreaChange} />
	      </View>
	      <View className='btnWrap'>
	        <AtButton className='btn' onClick={this.handleBtnClick}>回复</AtButton>
	      </View>
	    </View>
	  );
	}
}

export default connect()(Comment);
