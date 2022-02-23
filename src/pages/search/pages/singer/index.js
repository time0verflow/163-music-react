import React, { memo, useEffect } from 'react';

import { SingerWrapper } from './style';

import qs from 'querystring';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { getSearchSingerListAction } from '../../store/actionCreator'

import SingerItem from './singer-item';
const SearchSinger = memo((props) => {

    const { type, song } = qs.parse(props.location.search.substring(1))

    const dispatch = useDispatch()
    const { singerList } = useSelector(
        (state) => ({
            singerList: state.getIn(['search', 'singerList'])
        }), shallowEqual
    )

    useEffect(() => {
        dispatch(getSearchSingerListAction(song, 20, type))
    }, [dispatch, song, type])

    return (
        <SingerWrapper>
            {singerList &&
                singerList.map((item) => {
                    return (
                        <SingerItem
                            key={item.id}
                            coverPic={item.picUrl}
                            singer={item.name}
                        />
                    )
                })}
        </SingerWrapper>
    );
});

export default SearchSinger;