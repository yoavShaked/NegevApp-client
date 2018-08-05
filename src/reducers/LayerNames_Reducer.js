
import {FETCH_LAYERS_NAMES} from '../actions/index';

export default function (state = [],action)
{
    switch (action.type)
    {
        case  FETCH_LAYERS_NAMES:
            return action.payload.data;

    }

    return state;
}