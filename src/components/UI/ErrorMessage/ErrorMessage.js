import React from 'react';
import './ErrorMessage.css';

const ErrorMessage = (props) => {
  return <p id="ErrorMessage">{props.errorMessage}</p>
}

export default ErrorMessage;