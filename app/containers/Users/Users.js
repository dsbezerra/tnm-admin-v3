import React, { Component } from 'react';
import _ from 'lodash';

import VelocityComponent from 'velocity-react/velocity-component';
import VelocityTransitionGroup from 'velocity-react/velocity-transition-group';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { usersTabs } from '../../data/tabs';
import { onChangeTopBarTitle } from '../../actions/main';
import * as usersActions from '../../actions/user';

import { slideUpFadeIn, slideLeftFadeIn } from '../../animations';

import { toggleSortOrder } from '../../utils/FilterUtils';

import {
  getSubscriptioName,
  getNumStars,
  getPhoneFormatted,
  getSegmentLabels,
} from '../../utils/UserUtils';

import { 
  getFormattedDate
} from '../../utils/DateUtils';

import {
  subscriptions,
  devices,
} from '../../data/dropdown';

import {
  CircularLoader,
  Divider,
  Header,
  Icon,
  Label,
} from '../../components/UI';

import {
  DropdownMenu,
  Filter,
  FilterGroup,
  FilterField,
  FilterButtons,

  TabLayout,
  
  UserCard,
  UserTable,
} from '../../components';

import HorizontalScroller from '../../components/Scroller/HorizontalScroller';
import RightDrawer from '../../components/Drawer/RightDrawer';

class Users extends Component {

  constructor(props) {
    super(props);
    this.state = {
      reset: false,
      currentTab: 0,
    }

    this.onDrawerClose = this.onDrawerClose.bind(this);
    
    this.onApplyFilter = this.onApplyFilter.bind(this);
    this.onClearFilter = this.onClearFilter.bind(this);

    this.onUserTableHeaderClick = this.onUserTableHeaderClick.bind(this);
  }

  componentDidMount() {
    const {
      filter,
      sort,
      limit,
      
      newest,
      fetchNewestUsers,
      
      users,
      fetchUsers,
      
      location,
      onChangePath,
      onChangeTopBarTitle,
    } = this.props;

    if(newest.list && newest.list.length === 0) {
      fetchNewestUsers({
        order: 'activationDate DESC',
        limit: limit
      });
    }
    
    if(users && users.length === 0) {
      fetchUsers({
        order: `${sort.property} ${sort.order}`,
        limit: limit,
        where: {
          ...filter,
        }
      });
    }

    if(onChangeTopBarTitle)
      onChangeTopBarTitle('Usuários');

    if(onChangePath)
      onChangePath(location.pathname);
  }

  componentWillReceiveProps(nextProps) {}

  onDrawerClose() {
    const { onUsersSelectChange } = this.props;
    onUsersSelectChange({});
  }


  /**
   * Triggered when the user clicks in apply changes
   * Perform a request to fetch users with current filters
   */
  onApplyFilter() {
    const {
      sort,
      filter,
      limit,
      fetchUsers
    } = this.props;

    fetchUsers({
      order: `${sort.property} ${sort.order}`,
      limit: limit,
      where: {
        ...filter
      }
    });
  }

  /**
   * Clears the filter object
   */
  onClearFilter() {
    const {
      reset
    } = this.state;
    
    this.setState({
      reset: !reset,
    });

    const { onAllFilterClear } = this.props;
    if(onAllFilterClear) {
      onAllFilterClear();
    }
  }

  /**
   * Changes sort and do a request to fetch users when user changes the sort
   * by clicking in headers of the table
   */
  onUserTableHeaderClick(property) {
    
    if(!property)
      return;

    const {
      sort,
      limit,
      filter,
      fetchUsers,
      onAllSortChange,
    } = this.props;

    let order = sort.property === property ? toggleSortOrder(sort.order) : 'DESC';
    
    onAllSortChange({
      property: property,
      order: order,
    });

    fetchUsers({
      order: `${property} ${order}`,
      limit: limit,
      where: {
        ...filter,
      }
    });
  }

