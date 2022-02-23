import React, { memo } from 'react';

import { shallowEqual, useSelector } from 'react-redux'
import { getSizeImage, getPlayUrl } from '@/utli/format-utlis.js'
import { Collapse } from 'antd'
import { SongInfoWrapper } from './style';


const SongInfo = memo((props) => {

    const { currentSong, lyricList, totalComment } = useSelector(
        (state) => ({
            currentSong: state.getIn(['player', 'currentSong']),
            lyricList: state.getIn(['player', 'lyricList']),
            totalComment: state.getIn(['player', 'currentCommentTotal']),
        }),
        shallowEqual
    )
    // other handle
    const { Panel } = Collapse
    const pirUrl = currentSong.al && currentSong.al.picUrl
    const songName = currentSong.name ? currentSong.name : ''
    const singer = currentSong.ar && currentSong.ar[0].name
    const album = currentSong.al && currentSong.al.name
    const songId = currentSong.id

    // funciton
    const playMusic = () => {
        // 如果不跳转,那么组织超链接的默认行为
        document.getElementById('audio').play()
    }
    return (
        <SongInfoWrapper>
            <div className='album'>
                <img src={getSizeImage(pirUrl, 130)} alt='' />
                <div className='image_cover cover' />
            </div>
            <div className='song-detail-wrapper'>
                <div className='song-title'>
                    <i className='sprite_icon2 single-song'></i>
                    <h2 className='song-name'>{songName}</h2>
                    <em className='sprite_icon mv'></em>
                </div>
                <div className="singer">
                    <span>歌手：</span>
                    <a href="/discover/recommend">{singer}</a>
                </div>
                <div className="settle-album">
                    <span>所属专辑：</span>
                    <a href="/discover/recommend" className="no-link">
                        {album}
                    </a>
                </div>
                <div className='controls'>
                    <div
                        className='sprite_button play pointer'
                        onClick={(e) => playMusic(e)}
                    >
                        <i className='sprite_button inner'>
                            <em className='sprite_button play-icon'></em>
                            播放
                        </i>
                    </div>
                    <div
                        className='sprite_button download pointer'
                        onClick={() => window.open(getPlayUrl(songId))}
                    >
                        <i className='sprite_button inner'>
                            <em className='sprite_button favorite-icon'></em>
                            下载
                        </i>
                    </div>
                    <div className='sprite_button comment'>
                        <i className='sprite_button inner'>
                            <em className='sprite_button favorite-icon'></em>
                            ({totalComment})
                        </i>
                    </div>
                </div>
                <Collapse>
                    <Panel header={`歌词展示`}>
                        {
                            lyricList && lyricList.map((item) => {
                                return (
                                    <div className='lyric-item' key={item.totalComment}>
                                        {item.content}
                                    </div>
                                )
                            })
                        }
                    </Panel>
                </Collapse>
            </div>
        </SongInfoWrapper>
    );
});

export default SongInfo;