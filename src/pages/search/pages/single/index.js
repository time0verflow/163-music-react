import React, { memo, useEffect } from 'react';

import qs from 'querystring';

import { SingleSongWrapper } from './style';

import { getSearchSongListAction } from '../../store/actionCreator'
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import {formatMinuteSecond} from '@/utli/format-utlis'

import SingleSongItem from './single-song-item';

const SearchSingle = memo((props) => {
    const { song, type } = qs.parse(props.location.search.substring(1));

    // redux hook
    const dispatch = useDispatch()
    const { singleSongList } = useSelector(
        (state) => ({
            singleSongList: state.getIn(['search', 'singleSongList'])
        }), shallowEqual
    )

    useEffect(() => {
        if (song) dispatch(getSearchSongListAction(song, 20, type))
    }, [dispatch, song, type])

    return (
        <SingleSongWrapper>
            {singleSongList && singleSongList.map((item) => {
                return <SingleSongItem
                    key={item.id}
                    songId={item.id}
                    songName={item.name}
                    singer={item.artists[0].name}
                    album={item.album.name}
                    duration={formatMinuteSecond(item.duration)}
                    />
            })}
        </SingleSongWrapper>
    );
});

export default SearchSingle;