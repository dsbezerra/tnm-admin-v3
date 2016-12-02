import React, { Component } from 'react';
import VelocityComponent from 'velocity-react/velocity-component';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { showModalWithComponent, closeModal } from '../../actions/modal';

import { slideUpFadeIn } from '../../animations';

import {
  Button,
  CheckBox,
  Divider,
  Form,
  Field,
  Fields,
  Header,
  Label,
  TextArea,
  TextField,
} from '../../components/UI';

import NewTask from '../../components/Scraper/NewTask';

import DropdownMenu from '../../components/DropdownMenu';

class InsertScraper extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // Fetch states
    //const { showModalWithComponent } = this.props;
    //showModalWithComponent(<NewTask />);
  }
  
  render() {
    return (
      <div className="tnm-main-content">
        <Header text="Novo Scraper" />
        <Divider />
        <Form>
          <Label text="Informações Básicas" className="tnm-scraper-new-header"/>
          <Fields>
            <Field>
              <Label text="Estado" />
              <DropdownMenu items={[]}
                            placeholder="Selecione um estado"
                />
            </Field>
            
            <Field>
              <Label text="Cidade" />
              <DropdownMenu items={[]}
                            placeholder="Selecione uma cidade"
                />
            </Field>
            
            <Field>
              <Label text="Nome do Scraper" />
              <TextField id="insertScraperName"
                         placeholder="EX: São Paulo - Convite"
                         className="dark" />
            </Field>
          </Fields>
          
          <Divider />
          
          <Label text="Website" className="tnm-scraper-new-header"/>
          <Fields>
            <Field>
              <Label text="URL" />
              <TextField placeholder="Ex: www.montesclaros.mg.gov.br"
                         className="dark" />
            </Field>
            
            <Field>
              <Label text="Charset/Encoding (opcional)" />
              <TextField placeholder="Ex: ISO-8859-1"
                         className="dark" />
            </Field>
            
            <Field>
              <Label text="Delay entre requisições (ms)" />
              <TextField placeholder="Ex: 1000"
                         className="dark" />
            </Field>
          </Fields>
          
          <Fields>
            <Field>
              <CheckBox text="Tecnologia ASP.NET" />
            </Field>
            
            <Field>
              <CheckBox text="Delay Aleatório" />
            </Field>
          </Fields>
          
          <Divider />
          
          <Label text="Rotina do Scraper" className="tnm-scraper-new-header"/>
          <Field>
            <Button text="Adicionar Tarrefa" className="dark"/>
          </Field>
        </Form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  const actions = {

    showModalWithComponent,
    closeModal,
  };

  return bindActionCreators(actions, dispatch);
}

InsertScraper = connect(null, mapDispatchToProps)(InsertScraper);

export default InsertScraper;