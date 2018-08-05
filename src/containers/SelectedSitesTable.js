import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { toggle_select_site } from '../actions/index';

import { ButtonGroup, Button,ListGroup, ListGroupItem,Badge } from 'reactstrap';

class SelectedSitesTable extends Component {
    constructor(props) {
        super(props);
        this.render_rows = this.render_rows.bind(this);
        this.onRemoveSiteFromTable = this.onRemoveSiteFromTable.bind(this);
        this.getLayerNameById = this.getLayerNameById.bind(this);
        this.getSitesByYears = this.getSitesByYears.bind(this);
    }

    onRemoveSiteFromTable(site) {
        this.props.toggle_select_site(site);
    }

    getLayerNameById(id)
    {
        let result = null;
        this.props.layersNames.forEach(layer => {
            if(layer.ID == id)
            {
                result =  layer.Name;
            }
        })
        return result;
    }

    render_rows() {
        let the_this = this;
        return this.props.selectedSites.map((selected_site) => {

            const sites_by_years = this.getSitesByYears(selected_site.site.ID);
            if(sites_by_years.length == 0)
            {
                return <div >123</div>
            }
            const key = "selectedSite" + selected_site.site.ID;
            return <tr key={key}>
                <td>

                    <ButtonGroup>
                        <Button onClick={() => selected_site.polygon.zoomIn()} className="table-button"><i className='fa fa-crosshairs' aria-hidden='true' /></Button>
                        <Button onClick={() => this.onRemoveSiteFromTable(selected_site)} className="table-button"><i className='fa fa-minus-square' aria-hidden='true' /></Button>
                        <Button onClick={() => alert("TODO")}className="table-button"><i className='fa fa-info-circle' aria-hidden='true' /></Button>
                    </ButtonGroup>


                </td>
                <td>{selected_site.site.ID}</td>
                <td>{selected_site.site.Name}</td>
                <td>{selected_site.site.Region}</td>
                <td>{selected_site.site.Dunam}</td>
      
                <td>
                <ListGroup>{
                    sites_by_years.map((site_by_year) => {
                    const key = selected_site.site.ID + "GIDUL" + site_by_year.ID;
                    const layerName = the_this.getLayerNameById(site_by_year.LayerID);
                    return <div key={key}><ListGroupItem className=" table-button justify-content-between"><Badge color="success" pill>{layerName}</Badge>{site_by_year.Crop.Name} </ListGroupItem></div>
                    
                    })}
                </ListGroup>
                </td>
            </tr>
        })
    }

    getSitesByYears(site_id)
    {
        let sitesByYears = [];
        this.props.selectedLayers.forEach(layer_id =>{
            let layer = this.props.layers[layer_id];
            
            layer.SitesByYears.forEach(siteByYear =>
            {
                if(siteByYear.SiteID == site_id)
                    sitesByYears.push(siteByYear);
            });
        });

        return sitesByYears;
        
    }


    render() {
        return <div id="siteData" className="pre-scrollable centerMapComponent transpaentBlackColors">
            <table className="sitesDataTable table table-sm">
                <thead>
                    <tr>
                        <th scope="col">אפשרויות</th>
                        <th scope="col">מספר</th>
                        <th scope="col">חלקה</th>
                        <th scope="col">אזור</th>
                        <th scope="col">דונם</th>
                        <th scope="col">גידולים</th>
                    </tr>
                </thead>
                <tbody id='tbodySiteData'>
                    {this.render_rows()}
                </tbody>
            </table>
        </div>;
    }
}



function mapDispatchToProps(dispatch)
{
    return bindActionCreators({ toggle_select_site: toggle_select_site }, dispatch);
}

function mapStateToProps(state) {
    return {
        selectedSites: state.selectedSites,
        layers : state.layers,
        selectedLayers: state.selectedLayers,
        layersNames:state.layersNames
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedSitesTable);
