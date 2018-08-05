import {FETCH_LAYERS_DATA} from '../actions/index';

export default function (state = [],action)
{
    switch (action.type)
    {
        case FETCH_LAYERS_DATA:
        {
            let to_return = [];
            state.forEach(layer =>{
                to_return[layer.ID] = layer;
            })
            to_return[action.payload.data.ID] = action.payload.data;
            console.log(to_return);
            return to_return;
        }
    }

    return state;
}
