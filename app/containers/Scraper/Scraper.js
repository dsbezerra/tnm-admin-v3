import React, { Component } from 'react';
import _ from 'lodash';

import VelocityComponent from 'velocity-react/velocity-component';
import VelocityTransitionGroup from 'velocity-react/velocity-transition-group';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { onChangeTopBarTitle, onChangePath } from '../../actions/main';
import * as scraperActions from '../../actions/scraper';

import { showModalWithComponent, closeModal } from '../../actions/modal';
import { fetchSegments } from '../../actions/segment';


import { slideUpFadeIn, slideLeftFadeIn } from '../../animations';

import ActionList from '../../components/ActionList';
import ScraperItem from '../../components/Scraper/ScraperItem';
import ResultItem from '../../components/Scraper/ResultItem';
import ScraperBar from '../../components/Scraper/ScraperBar';

import {
  ActionHeader,
  CircularLoader,
  CheckBox,
  Divider,
  Header,
} from '../../components/UI';

import SimplePagination from '../../components/Pagination/SimplePagination';
import HorizontalScroller from '../../components/Scroller/HorizontalScroller';

import InsertScraper from './InsertScraper';
import InsertNotice from '../Forms/Notice/InsertNotice';
import ManuallyModal from './ManuallyModal';

class Scraper extends Component {

  constructor(props) {
    super(props);

    this.renderResultItem = this.renderResultItem.bind(this);
    this.renderScraperItem = this.renderScraperItem.bind(this);

    this.onStart = this.onStart.bind(this);
    this.onStop = this.onStop.bind(this);
  }

