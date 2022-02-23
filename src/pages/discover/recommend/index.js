import React, { memo } from 'react'

import {
    RecommendWrapper,
    Content,
    RecommendLeft,
    RecommendRight,
} from './style';

import TopBanners from './pages/top-banners';
import HotRecommend from './pages/hot-recommend';
import NewAlbum from './pages/new-album';
import RecommendRanking from './pages/recommend-ranking';
import UserLogin from './pages/user-login';
import SettleSinger from './pages/settle-singer';
import HotArtist from './pages/hot-artist';

function Recommend(props) {
    return (
        <RecommendWrapper>
            {/*轮播图*/}
            <TopBanners/>
            {/*主体内容*/}
            <Content className="w980">
                <RecommendLeft>
                    {/* 热门推荐 */}
                    <HotRecommend history={props.history}/>
                    {/* 新碟上架 */}
                    <NewAlbum />
                    {/*榜单*/}
                    <RecommendRanking to={props.history}/>
                </RecommendLeft>
                <RecommendRight>
                    {/*登录*/}
                    <UserLogin/>
                    {/*入驻歌手*/}
                    <SettleSinger/>
                    {/*热门主播*/}
                    <HotArtist/>
                </RecommendRight>
            </Content>
        </RecommendWrapper>
    )
}

export default memo(Recommend)