import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { postNewSite, updateSite } from '../../actions/index';
import InputField from '../../components/input_field';

class FormSite extends Component {

    constructor(props) {

        super(props);
        this.state = {
            id: '',
            name: '',
            dunam: '',
            region: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeId = (event) => {
        this.setState({ id: event.target.value });
    }

    handleChangeName = (event) => {
        this.setState({ name: event.target.value });
    }

    handkeChangeDunam = (event) => {
        this.setState({ dunam: event.target.value });
    }

    handkeChangeRegion = (event) => {
        this.setState({ region: event.target.value });
    }

    handleSubmit(event) {

        event.preventDefault();

        const siteToSend = {
            id: this.state.id,
            name: this.state.name,
            dunam: this.state.dunam,
            region: this.state.region
        };

        if (this.props.type === "update") {
            this.props.updateSite(siteToSend);
        }
        else if (this.props.type === "post") {
            this.props.postNewSite(siteToSend);
        }

        this.setState({ id: '' });
        this.setState({ name: '' });
        this.setState({ dunam: '' });
        this.setState({ region: '' });
    }

    render(){

        return(
            <form onSubmit={this.handleSubmit}>
                <InputField labale="ID" value={this.state.id} callbackHandleChange={this.handleChangeId}/>
                <InputField labale="Name" value={this.state.name} callbackHandleChange={this.handleChangeName}/>
                <InputField labale="Dunam" value={this.state.dunam} callbackHandleChange={this.handkeChangeDunam}/>
                <InputField labale="Region" value={this.state.region} callbackHandleChange={this.handkeChangeRegion}/>
                <button type="submit">{this.props.btnTitel}</button>
            </form>
        );
    }
}

function mapDisoatchToProps(dispatch){

    return bindActionCreators({postNewSite: postNewSite, updateSite: updateSite}, dispatch);
}

export default connect(null, mapDisoatchToProps)(FormSite);