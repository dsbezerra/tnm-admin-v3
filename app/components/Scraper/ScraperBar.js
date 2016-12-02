import React from 'react';
import _ from 'lodash';

import VelocityComponent from 'velocity-react/velocity-component';
import VelocityTransitionGroup from 'velocity-react/velocity-transition-group';

import {
  Button,
  Icon,
} from '../UI';

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
  }
};

import { getElapsedTime } from '../../utils/ScraperUtils';

export default function ScraperBar(props) {

  const {
    scraper,
    running,
    isExpanded
  } = props;
  
  let statusClass = 'tnm-scraper-status';

  let isStarting = false,
      isRunning = false,
      isFinished = false;

  if(!_.isEmpty(running)) {
    isStarting = running.isStarting;
    isRunning = running.isRunning;
    isFinished = running.isFinished;
  }
  
  if(isRunning || isStarting) {
    statusClass += ' running';
  }
  else {
    statusClass += ' stopped';
  }

  let clazz = 'tnm-scraper-bar';
  if(isExpanded)
    clazz += ' expanded';
  
  return (
    <div className={clazz}>
      <div className="tnm-scraper-details">
        <div className="tnm-scraper-name">
          {scraper.name}
        </div>
        <div className={statusClass}>
          {isStarting ? 'INICIANDO...' : (isRunning && !isFinished ? 'EM EXECUÇÂO' : 'PARADO')}
        </div>
      </div>

      <div className="tnm-scraper-progress">

        <VelocityTransitionGroup {...itemAnimationProps}>
          { (isRunning || isFinished) && running.stats ?
            <div className="tnm-scraper-elapsedTime">
              {getElapsedTime(running)}
            </div>
            : null
          }
        </VelocityTransitionGroup>
        
        <VelocityTransitionGroup {...itemAnimationProps}>
          { (isRunning || isFinished) && running.stats ?
            <div key={running.stats.message} className="tnm-scraper-routine">
              <div className="tnm-scraper-routine-header">
                ETAPA
              </div>
              <div className="tnm-scraper-routine-description">
                {!isFinished ? running.stats.message : 'Finalizado.'}
              </div>
            </div>
            : null
          }
        </VelocityTransitionGroup>
        
       
        {
          (isRunning || isFinished) && running.stats ?
          <div className="tnm-scraper-stats-notices">
            
            <div className="tnm-scraper-stats-item">
              <div className="tnm-scraper-stats-header">
                ENCONTRADAS
              </div>
              <div className="tnm-scraper-stats-value">
                {running.stats.totalBiddings}
              </div>
            </div>
            
            <div className="tnm-scraper-stats-item">
              <div className="tnm-scraper-stats-header">
                NOVAS
              </div>
              <div className="tnm-scraper-stats-value">
                {running.stats.newBiddings}
              </div>
            </div>
            <div className="tnm-scraper-stats-item">
              <div className="tnm-scraper-stats-header">
                EXTRAÍDAS
              </div>
              <div className="tnm-scraper-stats-value">
                {running.stats.totalExtracted}
              </div>
            </div>
          </div>
          : null
        }
          
      </div>

      { isRunning || isFinished ?
        <Icon className={isExpanded ? 'tnm-expand-icon expanded' : 'tnm-expand-icon'} 
              name="keyboard_arrow_down"
              onClick={props.onExpand}
        /> : null }
        
      <div className="tnm-scraper-buttons">
        
        { isRunning && !isFinished ?
          <div>
            {/* TODO(diego): Enable thid once we have that functionality */}
            {/*<Button type="primary"
                    color="red"
                    text="PARAR"
                    className="stop"
                    onClick={props.onStop}
            />*/}
          </div> :

          <div>
            <Button type="secondary"
                    color="green"
                    text="EXECUTAR"
                    onClick={props.onStart}
            />
            <Button type="secondary"
                    color="blue"
                    text="VER RESULTADOS PENDENTES"
                    onClick={props.onSeePending}
            />
          </div>
        }
      </div>
      
    </div>
  );
}