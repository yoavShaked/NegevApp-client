import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCrops} from '../../actions/index';
import { bindActionCreators } from 'redux';
import FormCrop from '../Forms/crop_form';
import DeleteFormCrop from '../DeleteForms/crop_delete'

class Crops extends Component {


    componentWillMount() {
        this.props.fetchCrops();
    }

    renderCrops() {
        return this.props.crops_db.map((crop) => {

                return (
                    <tr key={crop.ID}>
                        <td>{crop.ID}</td>
                        <td>{crop.Name}</td>
                        <td>{crop.Description}</td>
                        <td>{crop.Quantity}</td>
                    </tr>
                );
            });
    }

    render() {
        if (!this.props.crops_db) {
            return (
                <div>
                    Loading...
                </div>
            );
        }

        return (
            <div>
                <h3>יבולים:</h3>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>מספר זיהוי</th>
                                <th>שם</th>
                                <th>תיאור</th>
                                <th>כמות</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderCrops()}
                        </tbody>
                    </table>
                </div>
                <div>
                    <FormCrop btnTitel="Submit Update" type="update"/>
                    <FormCrop btnTitel="Submit Post" type="post"/>
                    <DeleteFormCrop/>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {

    return bindActionCreators({
        fetchCrops: fetchCrops
    }, dispatch);
}

function mapStateToProps(state) {
    return { crops_db: state.crops_db };
}

export default connect(mapStateToProps, mapDispatchToProps)(Crops);