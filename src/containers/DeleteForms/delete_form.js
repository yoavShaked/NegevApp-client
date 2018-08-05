import React, { Component } from 'react';
import InputField from '../../components/input_field';

class DeleteForm extends Component {


    constructor(props) {

        super(props);
        this.state = { id: '' };
        this.hendleOnSubmit = this.hendleOnSubmit.bind(this);
    }

    handleChangeID = (event) => {

        this.setState({ id: event.target.value });
    }

    hendleOnSubmit(event) {

        event.preventDefault();
        var id = this.state.id
        this.props.callBackActionCreater(id);
        this.setState({ id: '' });
    }

    render() {

        return (
            <form onSubmit={this.hendleOnSubmit}>
                <div>
                    <InputField labale="ID" value={this.state.id} callbackHandleChange={this.handleChangeID} />
                    <button>{this.props.buttonTitle}</button>
                </div>
            </form>
        );
    }
}

export default DeleteForm;