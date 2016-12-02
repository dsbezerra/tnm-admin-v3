import React, { Component } from 'react';

import DropdownMenu from '../DropdownMenu';
import Modal from '../Modal';

import {
  CheckBox,
  Divider,
  Label,
  Form,
  Fields,
  Field,
  TextField,
} from '../UI';

const TASK_TYPES = [
  {
    id: 'GET_SESSION',
    text: 'Adquirir Sessão'
  },
  {
    id: 'GET_LINKS',
    text: 'Extrair Links'
  },
  {
    id: 'GET_DETAILS',
    text: 'Extrair Detalhes'
  }
];

const METHOD_TYPES = [
  {
    id: 'GET',
    text: 'GET',
  },
  {
    id: 'POST',
    text: 'POST',
  },
];

const SELECTOR_TYPES = [
  {
    id: 'modality',
    label: 'Modalidade',
    type: 'selector',
  },
  {
    id: 'number',
    label: 'Número',
    type: 'selector',
  },
  {
    id: 'agency',
    label: 'Órgão',
    type: 'selector',
  },
  {
    id: 'description',
    label: 'Objeto',
    type: 'selector',
  },
  {
    id: 'link',
    label: 'Link',
    type: 'selector',
  },
  {
    id: 'openDate',
    label: 'Data de Abertura',
    type: 'selector',
  },
  {
    id: 'publishDate',
    label: 'Data de Publicação',
    type: 'selector',
  },
];

const PATTERN_TYPES = [
  {
    id: 'modality',
    label: 'Modalidade',
    type: 'pattern',
  },
  {
    id: 'number',
    label: 'Número',
    type: 'pattern',
  },
  {
    id: 'agency',
    label: 'Órgão',
    type: 'pattern',
  },
  {
    id: 'description',
    label: 'Objeto',
    type: 'pattern',
  },
  {
    id: 'link',
    label: 'Link',
    type: 'pattern',
  },
  {
    id: 'openDate',
    label: 'Data de Abertura',
    type: 'pattern',
  },
  {
    id: 'publishDate',
    label: 'Data de Publicação',
    type: 'pattern',
  },
];

const DETAILS_SELECTORS = [
  SELECTOR_TYPES[0],
  SELECTOR_TYPES[1],
  SELECTOR_TYPES[2],
  SELECTOR_TYPES[3],
  SELECTOR_TYPES[4],
  SELECTOR_TYPES[5],
];

const DETAILS_PATTERNS = [
  PATTERN_TYPES[0],
  PATTERN_TYPES[1],
  PATTERN_TYPES[2],
  PATTERN_TYPES[3],
  PATTERN_TYPES[4],
  PATTERN_TYPES[5]
];

class NewTask extends Component {

  constructor(props) {
    super(props);
    this.state = {
      task: '',
      options: {
        request: {},
      },
    }

    this.onUpdateTask = this.onUpdateTask.bind(this);
    this.onUpdateOption = this.onUpdateOption.bind(this);
    this.onUpdateUrlField = this.onUpdateUrlField.bind(this);

    this.renderSPItem = this.renderSPItem.bind(this);
  }

  onUpdateTask(newTask) {
    const { task } = this.state;
    if(newTask.id !== task) {
      this.setState({
        task: newTask.id,
        options: {
          request: {},
        },
      });
    }
  }

  onUpdateOption(option, value) {

    const { options } = this.state; 
    
    this.setState({
      options: {
        ...options,
        [option.option]: {
          ...options[option.option],
          [option.attr]: value.id || value,
        }
      }
    });
  }

  onUpdateUrlField({ target }) {
    this.onUpdateOption({
      option: 'request',
      attr: 'uri',
    }, target.value);
  }

  renderRequestOption() {

    const { options } = this.state;
    
    return (
      <div className="option">
        <Divider />
        <div className="itemHeader">
          Requisição
        </div>
        
        <div className="itemValueGroup">
          <div className="itemValue">
            <Label text="URL" />
            <TextField className="dark" onChange={this.onUpdateUrlField}/>
          </div>
          <div className="itemValue">
            <Label text="Método" />
            <DropdownMenu items={METHOD_TYPES}
                          onChange={this.onUpdateOption.bind(this, { option: 'request', attr: 'method' })} />
          </div>
        </div>
      </div>
    );
  }

