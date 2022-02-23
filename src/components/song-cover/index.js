import React,{memo} from 'react';
import { SongCoverWrapper } from './style'
import {getSizeImage,getCount} from '@/utli/format-utlis'

// 歌曲封面组件
function SongCover(props) {
  const { info, songList, width = 140 } = props
  // pic 封面图片
  const picUrl = (info && (info.picUrl || info.coverImgUrl)) || (songList && songList.coverImgUrl) 
  // playCount 播放次数 
  const playCount = (info && info.playCount) || (songList && songList.playCount) || 0
  // name 歌单名称
  const name = (info && info.name) || (songList && songList.name) 
  // nickname
  const nickname = (info && info.copywriter) || (songList && songList.creator.nickname) 
  // id  歌单id
  const songInfoId = (info && info.id) || (songList && songList.id)
  
  return (
    <SongCoverWrapper width={width} href={`#/songlist?songlistId=${songInfoId}`}>
      <div className="cover-wrapper">
        <img src={getSizeImage(picUrl, width)} alt="" />
        <div className="cover-mask sprite_cover">
          <div className="bottom-bar sprite_cover">
            <span>
              <i className="sprite_icon erji"></i>
              {getCount(playCount)}
            </span>
            <i className="sprite_icon play"></i>
          </div>
        </div>
      </div>
      <div className="cover-title text-nowrap">by-{name}</div>
      <div className="cover-source text-nowrap">
        by {(info && info.copywriter) || nickname}
      </div>
    </SongCoverWrapper>
  )
}

export default memo(SongCover)
