import React, { Component } from 'react';
import { connect } from 'react-redux';
import { change_map_zoom } from '../actions/index';
import { bindActionCreators } from 'redux';
import {toggle_select_site} from '../actions/index';
import {change_loading_modal} from '../actions/index';


class GoogleMap extends Component {

    constructor(props) {
        super(props);

        this.is_drawing_circle_mode = false;
        this.site_color = "#00FF00";
        this.selected_site_color = "#FF0000";
        this.sites_polygons = [];

        this.isCircleIntersectsSite = this.isCircleIntersectsSite.bind(this);
        this.getAllIntersectSitesByCircle = this.getAllIntersectSitesByCircle.bind(this);
    }


    shouldComponentUpdate() {
        return false;
    }

    componentDidMount() {

        // Connect the initMap() function within this class to the global window context,
        // so Google Maps can invoke it
        window.history_page = this;
        window.initMap = this.initMap;
        const url = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCrDmbP56izyqBLy28WbwYZsnmDaNEszWo&callback=initMap&libraries=drawing";

        // Asynchronously load the Google Maps script, passing in the callback reference
        loadJS(url);
    }



    findMissing(currentArr, missingArr)
    {
        return (currentArr.filter(function(item){
            return missingArr.indexOf(item) === -1;
          }))[0];
    }

    is_id_exist(id, array) {

        array.forEach(element => {
            if (element.ID == id)
                return true;
        });

        return false;
    }

    findMissingByIdProperty(currentArr, missingArr)
    {
        let the_this = this;
        return (currentArr.filter(
        function(item)
        {
            return !the_this.is_id_exist(item.ID,missingArr);
        
        }))[0];
    }

    getLayerById(layer_id,layers)
    {
        let result = null
        let i =0;
        layers.forEach(layer =>{
            if(layer.ID == layer_id)
            {
                result = layer;
            }
        });

        return result;
    }

    getSiteById(site_id,layer)
    {
        let result = null;
        this.sites_polygons.forEach(site_polygon => {
            if(site_polygon.site.ID==site_id)
                result =  site_polygon;

        });

        return result;

    }

    componentWillReceiveProps(nextProps) {
        console.log("Google Maps PrevProps:", this.props);
        console.log("Google Maps NextProps:", nextProps);   

        let the_this = this;
        let all_sites_polygons = this.sites_polygons;

        if (this.props.sites < nextProps.sites) {

            nextProps.sites.forEach(site => {

                let google_maps_poly_coordinates = [];

                site.Coordinates.forEach(coor => {
                    google_maps_poly_coordinates.push(JSITM.itm2gps({ x: coor.X, y: coor.Y }));
                });

                let google_maps_poly = new google.maps.Polygon(
                    {
                        is_selected:false,
                        paths: google_maps_poly_coordinates,
                        strokeColor: '#000000',
                        strokeOpacity: 1,
                        strokeWeight: 1,
                        fillColor: "#00FF00",
                        fillOpacity: 0.35,


                        //Data References
                        sites_by_year: [],
                        site_data: site,



                        updateColor: function (color) {
                            this.setMap(null);
                            this.fillColor = color;
                            this.setMap(the_this.map);
                        },

                        zoomIn: function () {
                            var bounds = new google.maps.LatLngBounds();
                            this.getPath().forEach(function (e) {
                                bounds.extend(e);
                            })

                            the_this.map.fitBounds(bounds);
                            the_this.map.setZoom(15);
                        },

                        selectedMode : function()
                        {
                            this.is_selected=true;
                            this.updateColor("#ff0000");
                        },

                        unSelectedMode : function()
                        {
                            this.is_selected=false;
                            this.updateColor("#00ff00");
                        }
                    });


                all_sites_polygons[site.ID] = {
                    site: site,
                    polygon: google_maps_poly,
                    sites_by_years : []
                };

                google_maps_poly.addListener('click', function (event) {
                    the_this.props.toggle_select_site(all_sites_polygons[site.ID]);
                });

            });
            this.props.change_loading_modal(false,"",0);
        }



        if (this.props.current_zoom != nextProps.current_zoom) {
            this.map.setZoom(nextProps.current_zoom);
        }

        if (this.props.drawingState != nextProps.drawingState) {
            this.drawingManager.setMap(nextProps.drawingState ? this.map : null);
        }

        if (nextProps.selectedLayers.length != this.props.selectedLayers.length)
        {
            if (nextProps.selectedLayers.length > this.props.selectedLayers.length) // missingLayer Layer Added
            {
                var missingLayer = this.findMissing(nextProps.selectedLayers, this.props.selectedLayers);
                console.log("this.getLayerById(missingLayer,nextProps.layers)  ",this.getLayerById(missingLayer,nextProps.layers));
                this.draw_layer(this.getLayerById(missingLayer,nextProps.layers));
                
            }
            else//(nextProps.selectedLayers.length < this.props.selectedLayers.length) // missingLayer Layer Removed
            {
                var missingLayer = this.findMissing(this.props.selectedLayers,nextProps.selectedLayers);
                this.undraw_layer(this.getLayerById(missingLayer,nextProps.layers));   

            }
        }

        if (nextProps.selectedSites.length != this.props.selectedSites.length)
        {
            if (nextProps.selectedSites.length > this.props.selectedSites.length)
            {
                var missingSite = this.getSiteById(this.findMissing(Array.from(nextProps.selectedSites,site => site.site.ID), Array.from(this.props.selectedSites,site => site.site.ID)));
                console.log("Missing Site: ",missingSite);
                missingSite.polygon.selectedMode();
                
            }
            else
            {
                var missingSite = this.getSiteById(this.findMissing(Array.from(this.props.selectedSites,site => site.site.ID),Array.from(nextProps.selectedSites,site => site.site.ID)));
                console.log("Missing Site: ",missingSite);                
                missingSite.polygon.unSelectedMode();
                
                
            }
        }
    }

