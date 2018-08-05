import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Route, NavLink, HashRouter, Link } from "react-router-dom";
import { Nav, NavDropdown,  MenuItem} from 'react-bootstrap';
import Crops from '../containers/DataBaseMains/crop';
import Sites from './../containers/DataBaseMains/site';
import Layers from './../containers/DataBaseMains/layer';

export default class DataBasePage extends Component {

    constructor(props) {
        super(props);


    }

    handleSelect = (eventKey) => {
        event.preventDefault();
        alert(`selected ${eventKey}`);
    }

    render() {
        return (

            <div className="database-page">
                <HashRouter>
                    <div>
                        <div className="row">
                            <ul>
                                <div className="col-md-11">
                                    <li>
                                        <NavLink to="/DataBase/crops">יבולים</NavLink>
                                    </li>
                                </div>
                                <div className="col-md-11">
                                    <li>
                                        <NavLink to="/DataBase/layers">שכבות</NavLink>
                                    </li>
                                </div>
                                <div className="col-md-11">
                                    <li>
                                        <NavLink to="/DataBase/sites">חלקות</NavLink>
                                    </li>
                                </div>
                            </ul>
                        </div>
                        <div>
                            <Route path="/DataBase/crops" component={Crops} />
                            <Route path="/DataBase/layers" component={Layers} />
                            <Route path="/DataBase/sites" component={Sites} />
                        </div>
                    </div>
                </HashRouter>
            </div>
        );
    }
}
