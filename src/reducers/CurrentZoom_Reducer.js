
export default function(state = 8,action)
{
    switch(action.type)
    {
        case 'ZOOM_CHANGED':
            return action.payLoad;
    }

    return state;
}