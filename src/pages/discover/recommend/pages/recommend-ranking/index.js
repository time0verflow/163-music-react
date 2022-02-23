import React, { memo, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { getTopListAction } from '../../store/actionCreator'
import ThemeHeaderRcm from '@/components/theme-header-rcm';
import { RankingWrapper } from './style'
import TopList from '@/components/top-ranking';

const RecommendRanking = props => {
    //利用redux hook取出state
    const { upRanking = [], originRanking = [], newRanking = [] } = useSelector(state => ({
        upRanking: state.getIn(['recommend', 'upRanking']),
        originRanking: state.getIn(['recommend', 'originRanking']),
        newRanking: state.getIn(['recommend', 'newRanking'])
    }), shallowEqual)
    const dispatch = useDispatch()


    // other hook
    useEffect(() => {
        dispatch(getTopListAction(19723756))
        dispatch(getTopListAction(3779629))
        dispatch(getTopListAction(2884035))
    }, [dispatch])


    return (
        <RankingWrapper>
            <ThemeHeaderRcm title="榜单"/>
            <div className="ranking-info">
                <TopList info={originRanking} index={2} {...props} id={2884035}/>
                <TopList info={upRanking} index={0} {...props} id={19723756}/>
                <TopList info={newRanking} index={1} {...props} id={3779629}/>
            </div>
        </RankingWrapper>
    );
};


export default memo(RecommendRanking)