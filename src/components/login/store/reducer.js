import {Map} from 'immutable';
import * as actionType from './actionType';
const defaultState=Map({
    isVisible:false,  //登录框是否可见
    isLogin:false,    //登录状态
    profile:'',       //用户信息
    token:'',
    cookie:''
})

function reducer(state=defaultState,action){
    switch(action.type){
        case actionType.CHANGE_IS_VISIBLE_STATE:
            return state.set('isVisible',action.isVisible)
        case actionType.CHANGE_USER_LOGIN_STATE:
            return state.set('isLogin',action.isLogin)
        case actionType.CHANGE_PROFILE_INFO:
            return state.set('profile',action.profile)
        case actionType.CHANGE_PROFILE_TOKEN:
            return state.set('token',action.token)
        case actionType.CHANGE_PROFILE_COOKIE:
            return state.set('cookie',action.cookie)
        default:
            return state
    }
}

export default reducer