import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { dashTabs } from '../../data/tabs';
import { onChangeTopBarTitle } from '../../actions/main';

import * as homeActions from '../../actions/home';

import {
  Header,
  Tabs
} from '../../components/UI';

import HorizontalScroller from '../../components/Scroller/HorizontalScroller';

import Statistic from '../../components/Statistic';
import TabLayout from '../../components/TabLayout';

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentTab: 0
    }
  }

  componentDidMount() {
    const { dispatch, location, onChangePath } = this.props;
    if(dispatch) {
      dispatch(onChangeTopBarTitle('TáNaMão Licitações'));
    }

    onChangePath(location.pathname);
  }

  render() {
    
    const { currentTab } = this.state;
    const { children } = this.props;
    return (
      <TabLayout tabs={dashTabs}
                 currentTab={currentTab}
                 withActionBar={true}>
        {children}
      </TabLayout>
    );
  }
}



Dashboard = connect()(Dashboard);

export default Dashboard;