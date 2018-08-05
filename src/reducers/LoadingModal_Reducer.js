import {CHANGE_LOADING_MODAL,SHOW_LOADING_MODAL,HIDE_LOADING_MODAL,SET_LOADING_MODAL_PROGRESS} from '../actions/index';

export default function (state = {visibility:false, context:"טוען...", progress:0} ,action)
{
    switch (action.type)
    {
        case CHANGE_LOADING_MODAL:
            return action.payload;
        
        case SHOW_LOADING_MODAL:
            return {visibility:true,context:state.context,progress:state.progress};
        
        case HIDE_LOADING_MODAL:
            return {visibility:false,context:"state.context",progress:100};

        case SET_LOADING_MODAL_PROGRESS:
            return {visibility:state.visibility,context:state.context,progress:action.payload.progress};




    }

    return state;
}