import React, { memo, useCallback } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getSizeImage, parseTime } from '@/utli/format-utlis'

import { SongDetailLeftWrapper, HeaderTitle, MainDetail } from './style';
import Playlist from '@/components/playlist'
import ThemeHeaderRcm from '@/components/theme-header-rcm'
import { message, Skeleton, Tag } from 'antd'

import { changeIsVisible } from '@/components/login/store'

import { sendCollectSonglist } from '@/service/songs'

const SonglistLeft = memo(() => {

    //redux hook
    const dispatch = useDispatch()
    const { songDetail, isLogin, cookie } = useSelector(
        (state) => ({
            songDetail: state.getIn(['songDetail', 'songDetailInfo', 'playlist']),
            isLogin: state.getIn(['login', 'isLogin']),
            cookie: state.getIn(['login', 'cookie'])
        }), shallowEqual
    )

    // 收藏歌单handle
    const collectSonglist = useCallback(() => {
        if (isLogin) {
            //收藏歌单接口
            sendCollectSonglist(songDetail.id,cookie).then((res)=>{
                if(res.code===200) message.success('收藏成功')
                else message.error('请重试')
            })
        } else {
            dispatch(changeIsVisible(true))
        }
    }, [isLogin, dispatch, cookie, songDetail])

    // console.log('songDetail :>>>', songDetail)
    // handle constant
    const coverPicUrl = songDetail && songDetail.coverImgUrl
    const headerTitle = songDetail && songDetail.name
    const avatarPic =
        songDetail &&
        songDetail.creator &&
        songDetail.creator.avatarUrl &&
        getSizeImage(songDetail.creator.avatarUrl, 35)
    const avatarName =
        songDetail && songDetail.creator && songDetail.creator.nickname
    const avatarDatetime =
        songDetail &&
        songDetail.createTime &&
        parseTime(songDetail.createTime, '{y}-{m}-{d}')
    const labelsArr = songDetail && songDetail.tags
    const description = songDetail && songDetail.description
    const playCount = songDetail && songDetail.playCount
    const playlist = songDetail && songDetail.tracks


    const renderRightSlot = (
        <span>
            播放：<em style={{ color: '#c20c0c' }}>{playCount}</em>
        </span>
    )

    return (
        <SongDetailLeftWrapper>
            {!songDetail && <Skeleton active />}
            <HeaderTitle className="flex">
                <div className='cover-img'>
                    <img src={getSizeImage(coverPicUrl, 200)} alt='' />
                    {/* <span className='image_cover'></span> */}
                </div>
                <div className='song-detail'>
                    <div className='detail-title-wrapper'>
                        <i className='icons'></i>
                        <h2 className='detail-title'>{headerTitle}</h2>
                    </div>
                    <div className='avatar'>
                        <div className='avatar-pic'>
                            <img src={avatarPic} alt='' />
                        </div>
                        <div className='avatar-name'>{avatarName}</div>
                        <div className='avatar-datetime'>{avatarDatetime}创建</div>
                    </div>
                    <div className='label-wrapper flex gap'>
                        <span>标签：</span>
                        {
                            labelsArr && labelsArr.map((value) => {
                                return <Tag color='#de021d' key={value}>{value}</Tag>
                            })
                        }
                        <div className='sprite_button favorite pointer' style={{ marginBottom: '5px' }} onClick={() => collectSonglist()}>
                            <i className='sprite_button inner'>
                                <em className='sprite_button favorite-icon'></em>
                                收藏歌单
                            </i>
                        </div>
                    </div>
                    <div className='description-info gap'>
                        <div className='descript-detail'>介绍：{description}</div>
                    </div>
                </div>
            </HeaderTitle>
            <MainDetail>
                <ThemeHeaderRcm
                    title='歌曲列表'
                    showIcon={false}
                    className='gap'
                    right={renderRightSlot}
                />
                {playlist && <Playlist playlist={playlist} />}
            </MainDetail>
        </SongDetailLeftWrapper>
    );
});

export default SonglistLeft;