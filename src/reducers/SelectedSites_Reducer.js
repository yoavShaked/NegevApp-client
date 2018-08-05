import {TOGGLE_SELECT_SITE,TOGGLE_SELECT_LAYER,TOGGLE_SELECT_SITES} from '../actions/index';

export default function (state = [],action)
{
    switch (action.type)
    {
        case TOGGLE_SELECT_SITE:
            const index = state.indexOf(action.payload);
            
            if( index > -1)     //unSelect
                return state.slice(0,index).concat(state.slice(index+1,state.length));
            else                //select
                return [action.payload , ...state];
    }

    return state;
}