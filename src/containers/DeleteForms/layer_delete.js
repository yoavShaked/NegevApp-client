import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {deleteLayer} from '../../actions/index';
import DeleteForm from '../DeleteForms/delete_form';

class DeleteFormLayer extends Component{

    callBackLayerDelete = (id) => {
        this.props.deleteLayer(id);
    }

    render(){

        return(
            <div>
                <DeleteForm callBackActionCreater={this.callBackLayerDelete} buttonTitle="Delete Layer"/>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({deleteLayer: deleteLayer}, dispatch);
}

export default connect(null, mapDispatchToProps)(DeleteFormLayer);