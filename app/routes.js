import React from 'react';
import { Route, Redirect, IndexRoute } from 'react-router';

import App from './components/App';

import Login from './containers/Login';
import Main from './containers/Main';

import Dashboard from './containers/Dashboard';
import Summary from './containers/Dashboard/Summary';


import Forms from './containers/Forms';
import Notice from './containers/Forms/Notice';

import Segment from './containers/Forms/Segment';
import EditSegment from './containers/Forms/Segment/EditSegment';

import Agency from './containers/Forms/Agency';
import EditAgency from './containers/Forms/Agency/EditAgency';

import Location from './containers/Forms/Location';

import Users from './containers/Users';
import Scraper from './containers/Scraper';

import Test from './components/Test';

export default (
  <Route path="/" component={App}>

    <IndexRoute component={Main} />

    <Redirect from="dashboard" to="dashboard/summary" />
    <Redirect from="forms" to="forms/notice" />

    <Route path="/" component={Main}>

      <Route path="dashboard" component={Dashboard}>
        <Route path="summary" component={Summary} />
      </Route>
      
      <Route path="forms" component={Forms}>
        <Route path="notice"   component={Notice} />
        <Route path="segment" component={Segment}>
          <Route path="edit/:segmentId" component={EditSegment}/>
        </Route>
        <Route path="agency" component={Agency}>
          <Route path="edit/:agencyId" component={EditAgency}/>
        </Route>
        <Route path="location" component={Location} />
      </Route>

      <Route path="users" component={Users} />
      <Route path="scraper" component={Scraper} />
      <Route path="test" component={Test} />
    </Route>
    
    
    <Route path="login" component={Login} />
  </Route>
);


