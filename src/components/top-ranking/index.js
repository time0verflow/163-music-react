import React, { memo } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { getSizeImage } from '../../utli/format-utlis'
import { TopRankingWrapper } from './style'
import { message } from 'antd'
import { useAddPlaylist } from '../../hooks/change-music.js'
import { changeCurrentIndexAction , changCurrentToplistId} from '../../pages/discover/toplist/store/actionCreator'

const TopList = memo((props) => {
    const { info, index , id} = props
    const { tracks = [] } = info

    //redux hook
    const dispatch = useDispatch()
    const { playList } = useSelector(
        state => ({
            playList: state.getIn(['player', 'playList'])
        }),
        shallowEqual
    )

    //添加到播放列表
    const addPlayList = useAddPlaylist(playList, message);

    //跳转排行榜
    const toLink = (e) => {
        e.preventDefault();
        dispatch(changeCurrentIndexAction(index));
        dispatch(changCurrentToplistId(id))
        props.to.push(`/discover/ranking?id=${info.id}`)
    }

    return (
        <TopRankingWrapper>
            <div className='ranking-header'>
                <div className='image'>
                    <img src={getSizeImage(info.coverImgUrl, 80)} alt='' />
                    <div className='image_cover '>
                        {info.name}
                    </div>
                </div>
                <div className='tit'>
                    <div>
                        <h3>{info.name}</h3>
                    </div>
                    <div className='btn'>
                        <a href="/discover/recommend" className="no-link sprite_02 text-indent play">
                            播放
                        </a>
                        <a href="/discover/recommend" className="no-link sprite_02 text-indent favourite">
                            收藏
                        </a>
                    </div>
                </div>
            </div>
            <div className='ranking-list'>
                {
                    tracks && tracks.slice(0, 10).map((item, index) => {
                        return (
                            <div key={item.id} className='list-item'>
                                <div className='number'>{index + 1}</div>
                                <a href='/play' className='song-name text-nowrap'>
                                    {item.name}
                                </a>
                                <div className="oper">
                                    <a
                                        href='/discover/recommend'
                                        className='sprite_02 btn play'
                                    >
                                        {item.name}
                                    </a>
                                    <a
                                        href='/discover/recommend'
                                        className='sprite_icon2 btn addto'
                                        onClick={e => addPlayList(e, item.id)}
                                    >
                                        {item.name}
                                    </a>
                                    <a
                                        href='/play'
                                        className='no-link sprite_02 btn favourite'
                                    >
                                        {item.name}
                                    </a>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className='ranking-footer'>
                <a href='/all'
                className='show-all'
                onClick={e=>toLink(e)}>
                    查看全部&gt;
                </a>
            </div>
        </TopRankingWrapper>
    );
});

export default TopList;