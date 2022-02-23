import React, { memo,useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { SongsWrapper } from './style';
import { getQueryObject } from '../../../utli/format-utlis';
import SongHeader from './pages/SongHeader';
import { getCategory,getSongList } from './store/actionCreator';
import SongList from './pages/SongList';
import { changeCurrentCategoryAction } from './store/actionCreator';

const Songs = memo(() => {
    const { albumName } = getQueryObject()

    const dispatch=useDispatch();

    const cat = useLocation().cat

    useEffect(() => {
      dispatch(changeCurrentCategoryAction(albumName || cat))
    }, [dispatch, cat, albumName])
  

    useEffect(()=>{
        dispatch(getCategory())
        dispatch(getSongList(0))
    })

    return (
        <SongsWrapper className="wrap-v2">
            <SongHeader />
            <SongList />
        </SongsWrapper>
    );
});

export default Songs;