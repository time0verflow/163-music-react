import React, { memo, useState } from 'react';
import {useSelector,shallowEqual} from 'react-redux';
import SongCategory from './SongCategory';
import {
    HeaderWrapper,
    HeaderLeft,
    HeaderRight
} from './SongHeader-style'
const SongHeader = memo(() => {

    //hooks
    const [showCategory,setShowCategory]=useState(false);

    //redux
    const {currentCategory}=useSelector(state=>({
        currentCategory:state.getIn(["songList","currentCategory"])
    }),shallowEqual);

    return (
        <HeaderWrapper>
            <HeaderLeft>
                <span className="title">{currentCategory}</span>
                <button className="select" onClick={e=>setShowCategory(!showCategory)}>
                    <span>选择分类</span>
                    <i className="sprite_icon2"></i>
                </button>
                {showCategory?<SongCategory/>:null}             
            </HeaderLeft>
            <HeaderRight>
                <button className="hot">热门</button>
            </HeaderRight>
        </HeaderWrapper>
    );
});

export default SongHeader;