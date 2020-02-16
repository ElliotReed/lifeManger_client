import React from 'react';

import styles from './history-display.module.scss';

const HistoryDisplay = (props) => {
	return <section className={styles.display}>{props.children}</section>;
}

export default HistoryDisplay;