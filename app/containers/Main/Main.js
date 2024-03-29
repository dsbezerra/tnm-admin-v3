import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import VelocityComponent from 'velocity-react/velocity-component';
import VelocityTransitionGroup from 'velocity-react/velocity-transition-group';

import { logout, updateUsername } from '../../actions/admin';
import * as mainActions from '../../actions/main';
import * as StorageUtils from '../../utils/StorageUtils';

import TopBar from '../../components/TopBar';

import Nav from '../../components/Nav';
import NavShadow from '../../components/Nav/NavShadow';

import Footer from '../../components/Footer/Footer';

import Dashboard from '../../containers/Dashboard';

import navMenuItems from '../../data/menu';

import {
  Loader
} from '../../components/UI';

import BlinkingText from '../../components/BlinkingText';

class Main extends Component {

  constructor(props) {
    super(props);

    this.onDocumentClick = this.onDocumentClick.bind(this);
    
    this.onLogout = this.onLogout.bind(this);
    this.onMenuItemClick = this.onMenuItemClick.bind(this);
  }
  
  componentDidMount() {
    const { updateUsername } = this.props;
    const username = StorageUtils.getItem('username');
    if(username && updateUsername) {
      updateUsername(username);
    }
    
    document.addEventListener('click', this.onDocumentClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onDocumentClick);
  }

  onDocumentClick(event) {

    const { target } = event;

    if(target.id !== 'topBarUser') {
      const {
        isUserContextMenuVisible
      } = this.props;

      if(isUserContextMenuVisible) {
        this.props.onToggleAdminContextMenu();
      }
    }    
  }

  onLogout() {
    const { router, logout, isNavbarVisible, onToggleNavbar } = this.props;
    if(router && logout) {
      if(isNavbarVisible)
        onToggleNavbar();
      logout(router);
    }
  }

  onMenuItemClick(item) {
    const {
      onChangePath,
      onToggleNavbar
    } = this.props;

    onChangePath(item.pathname);
    onToggleNavbar();
  }
  
  render() {

    const {
      username,
      activePath,
      topBarTitle,
      isNavbarVisible,
      isLoggingOut,
      isAdminContextMenuVisible,

      onChangePath,
      onToggleNavbar,
      onToggleAdminContextMenu,
    } = this.props;

    // Nav shadow animation
    const shadowAnimationProps = {
      enter: {
        animation: {
          opacity: [1, 0]
        },
        duration: 200,
      },

      leave: {
        animation: {
          opacity: 0
        },
        duration: 300,
      },
    };

    // Main component mount animation
    const mountAnimation = {
      animation: {
        opacity: [1, 0],
      },
      duration: 800,
      runOnMount: true,
    };

    const childProps = {
      activePath,
      onChangePath
    };

    /*const isDesktop = true;
    const style = {
      margin: isDesktop ? '0px 0px 400px 0px'
    }*/
    
    return (

      <VelocityComponent className="app-main" component="div" {...mountAnimation}>
        
        <div className="app-main">

          {isLoggingOut ? <div className="backdrop logout">
          <div style={{ display: 'table-cell', verticalAlign: 'middle'}}>
            <Loader style={{ transform: 'scale(1.6)', marginBottom: '60px' }}/>
            <BlinkingText text="Saindo..." style={{fontSize: '16px'}}/>
          </div>
          
          </div> : null}

          <VelocityTransitionGroup component="div" {...shadowAnimationProps}>
            { isNavbarVisible ?
              <NavShadow onClick={onToggleNavbar}/> : null }
          </VelocityTransitionGroup>
          
          <Nav menuItems={navMenuItems}
               visible={isNavbarVisible}
               active={activePath}
               username={username}
               onLogout={this.onLogout}
               onCloseClick={onToggleNavbar}
               onMenuItemClick={this.onMenuItemClick.bind(this)}
          />

          <TopBar title={topBarTitle}
                  username={username}
                  isAdminContextMenuVisible={isAdminContextMenuVisible}
                  onLogout={this.onLogout}
                  onToggleAdminContextMenu={onToggleAdminContextMenu}
                  onToggleNavbar={onToggleNavbar}
          />
          
          <div className="tnm-content-wrapper">
            <div className="tnm-content">
              <div className="tnm-content-inner" id="contentInner">
                { React.cloneElement(this.props.children || <Dashboard />, childProps) }
              </div>
            </div>
          </div>
        </div>
      </VelocityComponent>
    );
  }
}

const mapStateToProps = (state) => {
  const { main, admin } = state;
  return {
    ...main,
    username: admin.username,
    isLoggingOut: admin.isLoggingOut,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...mainActions,
    updateUsername,
    logout
  }, dispatch);
}

Main = connect(mapStateToProps, mapDispatchToProps)(Main);

export default withRouter(Main);