  renderRequestForm() {

    const { options } = this.state;

    if(options.request.method) {
      if(options.request.method !== 'POST')
        return null;
    }

    return (
      <div className="option">
        <Divider />
        <div className="itemHeader">
          Formulário
        </div>
        
        <div className="itemValueGroup">
          
        </div>
      </div>
    );
  }

  renderContentOptions() {
    return (
      <div className="option">
        <Divider />
        <div className="itemHeader">
          Conteúdo
        </div>
        
        <div className="itemValueGroup">
          <div className="itemValue">
            <CheckBox text="Lista" />
          </div>
          <div className="itemValue">
            <CheckBox text="Paginação" />
          </div>
        </div>
      </div>
    );
  }

  renderSPItem(item, index) {

    let option = 'selectors';
    if(item.type === 'pattern')
      option = 'patterns';
    
    return (
      <div key={index} className="itemValue">
        <Label text={item.label} />
        <TextField className="dark"
                   onChange={({target}) => {
                       this.onUpdateOption({
                         option: option,
                         attr: item.id,
                       }, target.value)
                     }}/>
      </div>
    );
  }
  
  renderSelectorsOptions(selectors) {
    return (
      <div className="option">
        <Divider />
        <div className="itemHeader">
          Seletores
        </div>
        <Divider />
        {_.map(selectors, this.renderSPItem)}
      </div>
    );
  }

  renderPatternsOptions(patterns) {
    return (
      <div className="option">
        <Divider />
        <div className="itemHeader">
          Padrões (Expressões Regulares)
        </div>
        <Divider />
        {_.map(patterns, this.renderSPItem)}
      </div>
    );
  }

  renderOptionsForTask() {

    const { task } = this.state;
    
    switch(task) {
      case 'GET_SESSION':
        return this.renderGetSessionOptions();
      case 'GET_LINKS':
        return this.renderGetLinksOptions();
      case 'GET_DETAILS':
        return this.renderGetDetailsOptions();
      default:
        return <p>Selecione um tipo de tarefa!</p>;
    }
  }

  renderGetSessionOptions() {
    return (
      <div>
        <div className="taskInfo">
          <p>Alguns sites dependem de uma sessão válida para resolver as requisições.</p>
          <p>Então esta tarefa é responsável por primeiro obter os cookies e efetuar a sessão no site.</p>
        </div>
        {this.renderRequestOption()} 
      </div>
    );
  }
  
  renderGetLinksOptions() {
    return (
      <div>
        <div className="taskInfo">
          <p>Esta tarefa é responsável por extrair qualquer link que nos dê os detalhes da licitação.</p>
          <p>Para que funcione é necessário que seja informado os seletores/expressões regulares das principais informações a serem extraídas da página.</p>
        </div>
        {this.renderRequestOption()}
        {this.renderRequestForm()}
        {this.renderContentOptions()}
        {this.renderSelectorsOptions(DETAILS_SELECTORS)}
        {this.renderPatternsOptions(DETAILS_PATTERNS)}
      </div>
    );
  }
  
  renderGetDetailsOptions() {
    return (
      <div>
        <div className="taskInfo">
          <p>Esta tarefa é responsável por extrair os detalhes da licitação.</p>
          <p>Para que funcione é necessário que seja informado os seletores/expressões regulares das principais informações a serem extraídas da página.</p>
        </div>
        {this.renderSelectorsOptions(DETAILS_SELECTORS)}
        {this.renderPatternsOptions(DETAILS_PATTERNS)}
      </div>
    );
  }

  render() {

    const { task } = this.state;
    
    return (
      <Modal className="tnm-scraper-newTask" title="Nova Tarefa">
        <Form>
          <Field>
            <Label text="Tipo" />
            <DropdownMenu items={TASK_TYPES} onChange={this.onUpdateTask} />
          </Field>
          {this.renderOptionsForTask()}
        </Form>
      </Modal>
    );
  }
}

export default NewTask;
