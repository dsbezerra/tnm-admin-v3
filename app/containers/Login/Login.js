import React, { Component } from 'react';

import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { login } from '../../actions/admin';
import * as StorageUtils from '../../utils/StorageUtils';

import {
  Button,
  CheckBox,
  Label,
  Loader,
  TextField
} from '../../components/UI';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      errors: [],
    }

    this.onEnterClick = this.onEnterClick.bind(this);
    this.onRememberMeCheck = this.onRememberMeCheck.bind(this);
  }
  
  onEnterClick(event) {

    event.preventDefault();
    
    const { loginForm } = this.refs;
    if(loginForm) {
      const email = document.getElementById('email');
      const password = document.getElementById('password');

      if(email && password) {  
        const emailValue = email.value.trim();
        const pwdValue = password.value.trim();

        if(emailValue && pwdValue) {
          const { dispatch, router, location } = this.props;
          dispatch(login(emailValue, pwdValue, router));
        }
        else {
          
        }
      }      
    }
    else {
      console.log('Something is very wrong');
    }
  }

  onRememberMeCheck(value) {
    StorageUtils.setItem('rememberMe', value);
  }
  
  render() {

    const { isLogging } = this.props;


   /* if(isLogging) {
      return (
        <div className="tnm-login-wrapper">
          <div className="center">
            <div className="tnm-logo">
              <img src="/assets/images/logo.png" width="400px"/>
            </div>
            <Loader />
          </div>
        </div>
      );
    }
    */

    const style = {
      position: 'relative',
      transform: 'translate(0%, -30%)'
    }

    const logoStyle = isLogging ? style : null;

    const containerLoggingStyle = {
      background: 'transparent',
    };

    const containerStyle = isLogging ? containerLoggingStyle : null;
    
    return (
      <div className="tnm-login-wrapper">
        <div className="tnm-login-container" style={containerStyle}>
          <div className="tnm-logo" style={logoStyle}>  
            <img src="/assets/images/logo.png" width="100%"/>
          </div>

          { !isLogging ?
          <form ref="loginForm" className="tnm-login-form" onSubmit={this.onEnterClick}>

            <div className="login-content">
              <Label text="E-MAIL" />
              <TextField id="email"
                         name="email"
                         className="dark"
              />
              
              <Label text="SENHA" />
              <TextField id="password"
                         name="password"
                         className="dark"
                         password
              />
              <CheckBox text="Mantenha-me conectado" onClick={this.onRememberMeCheck} />
              <Button buttonType="submit" text="ENTRAR" type="dark"/>
            </div>
          </form>
          : <Loader style={{ transform: 'translate(0%, -80%)', position: 'relative'}} /> }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { isLogging } = state.admin;
  return {
    isLogging,
  };
}

Login = connect(mapStateToProps)(Login);

export default withRouter(Login);