  renderUserDetails() {

    const {
      selected
    } = this.props;
    
    const drawerAnimationProps = {
      component: 'div',
      animation: {
        translateX: !_.isEmpty(selected) ? '0%' : '100%',
        opacity: !_.isEmpty(selected) ? 1 : 0
      },
      duration: 200,
      runOnMount: false,
    };

    const itemAnimationProps = {
      component: 'div',
      enter: {
        animation: {
          opacity: [1, 0],
          translateY: ['0%', '-20%']
        },
        duration: 400,
        delay: 200,
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
      <VelocityComponent {...drawerAnimationProps}>
        <RightDrawer header="Detalhes do Usuário" onDrawerClose={this.onDrawerClose}>
          <Divider />
          <div className="drawer-content">

            <VelocityTransitionGroup {...itemAnimationProps}>
              { !_.isEmpty(selected) ?
                <div className="item-group">
                  <div className="item">
                    <div className="item-header">ID do Usuário</div>
                    <div className="item-value">{selected.id}</div>
                  </div>  
                </div> : null }
            </VelocityTransitionGroup>
            
            <Divider />

            <VelocityTransitionGroup {...itemAnimationProps}>
              { !_.isEmpty(selected) ?
                <div className="item-group">
                  <div className="item">
                    <div className="item-header">Telefone</div>
                    <div className="item-value">{getPhoneFormatted(selected.phone)}</div>
                  </div>
                  
                  <div className="item">
                    <div className="item-header">Plano</div>
                    <div className="item-value">{getSubscriptioName(selected.plano)}</div> 
                  </div>

                  <div className="item">
                    <div className="item-header">Sistema Operacional</div>
                    <div className="item-value">{selected.deviceType ? selected.deviceType : 'Não informado'}</div> 
                  </div>
                  
                  <div className="item">
                    <div className="item-header">Data de Registro</div>
                    <div className="item-value">{getFormattedDate(selected.activationDate)}</div> 
                  </div>
                  
                  <div className="item">
                    <div className="item-header">E-mail</div>
                    <div className="item-value">{selected.email ? selected.email : 'Não informado'}</div> 
                  </div>
                 
                </div>
                : null }
            </VelocityTransitionGroup>
            
            <Divider />

            <VelocityTransitionGroup {...itemAnimationProps}>
              { selected && !_.isEmpty(selected.segmentoIds) ?
                <div className="item">
                  <div className="item-header">Segmentos Escolhidos</div>
                  <div className="item-value">
                    {getSegmentLabels(selected.segmentoIds)}
                  </div>
                </div>
                : null }
            </VelocityTransitionGroup>
          </div>           
          
        </RightDrawer>
      </VelocityComponent>
    );
  }

  /**
   * Renders the filter section
   */
  renderFilter() {

    const { reset } = this.state;

    const {
      limit,
      onAllFilterChange,
      onAllLimitChange,
    } = this.props;

    return (
      <Filter key={reset}>
        <FilterGroup>
          <FilterField>
            <Label text="Mostrar" />
            <DropdownMenu items={[10, 50, 100]}
                          selected={limit + ''}
                          placeholder="Mostrar"
                          onChange={(value) => {
                              onAllLimitChange(value)
                            }}
            />
          </FilterField>
          
          <FilterField>
            <Label text="Plano" />
            <DropdownMenu items={subscriptions}
                          placeholder="Selecione um plano"
                          onChange={(value) => {
                              onAllFilterChange({
                                property: 'plano',
                                value: value.id
                              })
                            }}
            />
          </FilterField>
          <FilterField>
            <Label text="Sistema Operacional" />
            <DropdownMenu items={devices}
                          placeholder="Selecione um sistema"
                          onChange={(value) => {
                              onAllFilterChange({
                                property: 'deviceType',
                                value: value.id
                              })
                            }}
            />
          </FilterField>

          <FilterButtons onApply={this.onApplyFilter}
                         onClear={this.onClearFilter}
          />
        </FilterGroup>
      </Filter>
    );
  }

  /**
   * Renders users table or card view
   */
  renderUsers() {

    const {
      users,
      allViewStyle,
      sort,
      onUsersSelectChange,
      onAllSortChange,
    } = this.props;

    let component;

    if(allViewStyle === 'table') {
      component = (<UserTable users={users}
                              sort={sort}
                              onHeaderClick={this.onUserTableHeaderClick}
                              onItemClick={(user) => { onUsersSelectChange(user) }}
                  />);
    }
    else if (allViewStyle === 'grid') {
      const cards = _.map(users, (user, index) => {
        return (
          <UserCard key={user.id}
                    user={user}
                    onClick={() => { onUsersSelectChange(user) }}
          />
        );
      });

      component = (
        <div>
          {cards}
        </div>
      );
    }


    return (
      <VelocityComponent component="div"
                         {...slideUpFadeIn}
                         duration={300}
                         easing="ease-out"
                         runOnMount>
        {component}
      </VelocityComponent>
    );
    
  }

  /**
   * Render new users section
   */
  renderNewUsersSection() {
    const {
      newest,
      onUsersSelectChange
    } = this.props;

    const style = {
      height: '200px',
      color: '#fff',
    };

    const cards = _.map(newest.list, (user, index) => {
      return (
        <UserCard key={user.id}
                  user={user}
                  onClick={() => { onUsersSelectChange(user) }}
        />
      );
    });
    
    return (
      <div className="tnm-users-new-section">
        {
          newest.isFetching
          ?
          <CircularLoader size="small" />
          :

          <VelocityComponent component="div"
                             {...slideLeftFadeIn}
                             duration={300}
                             easing="ease-out"
                             runOnMount>
            <HorizontalScroller>
              {cards}
            </HorizontalScroller>
          </VelocityComponent>
        }
      </div>
    );
  }

  /**
   * Render all users section
   */
  renderAllUsersSection() {
    const {
      isFetching,
      allViewStyle,
      onAllViewStyleChange,
    } = this.props;
    
    return (
      <div>
        <div className="tnm-header-actions">
          <div className="tnm-horizontal-layout vertical-centered spaced">
            <Header text="Todos" />
            <ul className="tnm-header-actions-list">
              <li className={allViewStyle === 'table' ? 'active' : ''}
                  onClick={() => { onAllViewStyleChange('table') }}>
                <Icon name="view_list" />
              </li>
              <li className={allViewStyle === 'grid' ? 'active' : ''}
                  onClick={() => { onAllViewStyleChange('grid') }}>
                <Icon name="view_module" />
              </li>
            </ul>
          </div>
          <Divider />
        </div>
        
        {isFetching ? <CircularLoader size="small" /> : this.renderUsers() }
         
      </div>
    );
  }

  render() {

    const { currentTab } = this.state;
    
    return (
      <TabLayout tabs={usersTabs}
                 currentTab={currentTab}
                 withActionBar={true}>

        <div className="tnm-horizontal-layout">
          <div className="tnm-main-content">
            <Header text="Novos" />
            <Divider />
            {this.renderNewUsersSection()}

            <Divider />

            {this.renderFilter()}
            {this.renderAllUsersSection()}            
          </div>
        </div>

        {this.renderUserDetails()}
        
      </TabLayout>
    );
  }
}

const mapStateToProps = (state) => {
  const { user } = state;

  return {
    newest: user.newest,
    
    users: user.list,
    numUsers: user.numUsers,
    isFetching: user.isFetching,
    allViewStyle: user.allViewStyle,
    sort: user.sort,
    limit: user.limit,
    filter: user.filter,
    selected: user.selected,
  };
}

const mapDispatchToProps = (dispatch) => {

  const {
    fetchUsers,
    fetchNewestUsers,
    onUsersSelectChange,
    onAllViewStyleChange,
    onAllSortChange,
    onAllFilterChange,
    onAllFilterClear,
    onAllLimitChange,
  } = usersActions;

  const actions = {
    fetchUsers,
    fetchNewestUsers,
    onUsersSelectChange,
    onAllViewStyleChange,
    onAllSortChange,
    onAllFilterChange,
    onAllFilterClear,
    onAllLimitChange,
    onChangeTopBarTitle,
  };

  return bindActionCreators(actions, dispatch);
}

Users = connect(mapStateToProps, mapDispatchToProps)(Users);

export default Users;