import React, { memo, useEffect, useRef } from 'react';
import propTypes from 'prop-types';
import { SliderPlaylistWrapper, SliderPlaylistHeader, SliderPlaylistMain } from './style';
import { removeAllSong, resetPlaylistId } from '@/utli/localstorage';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { ClearOutlined, CloseOutlined, HeartOutlined } from '@ant-design/icons';
import { changePlaylistAndCount, getSongDetailAction, changePlayListAction } from '../../store/actionCreator';
import Sortable from 'sortablejs'
import LyricContent from './lyric-content';
import PlaylistItem from './playlist-item';

const SliderPlaylist = memo((props) => {
    const {
        isShowSlider,
        playlistCount,
        closeWindow,
        playMusic,
        changeSong
    } = props

    // redux hook
    const dispatch = useDispatch()
    const { currentSong, playList, currentSongIndex } = useSelector(
        (state) => ({
            currentSong: state.getIn(['player', 'currentSong']),
            playList: state.getIn(['player', 'playList']),
            currentSongIndex: state.getIn(['player', 'currentSongIndex'])
        }), shallowEqual
    )

    const playlistRef = useRef()
    // 歌曲列表拖拽初始化
    useEffect(() => {
        const el = playlistRef.current.querySelector('.main-playlist')
        new Sortable(el, {
            sort: true,
            animation: 200,
            currentIndex: 0,
            onEnd: function (evt) {
                //拖拽结束发生的事件
                let tempPlayList = playList
                //获取当前歌曲对象
                const musicsId = []
                tempPlayList.splice(
                    evt.newIndex,
                    0,
                    playList.splice(evt.oldIndex, 1)[0]
                )
                dispatch(changePlayListAction(tempPlayList))
                musicsId.push(...tempPlayList.map(item => item.id))
                // 重置歌曲列数组
                resetPlaylistId(musicsId)
            }
        })
    }, [currentSongIndex, dispatch, playList, currentSong])

    // 清除播放列表
    const clearAllPlaylist = (e) => {
        e.preventDefault()
        removeAllSong()
        playList.splice(0, playList.length)
        dispatch(changePlaylistAndCount(playList))
    }

    // 点击item播放音乐
    const clickItem = (item, index) => {
        dispatch(getSongDetailAction(item.id))
        playMusic()
    }

    return (
        <SliderPlaylistWrapper
            style={{ visibility: isShowSlider ? 'visible' : 'hidden' }}
            // 阻止冒泡
            onClick={(e) => e.stopPropagation()}
        >
            <SliderPlaylistHeader>
                <div className='playlist-header-left'>
                    <h3 className='header-title'>播放列表({playlistCount})</h3>
                    <div>
                        <a
                            href='/favorite'
                            className='header-icon'
                            onClick={(e) => e.preventDefault()}
                        >
                            <HeartOutlined />
                            <span>收藏一下</span>
                        </a>
                        <a
                            href='/clear'
                            onClick={(e) => clearAllPlaylist(e)}
                            className='header-icon'
                        >
                            <ClearOutlined />
                            <span>清除播放列表</span>
                        </a>
                    </div>
                </div>
                <div className='playlist-header-right'>
                    <div className='song-name'>{currentSong.name}</div>
                    <div className='close-window' onClick={closeWindow}>
                        <CloseOutlined />
                    </div>
                </div>
            </SliderPlaylistHeader>
            <SliderPlaylistMain ref={playlistRef}>
                <div className='main-playlist'>
                    {
                        playList.map((item, index) => {
                            return (
                                <PlaylistItem
                                    key={item.id}
                                    isActive={(currentSongIndex ? currentSongIndex : 0) === index ? 'active' : ''}
                                    songName={item.name}
                                    duration={item.dt}
                                    songId={item.id}
                                    singer={item.ar[0].name}
                                    nextMusic={() => changeSong(1)}
                                    clickItem={() => clickItem(item, index)}
                                />
                            )
                        })
                    }
                </div>
                <div className='main-line'></div>
                <LyricContent />
            </SliderPlaylistMain>
        </SliderPlaylistWrapper>
    );
});

SliderPlaylist.propTypes = {
    isShowSlider: propTypes.bool.isRequired,
    playlistCount: propTypes.number.isRequired,
};

export default SliderPlaylist;