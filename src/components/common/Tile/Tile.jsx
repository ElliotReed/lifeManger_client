import React from 'react';
import styles from './Tile.module.scss';

export default function Tile(props) {
	return <div className={styles.tile}>{props.children}</div>;
}
