import React, { Component } from 'react';
import _ from 'lodash';

import VelocityComponent from 'velocity-react/velocity-component';
import VelocityTransitionGroup from 'velocity-react/velocity-transition-group';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { onChangeTopBarTitle, onChangePath } from '../../actions/main';
import * as scraperActions from '../../actions/scraper';

import { slideUpFadeIn, slideLeftFadeIn } from '../../animations';

import ScraperItem from '../../components/Scraper/ScraperItem';
import ScraperBar from '../../components/Scraper/ScraperBar';

import {
  CircularLoader,
  Divider,
  Header
} from '../../components/UI';

import HorizontalScroller from '../../components/Scroller/HorizontalScroller';

class Scraper extends Component {

  constructor(props) {
    super(props);
    this.renderScraperItem = this.renderScraperItem.bind(this);

    this.onStart = this.onStart.bind(this);
    this.onStop = this.onStop.bind(this);
  }

  componentDidMount() {
    const {
      last,
      fetchLastRunScrapers,
      
      onChangePath,
      onChangeTopBarTitle,
    } = this.props;

    if(_.isEmpty(last.scrapers)) {
      fetchLastRunScrapers();
    }

    if(onChangeTopBarTitle)
      onChangeTopBarTitle('Scraper');

    if(onChangePath)
      onChangePath(location.pathname);
  }

  componentWillReceiveProps(nextProps) {
    const { selected, running, checkProgress } = this.props;

    if(!_.isEmpty(running) && !_.isEmpty(nextProps.running)) {
      const oldRunningScraper = running[selected._id];
      const newRunningScraper = nextProps.running[selected._id];
      if(oldRunningScraper && newRunningScraper) {
        // If we have now a taskId for the selected scraper
        // begin checkProgress
        if(!oldRunningScraper.taskId && newRunningScraper.taskId) {
          checkProgress({ ...newRunningScraper, _id: selected._id });
        }
      }
      
    }
    
  }

  onSelect(scraper) {
    const { selected, running } = this.props;
    
    if(selected._id === scraper._id)
      return;
    
    const { onSelectChange } = this.props;
    onSelectChange(scraper);
  }

  onSeePending(scraper, event) {
    event.stopPropagation();
  }

  onStart() {    
    const { selected, running, runScraper} = this.props;

    const isSelectedAlreadyRunning = this.checkIfIsRunning(running[selected._id]);
    if(isSelectedAlreadyRunning) {
      alert('Este scraper já está em execução! Por favor aguarde!');
      return;
    }
    
    runScraper(selected); 
  }
  
  onStop() {

    const { running, onScraperStart } = this.props;
    if(!_.isEmpty(running)) {
      //onScraperStart({}); 
    }    
  }

  checkIfIsRunning(scraper) {
    let isRunning = false;

    if(scraper) {
      isRunning = scraper.isRunning || scraper.isStarting;
    }

    return isRunning;
  }

  renderScraperItem(scraperId, index) {
    
    const { last } = this.props;
    const scraper = last.scrapers[scraperId];
    
    return (
      <ScraperItem key={scraper._id}
                   scraper={scraper}
                   onClick={this.onSelect.bind(this, scraper)}
                   onSeePending={this.onSeePending.bind(this, scraper)}
      />
    );
  }

  renderLastScrapers() {

    const { last } = this.props;

    const isFetching = last.isFetching;

    if(isFetching) {
      return <CircularLoader/>;
    }
    else {
      
      return (
        <VelocityComponent component="div"
                           {...slideUpFadeIn}
                           duration={300}
                           easing="ease-out"
                           runOnMount>
          <HorizontalScroller>
            {_.map(last.ids, this.renderScraperItem)}
          </HorizontalScroller>
        </VelocityComponent>
      );
    }    
  }

  render() {

    const {
      selected,
      running,
    } = this.props;
    
    return (
      <div className="tnm-horizontal-layout" style={{marginTop: '50px', padding: '4px'}}>
        <div className="tnm-main-content">
          <Header text="Últimos scrapers executados" />
          <Divider />
          {this.renderLastScrapers()}
        </div>

        { !_.isEmpty(selected) ?
          <VelocityComponent component="div"
                             {...slideUpFadeIn}
                             duration={300}
                             easing="ease-out"
                             runOnMount>
            <ScraperBar scraper={selected}
                        running={running[selected._id]}
                        onSeePending={this.onSeePending.bind(this, selected)}
                        onStart={this.onStart}
                        onStop={this.onStop}
            />
          </VelocityComponent> : null }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { scraper } = state.tools;
  return {
    ...scraper,
  }
}

const mapDispatchToProps = (dispatch) => {

  const {
    fetchLastRunScrapers,
    runScraper,
    checkProgress,
    
    onSelectChange,
  } = scraperActions;

  const actions = {
    fetchLastRunScrapers,
    runScraper,
    checkProgress,
    
    onSelectChange,
    onChangeTopBarTitle,
    onChangePath,
  }
  
  return bindActionCreators(actions, dispatch);
}

Scraper = connect(mapStateToProps, mapDispatchToProps)(Scraper);

export default Scraper;