import React, { Component } from 'react';

import { withRouter} from 'react-router';
import { connect } from 'react-redux';

import { formsTabs } from '../../data/tabs';
import { onChangeTopBarTitle } from '../../actions/main';

import {
  Header,
  Tabs
} from '../../components/UI';

import TabLayout from '../../components/TabLayout';

class Forms extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentTab: 0
    }
    this.onTabClick = this.onTabClick.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    if(dispatch) {
      dispatch(onChangeTopBarTitle('Formulários'));
    }
    
    /* Use saved here
    const { router } = this.props;
    if(router)
      router.push('/forms/bidding');
    */
    this.updateTabIndex(this.props.location.pathname);
  }

  componentWillReceiveProps(nextProps) {
    const { location } = nextProps;
    const prevLocation = this.props.location;
    if(location.pathname != prevLocation.pathname) {
      this.updateTabIndex(location.pathname);
    }
  }

  getCurrentTabFromPath(pathname) {
    
    if(!pathname)
      pathname = this.props.location.pathname;
    
    if(pathname.indexOf('notice') > -1) {
      return 0;
    }
    else if(pathname.indexOf('segment') > -1) {
      return 1;
    }
    else if(pathname.indexOf('agency') > -1) {
      return 2;
    }
    else if(pathname.indexOf('location') > -1) {
      return 3;
    }
    
    return -1;
  }
  
  onTabClick(index) {
    var path = '/forms';
    
    if(index === 0) {
      path += '/notice';
    }
    else if(index === 1) {
      path += '/segment';
    }
    else if(index === 2) {
      path += '/agency';
    }
    else if(index === 3) {
      path += '/location';
    }

    
    this.updateCurrentTab(index);
    
    const { router } = this.props;
    if(router && path !== '/forms')
      router.push(path);
  }

  updateTabIndex(pathname) {
    const { onChangePath } = this.props;
    const tabIndex = this.getCurrentTabFromPath(pathname);
    if(tabIndex >= 0) {
      onChangePath(pathname);
      this.updateCurrentTab(tabIndex);
    }
  }

  updateCurrentTab(index) {
    this.setState({
      currentTab: index
    });
  }
  
  render() {

    const {
      children,
      location
    } = this.props;

    const { currentTab } = this.state;

    const actionBar = {
      header: 'Formulários',
    }
    
    return (
      <TabLayout tabs={formsTabs}
                 currentTab={currentTab}
                 withActionBar={!!actionBar}
                 actionBar={actionBar}
                 onTabClick={this.onTabClick}
      >
        {children}
      </TabLayout>   
    );
  }
}

Forms = connect()(Forms);

export default withRouter(Forms);