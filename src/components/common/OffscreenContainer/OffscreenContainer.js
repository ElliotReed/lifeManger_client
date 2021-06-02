import React from 'react';
import styles from './offscreen-container.module.scss';

export default function OffscreenContainer({
	isVisible,
	children,
	handleOffscreenContainer,
}) {
	let classNames = styles.offscreenContainer;
	const show = styles.offscreenContainerShow;

	if (isVisible) {
		classNames += ` ${show}`;
	}
	return (
		<div className={classNames}>
			{children}
			<i
				className="material-icons md-48 btn-add"
				onClick={handleOffscreenContainer}
				title="Click to edit."
				data-name="edit"
			>
				create
			</i>
		</div>
	);
}
