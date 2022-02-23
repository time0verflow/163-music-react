import * as actionTypes from './actionType';
import { PER_PAGE_NUMBER } from './actionType';

import {
    getSongCategory,
    getSongCategoryList
} from '@/service/songs'

import {
    handleSongsCategory
} from '@/utli/handle-data'

//获取分类
const changeCategoryAction=(res)=>({
    type:actionTypes.CHANGE_CATEGORY,
    category:res
})

const changeSongListAction=(res)=>({
    type:actionTypes.CHANGE_CATEGORY_SONGS,
    categorySongs:res
})

export const getCategory=()=>{
    return dispatch=>{
        getSongCategory().then(res=>{
            console.log('get')
            const categoryData=handleSongsCategory(res);
            dispatch(changeCategoryAction(categoryData));
        })
    }
}

export const getSongList=(page)=>{
    return (dispatch,getState)=>{
        //1.获取currentCategory
        const name=getState().getIn(["songList","currentCategory"]);

        //2.获取数据
        getSongCategoryList(name,page*PER_PAGE_NUMBER).then(res=>{
            dispatch(changeSongListAction(res));
        })
    }
}

export const changeCurrentCategoryAction=(name)=>({
    type:actionTypes.CHANGE_CURRENT_CATEGORY,
    currentCategory:name
})

