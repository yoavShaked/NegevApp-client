import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/app';
import HomePage from './components/HomePage';
import HistoryPage from './components/HistoryPage';
import DataBasePage from './components/DataBasePage';
import CropsPrediction from './containers/CropsPrediction/CropsPrediction';

export default(
    <Route path="/" component={App} >
        <Route path="Home" component={HomePage} />
        <Route path="History" component={HistoryPage} />
        <Route path="DataBase" component={DataBasePage} />
        <Route path="PredictCrops" component={CropsPrediction} />
    </Route>
);