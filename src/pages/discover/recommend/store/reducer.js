import { Map } from 'immutable'
import * as actionTypes from './actionTypes'

const defaultState = Map({
    topBanners: []
})

function reducer(state = defaultState, action) {
    switch (action.type) {
        case actionTypes.CHANGE_TOP_BANNER:
            return state.set('topBanners', action.topBanners)
        case actionTypes.CHANGE_HOT_RECOMMEND:
            return state.set('hotRecommends', action.hotRecommends)
        case actionTypes.CHANGE_NEW_ALBUMS:
            return state.set('newAlbums', action.newAlbums)

        case actionTypes.CHANGE_UP_RANKING:
            return state.set('upRanking', action.upRanking)
        case actionTypes.CHANGE_NEW_RANKING:
            return state.set('newRanking', action.newRanking)
        case actionTypes.CHANGE_ORIGIN_RANKING:
            return state.set('originRanking', action.originRanking)

        case actionTypes.CHANGE_SETTLE_SINGER:
            return state.set('settleSinger', action.settleSinger)
        default:
            return state
    }
}

export default reducer;