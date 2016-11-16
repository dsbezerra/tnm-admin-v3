import React, { Component } from 'react';
import VelocityComponent from 'velocity-react/velocity-component';
import VelocityTransitionGroup from 'velocity-react/velocity-transition-group';
import _ from 'lodash';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { showModalWithComponent, closeModal } from '../../../actions/modal';
import * as segmentActions from '../../../actions/segment';

import {
  CircularLoader,
  Divider,
  Grid,
  Header,
  Icon,
  Label,
  List,
  SearchableTextField
} from '../../../components/UI';

import SegmentItem from '../../../components/Segment/SegmentItem';

import DeleteSegment from './DeleteSegment';

class SearchSegment extends Component {

  constructor(props) {
    super(props);
    this.onDeleteConfirm = this.onDeleteConfirm.bind(this);
    this.renderSegment = this.renderSegment.bind(this);
  }
  
  componentDidMount() {
    const { segments, fetchSegments, fetchSegmentsCount } = this.props;
    if(segments && segments.length === 0) {
      fetchSegments({ order: 'descricao ASC' });
      fetchSegmentsCount();
    }
  }

  onEditClick(segment) {
    const { editSegmentSet, router } = this.props;
    if(segment && editSegmentSet && router) {
      editSegmentSet(segment);
      router.push('/forms/segment/edit/' + segment.id);
    }
  }

  onDeleteConfirm(segment) {
    console.log(segment);
    const { closeModal } = this.props;
    closeModal();
  }
  
  onDeleteClick(segment) {
    const { showModalWithComponent, closeModal } = this.props;
    // Show modal with question Are you sure?
    showModalWithComponent(<DeleteSegment segment={segment}
                                           onDeleteConfirm={() => { this.onDeleteConfirm(segment) }}
                                           onCancel={closeModal} />);
  }

  renderSegment(segment, i) {
    
    const cat = {
      id: segment.id,
      name: segment.descricao,
      icon: 'http://tnmlicitacoes.com/' + segment.icon,
      bg: 'http://tnmlicitacoes.com/' + segment.hqdefault
    };
    
    return (
      <SegmentItem key={segment.id}
                    segment={cat}
                    onEditClick={this.onEditClick.bind(this, segment)}
                    onDeleteClick={this.onDeleteClick.bind(this, segment)}
      />
    );
    
  }

  renderSegmentList() {
    const {
      segments,
      filterText,
      viewStyle
    } = this.props;

    let list = segments;
    if(filterText) {
      list = _.filter(segments, (cat) => {
        return cat.descricao.toLowerCase().indexOf(filterText) > -1;
      });
    }
    
    if(list.length === 0) {
      return (
        <Label text="Nenhum segmento encontrado."
               style={{padding: '20px 0px'}}
        />
      );
    }

    const animation = {
      enter: {
        animation: {
          opacity: [1, 0]
        },
        duration: 400,
      },

      leave: {
        animation: {
          opacity: 0,
        },
        duration: 400,
      }
    };

    const singleAnim = {
      animation: {
        opacity: [1, 0],
      },
      duration: 400,
      runOnMount: true,
    };

    return (
      <VelocityTransitionGroup component="div" {...animation}>
        { viewStyle === 'list' ?
          <List>
            {list.map(this.renderSegment)}
          </List>
          :
          <Grid>
            {list.map(this.renderSegment)}
          </Grid>
        }
      </VelocityTransitionGroup>
    );
  }
  
  render() {
    const {
      isFetching,
      viewStyle,      
      onUpdateFilter,
      onUpdateViewStyle,
    } = this.props;

    return (
      <div className="tnm-main-content">
        <Header text="Pesquisar Segmento" />
        <Divider />
        <SearchableTextField placeholder="FILTRAR"
                             className="dark"
                             onChange={({ target }) => { onUpdateFilter(target.value) }}
        />
        
        <div className="tnm-header-actions">
          <div className="tnm-horizontal-layout vertical-centered spaced">
            <Header text="Segmentos" />
            <ul className="tnm-header-actions-list">
              <li className={viewStyle === 'list' ? 'active' : ''}
                  onClick={() => { onUpdateViewStyle('list') }}>
                <Icon name="view_list" />
              </li>
              <li className={viewStyle === 'grid' ? 'active' : ''}
                  onClick={() => { onUpdateViewStyle('grid') }}>
                <Icon name="view_module" />
              </li>
            </ul>
          </div>
          <Divider />
        </div>
        {isFetching ? <CircularLoader size="small" /> : this.renderSegmentList() }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { segment } = state;
  return {
    ...segment.search,
    isFetching: segment.isFetching,
    segments: segment.list,
  }
}

function mapDispatchToProps(dispatch) {
  const {
    fetchSegments,
    fetchSegmentsCount,
    editSegmentSet,
    onUpdateFilter,
    onUpdateViewStyle
  } = segmentActions;

  const actions = {
    fetchSegments,
    fetchSegmentsCount,
    editSegmentSet,
    showModalWithComponent,
    closeModal,
    onUpdateFilter,
    onUpdateViewStyle
  };
  
  return bindActionCreators(actions, dispatch);
}

SearchSegment = connect(mapStateToProps, mapDispatchToProps)(SearchSegment);

export default withRouter(SearchSegment);