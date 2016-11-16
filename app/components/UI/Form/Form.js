import React from 'react';

export default function Form(props) {
  const {
    onSubmit
  } = props;

  const formProps = {
    onSubmit
  };
  
  return (
    <form className="tnm-form" {...formProps}>
      {props.children}
    </form>
  );
}