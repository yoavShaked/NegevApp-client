import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchSites, predictCrops } from '../../actions/index';
import { Button, Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './style.css';

class CropsPrediction extends React.Component {

    constructor(props) {

        super(props);
        this.clickPredictHandler = this.clickPredictHandler.bind(this);
        this.state = {
            siteID: '',
            showPrediction: false,
            modal: false
        };
        
        this.toggle = this.toggle.bind(this);
    }

    clickPredictHandler() {
        this.props.predictCrops(1);
        this.toggle();
    }

    componentDidMount() {
        this.props.fetchSites();
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    renderResultCrops() {
        return this.props.cropsResults.map((crop) => {
            return (
                <tr key={crop.ID}>
                    <th scope="row"></th>
                    <td>{crop.Name}</td>
                </tr>
            );
        });
    }

    render() {

        if (!this.props.sites_db) {
            return (
                <div>
                    Loading Sites...
                </div>
            )
        }

        return (
            <div>
                <Button onClick={this.clickPredictHandler} color="dark">תחזית יבולים</Button>
                <Modal 
                    isOpen={this.state.modal}
                    toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>תחזית יבולים לעונה הבאה</ModalHeader>
                    <ModalBody>
                        <div className="table-responsive-md center">
                            <Table hover className="table-dark">
                                <thead>
                                    <tr>
                                        <th scope="col">שם יבול</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderResultCrops()}
                                </tbody>
                            </Table>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggle}>ביטול</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchSites: fetchSites,
        predictCrops: predictCrops
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        sites_db: state.sites_db,
        cropsResults: state.cropsResults
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CropsPrediction);