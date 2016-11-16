import React, { Component } from 'react';

import TabLayout from './TabLayout';

import { Button,
         Header,
         SlashHeader,
         Label,
         Icon,
         Message,
         Tabs,
         TextField,
         SearchableTextField } from './UI';


class Test extends Component {

  constructor(props) {
    super(props);

    this.onChangeTextField = this.onChangeTextField.bind(this);
    this.onChangeSearchableTextField = this.onChangeSearchableTextField.bind(this);

    this.onClickSimpleButton = this.onClickSimpleButton.bind(this);
  }
  
  onChangeTextField(event) {
    console.log('onChangeTextField: ', event.target.value);
  }

  onChangeSearchableTextField(event) {
    console.log('onChangeSearchableTextField: ', event.target.value);
  }

  onClickSimpleButton(event) {
    alert('Botão simples!');
  }
  
  render() {
    return (
      <div style={{padding: '10px'}}>

        <Header text="HEADERS" />
        <Label text="Simples" />

        <Header text="Simples" />
        <Label text="Slashed"/>
        <SlashHeader text="HOORAY!" num="5"/>
        
        <Header text="LABELS"/>
        <Label text="Label simples"/>

        <span className="space"></span>
        
        <Header text="ÍCONES" />

        <Label text="Simples" />
        <Icon name="search" />

        <span className="space"></span>

        <Header text="INPUTS" />

        <Label text="Entrada de texto" />
        <TextField
            placeholder="TextField"
            onChange={this.onChangeTextField} />

        <span className="space"></span>
        
        <Label text="Entrada de texto com busca" />
        <SearchableTextField
            placeholder="SearchableTextField"
            onChange={this.onChangeSearchableTextField} />

        <span className="space"></span>

        <Header text="BOTÕES" />
        <Label text="Botão simples" />

        <Button text="Botão simples" onClick={this.onClickSimpleButton}/>

        <span className="space"/>
        
        <Header text="TABS" />
        
        <Tabs items={['LICITAÇÕES', 'SEGMENTOS', 'ÓRGÃOS', 'LOCAIS', 'LICITAÇÕES', 'SEGMENTOS', 'ÓRGÃOS', 'LOCAIS']} />


        <span className="space"/>
        
        <Header text="MESSAGES"/>

        <Message type="warning" title="AVISO" message="Mensagem de aviso."/>
        <Message type="error" title="ERRO" message="Mensagem de de erro."/>
        <Message type="success" title="SUCESSO" message="Mensagem de sucesso."/>
        <Message type="info" title="INFORMAÇÂO" message="Mensagem de informação."/>        
        
      </div>
    );
  }
}

export default Test;