import React from 'react';
import './Heading.scss';

const Heading = props => (
	<div className="heading">
		<h4>{props.children}</h4>
	</div>
);

export default Heading;
