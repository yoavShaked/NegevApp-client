import React, { Component } from 'react';
import {connect} from 'react-redux';
import {change_map_zoom } from '../actions/index';
import {toggle_drawing_state} from '../actions/index';
import {fetch_layers_names} from '../actions/index';
import {fetch_all_sites} from '../actions/index';
import {fetch_layer_data} from '../actions/index';
import {toggle_select_layer} from '../actions/index';

import {change_loading_modal,
        set_loading_modal_progress,
        hide_loading_modal} from '../actions/index';

import {bindActionCreators} from 'redux';
        

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';


class HistoryMapNavbar extends Component {
    constructor(props) {
        super(props);

        this.draw_circle_mode_toggle = false;
        this.current_zoom = 8;
        this.MAX_ZOOM = 20;
        this.MIN_ZOOM = 5;

        this.state = {
            isOpen: false
        };
        
        this.props.change_loading_modal(true,"מביא חלקות מהשרת...",0);
        this.props.fetch_layers_names();
        this.props.fetch_all_sites(()=>this.props.change_loading_modal(true,"טוען חלקות",20),()=>this.props.hide_loading_modal());
        

        this.toggle = this.toggle.bind(this);
        this.addToZoom = this.addToZoom.bind(this);
        this.chooseLayer = this.chooseLayer.bind(this);        
    }

    addToZoom(num)
    {
        if(this.props.currentZoom + num < this.MAX_ZOOM
            && this.props.currentZoom + num > this.MIN_ZOOM)
            {
                this.props.change_map_zoom(this.props.currentZoom + num);
            }

    }

    chooseLayer(layer_id)
    {

        let is_exist_in_layers = false;
        this.props.layers.forEach(layer =>
        {
            if(layer.Id == layer_id)
            {
                is_exist_in_layers = true;
            }
            
        });

        if(is_exist_in_layers)
            this.props.toggle_select_layer(layer_id);
        else
        {
            this.props.fetch_layer_data(layer_id,()=>this.props.change_loading_modal(true,"מביא שכבה מהשרת...",0),this.props.hide_loading_modal);
        }

    }



    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render_layers_names() {
        return this.props.layersNames.map((layer) => 
        {
            const key = "layer"+layer.ID;
            
            return (
                <div className="manama" key={key}>
                    <DropdownItem>
                        <lable className="switchText">
                            {layer.Name}
                        </lable>
                    </DropdownItem>
                    <label className="switch">
            <input onClick={() => this.chooseLayer(layer.ID) } type="checkbox" /><span className="slider round ">{/*<i className="loadingIcon fa fa-spinner fa-pulse fa-2x fa-fw" />*/}</span>
                    </label>
                </div>

            );
        });
    }

    render_crops_names() {
        return this.props.cropsNames.map((crop) => {
            const key = "crop"+crop.cropId;
            
            return (
                <DropdownItem key = {key}>
                    <lable className="switchText">
                        {crop.cropName}
                    </lable>

                    <label className="switch">
                        <input type="checkbox" /><span className="slider round"></span>
                    </label>
                </DropdownItem>
            );
        });
    }

    render() {
        
        return (
            <div className="centerMapComponent testtest transpaentBlackColors">
                <Navbar dark expand="md">

                    {/* -------Right------- */}
                    {/* <i onClick = {this.onDrawingCircleClick} className="multiPickerButton icon-button navbar-item fa fa-pencil-square-o fa-2x" aria-hidden="true"></i> */}
                    <i onClick = { this.props.toggle_drawing_state  } className="multiPickerButton icon-button navbar-item fa fa-pencil-square-o fa-2x" aria-hidden="true"></i>


                    {/*  -------Middle------- */}
                    <div className="navbar-nav d-md-flex d-block flex-row mx-md-auto mx-0 ">
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret>
                                        <i className="fa fa-map "><strong > שכבות </strong> </i>
                                    </DropdownToggle>
                                    <DropdownMenu right>

                                        {this.render_layers_names()}


                                    </DropdownMenu>
                                </UncontrolledDropdown>

                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret>
                                        <i className="fa fa-leaf "><strong> גידולים </strong></i>
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        {this.render_crops_names()}
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </Nav>
                        </Collapse>
                    </div>

                    {/* -------left------- */}
                    <div className="justify-content-end magnifyMapDiv" id="nav-content">
                    {/* <i onClick = { this.zoomIn_function} className="icon-button zoomInLink navbar-item fa fa-search-plus fa-2x" aria-hidden="true"></i>
                        <i onClick = { this.zoomOut_function} className="icon-button zoomOutLink navbar-item fa fa-search-minus fa-2x" aria-hidden="true"></i> */}
                        <i onClick = { () => this.addToZoom(1)} className="icon-button zoomInLink navbar-item fa fa-search-plus fa-2x" aria-hidden="true"></i>
                        <i onClick = { () => this.addToZoom(-1)} className="icon-button zoomOutLink navbar-item fa fa-search-minus fa-2x" aria-hidden="true"></i>
                    </div>
                </Navbar>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({ change_map_zoom: change_map_zoom,
                                toggle_drawing_state : toggle_drawing_state,
                                fetch_layers_names : fetch_layers_names,
                                fetch_all_sites : fetch_all_sites,
                                fetch_layer_data : fetch_layer_data,
                                toggle_select_layer : toggle_select_layer,
                                change_loading_modal:change_loading_modal,
                                set_loading_modal_progress:set_loading_modal_progress,
                                hide_loading_modal:hide_loading_modal},
                                
                                dispatch);
}

function mapStateToProps(state)
{
    return ({layersNames : state.layersNames,
             layers : state.layers,
             cropsNames : state.cropsNames,
             currentZoom : state.currentZoom,
             selectedLayers : state.selectedLayers
             });
}

export default connect(mapStateToProps,mapDispatchToProps)(HistoryMapNavbar);