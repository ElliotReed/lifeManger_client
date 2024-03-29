import React from 'react';
import './Button.module.scss';

const Button = props => {
	return (
		<button
			className="btn btn-primary"
			disabled={props.disabled}
			type={props.type}
		>
			{props.children}
		</button>
	);
};

export default Button;
