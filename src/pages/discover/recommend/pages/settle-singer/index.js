import React, { memo, useEffect } from 'react';
import { SETTLE_SINGER_COUNT } from '@/common/constants.js'
import {getSettleSingerAction} from '../../store/actionCreator'
import { useDispatch, useSelector } from 'react-redux';
import { SettleSingerWrapper } from './style';
import { ArtistHeaderLine,SingerCover } from '@/components/artist-hot-composition';

const SettleSinger = memo(() => {
    //redux hook
    const dispatch=useDispatch();
    const {settleSinger} = useSelector(
        state=>({
            settleSinger:state.getIn(['recommend','settleSinger'])
        })
    )

    useEffect(()=>{
        dispatch(getSettleSingerAction(SETTLE_SINGER_COUNT))
    },[dispatch])

    return (
        <SettleSingerWrapper>
            <ArtistHeaderLine titleSlot='入驻歌手' rightSlot="查看全部 >"/>
            <div className='singer-container'>
                {settleSinger&&settleSinger.map(item=>{
                    return <SingerCover key={item.id} info={item}/>
                })}
            </div>
        </SettleSingerWrapper>
    );
});

export default SettleSinger;