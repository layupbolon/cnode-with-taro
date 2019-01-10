import '@tarojs/async-await';
import Taro, { Component } from '@tarojs/taro';
import { Provider } from '@tarojs/redux';

import dva from './utils/dva';
import models from './models';
import Index from './pages/index/index';
import './app.less';
import './styles/Iconfont/iconfont.css';

const dvaApp = dva.createApp({
  initialState: {},
  models: models,
});
const store = dvaApp.getStore();

class App extends Component {

  config = {
    pages: [
      'pages/index/index',
      'pages/detail/index',
      'pages/mine/index',
      'pages/login/index',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    "tabBar": {
      "color": "#2D2D2D",
      "selectedColor": "#F38801",
      "borderStyle": "black",
      "backgroundColor": "#FFFFFF",
      "list": [
        {
          "pagePath": "pages/index/index",
          "text": "首页"
        },
        {
          "pagePath": "pages/index/index",
          "text": "发表"
        },
        {
          "pagePath": "pages/index/index",
          "text": "消息"
        },
        {
          "pagePath": "pages/mine/index",
          "text": "我的"
        }
      ]
    },
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentCatchError () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    );
  }
}

Taro.render(<App />, document.getElementById('app'));
