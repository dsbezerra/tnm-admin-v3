import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as summaryActions from '../../actions/summary';

import {
  CircularLoader,
  Divider,
  Header,
  Icon,
  Label,
} from '../../components/UI';

import Statistic from '../../components/Statistic';
import HorizontalScroller from '../../components/Scroller/HorizontalScroller';

class Summary extends Component {

  componentDidMount() {
    this.checkIfWeNeedToFetchData();
  }

  checkIfWeNeedToFetchData() {
    const {
      database,
      users,
      plivo,
      fetchDatabaseMetrics,
      fetchUsersMetrics,
      fetchPlivoData,
    } = this.props;

    if(!database.isLoaded) {
      fetchDatabaseMetrics();
    }

    if(!users.isLoaded) {
      fetchUsersMetrics();
    }

    if(!plivo.isLoaded) {
      fetchPlivoData();
    }
  }

  renderDatabaseMetricsSection() {
    const { database } = this.props;


    return (
      <div className="tnm-statistic-section">
        <Label text="BANCO DE DADOS" />
        {
          database.isFetching ?
          <CircularLoader /> :
          <HorizontalScroller>
            <Statistic hoverText="VER TODAS"
                       text="LICITAÇÕES"
                       value={database.numBiddings}
                       pathname="/forms/notice"
            />
            <Statistic hoverText="VER TODOS"
                       text="ÓRGÃOS"
                       value={database.numAgencies}
                       pathname="/forms/agency"
            />
            <Statistic hoverText="VER TODOS"
                       text="SEGMENTOS"
                       value={database.numSegments}
                       pathname="/forms/segment"
            />
            <Statistic hoverText="VER TODOS"
                       text="LOCAIS"
                       value={database.numLocations}
                       pathname="/forms/location"
            />
          </HorizontalScroller>
        }
      </div>
    );
  }
  
  renderUsersMetricsSection() {
    const { users } = this.props;
    
    return (
      <div className="tnm-statistic-section">
        <Label text="USUÁRIOS" />
        {
          users.isFetching ?
          <CircularLoader /> :
          <HorizontalScroller>
            <Statistic hoverText="VER TODOS" text="TOTAL" value={users.total} />
            <Statistic text="TRIAL" value={users.numTrials} />
            <Statistic text="BÁSICO" value={users.numBasics} />
            <Statistic text="PADRÃO" value={users.numDefaults} />
            <Statistic text="PREMIUM" value={users.numPremiums} />
            <Statistic text="HOJE" value={users.numToday} />
          </HorizontalScroller>
        }
      </div>
    );
  }

  renderPlivoStats() {
    const { plivo } = this.props;
    
    return (
      <div className="tnm-statistic-section">
        <Header text="Plivo" />
        {
        plivo.isFetching ?
          <CircularLoader /> :

          <span>
            <ul className="tnm-list plivo">
              <li className="tnm-horizontal-layout flex-row space-between vertical-centered">
                <Label text="Renovação Automática" />
                <div className={"tnm-label" + (plivo.autoRecharge ? ' green' : ' red') }>{plivo.autoRecharge ? 'ATIVADO' : 'DESATIVADO'}</div>
              </li>
              
              <li className="tnm-horizontal-layout flex-row space-between vertical-centered">
                <Label text="Tipo de Conta" />
                <div className={"tnm-label green"}>{plivo.accountType.toUpperCase()}</div>
              </li>
            </ul>
            
            <Statistic hoverText={'IR PARA PLIVO'}
                       text={'CRÉDITOS RESTANTES'}
                       value={'$ ' + plivo.remainingCredits}
                       href="https://manage.plivo.com/dashboard"
            />
          </span>
        }
      </div>
    );
  }
  
  render() {

    const {
      database,
      users,
      plivo,
    } = this.props;
    
    return (
      <div className="tnm-horizontal-layout">
        <div className="tnm-main-content">
          <Header text="Estatísticas" />
          
          <Divider />
          {this.renderDatabaseMetricsSection()}
          
          <Divider />
          {this.renderUsersMetricsSection()}
        
        </div>

        <div className="tnm-right-section">
          {this.renderPlivoStats()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state.summary;
}

const mapDispatchToProps = (dispatch) => {
  const {
    fetchDatabaseMetrics,
    fetchUsersMetrics,
    fetchPlivoData,
  } = summaryActions;

  return bindActionCreators({
    fetchPlivoData,
    fetchUsersMetrics,
    fetchDatabaseMetrics,
  }, dispatch);
}

Summary = connect(mapStateToProps, mapDispatchToProps)(Summary);

export default Summary;