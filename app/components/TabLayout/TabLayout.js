import React, { Component, PropTypes} from 'react';

import { Header, Tabs } from '../UI';

class TabLayout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ticking: false,
      initialTabOffset: 0,
      lastTabWidth: 0,
      fixed: false
    }
    
    this.onScroll = this.onScroll.bind(this);
  }

  componentDidMount() {
    this.attachScrollEventToContent();
    //window.addEventListener('scroll', this.onScroll);
    const tabs = this.getTabsNode();
    this.setState({ initialTabOffset: tabs.offsetTop });
  }

  componentWillUnmount() {
    //window.removeEventListener('scroll', this.onScroll);
    this.removeScrollEventFromContent();
  }

  attachScrollEventToContent() {
    const content = this.getContentNode();
    if(content) {
      content.addEventListener('scroll', this.onScroll);
    }
  }

  removeScrollEventFromContent() {
    const content = this.getContentNode();
    if(content) {
      content.removeEventListener('scroll', this.onScroll);
    }
  }

  getContentNode() {
    return this.refs.layout;
  }

  getTabsNode() {
    const { layout } = this.refs;
    const { withActionBar } = this.props;
    if(layout) {
      return layout.querySelector('.tnm-tabs-wrapper');
    }
  }
  
  onScroll(event) {
    
    const { ticking, initialTabOffset, fixed } = this.state;
    var target = event.target;
    if(target) {
      if(!ticking) {
        window.requestAnimationFrame(() => {
          const tabs = this.getTabsNode();
          if(tabs) {
            if(target.scrollTop > initialTabOffset) {
              if(!fixed) {
                this.setState({ fixed: true });
              }
            }
            else {
              if(fixed) {
                this.setState({ fixed: false });
              }
            }
            this.setState({ ticking: false });
          }          
        });
      }

      this.setState({ ticking: true });
    }
  }

  render() {

    const { fixed } = this.state;    
    const { withActionBar, actionBar, currentTab } = this.props;
    
    return (
      <div className="tnm-tab-layout" ref="layout">
        { withActionBar ?
          <div className="tnm-actionbar">
            { actionBar ? <Header text={actionBar.header} /> : null }
            <Tabs items={this.props.tabs}
                  fixed={fixed}
                  currentTab={currentTab}
                  onTabClick={this.props.onTabClick} />
          </div>
           :
          <Tabs items={this.props.tabs}
                fixed={fixed}
                currentTab={currentTab}
                onTabClick={this.props.onTabClick}/>
        }
        <div className="tnm-tab-content">
          {this.props.children}
        </div>
      </div>
    );
  }  
}

export default TabLayout;