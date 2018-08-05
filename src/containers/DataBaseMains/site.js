import React, {Component} from 'react';
import {fetchSites} from '../../actions/index';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import DeleteFormSite from '../DeleteForms/site_delete';
import FormSite from '../Forms/site_form';

class Sites extends Component
{
    componentDidMount()
    {
        this.props.fetchSites();
    }

    renderSites()
    {
        return this.props.sites_db.map((site) => {
            return (
                <div>
                    <tr key={site.ID}>
                        <td>{site.ID}</td>
                        <td>{site.Name}</td>
                        <td>{site.Dunam}</td>
                        <td>{site.Region}</td>
                    </tr>
                </div>
            );
        });
    }

    render()
    {
        if(!this.props.sites_db)
        {
            return <div>Loading...</div>;
        }
        return(
            <div>
                <h3>חלקות:</h3>
                <table>
                    <thead>
                        <tr>
                            <th>שם</th>
                            <th>דונם</th>
                            <th>אזור</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderSites()}
                    </tbody>
                </table>
                <div>
                    <FormSite btnTitel="Update Site" type="update"/>
                    <FormSite btnTitel="Post Site" type="post"/>
                    <DeleteFormSite/>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({fetchSites: fetchSites}, dispatch);
}

function mapStateToProps(state)
{
    return {
        sites_db: state.sites_db
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Sites);