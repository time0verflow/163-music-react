import React, { memo, useState, Suspense, useEffect, Fragment } from "react";
import { useDispatch } from "react-redux";
import { renderRoutes } from 'react-router-config';
import routes from "../../router";
import { Skeleton } from "antd";
import initLoginInfo from '@/config/token.js'
import { setLoginInfo, getLoginInfo } from '@/utli/secret-key'
import { getLoginProfileInfo } from '@/components/login/store/actionCreator'
import { SONG_PLAYLIST_ID as songplaylistId } from '@/common/constants'
import { addPlaylistId, getCurrentSongIndex, getPlaylistId, initCurrentSongIndex } from '../../utli/localstorage'
import { getSongDetailArrayAction } from "../player/store/actionCreator";
import ThemeDialog from '@/components/dialog'

export default memo(function AppWrapper() {
  const [isShow, setIsShow] = useState(false);

  const dispatch = useDispatch();
  console.log("登录");

  const handleOk = () => {
    setIsShow(false)
  }

  const handleCancel = () => {
    setIsShow(false)
  }

  //初始化登录
  const initLogin = () => {
    if (localStorage.getItem('loginInfo') != null) {
      const { username, password } = getLoginInfo('loginInfo')
      username && password && dispatch(getLoginProfileInfo(username, password))
    } else {
      setLoginInfo('loginInfo', initLoginInfo);
    }
  }
  initLogin();

  //添加默认歌曲ID(本地)
  useEffect(() => {
    addPlaylistId(songplaylistId)
    //初始化音乐索引
    initCurrentSongIndex()
  }, [])

  // 本地存储读取歌曲列表ID
  useEffect(() => {
    // 动态获取local store音乐索引
    const index = getCurrentSongIndex()
    dispatch(getSongDetailArrayAction(getPlaylistId(), index))
  }, [dispatch])

  return (
    <Fragment>
      <Suspense fallback={<Skeleton active />}>{renderRoutes(routes)}</Suspense>
      <ThemeDialog
        controlShow={isShow}
        title="上传音乐"
        handleOk={handleOk}
        handleCancel={handleCancel}
      >
        <h2>hello dialog</h2>
        <h3>上传音乐</h3>
      </ThemeDialog>
    </Fragment>
  )
})

