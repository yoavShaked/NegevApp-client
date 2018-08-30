import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter ,Progress,Container} from 'reactstrap';
import { change_loading_modal } from '../actions';

class LoadingModal extends Component {

    constructor(props)
    {
        super(props);

        this.firstRender = true;
        this.visibility_choise = props.visibility;
    }

    render()
    {
        let is_first_render = this.firstRender;
        if(this.firstRender)
        {
            this.firstRender = false;
        }
        console.log(is_first_render);
        return (

            <Modal isOpen={is_first_render?this.visibility_choise:this.props.loadingModal.visibility}>
                <ModalHeader ><i className="float-left fa fa-spinner fa-spin fa-1x fa-fw"></i>טעינת נתונים</ModalHeader>
                <ModalBody style={{direction : "rtl"}}>
                    <Container>
                        {this.props.loadingModal.context}

                        
                        <Progress striped color="success" value={this.props.loadingModal.progress} />
                    </Container>
                </ModalBody>
            </Modal>
        );
    }
}

function mapStateToProps(state) {
    return {
        loadingModal:state.loadingModal

    }
}

export default connect(mapStateToProps)(LoadingModal);