  componentDidMount() {
    const {
      last,
      segments,
      fetchSegments,
      fetchLastRunScrapers,
      
      onChangePath,
      onChangeTopBarTitle,
    } = this.props;

    if(_.isEmpty(last.scrapers) && fetchLastRunScrapers) {
      fetchLastRunScrapers();
    }

    if(onChangeTopBarTitle)
      onChangeTopBarTitle('Scraper');

    if(onChangePath)
      onChangePath(location.pathname);

    if(segments.length === 0 && fetchSegments) {
      fetchSegments({
        order: 'descricao ASC'
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { selected, running, checkProgress } = this.props;

    if(!_.isEmpty(running) && !_.isEmpty(nextProps.running)) {
      const oldRunningScraper = running[selected._id];
      const newRunningScraper = nextProps.running[selected._id];
      if(oldRunningScraper && newRunningScraper) {
        // If we have now a taskId for the selected scraper
        // begin checkProgress
        if(!oldRunningScraper.taskId && newRunningScraper.taskId && checkProgress) {
          checkProgress({ ...newRunningScraper, _id: selected._id });
        }
      } 
    }
  }

  onSelect(scraper) {
    const {
      selected,
      isBarVisible,
      onToggleBarVisibility,
    } = this.props;

    if(!isBarVisible && onToggleBarVisibility)
      onToggleBarVisibility();
    
    if(selected._id === scraper._id)
      return;
    
    const { onSelectChange } = this.props;
    if(onSelectChange) {
      onSelectChange(scraper);
    }
  }

  onSeePending(scraper, event) {
    event.stopPropagation();

    const {
      fetchPendingResults,
      onSelectChange
    } = this.props;

    if(fetchPendingResults && onSelectChange) {
      fetchPendingResults(scraper._id);
      onSelectChange(scraper);
    }
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
    //
    // TODO(diego): Implement this once we have resume/stop functionallity in
    // scraper code
    //
    //const {
    //  running,
    //  onScraperStart
    //} = this.props;
    //
    //if(!_.isEmpty(running)) {
    //  onScraperStart({}); 
    //}
  }

  onApprove(result, index) {
    //
    // TODO(diego): Check if is valid then show modal to confirm insertion
    //
    console.log('onApprove: ' + result._id);
  }

  onIgnore(result, index) {
    //
    // TODO(diego): Show modal to confirm ignore, then handle answers
    //
    const { onUpdateIgnore } = this.props;
    if(onUpdateIgnore) {      
      onUpdateIgnore({
        ...result,
        ignored: true,
      });
    }
  }

  onManuallyInsert(result) {
    //
    // TODO(diego): Show modal with InsertNotice component filled
    //
    console.log('onManuallyInsert: ' + result._id);
    const { showModalWithComponent, closeModal } = this.props;
    showModalWithComponent(<ManuallyModal result={result}
                                          onCancel={closeModal}/>);
  }

  onProcessFile(result) {
    //
    // TODO(diego): Show process file component in a modal
    //
    console.log('onProcessFile: ' + result._id);
  }

  onChangeAmount(result) {
    const { onChangeAmount } = this.props;
    if(onChangeAmount && result) {
      onChangeAmount(result);
    }
  }

  onChangeAmountConfirm(result) {
    const {
      results,
      onChangeAmountConfirm
    } = this.props;

    const amount = parseInt(results.changedAmounts[result._id]);
    if(!amount) {
      // For now
      return;
    }

    if(onChangeAmountConfirm) {
      onChangeAmountConfirm({
        resultId: result._id,
        amount,
      });
    }
  }

  onChangeAmountCancel(result) {
    const { onChangeAmountCancel } = this.props;
    if(onChangeAmountCancel && result) {
      onChangeAmountCancel(result);
    }
  }

  onChangeSegment(result) {
    const { onChangeSegment } = this.props;
    if(onChangeSegment && result) {
      onChangeSegment(result);
    }
  }

  onChangeSegmentConfirm(result) {
    const {
      results,
      onChangeSegmentConfirm
    } = this.props;

    const segment = results.changedSegments[result._id];
    if(!segment) {
      // For now
      return;
    }

    onChangeSegmentConfirm({
      resultId: result._id,
      segment: {
        id: segment.id,
        name: segment.text,
      },
    });
  }

  onChangeSegmentCancel(result) {
    const { onChangeSegmentCancel } = this.props;
    if(result && onChangeSegmentCancel) {
      onChangeSegmentCancel(result);
    }
  }

  onDetectSegment(result) {
    const { detectSegment } = this.props;
    if(detectSegment && result) {
      detectSegment(result);
    }
  }

  checkIfIsRunning(scraper) {
    let isRunning = false;

    if(scraper) {
      isRunning = scraper.isRunning || scraper.isStarting;
    }

    return isRunning;
  }

  renderResultItem(result, index) {

    const {
      results,
      segments,

      onUpdateAmount,
      onUpdateSegment
    } = this.props;

    const changingAmount = results.changingAmount;
    const changingSegment = results.changingSegment;
    const detectingSegment = results.detectingSegment;
    const processingFile = results.processingFile;

    const isChangingAmount   = _.indexOf(changingAmount,   result._id) > -1;
    const isChangingSegment  = _.indexOf(changingSegment,  result._id) > -1;
    const isDetectingSegment = _.indexOf(detectingSegment, result._id) > -1;
    const isProcessingFile   = _.indexOf(processingFile,   result._id) > -1;

    return (
      <ResultItem key={result._id}
                  result={result}
                  segments={segments}
                  isChangingAmount={isChangingAmount}
                  isChangingSegment={isChangingSegment}
                  isDetectingSegment={isDetectingSegment}
                  isProcessingFile={isProcessingFile}
                  onApprove={this.onApprove.bind(this, result, index)}
                  onIgnore={this.onIgnore.bind(this, result, index)}
                  onManuallyInsert={this.onManuallyInsert.bind(this, result)}
                  onProcessFile={this.onProcessFile.bind(this, result)}
                  onChangeAmount={this.onChangeAmount.bind(this, result)}
                  onChangeAmountConfirm={this.onChangeAmountConfirm.bind(this, result)}
                  onChangeAmountCancel={this.onChangeAmountCancel.bind(this, result)}
                  onChangeSegment={this.onChangeSegment.bind(this, result)}
                  onChangeSegmentConfirm={this.onChangeSegmentConfirm.bind(this, result)}
                  onChangeSegmentCancel={this.onChangeSegmentCancel.bind(this, result)}
                  onDetectSegment={this.onDetectSegment.bind(this, result)}
                  onUpdateAmount={({ target }) => { onUpdateAmount({ resultId: result._id, amount: target.value })}}
                  onUpdateSegment={(value) => { onUpdateSegment({ resultId: result._id, segment: value })}}
      />
    );
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
          <HorizontalScroller className="tnm-scrapers-last-wrapper">
            {_.map(last.ids, this.renderScraperItem)}
          </HorizontalScroller>
        </VelocityComponent>
      );
    }    
  }

  renderResults() {
    const {
      selected,
      results,
      onShowIgnoreChange,
    } = this.props;

    const { pagination } = results;

    if(results.isFetching) {
      return <CircularLoader/>;
    }
    else {
      return (
        <div>
          { _.isEmpty(selected) ? 
            <div className="tnm-scraper-notSelectedText">
              <p>Selecione um scraper para ver resultados pendentes.</p>
            </div>
            :

            <VelocityComponent component="div"
                               {...slideUpFadeIn}
                               duration={300}
                               easing="ease-out"
                               runOnMount>
              <div>
                <CheckBox text="Mostrar ignorados"
                          checked={results.showIgnored}
                          onClick={(value) => { onShowIgnoreChange(value) }}
                />
                {this.renderPaginateResults()}
              </div>
            </VelocityComponent>
          }
        </div>
      );
    }
  }

  /**
   * Calculates the start and end indexes
   * to be used when iterating over the paginated results list
   * Example:
   * If I am in page 2, and resultsPerPage equals 25
   * start index must be 50
   * end index must be start + resultsPerPage so 75
   * This way I will have results for page 2
   */
  calculateStartAndEndIndexes(list, pagination) {
    const indexes = {
      start: 0,
      end: 0,
    };

    indexes.start = pagination.current * pagination.resultsPerPage;
    indexes.end = indexes.start + pagination.resultsPerPage;

    // Avoid end index being greather than list
    if(indexes.end > list.length)
      indexes.end = list.length;

    return indexes;
  }

  /**
   * Get only results in the range given by indexes
   * 
   */
  getResultsInRange(list, indexes) {
    const children = [];    

    for(let i = indexes.start;
        i < indexes.end;
        ++i)
    {
      const result = list[i];
      children.push(this.renderResultItem(result, i));
    }

    return children;
  }

  renderPaginateResults() {
    const {
      results,
      onChangePage,
    } = this.props;

    const filteredList = _.filter(results.list, (result, index) => {
      return !result.ignored || results.showIgnored;
    })

    const { pagination } = results;
    const indexes = this.calculateStartAndEndIndexes(filteredList,pagination);
    const resultsInRange = this.getResultsInRange(filteredList, indexes);

    if(resultsInRange.length === 0) {
      return (
        <div className="tnm-scraper-noResults">
          <p>Sem resultados pendentes.</p>
        </div>
      );
    }
    
    const itemAnimationProps = {
      component: 'div',
      enter: {
        animation: {
          opacity: [1, 0],
          translateY: ['0%', '-20%']
        },
        duration: 200,
        easing: 'ease-in-out',
      },
      leave: {
        animation: {
          opacity: 0,
        },
        duration: 200,
        easing: 'ease-in-out',
      }
    };
    
    return (
      <div>
        {resultsInRange}
        <SimplePagination currentPage={pagination.current}
                          totalItems={filteredList.length}
                          itemsPerPage={pagination.resultsPerPage}
                          onNext={() => { onChangePage(1)}}
                          onPrevious={() => { onChangePage(-1)}}
        />
      </div>
    );
  }

  render() {

    const {
      action,
      selected,
      running,

      isBarVisible,
      isBarExpanded,

      isModalVisible,

      onUpdateAction,
      onToggleBarExpand,
    } = this.props;

    const actions = [
      { id: 'scrapers', text: 'Scrapers', icon: 'gavel' },
      { id: 'insert', text: 'Novo Scraper', icon: 'add' },
    ];

    const viewStyles = [
      /*{
        id: 'table',
        icon: 'view_list',
      },
      {
        id: 'detailed',
        icon: 'view_stream'
      }*/
    ];
    
    return (
      <div className="tnm-horizontal-layout" style={{marginTop: '50px', padding: '15px'}}>

        { action === 'insert' ?
          <InsertScraper /> :
          <div className="tnm-main-content">
            <Header text="Scrapers" />
            <Divider />
            
            {this.renderLastScrapers()}
            
            { !_.isEmpty(selected) ?
              <VelocityComponent component="div"
                                 {...slideUpFadeIn}
                                 duration={300}
                                 easing="ease-out"
                                 runOnMount>
                <div>
                  <Header text={selected.name} />
                  <Divider />
                  <ScraperBar scraper={selected}
                              running={running[selected._id]}
                              isExpanded={isBarExpanded}
                              onSeePending={this.onSeePending.bind(this, selected)}
                              onStart={this.onStart}
                              onStop={this.onStop}
                              onExpand={() => { onToggleBarExpand() }}
                  />

                  <ActionHeader header="Resultados"
                                viewStyles={viewStyles}
                  />
                  
                  {this.renderResults()}
                </div>
              </VelocityComponent> :
              <div className="tnm-scraper-notSelectedText">
                <p>Selecione um Scraper para começar.</p>
              </div>
            }
                        
          </div> }
          <div>
            <ActionList actions={actions}
                        active={action}
                        onClick={action => onUpdateAction(action.id)}/>
          </div>
        
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { scraper } = state.tools;
  return {
    ...scraper,
    segments: state.segment.list,
  }
}

const mapDispatchToProps = (dispatch) => {
  
  const {
    fetchLastRunScrapers,
    fetchPendingResults,
    runScraper,
    checkProgress,
    detectSegment,

    onSelectChange,
    onShowIgnoreChange,

    onChangeAmount,
    onUpdateAmount,
    onChangeAmountConfirm,
    onChangeAmountCancel,
    
    onChangeSegment,
    onUpdateSegment,
    onChangeSegmentConfirm,
    onChangeSegmentCancel,

    onUpdateIgnore,

    onUpdateAction,
    onChangePage,
    onToggleBarVisibility,
    onToggleBarExpand,
    
  } = scraperActions;

  const actions = {
    fetchSegments,
    fetchLastRunScrapers,
    fetchPendingResults,
    runScraper,
    checkProgress,
    detectSegment,

    onSelectChange,
    onShowIgnoreChange,

    onChangeAmount,
    onUpdateAmount,
    onChangeAmountConfirm,
    onChangeAmountCancel,
    
    onChangeSegment,
    onUpdateSegment,
    onChangeSegmentConfirm,
    onChangeSegmentCancel,

    onUpdateIgnore,

    onUpdateAction,
    onChangePage,
    onToggleBarVisibility,
    onToggleBarExpand,

    onChangeTopBarTitle,
    onChangePath,

    showModalWithComponent,
    closeModal,
  }
  
  return bindActionCreators(actions, dispatch);
}

Scraper = connect(mapStateToProps, mapDispatchToProps)(Scraper);

export default Scraper;