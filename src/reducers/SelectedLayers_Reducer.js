import {TOGGLE_SELECT_LAYER,SELECT_LAYER,UNSELECT_LAYER } from '../actions/index';
import {FETCH_LAYERS_DATA} from '../actions/index';

export default function (state = [],action)
{
    switch (action.type)
    {
        case TOGGLE_SELECT_LAYER:
            const index = state.indexOf(action.payload);
            
            if( index > -1)     //in case found
                return state.slice(0,index).concat(state.slice(index+1,state.length));
            else                //in case wasnt found
                return [action.payload , ...state];

        case SELECT_LAYER:
            return [action.payload , ...state];

        case UNSELECT_LAYER:
            return state.slice(0,state.indexOf(action.payload)).concat(state.slice(state.indexOf(action.payload)+1,state.length));
            
        case FETCH_LAYERS_DATA:
            console.log([action.payload.data.ID , ...state]);
            return [action.payload.data.ID , ...state];
        
    }

    return state;
}