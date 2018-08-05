import axios from 'axios';

const url = "http://localhost:2552//api";
//const old_url = "http://localhost:27434//api";

export const ZOOM_CHANGED = "ZOOM_CHANGED";
export function change_map_zoom(number)
{
    return {
        type: 'ZOOM_CHANGED',
        payLoad: number
    };
}

export const DRAW_STATE_CHANGE = "DRAW_STATE_CHANGE";
export function toggle_drawing_state()
{
    return{
        type: "DRAW_STATE_CHANGE",
    };
}

/////////////////////TO DO/////////////////////////
export const FETCH_LAYERS_NAMES = "FETCH_LAYERS_NAMES";
export function fetch_layers_names()
{
    const request = axios.get(`${url}/layer/layersNamesIDs`);

    return {
        type : FETCH_LAYERS_NAMES,
        payload : request
    }
}

export const FETCH_LAYERS_DATA = "FETCH_LAYERS_DATA";
export function fetch_layer_data(layer_id,onStart,onEnd)
{
    onStart();
    const request = axios.get(`${url}/layer/layerbyid?i_LayerID=${layer_id}`).then(function(response)
    {
        onEnd();
        console.log("!!!!!!!!!11");
        console.log(response);
        return response;
    });

    return {
        type : FETCH_LAYERS_DATA,
        payload : request
    }
}

export const TOGGLE_SELECT_LAYER = "TOGGLE_SELECT_LAYER";
export function toggle_select_layer(layer_id)
{
    return {
        type: TOGGLE_SELECT_LAYER,
        payload: layer_id
    }
}

export const SELECT_LAYER = "SELECT_LAYER";
export function select_layer(layer_id)
{
    return {
        type: SELECT_LAYER,
        payload: layer_id
    }
}

export const UDSELECT_LAYER = "UDSELECT_LAYER";
export function unselect_layer(layer_id)
{
    return {
        type: UDSELECT_LAYER,
        payload: layer_id
    }
}

//CHANGE URL
export const FETCH_ALL_SITES = "FETCH_ALL_SITES";
export function fetch_all_sites(onStart,onEnd)
{
    onStart();
    const request = axios.get(`${url}/site/allsites`).then(function (response) {
        onEnd();
        return response;
      });

    return{
        type : FETCH_ALL_SITES,
        payload : request
    };
}

export const TOGGLE_SELECT_SITE = "TOGGLE_SELECT_SITE";
export function toggle_select_site(site)
{
    return{
        type : TOGGLE_SELECT_SITE,
        payload : site
    };
}

export const CHANGE_LOADING_MODAL = "CHANGE_LOADING_MODAL";
export function change_loading_modal(visibility,context,progress)
{
    return{
        type : CHANGE_LOADING_MODAL,
        payload : {visibility:visibility,
                   context:context,
                   progress:progress}
    };
}

export const HIDE_LOADING_MODAL = "HIDE_LOADING_MODAL";
export function hide_loading_modal()
{
    return{
        type : HIDE_LOADING_MODAL
    };
}

export const SHOW_LOADING_MODAL = "SHOW_LOADING_MODAL";
export function show_loading_modal(visibility,context,progress)
{
    return{
        type : CHANGE_LOADING_MODAL,
        payload : {visibility:visibility,
                   context:context,
                   progress:progress}
    };
}

export const SET_LOADING_MODAL_PROGRESS = "SET_LOADING_MODAL_PROGRESS";
export function set_loading_modal_progress(progress)
{
    return{
        type : SET_LOADING_MODAL_PROGRESS,
        payload : progress
    };
}

// database 
//action creators
export const FETCH_LAYERS = "fetch_layers";
export function fetchLayers()
{
    const request = axios.get(`${url}/layer/getlayers`);

    return {
        type: FETCH_LAYERS,
        payload: request
    };
}

export const FETCH_LAYER = "fetch_layer";
export function fetchLayer(id)
{
    const request = axios.get(`${url}/layer/layerbyid?i_LayerID=${id}`);

    return {
        type: FETCH_LAYER,
        payload: request
    };
}

export const UPDATE_LAYER = "update_layer";
export function updateLayer(updateLayer){

    const request = axios.put(`${url}/layer/updatelayer`, updateLayer);

    return{
        type: UPDATE_LAYER,
        payload: request
    };
}

export const POST_LAYER = "post_layer";
export function postLayer(newLayer){

    const request = axios.post(`${url}/layer/postlayer`, newLayer);

    return {
        type: POST_LAYER,
        payload: request
    };
}

export const DELETE_LAYER = "delete_layer";
export function deleteLayer(layerID){

    const request = axios.delete(`${url}/layer/deletelayer?i_LayerID=${layerID}`);

    return {
        type: DELETE_LAYER,
        payload: request
    };
}


export const FETCH_SITES = "fetch_sites";
export function fetchSites()
{
    const request = axios.get(`${url}/site/allsites`);

    return {
        type: FETCH_SITES,
        payload: request
    };
}

export const FETCH_SITE = "fetch_site";
export function fetchSite(id)
{
    const request = axios.get(`${url}/site/sitebyid?i_SiteID=${id}`);

    return {
        type: FETCH_SITE,
        payload: request
    };
}

export const POST_SITE = "post_site";
export function postNewSite(newSite){

    const request = axios.post(`${url}/site/postsite`, newSite);

    return {
        type: POST_SITE,
        payload: request
    };
}

export const UPDATE_SITE = "update_site";
export function updateSite(site){

    const request = axios.put(`${url}/site/updatesite`, site);

    return {
        type: UPDATE_SITE,
        payload: request
    };
}

export const DELETE_SITE = "delete_site";
export function deleteSite(siteID){

    const request = axios.delete(`${url}/site/deletesite?i_SiteID=${siteID}`);

    return{
        type: DELETE_SITE,
        payload: request
    };
}

export const FETCH_CROPS = 'fetch_crops';
export function fetchCrops()
{
    const request = axios.get(`${url}/crop/getcrops`);

    return {
        type: FETCH_CROPS,
        payload: request
    };
}

export const FETCH_CROP = 'fetch_crop';
export function fetchCrop(id)
{
    const request = axios.get(`${url}/crop/getcropbyid?i_CropID=${id}`);

    return {
        type: FETCH_CROP,
        payload: request
    };
}


export const UPDATE_CROP = "update_crop";
export function updateCrop(cropToUpdate)
{
    const request = axios.put(`${url}/crop/updatecrop`, cropToUpdate);

    return {
        type: UPDATE_CROP,
        payload: request
    };
}

export const DELETE_CROP = "delete_crop";
export function deleteCrop(cropID){

    const request = axios.delete(`${url}/crop/deletecrop?i_CropID=${cropID}`);

    return{
        type: DELETE_CROP,
        payload: request
    };
}

export const POST_CROP = "post_crop";
export function postNewCrop(cropToPost){

    const request = axios.post(`${url}/crop/postcrop`, cropToPost);

    return{
        type: POST_CROP,
        payload: request
    };
}




