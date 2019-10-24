import React from 'react';
import './OffscreenContainer.css';

function OffscreenContainer({ isVisible, children, handleOffscreenContainer }) {
	let classNames = 'offscreen-container';
	const show = 'offscreen-container-show';

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

export default OffscreenContainer;
