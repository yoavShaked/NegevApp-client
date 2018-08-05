
export default function(state = false,action)
{
    switch(action.type)
    {
        case 'DRAW_STATE_CHANGE':
            return !state;
    }
    return state;
}