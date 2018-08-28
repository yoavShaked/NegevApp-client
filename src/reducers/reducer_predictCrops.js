import { CROPS_PREDICT } from './../actions/index';


export default function(state = [], action){
    
    switch(action.type){
        case CROPS_PREDICT:
            return action.payload.data;
        default:
            return state;
    }
}