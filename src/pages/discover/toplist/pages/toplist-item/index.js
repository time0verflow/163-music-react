import React, { Fragment, memo } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getSizeImage } from '@/utli/format-utlis'
import { TopListItemWrapper } from './style';
import { changeCurrentIndexAction, changCurrentToplistId } from '../../store/actionCreator'

const TopListItem = memo((props) => {

    const { toplistInfo } = props;

    const dispatch = useDispatch();
    const { currentIndex } = useSelector((state) => ({
        currentIndex: state.getIn(['toplist', 'currentIndex'])
    }), shallowEqual)

    const clickItem = (e, index, id) => {
        e.preventDefault()
        // dispatch
        dispatch(changCurrentToplistId(id));
        dispatch(changeCurrentIndexAction(index))
        //修改URL
        props.history.push(`/discover/ranking?id=${id}`)
    }

    return (
        <TopListItemWrapper>
            {
                toplistInfo.map((item, index) => {
                    return (
                        <Fragment key={item.id}>
                            <h3 style={{ marginTop: index === 4 ? '17px' : '' }}>
                                {index === 0 ? '云音乐特色榜' : index === 4 ? '全球媒体榜' : ''}
                            </h3>
                            <NavLink
                                onClick={(e)=>clickItem(e,index,item.id)}
                                to={{ pathname: '/discover/songs', search: `?id=${item.id}` }}
                                className={"info " + (index === currentIndex ? 'bg' : '')}
                            >
                                <div className='image'>
                                    <img src={getSizeImage(item.coverImgUrl, 44)} alt='' />
                                </div>
                                <div className='info-right'>
                                    <div className='info-title'>{item.name}</div>
                                    <div className='info-update'>{item.updateFrequency}</div>
                                </div>
                            </NavLink>
                        </Fragment>
                    )
                })
            }
        </TopListItemWrapper>
    );
});


export default TopListItem;