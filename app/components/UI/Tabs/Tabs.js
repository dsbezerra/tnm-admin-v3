import React, { Component, PropTypes } from 'react';
import VelocityTransitionGroup from 'velocity-react/velocity-transition-group';

import _ from 'lodash';

import TabArrow from './TabArrow';
import TabItem from './TabItem'; 
import TabIndicator from './TabIndicator';

class Tabs extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentTab: 0,
      leftX: '0px',
      tabsWidth: '0px',
      tabIndicatorWidth: '0px',
      leftArrow: false,
      rightArrow: false,
    }

    this.onWindowResize = this.onWindowResize.bind(this);
    
    this.onLeftClick = this.onLeftClick.bind(this);
    this.onRightClick = this.onRightClick.bind(this);
  }

  componentDidMount() {
    this.updateVisibleTabs();
    this.updateTabIndicator(this.props.currentTab || 0);
    this.updateArrows();
    window.addEventListener('resize', this.onWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize);
  }

  componentWillReceiveProps(nextProps) {
    const { fixed } = this.props;
    if(fixed != nextProps.fixed) {
      this.updateTabsWidth();
      this.updateArrows();
    }

    const { currentTab } = nextProps;
    const prevTab = this.state.currentTab;
    if(currentTab != prevTab) {
      this.setState({
        currentTab: currentTab
      });

      setTimeout(() => {
        this.updateTabIndicator(currentTab);
        this.scrollTo(currentTab);
      });
      
    }
  }

  /**
   * onResize event we need to update arrows
   */
  onWindowResize() {
    this.updateTabsWidth();
    this.updateArrows();
  }

  updateTabsWidth() {
    const { tabsWrapper } = this.refs;
    //tabsWrapper.style.width = tabsWrapper.parentNode.clientWidth + 'px'; 
  }

  updateVisibleTabs() {
    const tabsContainer = this.refs.tabItemList;
    if(tabsContainer) {
      var tabItems = tabsContainer.children;
      if(tabItems) {
        const containerWidth = tabsContainer.clientWidth;

        let fullWidth = 0;
        let averageTabWidth = 0;
        for(let i = 0; i < tabItems.length; ++i) {
          fullWidth += tabItems[i].clientWidth;
        }

        averageTabWidth = fullWidth / tabItems.length;
        let visibleTabs = containerWidth / averageTabWidth;
      }
    }
  }

  /**
   * Updates the TabIndicator leftX and width values 
   */
  updateTabIndicator(index) {
    const { withTabIndicator } = this.props;
    if(!withTabIndicator)
      return;

    if(typeof index === 'undefined')
      index = this.state.currentTab;
    
    const tabs = this.refs.tabItemList;
    if(tabs) {
      const items = tabs.children;
      const newTab = items[index];
      if(newTab) {
        this.setState({
          leftX: newTab.offsetLeft + 'px',
          tabIndicatorWidth: newTab.clientWidth + 'px'
        });
      }
      
    }
  }

  updateArrows() {
    const { leftArrow, rightArrow } = this.state;
    const tabsContainer = this.refs.tabs;
    if(tabsContainer) {
      const scrollLeft = tabsContainer.scrollLeft;
      const scrollWidth = tabsContainer.scrollWidth;
      const offsetWidth = tabsContainer.offsetWidth;

      var leftVisible = false;
      var rightVisible = false;

      rightVisible = scrollLeft + offsetWidth < scrollWidth;
      leftVisible = scrollLeft > 0;

      this.setState({
        leftArrow: leftVisible,
        rightArrow: rightVisible
      });
    }
  }

  /**
   * Sets the current active tab
   */
  setActive(index) {

    this.props.onTabClick && this.props.onTabClick(index);

    this.scrollToTop();
    
    const { items } = this.props;
    if(index >= 0 && index < items.length) {
      this.setState({ currentTab: index });
      this.scrollTo(index); 
    }
  }

  onLeftClick() {
    this.scrollTabs(-40);
  }

  onRightClick() {
    this.scrollTabs(40);
  }

  scrollToTop() {
    const content = document.getElementById('contentInner');
    if(content) {
      content.scrollTop = 0;
    }
  }
  

  /**
   * Scrolls the container by the amount specified
   */
  scrollTabs(amount) {
    const tabsContainer = this.refs.tabs;
    if(tabsContainer) {
      tabsContainer.scrollLeft += amount;
      this.updateArrows();
      setTimeout(() => {
        this.updateTabIndicator();
      }, 0); 
    }
  }

  /**
   * Scrolls to a tab centering the tab in the container?
   */
  scrollTo(index) {
    let tabsContainer = this.refs.tabs;
    if(tabsContainer) {
      const tab = tabsContainer.children[0].children[index];
      if(tab) {
        let scrollLeft = index * tab.clientWidth;
        if(scrollLeft !== 0) {
          scrollLeft = scrollLeft - ((tabsContainer.clientWidth / 2) + tab.clientWidth) / 4;
        }
        tabsContainer.scrollLeft = scrollLeft;        
        setTimeout(() => {
          this.updateArrows();
          this.updateTabIndicator(index);
        }, 0);
      }
      
    }
  }
  
  render() {
    const {
      leftX,
      tabIndicatorWidth,
      leftArrow,
      rightArrow
    } = this.state;
    
    const {
      withTabIndicator,
      items,
      fixed
    } = this.props;

    const tabItems = _.map(items, (item, index) => {
      return (
        <TabItem key={index}
                 active={index === this.state.currentTab}
                 name={item.name}
                 pathname={item.pathname}
                 onClick={this.setActive.bind(this, index)}
        />
      );
    });

    const style = {};

    const arrowAnimationProps = {
      enter: {
        animation: { opacity: 1, scale: 1 },
        duration: 200,
      },
      leave: {
        animation: { opacity: 0, scale: 0 },
        duration: 200,
      },
      style: {
        background: 'transparent',
      }
    }

    const arrowStyle = {
      transform: 'scale(0)',
      opacity: 0,
    }
    
    return (
      <div className={ fixed ? "tnm-tabs-wrapper fixed" : "tnm-tabs-wrapper"} ref="tabsWrapper">
        <div ref="tabs" className="tnm-tabs" style={style}>
          <ul ref="tabItemList">
            {tabItems}
          </ul>
          { withTabIndicator ?
             <TabIndicator leftX={leftX}
                           width={tabIndicatorWidth}
             /> : null }
        </div>

        <VelocityTransitionGroup component="div" {...arrowAnimationProps}>
          { leftArrow ? <TabArrow dir="left" onClick={this.onLeftClick}/> : null }
        </VelocityTransitionGroup>
        
        <VelocityTransitionGroup component="div" {...arrowAnimationProps}>
          { rightArrow ? <TabArrow dir="right" onClick={this.onRightClick}/> : null }
        </VelocityTransitionGroup>
      </div>
    );
  }
}

Tabs.propTypes = {
  withTabIndicator: PropTypes.bool.isRequired,
}

Tabs.defaultProps = {
  withTabIndicator: true,
}

export default Tabs;