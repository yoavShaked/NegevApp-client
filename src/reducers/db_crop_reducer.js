import {FETCH_CROPS, FETCH_CROP, UPDATE_CROP, DELETE_CROP, POST_CROP} from '../actions/index';

export default function(state = [], action)
{
    switch(action.type)
    {
        case FETCH_CROP:
        {
            return [...state,action.payload.data.id];
        }
        case UPDATE_CROP:
        {
            return action.payload.data;
        }     
        case POST_CROP:
        {
            return action.payload.data;
        }     
        case FETCH_CROPS:
        {
            return action.payload.data;
        }     
        case DELETE_CROP:
        {
            return action.payload.data;
        }      
        default:
        {
            return state;
        }
    }
}