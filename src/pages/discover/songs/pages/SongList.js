import React, { memo, useState } from 'react';
import { SongListWrapper } from './SongList-style';
import SongCover from '../../../../components/song-cover'
import MyPagination from '../../../../components/pagination';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getSongList } from '../store/actionCreator';
import { Skeleton } from 'antd';
import { PER_PAGE_NUMBER } from '../store/actionType';

const SongList = memo(() => {

    //hooks
    const [currentPage, setCurrentPage] = useState(1);

    //redux
    const { categorySongs } = useSelector(state => ({
        categorySongs: state.getIn(["songList", "categorySongs"])
    }), shallowEqual);
    const songList = categorySongs.playlists || [];
    const total = categorySongs.total || 0;
    const dispatch = useDispatch();

    function onPageChange(page, pageSize) {
        window.scroll(0, 0);
        setCurrentPage(page);
        dispatch(getSongList(page));
    }

    return (
        <SongListWrapper>
            {!songList.length ? <Skeleton active /> : <div className="songs-list">
                {
                    songList.map((item, index) => {
                        return (
                            <SongCover info={item} key={item + index} />
                        )
                    })
                }
            </div>}
            <MyPagination currentPage={currentPage}
                total={total}
                pageSize={PER_PAGE_NUMBER}
                onPageChange={onPageChange} />
        </SongListWrapper>
    );
});

export default SongList;