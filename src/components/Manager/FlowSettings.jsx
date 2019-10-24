import React from 'react';

import FlowList from './FlowList';

import './FlowSettings.scss';

export default function FlowSettings({ getAspectName }) {

	// Display, edit, Flow
	return (
			<FlowList getAspectName={getAspectName} />
		// Display, add, Aspect Items
	);
}
