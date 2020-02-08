import React from 'react';
import './Tile.scss';

export default function Tile(props) {
	return <div className="tile">{props.children}</div>;
}
