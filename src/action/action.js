import {SET_ALBUM} from './action.type'

export const setAlbum=(data)=>{
    return{
        type:SET_ALBUM,
        payload:data
    }
}