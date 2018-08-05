import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateLayer, postLayer } from '../../actions/index';
import InputField from '../../components/input_field';

class FormLayer extends Component {

    constructor(props) {

        super(props);

        this.state = {
            id: '',
            name: '',
            year: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeID = (event) =>{

        this.setState({ id: event.target.value });
    }

    handleChangeName = (event) =>{

        this.setState({ name: event.target.value });
    }

    handleChangeYear = (event) =>{

        this.setState({ year: event.target.value });
    }

    handleSubmit(event){

        event.preventDefault();
        const layerToSend = {id: this.state.id, name: this.state.name, year: this.state.year};

        if(this.props.type === "update"){
            this.props.updateLayer(layerToSend);
        }
        else if(this.props.type === "post"){
            this.props.postLayer(layerToSend);
        }

        this.setState({id:''});
        this.setState({name: ''});
        this.setState({year:''});
    }

    render(){

        return(
            <form onSubmit={this.handleSubmit}>
                <InputField labale="ID" value={this.state.id} callbackHandleChange={this.handleChangeID}/>
                <InputField labale="Name" value={this.state.name} callbackHandleChange={this.handleChangeName}/>
                <InputField labale="Year" value={this.state.year} callbackHandleChange={this.handleChangeYear}/>
                <button type="submit">{this.props.btnTitel}</button>
            </form>
        );
    }
}

function mapDispatchToProps(dispatch){

    return bindActionCreators({postLayer: postLayer,
         updateLayer: updateLayer}, 
        dispatch);
}

export default connect(null, mapDispatchToProps)(FormLayer);