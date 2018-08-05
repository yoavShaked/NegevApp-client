import { FETCH_LAYERS, 
    UPDATE_LAYER, 
    POST_LAYER, 
    DELETE_LAYER } from '../actions/index';

    
export default function (state = [], action) {

    switch (action.type) {
        case FETCH_LAYERS:
        case UPDATE_LAYER:
        case POST_LAYER:
        case DELETE_LAYER:
            return action.payload.data;
        default:
            return state;
    }
}
