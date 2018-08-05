import React, { Component } from 'react';

class InputField extends Component{

    render(){

        return(
            <div>
                <label>{this.props.labale}</label>
                <input type="text"
                value={this.props.value}
                onChange={this.props.callbackHandleChange}/>
            </div>
        );
    }
}

export default InputField;