import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchSites, predictCrops } from '../../actions/index';

class CropsPrediction extends React.Component {

    constructor(props) {

        super(props);
        this.clickPredictHandler = this.clickPredictHandler.bind(this);
        this.state = {
            siteID: ''
        };
    }

    clickPredictHandler() {
        this.props.predictCrops(this.state.siteID);
    }

    componentDidMount() {
        this.props.fetchSites();
    }

    renderResultCrops() {
        return this.props.cropsResult.map((crop) => {
            return (
                <tr key={crop.ID}>
                    <td>{crop.Name}</td>
                </tr>
            );
        });
    }
    render() {

        if (!this.props.sites_db) {
            return (
                <div>
                    Loading Sites...
                </div>
            )
        }

        return (
            <div>

            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchSites: fetchSites,
        predictCrops: predictCrops
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        sites_db: state.sites_db,
        cropsResult: state.cropsResult
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CropsPrediction);