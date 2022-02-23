import React, { memo } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { HashRouter } from 'react-router-dom'
import { BackTop } from 'antd';
import AppWrapper from './pages/app'
import AppFooter from './components/app-footer'
import AppPlayerBar from './pages/player/app-player-bar'
import AppHeader from './components/app-header';

export default memo(function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <AppHeader/>
        {/*主页面信息*/}
        <AppWrapper/>
        {/*底部信息*/}
        <AppFooter/>
        {/*播放条 */}
        <AppPlayerBar/>
        {/*返回顶部*/}
        <BackTop />
      </HashRouter>
    </Provider>
  );
})

