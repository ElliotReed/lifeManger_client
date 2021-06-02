import React from 'react';
import './Form.module.scss';

const Form = props => {
	const handleSubmit = event => {
		event.preventDefault();
		console.log(`${Array.from(props.children.value)}`);
		props.onSubmit();
	};
	return (
		<form id="Form" onSubmit={handleSubmit}>
			{props.children}
			<input type="submit" name={props.value} value={props.value} />
		</form>
	);
};

export default Form;
