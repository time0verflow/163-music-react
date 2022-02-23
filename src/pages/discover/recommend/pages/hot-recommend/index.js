import React, { memo, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { getHostBannersAction } from '../../store/actionCreator';
import { HOT_RECOMMEND_LIMIT } from '@/common/constants';
import { HotRecommendWrapper } from './style';
import ThemeHeaderRmc from '@/components/theme-header-rcm';
import SongCover from '@/components/song-cover';


const HotRecommend = (props) => {
    const { history } = props;
    
    const dispatch = useDispatch();

    const { hotRecommends } = useSelector((state) => ({
        hotRecommends: state.getIn(['recommend', 'hotRecommends'])
    }), shallowEqual)

    //组件加载完成的副效应，useEffect()的第二个参数是一个数组，
    /*指定了第一个参数（副效应函数）的依赖项（dispatch）。只有该变量发生变化时，副效应函数才会执行*/
    useEffect(() => {
        dispatch(getHostBannersAction(HOT_RECOMMEND_LIMIT))
    }, [dispatch])

    //点击跳转
    const handleKeyWordClick = (item) => {
        history.push(`/discover/songs?albumName=${item}`)
    }

    return (
        <HotRecommendWrapper>
            <ThemeHeaderRmc title="热门推荐" keywords={['华语', '流行', '摇滚', '民谣', '电子']} keywordsClick={(item) => handleKeyWordClick(item)} />
            <div className="recommend-list">
                {hotRecommends&&hotRecommends.map((item)=>{
                    return (
                        <SongCover key={item.id} info={item} className="recommend-list">
                            {item.name}
                        </SongCover>
                    )
                })}
            </div>
        </HotRecommendWrapper>
    );
};

export default memo(HotRecommend);