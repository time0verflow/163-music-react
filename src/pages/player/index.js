import React, { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { SongDetailWrapper, SongLeft, SongRight } from './style';
import { getSimilaritySong } from '@/service/player'
import SongInfo from './song-info';
import SongComment from './song-comment';
import SongItem from './song-item';
import { formatMinuteSecond } from '@/utli/format-utlis'

const SongDetail = memo(() => {
    const [songlist, setSonglist] = useState([])

    const { currentSongId } = useSelector(
        (state) => ({
            currentSongId: state.getIn(['player', 'currentSong', 'id'])
        })
    )

    useEffect(() => {
        getSimilaritySong(currentSongId).then((res) => {
            setSonglist(res.songs)
        })
    }, [currentSongId])

    return (
        <SongDetailWrapper>
            <div className='content w980'>
                <SongLeft>
                    <SongInfo />
                    <SongComment />
                </SongLeft>
                <SongRight>
                    {/* <h3 className='title'>相关音乐</h3> */}
                    {songlist &&
                        songlist.map((item, index) => {
                            return <SongItem
                                key={item.id}
                                currentRanking={index + 1}
                                className="song_item"
                                // coverPic={index < 3?item.al.picUrl:''}
                                duration={formatMinuteSecond(item.dt)}
                                songName={item.name}
                                singer={item.artists[0].name}
                                songId={item.id}
                            />
                        })}
                </SongRight>
            </div>
        </SongDetailWrapper>
    );
});

export default SongDetail;