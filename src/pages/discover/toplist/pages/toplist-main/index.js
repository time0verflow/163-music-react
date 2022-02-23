import React, { memo, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getToplistItemAction } from '../../store/actionCreator'
import { ToplistMainWrapper } from './style';
import ThemeHeaderRMC from 'components/theme-header-rcm'
import SongItem from '../song-item';
import { formatMinuteSecond } from '@/utli/format-utlis';
const TopListMain = memo(() => {
    //redux hook
    const dispatch = useDispatch();
    const { playCount, currentToplistId, currentToplist } = useSelector(
        (state) => ({
            playCount: state.getIn([
                'toplist',
                'currentToplistTitleInfo',
                'playCount'
            ]),
            currentToplistId: state.getIn(['toplist', 'currentToplistId']),
            currentToplist: state.getIn(['toplist', 'currentToplist'])
        }), shallowEqual
    );

    useEffect(() => {
        dispatch(getToplistItemAction(currentToplistId))
    }, [currentToplistId, dispatch])

    const rightslot = (
        <span>
            播放：<em style={{ color: '#c20c0c' }}>{playCount}</em>
        </span>
    )

    return (
        <ToplistMainWrapper>
            <ThemeHeaderRMC title='歌曲列表' showIcon={false} right={rightslot} />
            <div className='toplist-main'>
                <div className="main-header">
                    <div className="sprite_table header-item"></div>
                    <div className="sprite_table header-item header-title">标题</div>
                    <div className="sprite_table header-item header-time">时长</div>
                    <div className="sprite_table header-item header-singer">歌手</div>
                </div>
                <div className='main-list'>
                    {
                        currentToplist && currentToplist.slice(0, 100).map((item, index) => {
                            return <SongItem
                                key={item.id}
                                currentRanking={index + 1}
                                className="song_item"
                                coverPic={index < 3 ? item.al.picUrl : ''}
                                duration={formatMinuteSecond(item.dt)}
                                songName={item.name}
                                singer={item.ar[0].name}
                                songId={item.id}
                            />
                        })
                    }
                </div>
            </div>
        </ToplistMainWrapper>
    );
});

export default TopListMain;