import { combineReducers } from 'redux-immutable';

import { reducer as recommendReducer } from '../pages/discover/recommend/store';
import { reducer as playerReducer } from '../pages/player/store';
import { reducer as songListReducer }  from '../pages/discover/songs/store' 
import { reducer as headerReducer } from '../components/app-header/store';
import { reducer as loginReducer} from '../components/login/store';
import { reducer as toplistReducer} from '../pages/discover/toplist/store';
import { reducer as searchReducer } from '../pages/search/store';
import { reducer as songDetailReducer } from '../pages/songlist/store';

const cRducer=combineReducers({
    recommend:recommendReducer,
    player:playerReducer,
    songList:songListReducer,
    header:headerReducer,
    login:loginReducer,
    toplist:toplistReducer,
    search:searchReducer,
    songDetail:songDetailReducer
})
export default cRducer;