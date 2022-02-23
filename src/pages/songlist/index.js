import React, { memo, useEffect } from 'react';
import { SonglistWrapper, SonglistContent } from './style';
import qs from 'querystring'
import { useDispatch } from 'react-redux';

import { getSongDeailAction } from './store/actionCreator';

import AppNavBar from '@/components/nav-bar';

import SonglistLeft from './songlist-left';

const SongList = memo((props) => {

    const {songlistId}=qs.parse(props.location.search.substring(1))
    
    //redux hook
    const dispatch=useDispatch()

    //other hook
    useEffect(()=>{
        dispatch(getSongDeailAction(songlistId))
    },[dispatch,songlistId])

    return (
        <SonglistWrapper>
            {/*导航栏*/}
            <AppNavBar/>
            <SonglistContent>
                <SonglistLeft />
            </SonglistContent>
        </SonglistWrapper>
    );
});

export default SongList;