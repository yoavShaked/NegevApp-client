import React, { Component } from 'react';
import { updateCrop, postNewCrop } from '../../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import InputField from '../../components/input_field';

class FormCrop extends Component {

    constructor(props) {

        super(props);

        this.state = {
            id: '',
            name: '',
            description: '',
            quantity: ''
        }

        this.hendleSubmit = this.hendleSubmit.bind(this);
    }

    hendleSubmit(event) {

        event.preventDefault();

        var cropToSend = {
            id: this.state.id,
            name: this.state.name,
            description: this.state.description,
            quantity: this.state.quantity
        };

        if (this.props.type === "update") {

            this.props.updateCrop(cropToSend);
        }
        else if (this.props.type === "post") {

            this.props.postNewCrop(cropToSend);
        }

        this.setState({ id: '' });
        this.setState({ name: '' });
        this.setState({ description: '' });
        this.setState({ quantity: '' });
    }

    handleChangeID = (event) =>{

        this.setState({ id: event.target.value });
    }

    handleChangeName = (event) =>{

        this.setState({ name: event.target.value });
    }

    handleChangeDescription = (event) =>{

        this.setState({ description: event.target.value });
    }

    handleChangeQuantity = (event) =>{

        this.setState({ quantity: event.target.value })
    }

    render() {

        return (
            <form onSubmit={this.hendleSubmit}>
                <InputField value={this.state.id} labale="ID" callbackHandleChange={this.handleChangeID} />
                <InputField value={this.state.name} labale="Name" callbackHandleChange={this.handleChangeName} />
                <InputField value={this.state.description} labale="Description" callbackHandleChange={this.handleChangeDescription} />
                <InputField value={this.state.quantity} labale="Quantity" callbackHandleChange={this.handleChangeQuantity} />
                <button type="submit">{this.props.btnTitel}</button>
            </form>
        );
    }
}

function mapDispatchToProps(dispatch) {

    return bindActionCreators({
        updateCrop: updateCrop,
        postNewCrop: postNewCrop
    }, dispatch);
}

export default connect(null, mapDispatchToProps)(FormCrop);