    draw_layer(layer)
    {
        console.log("@@@@");
        console.log(layer.SitesByYears);
        
        layer.SitesByYears.forEach(site_by_year => 
        {
            console.log()
            if(this.sites_polygons[site_by_year.SiteID].sites_by_years.length == 0)
                this.sites_polygons[site_by_year.SiteID].polygon.setMap(this.map);
            this.sites_polygons[site_by_year.SiteID].sites_by_years.push(site_by_year);
            
        });
    }

    undraw_layer(layer)
    {
        layer.SitesByYears.forEach(site_by_year => 
        {

            let temp_arr = [];
            while( this.sites_polygons[site_by_year.SiteId].sites_by_years.length > 0)
            {
                let element = this.sites_polygons[site_by_year.SiteId].sites_by_years.pop();
                if(element.LayerId != site_by_year.LayerId )
                    temp_arr.push(element);
            }

            while( temp_arr.length > 0)
                this.sites_polygons[site_by_year.SiteId].sites_by_years.push(temp_arr.pop());
            

            if(this.sites_polygons[site_by_year.SiteId].sites_by_years.length == 0)
                this.sites_polygons[site_by_year.SiteId].polygon.setMap(null);
            
            
        });
    }

    isCircleIntersectsSite(circle, poly) 
    {
        let wicket = new Wkt.Wkt();

        wicket.fromObject(circle);
        let circlewkt = wicket.write();

        wicket.fromObject(poly);
        let polywkt = wicket.write();


        // Instantiate JSTS WKTReader and get two JSTS geometry objects
        let wktReader = new jsts.io.WKTReader();
        let geom1 = wktReader.read(circlewkt);
        let geom2 = wktReader.read(polywkt);


        return geom2.intersects(geom1);
    }

    getAllIntersectSitesByCircle(circle) 
    {
        let intersect_sites = [];

        this.sites_polygons.forEach(site => {
                console.log("SSIITTEE:",site);
                if (this.isCircleIntersectsSite(circle, site.polygon)) {

                    intersect_sites.push(site);
                }
            
        });

        return intersect_sites;
    }

    initMap() {

        this.history_page.map = new google.maps.Map(window.document.getElementById("map"),
            {
                center: { lat: 32.109333, lng: 34.855499 },
                zoom: this.history_page.props.current_zoom,
                mapTypeId: 'satellite',

                //MAP CONTROLERS
                streetViewControl: false,
                fullscreenControl: false,
                zoomControl: false,
                mapTypeControl: false,

                gestureHandling: 'greedy'
            });

        this.history_page.drawingManager = new google.maps.drawing.DrawingManager({
            drawingMode: google.maps.drawing.OverlayType.CIRCLE,
            drawingControl: false,
            circleOptions: {
                fillColor: '#000000',
                fillOpacity: 0.5,
                strokeWeight: 2,
                strokeColor: '#007bff',
                clickable: false,
                editable: false,
                zIndex: 1
            }
        });

        this.history_page.map.page = this.history_page;


        this.history_page.map.addListener('zoom_changed', function () {
            this.page.props.change_map_zoom(this.getZoom());
        });


        google.maps.event.addListener(this.history_page.drawingManager, 'circlecomplete', function (circle) {
            let the_this = this.map.page;
            circle.setMap(null);
            var intersectedSites = the_this.getAllIntersectSitesByCircle(circle);
            intersectedSites.forEach(site =>{
                the_this.props.toggle_select_site(site);
            });
            
        });

    }




    render() {
        return (
            <div id="map" ref="map" />
        );
    }
}


function loadJS(src) {
    var ref = window.document.getElementsByTagName("script")[0];
    var script = window.document.createElement("script");
    script.src = src;
    script.async = true;
    ref.parentNode.insertBefore(script, ref);
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ change_map_zoom: change_map_zoom,
                                toggle_select_site:toggle_select_site,
                                change_loading_modal:change_loading_modal
                                }
                                , dispatch);
}

function mapStateToProps(state) {
    return {
        current_zoom: state.currentZoom,
        drawingState: state.drawingState,

        layers: state.layers,
        sites: state.sites,

        selectedLayers: state.selectedLayers,
        selectedSites: state.selectedSites

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GoogleMap);

    // apiKey: 'AIzaSyCrDmbP56izyqBLy28WbwYZsnmDaNEszWo'
