import React, { Component } from 'react';
import { deleteCrop } from '../../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DeleteForm from './delete_form';

class DeleteFormCrop extends Component {

    callBackCropDelete = (id) => {
        this.props.deleteCrop(id);
    }

    render() {

        return (
            <div>
                <DeleteForm callBackActionCreater={this.callBackCropDelete} buttonTitle="Delete Crop"/>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {

    return bindActionCreators({ deleteCrop: deleteCrop }, dispatch);
}

export default connect(null, mapDispatchToProps)(DeleteFormCrop);