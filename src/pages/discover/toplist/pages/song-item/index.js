import { SongItemWrapper } from "./style"
import { getSizeImage } from '@/utli/format-utlis'
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { NavLink } from 'react-router-dom'
import { PlayCircleOutlined } from '@ant-design/icons'
import { useAddPlaylist } from "@/hooks/change-music";
import { message } from 'antd'

import { getSongDetailAction } from '@/pages/player/store'


const SongItem = memo((props) => {
    const {
        currentRanking,
        coverPic,
        duration,
        singer,
        songId,
        songName,
        className = ''
    } = props

    //redux hook
    const dispatch = useDispatch();
    const { playlist } = useSelector(state => ({
        playlist: state.getIn(['player', 'playList'])
    }), shallowEqual)

    // other function
    const playMusic = (e, isTo = false) => {
        // 如果不跳转,那么组织超链接的默认行为
        if (!isTo) e.preventDefault()
        dispatch(getSongDetailAction(songId))
        // 播放音乐
        document.getElementById('audio').autoplay = true
    }
    const addPlaylist = useAddPlaylist(playlist, message);

    return (
        <SongItemWrapper className={className} isPic={coverPic}>
            <div className="song-item rank-count">{currentRanking}</div>
            {
                coverPic && (
                    <NavLink
                        to='/discover/song'
                        className='song-item'
                    >
                        <img src={getSizeImage(coverPic, 50)} alt="" />
                    </NavLink>
                )
            }
            <div className="song-item song-info">
                <div className="left-info">
                    <PlayCircleOutlined
                        className="font-active"
                        onClick={(e) => playMusic(e)} 
                    />
                    <a href="/" className="text-nowrap" onClick={(e)=>playMusic(e)}> 
                        {songName}
                    </a>
                </div>
                <div className="right-operator">
                    <button
                        href="/discover/recommend"
                        className="sprite_icon2 btn addto"
                        onClick={e => addPlaylist(e, songId)}
                    ></button>
                </div>
            </div>
            <div className="song-item duration">{duration}</div>
            <NavLink
                to="/discover/song"
                className="song-item singer">
                {singer}
            </NavLink>
        </SongItemWrapper>
    );
});

SongItem.propTypes = {
    currentRanking: PropTypes.number.isRequired,
    coverPic: PropTypes.string,
    duration: PropTypes.string.isRequired,
    singer: PropTypes.string.isRequired,
    songId: PropTypes.number.isRequired,
    className: PropTypes.string,
    songName: PropTypes.string.isRequired
};

export default SongItem;