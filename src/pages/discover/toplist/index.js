import React, { memo, useEffect } from 'react';
import { TopListWrapper, TopListLeft, TopListRight } from './style';
import { getToplistInfoAction, getToplistTitleInfoAction } from './store/actionCreator';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import qs from 'querystring'
import ToplistTitle from './pages/toplist-title';
import TopListMain from './pages/toplist-main';
import TopListItem from './pages/toplist-item';

const TopList = memo((props) => {
    //redux hook
    const dispatch = useDispatch();
    const { toplistInfo, currentToplistId } = useSelector(
        (state) => ({
            toplistInfo: state.getIn(['toplist', 'toplistInfo']),
            currentToplistId: state.getIn(['toplist', 'currentToplistId'])
        }), shallowEqual
    )

    //获取左边栏Info
    useEffect(() => {
        dispatch(getToplistInfoAction());
    }, [dispatch]);

    //排行榜头部信息
    useEffect(() => {
        let { id } = qs.parse(props.location.search);
        id = id || currentToplistId
        dispatch(getToplistTitleInfoAction(id))
    }, [currentToplistId, dispatch, props])

    return (
        <TopListWrapper className='wrap-bg2'>
            <div className='content w980'>
                <TopListLeft>
                    <div className="top-list-container">
                        <TopListItem toplistInfo={toplistInfo} history={props.history} />
                    </div>
                </TopListLeft>
                <TopListRight>
                    <ToplistTitle />
                    <TopListMain />
                </TopListRight>
            </div>
        </TopListWrapper>
    );
});

export default TopList;