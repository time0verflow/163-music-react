import React, { memo, useCallback, useEffect, useState } from 'react';
import DateComponent from './pages/date';
import { DayRecommendContent } from './style';
import ThemeHeaderRmc from '@/components/theme-header-rcm'
import { useDispatch, useSelector } from 'react-redux';
import { getRecommendSong } from '@/service/song-recommend';
import SongItem from '@/pages/discover/toplist/pages/song-item';
import { formatMinuteSecond } from '@/utli/format-utlis';
import Auth from '@/components/authentication';
import { changeIsVisible } from '@/components/login/store';

const Album = memo((props) => {
    const [recommendPlayList, setRecommendPlayList] = useState([]);

    // redux hoook
    const dispatch = useDispatch()
    const { isLogin, cookie } = useSelector((state) => ({
        isLogin: state.getIn(['login', 'isLogin']),
        cookie: state.getIn(['login', 'cookie']),
    }))

    useEffect(()=>{
        cookie&&getRecommendSong(cookie).then((res)=>{
            const result=res.data;
            setRecommendPlayList(result.dailySongs);
        })
    },[cookie]);

    //未登录进行跳转
    const toRedirect=useCallback(()=>{
        props.history.push('/')
    },[props.history])
    const showModal=useCallback(()=>{
        dispatch(changeIsVisible(true))
    },[dispatch])

    return (
        <div
            className="w980"
            style={{ border: 'solid 1px #d3d3d3' }}
        >
            {/*登录鉴权组件*/}
            <Auth flag={isLogin} to={toRedirect} showModal={showModal}/>
            <DayRecommendContent
                className="content"
            >
                <div className="recommend-cover-bg">
                    <DateComponent />
                </div>
                {/*推荐标题*/}
                <div className='main'>
                    <ThemeHeaderRmc title="歌曲列表" keywords={['26首']} right showIcon={false} />
                    <div className='toplist-main'>
                        <div className='main-header'>
                            <div className="sprite_table header-item"></div>
                            <div className="sprite_table header-item header-title">标题</div>
                            <div className="sprite_table header-item header-time">时长</div>
                            <div className="sprite_table header-item header-singer">歌手</div>
                        </div>
                        <div className='main-list'>
                            {
                                recommendPlayList&&recommendPlayList.slice(0,100).map((item,index)=>{
                                    return <SongItem 
                                            key={item.id}
                                            currentRanking={index+1}
                                            className="song-item"
                                            songName={item.name}
                                            singer={item.ar[0].name}
                                            duration={formatMinuteSecond(item.dt)}
                                            songId={item.id}
                                        />
                                })
                            }
                        </div>
                    </div>
                </div>
            </DayRecommendContent>
        </div>
    );
});

export default Album;