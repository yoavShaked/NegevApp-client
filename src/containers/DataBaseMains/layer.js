import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchLayers} from '../../actions/index';
import FormLayer from '../Forms/layer_form';
import DeleteFormLayer from './../DeleteForms/layer_delete';

class Layers extends Component{

    componentDidMount()
    {
        this.props.fetchLayers();
    }

    renderLayers()
    {
        return this.props.layers_db.map((layer) => {
            return (
                <tr key={layer.Id}>
                    <td>{layer.Id}</td>
                    <td>{layer.Name}</td>
                    <td>{layer.Year}</td>
                </tr>
            );
        });
    }

    render()
    {
        if(!this.props.layers_db)
        {
            return (
                <div>
                    Loading...
                </div>
            );
        }

        return(
            <div>
                <h3>שכבות:</h3>
                <table>
                    <thead>
                        <tr>
                            <th>מספר זיהוי</th>
                            <th>שנה</th>
                            <th>שם</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderLayers()}
                    </tbody>
                </table>
                <div>
                    <FormLayer btnTitel="Update Layer" type="update"/>
                    <FormLayer btnTitel="Post Layer" type="post"/>
                    <DeleteFormLayer/>
                </div>
            </div>
        );
    }
}

function mapDispatechToProps(dispatch)
{
    return bindActionCreators({fetchLayers: fetchLayers}, dispatch);
}

function mapStateToProps(state)
{
    return {layers_db: state.layers_db};
}

export default connect(mapStateToProps, mapDispatechToProps)(Layers);