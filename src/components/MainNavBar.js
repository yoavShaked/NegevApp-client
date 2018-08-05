import React, { Component } from 'react';
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


export default class MainNavBar extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (

            <div className="transpaentBlackColors main-navbar" >
                <Navbar dark expand="md">
                    <NavbarBrand href="/Home"><img src="../../Negev4Icon.svg" width="50" height="50" className="d-inline-block align-top" alt="" /></NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />


                    <div className="container">
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/History">היסטוריית חלקות</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#">הכנסת גידולים</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#">ניתוח תכנון קיים</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#">איזורי התכנות</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/DataBase">מסד נתונים</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                    </div>
                </Navbar>
            </div>

        );
    }
}