import { 
    FETCH_SITES, 
    UPDATE_SITE, 
    POST_SITE, 
    DELETE_SITE} from '../actions/index';

    export default function(state = [], action)
{
    switch(action.type)
    {
        case FETCH_SITES:
        case UPDATE_SITE:
        case POST_SITE:
        case DELETE_SITE:
            return action.payload.data;
        default:
            return state;
    }
}