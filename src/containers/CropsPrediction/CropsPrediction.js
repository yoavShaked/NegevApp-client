import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { predictCrops } from '../../actions/index';
import { Button, Table, Modal, ModalBody, ModalFooter } from 'reactstrap';
import LoadingModal from '../../components/LoadingModal';
import SiteGoogleMap from '../SitesGoogleMap';

class CropsPrediction extends React.Component {

    constructor(props) {

        super(props);
        this.clickPredictHandler = this
            .clickPredictHandler
            .bind(this);
        this.state = {
            siteID: '',
            showPrediction: false,
            modal: false
        };

        this.toggle = this
            .toggle
            .bind(this);

    }

    clickPredictHandler() {
        this
            .props
            .predictCrops(1);
        this.toggle();
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    renderResultCrops() {
        return this
            .props
            .cropsResults
            .map((crop) => {
                return (
                    <tr key={crop.ID}>
                        <th scope="row"></th>
                        <td>{crop.Name}</td>
                    </tr>
                );
            });
    }

    render() {

        return (
            <div className="predictPage">
                <LoadingModal visibility={true} />
                <SiteGoogleMap />
                <Button onClick={this.clickPredictHandler} color="dark" className="btn-predict">תחזית יבולים</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className="modal-predict-crops-main">
                    <ModalBody>
                        <div className="table-responsive-sm center">
                            <Table className="table-dark table-text-prdict-crops">
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
        predictCrops: predictCrops
    }, dispatch);
}

function mapStateToProps(state) {
    return { cropsResults: state.cropsResults };
}

export default connect(mapStateToProps, mapDispatchToProps)(CropsPrediction);
