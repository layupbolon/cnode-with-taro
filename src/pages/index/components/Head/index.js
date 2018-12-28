import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { AtSegmentedControl }  from 'taro-ui'

import styles from './index.less';

function mapTabNameToCode(tab) {
    switch (tab) {
        case '全部':
            return 'all';
        case '精华':
            return 'good';
        case '分享':
            return 'share';
        case '问答':
            return 'ask';
        case '招聘':
            return 'job';
        case '测试':
            return 'dev';
        default:
            return 'all';
    }
}

class Head extends Component {
    handleClick(value){
        const {dispatch} = this.props;
        dispatch({ type: 'topicList/initState' });
        dispatch({
            type: 'topicList/changeState',
            payload: { headSelectedIndex:value }
        });
        // const tabValueCode = mapTabNameToCode(e.nativeEvent.value);
        // dispatch({ type: 'topicList/tabChange', payload: { tab: tabValueCode }});
    }

    render(){
        const { selectedIndex} = this.props;
        let dataSource = ['全部', '精华', '分享', '问答', '招聘'];
        if (process.env.NODE_ENV === 'development') {
            dataSource.push('测试');
        }
        return (
            <AtSegmentedControl
                className={styles.head}
                current={selectedIndex}
                values={dataSource}
                onClick={this.handleClick.bind(this)}
            />
        );
    }
}

function mapStateToProp({ topicList }) {
    const { headSelectedIndex } = topicList;
    return { selectedIndex: headSelectedIndex };
}

export default connect(mapStateToProp)(Head);
