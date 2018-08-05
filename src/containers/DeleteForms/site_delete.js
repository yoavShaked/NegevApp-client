import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteSite } from '../../actions/index';
import DeleteForm from './delete_form';

class DeleteFormSite extends Component {

    callBackSiteDelete = (id) => {

        this.props.deleteSite(id);
    }

    render() {

        return (
            <div>
                <DeleteForm callBackActionCreater={this.callBackSiteDelete} buttonTitle="Delete Site" />
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {

    return bindActionCreators({ deleteSite: deleteSite }, dispatch);
}

export default connect(null, mapDispatchToProps)(DeleteFormSite);