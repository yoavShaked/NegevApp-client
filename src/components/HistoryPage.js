import React, { Component } from 'react';
import HistoryMapNavbar from '../containers/HistoryMapNavbar';
import GoogleMap from '../containers/googleMap';
import SelectedSitesTable from '../containers/SelectedSitesTable';
import LoadingModal from './LoadingModal';

export default class HistoryPage extends Component {
    
    constructor(props){
        super(props);

        
    }

    render() {
        return (

            <div className="app-page">
                <LoadingModal visibility = {true} />
                <HistoryMapNavbar />
                <GoogleMap/>
                <SelectedSitesTable/>
            </div>
        );
    }
}
    // apiKey: 'AIzaSyCrDmbP56izyqBLy28WbwYZsnmDaNEszWo'
