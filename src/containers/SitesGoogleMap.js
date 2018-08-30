import React, { Component } from 'react';
import { connect } from 'react-redux';
import { change_map_zoom } from '../actions/index';
import { bindActionCreators } from 'redux';
import { toggle_select_site } from '../actions/index';
import { change_loading_modal, fetch_all_sites, hide_loading_modal } from '../actions/index';


class SiteGoogleMap extends Component {

    constructor(props) {
        super(props);

        this.site_color = "#00FF00";
        this.selected_site_color = "#FF0000";
        this.sites_polygons = [];

        this.props.fetch_all_sites(() => this.props.change_loading_modal(true, "טוען חלקות", 20), () => this.props.hide_loading_modal());

    }


    shouldComponentUpdate() {
        return false;
    }

    componentDidMount() {

        // Connect the initMap() function within this class to the global window context,
        // so Google Maps can invoke it
        window.predict_page = this;
        window.initMap = this.initMap;
        const url = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCrDmbP56izyqBLy28WbwYZsnmDaNEszWo&callback=initMap&libraries=drawing";

        // Asynchronously load the Google Maps script, passing in the callback reference
        loadJS(url);
    }

    getSiteById(site_id, layer) {
        let result = null;
        this.sites_polygons.forEach(site_polygon => {
            if (site_polygon.site.ID == site_id)
                result = site_polygon;

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
                        is_selected: false,
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

                        selectedMode: function () {
                            this.is_selected = true;
                            this.updateColor("#ff0000");
                        },

                        unSelectedMode: function () {
                            this.is_selected = false;
                            this.updateColor("#00ff00");
                        },

                        toggleSelection: function(){
                            this.is_selected = !this.is_selected;
                            this.updateColor(this.is_selected ? "#ff0000" : "#00ff00");
                        }
                    });


                all_sites_polygons[site.ID] = {
                    site: site,
                    polygon: google_maps_poly,
                };

                google_maps_poly.addListener('click', function (event) {
                    all_sites_polygons[site.ID].polygon.toggleSelection();
                    the_this.props.toggle_select_site(all_sites_polygons[site.ID]);
                    
                });

            });
            this.props.change_loading_modal(false, "", 0);
        }

        if (this.sites_polygons) {
            this.sites_polygons.forEach((site) => {
                site.polygon.setMap(this.map)
            });
        }



        if (this.props.current_zoom != nextProps.current_zoom) {
            this.map.setZoom(nextProps.current_zoom);
        }


        // if (nextProps.selectedSites.length != this.props.selectedSites.length)
        // {
        //     if (nextProps.selectedSites.length > this.props.selectedSites.length)
        //     {

        //     }
        //     else
        //     {

        //     }
        // }
    }

    // draw_layer(layer)
    // {
    //     console.log("@@@@");
    //     console.log(layer.SitesByYears);

    //     layer.SitesByYears.forEach(site_by_year => 
    //     {
    //         if(this.sites_polygons[site_by_year.SiteID].sites_by_years.length == 0)
    //             this.sites_polygons[site_by_year.SiteID].polygon.setMap(this.map);
    //         this.sites_polygons[site_by_year.SiteID].sites_by_years.push(site_by_year);

    //     });
    // }

    initMap() {
        console.log("!!!!", this.predict_page);
        this.predict_page.map = new google.maps.Map(window.document.getElementById("map"),
            {
                center: { lat: 32.109333, lng: 34.855499 },
                zoom: this.predict_page.props.current_zoom,
                mapTypeId: 'satellite',

                //MAP CONTROLERS
                streetViewControl: false,
                fullscreenControl: false,
                zoomControl: false,
                mapTypeControl: false,

                gestureHandling: 'greedy'
            });


        this.predict_page.map.page = this.predict_page;


        this.predict_page.map.addListener('zoom_changed', function () {
            this.page.props.change_map_zoom(this.getZoom());
        });


        // google.maps.event.addListener(this.history_page.drawingManager, 'circlecomplete', function (circle) {
        //     let the_this = this.map.page;
        //     circle.setMap(null);
        //     var intersectedSites = the_this.getAllIntersectSitesByCircle(circle);
        //     intersectedSites.forEach(site =>{
        //         the_this.props.toggle_select_site(site);
        //     });

        // });

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
    return bindActionCreators({
        change_map_zoom: change_map_zoom,
        toggle_select_site: toggle_select_site,
        change_loading_modal: change_loading_modal,
        fetch_all_sites: fetch_all_sites,
        hide_loading_modal: hide_loading_modal,
    }
        , dispatch);
}

function mapStateToProps(state) {
    return {
        current_zoom: state.currentZoom,
        sites: state.sites,
        selected_site : state.selected_site

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SiteGoogleMap);

    // apiKey: 'AIzaSyCrDmbP56izyqBLy28WbwYZsnmDaNEszWo'
