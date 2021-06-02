import React from 'react';
import './ErrorMessage.module.scss';

const ErrorMessage = props => {
	return <p id="ErrorMessage">{props.errorMessage}</p>;
};

export default ErrorMessage;
