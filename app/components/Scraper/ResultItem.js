import React from 'react';
import _ from 'lodash';

import {
  formatAmount,
  formatAgency,
  formatDate,
  getModalityName
} from '../../utils/NoticeUtils';

import {
  CircularLoader,
  CheckBox,
  Button,
  Divider,
  Icon,
  SpinnerIcon,
  TextField
} from '../UI';

import DropdownMenu from '../DropdownMenu';
import DropdownMenuItem from '../DropdownMenu/DropdownMenuItem';

function isPDF(download) {
  if(!download)
    return false;

  return download.fileFormat === 'pdf';
}

function renderDownloadInfo(download) {
  
  return (
    <div className="item-group">
      <div className="item-header">Detalhes de Download</div>
      <div className="item">
        <div className="name">
          Nome do Arquivo
        </div>
        <div className="value">
          {download.fileName}
        </div>
      </div>

      <div className="item">
        <div className="name">
          Formato do Arquivo
        </div>
        <div className="value">
          {download.fileFormat.toUpperCase()}
        </div>
      </div>

      <div className="item">
        <div className="name">
          Link de Download
        </div>
        <div className="value">
          <a href={download.uri} target="_blank">
            Baixar Arquivo
          </a>
        </div>
      </div>
      
    </div>
  );
}

function renderAmount(props) {

  const {
    result,
    isChangingAmount,
  } = props;

  if(isChangingAmount) {
    return (
      <div className="value amount">
        <TextField className="dark"
                   onChange={props.onUpdateAmount} />
        <Icon name="check_circle" onClick={props.onChangeAmountConfirm} />
        <Icon name="cancel" onClick={props.onChangeAmountCancel} />
      </div>
    );
  }
  else {
    return (
      <div className="value amount">
        <span>{formatAmount(result.amount)}</span>
        <Icon name="cached" onClick={props.onChangeAmount}/>
      </div>
    );
  }
}

function renderAgency(props) {

  const { result } = props;
  
  return (
    <div className="item">
      <div className="name">
        Órgão
      </div>
      <div className="value">
        {result.agency}
      </div>
    </div>
  );
}

function renderSegment(props) {
  const {
    result,
    segments,
    isChangingSegment,
    isDetectingSegment,
  } = props;

  let component = (
    <div>
      Determinando segmento...
      <SpinnerIcon style={{ display: 'inline-block', marginLeft: '20px' }}/>
    </div>
  );

  if(isChangingSegment) {

    const segmentList = _.map(segments, (segment, i) => {
      return {
        id: segment.id,
        text: segment.descricao,
      }
    });
    
    component = (
      <div className="segment">
        <DropdownMenu items={segmentList}
                      placeholder="Selecione um segmento"
                      onChange={props.onUpdateSegment}
        />
        <Icon name="check_circle" onClick={props.onChangeSegmentConfirm} />
        <Icon name="cancel" onClick={props.onChangeSegmentCancel} />
      </div>
    );
  }
  else if(!isDetectingSegment && !result.segment) {
    component = (
      <Button text="DETECTAR SEGMENTO"
              type="dark"
              onClick={props.onDetectSegment}
      />
    );
  }
  else if(result.segment) {
    component = (
      <div className="segment">
        <span>{result.segment.name}</span>
        <Icon name="cached" onClick={props.onChangeSegment}/>
      </div>
    );
  }
  
  return (
    <div className="item">
      <div className="name">
        Segmento
      </div>
      <div className="value">
        {component}
      </div>
    </div>
  );
}

export default function ResultItem(props) {

  const { result } = props;
  
  return (
    <div className="tnm-scraper-resultItem">

      <div className="header">
        <a href={result.website}
           target="_blank">
          {getModalityName(result.modality) + ' - Nº ' + result.number}
        </a>
        {result.ignored ? <span className="ignored">Ignorado</span> : null}
      </div>

      <Divider />
      
      <div className="item-group">
        <div className="item">
          <div className="name">
            Modalidade
          </div>
          <div className="value">
            {getModalityName(result.modality)}
          </div>
        </div>

        <div className="item">
          <div className="name">
            Número
          </div>
          <div className="value">
            {result.number}
          </div>
        </div>

        <div className="item">
          <div className="name">
            Data de Abertura
          </div>
          <div className="value">
            {formatDate(result.openDate)}
          </div>
        </div>

        <div className="item">
          <div className="name">
            Valor Estimado
          </div>
          {renderAmount(props)}
        </div>
      </div>

      <Divider />

      {renderSegment(props)}

      <Divider />
      
      {renderAgency(props)}

      <Divider />

      <div className="item">
        <div className="name">
          Objeto
        </div>
        <div className="value">
          {result.description}
        </div>
      </div>

      <Divider />

      {renderDownloadInfo(result.converted || result.download)}

      <Divider />

      <CheckBox text="Exclusivo MPE" />

      <div className="buttons">"
        <Button text="APROVAR" type="primary" color="green" onClick={props.onApprove}/>
        { !isPDF(result.converted || result.download) ? <Button text="PROCESSAR ARQUIVO" type="dark" onClick={props.onProcessFile}/> : null }
        <Button text="INSERIR MANUALMENTE" type="dark" color="blue" onClick={props.onManuallyInsert}/>
        {
          !result.ignored ?
          <Button text="IGNORAR" type="secondary" color="red" onClick={props.onIgnore}/>
          : null
        }
      </div>
    </div>
  );
}