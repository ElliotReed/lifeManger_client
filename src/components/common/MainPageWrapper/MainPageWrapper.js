import React from 'react';

import styles from './main-page-wrapper.module.scss';

export default function MainPageWrapper(props) {
	return (
		<div className={styles.mainWrapper}>
			<main>{props.children}</main>
		</div>
	);
}
