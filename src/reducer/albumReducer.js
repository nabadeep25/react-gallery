import { SET_ALBUM } from '../action/action.type'
const initialState={
    albums:[]
}
const albumReducer=(state=initialState,action)=>{
    switch(action.type){
        case SET_ALBUM:
            const paylad=action.payload;
            return {...state,albums:paylad};
        default:
            return state;
    }
}
export default albumReducer;