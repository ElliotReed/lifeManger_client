import React from 'react';
import './ScrollBox.module.scss';

export default function ScrollBox(props) {
	return <div className="scrollbox">{props.children}</div>;
}
