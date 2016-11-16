import React, { Component } from 'react';
import VelocityTransitionGroup from 'velocity-react/velocity-transition-group';

import { withRouter } from 'react-router';

import NavDivider from './NavDivider';
import NavLogo from './NavLogo';
import NavMenu from './NavMenu';
import NavMenuItem from './NavMenuItem';
import NavBottom from './NavBottom';

import NavShadow from './NavShadow';

import VerticalScroller from '../Scroller/VerticalScroller';

class Nav extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      expanded: false,
    }

    this.onLogout = this.onLogout.bind(this);

    // Events
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  componentDidMount() {
    this.updateActive();
  }

  componentWillUnmount() {
    
  }

  onLogout() {
    console.log('Logout');
  }

  //
  // Updates the current active menu
  // using react router isActive method
  //
  updateActive() {
    const { router } = this.props;

    let activeIndex = 0;
    if(router.isActive('forms')) {
      activeIndex = 1;
    }
    else if(router.isActive('users')) {
      activeIndex = 2;
    }
    else if(router.isActive('scraper')) {
      activeIndex = 3;
    }
    
    this.setState({
      activeIndex: activeIndex
    });
  }

  //
  // Navigates to another route and
  // sets the active menu item
  //
  navigateTo(index, path) {
    this.setState({
      activeIndex: index,
    });

    this.props.router.push(path);
  }

  toggleExpanded() {
    let { expanded } = this.state;
    this.setState({ expanded: !expanded });
  }

  //
  // Events handlers
  //
  onMouseEnter(event) {
    this.toggleExpanded();
  }

  onMouseLeave(event) {
    this.toggleExpanded();
  }

  //
  // Render functions
  //
  renderShadow() {
    const { expanded } = this.state;
    const shadowAnimationProps = {
      enter: {
        animation: { opacity: 0.3 },
        duration: 500,
        easing: 'ease',
      },
      leave: {
        animation: { opacity: 0 },
        duration: 300,
        easing: 'ease',
      },
      style: {
        position: 'fixed',
        width: '100%',
        height: '100%',
        zIndex: '-1',
        pointerEvents: 'none'
      }
    }

    return (
      <VelocityTransitionGroup {...shadowAnimationProps}>
        { expanded ? <NavShadow /> : null }
      </VelocityTransitionGroup>
    );
  }
  
  render() {

    const {
      activeIndex,
      expanded
    } = this.state;
    
    return (
      <nav onMouseEnter={this.onMouseEnter}
           onMouseLeave={this.onMouseLeave}>
        <NavLogo />
        <NavDivider />
        <VerticalScroller className="tnm-nav-inner">
          <NavMenu>
            <NavMenuItem icon="dashboard"
                         text="Início"
                         active={activeIndex === 0}
                         onClick={this.navigateTo.bind(this, 0, '/')}
            />
            <NavMenuItem icon="forms"
                         text="Formulários"
                         active={activeIndex === 1}
                         onClick={this.navigateTo.bind(this, 1, 'forms')}
            />
            <NavMenuItem icon="users"
                         text="Usuários"
                         active={activeIndex === 2}
                         onClick={this.navigateTo.bind(this, 2, 'users')}
            />
            <NavMenuItem icon="scraper"
                         text="Scrapers"
                         active={activeIndex === 3}
                         onClick={this.navigateTo.bind(this, 3, 'scraper')}
            />
          </NavMenu>
        </VerticalScroller>

        <NavBottom onLogoutClick={this.onLogout} />
        {this.renderShadow()}
        
      </nav>
    );
  }
}

export default withRouter(Nav);