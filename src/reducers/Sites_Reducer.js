
import {FETCH_ALL_SITES} from '../actions/index';

export default function (state = [],action)
{
    switch (action.type)
    {
        case  FETCH_ALL_SITES:
            let sites = [];
            console.log("ma2");
            console.log("action.payload.data ",action.payload.data);
            action.payload.data.forEach(site =>{
                sites[site.ID] = site;

            });
            return sites;
    }

    return state;
}