import React from 'react';

import Aspect from './Aspect';
import AspectFlowStateComponent from './AspectFlowState';

import './SetFlow.scss';

export default function SetFlow({
	AspectFlowState,
	saveAspectFlowState,
	getAspectName,
}) {
	// Display, edit, Flow
	return (
		<div className="set-flow">
			<Aspect
				AspectFlowState={AspectFlowState}
				saveAspectFlowState={saveAspectFlowState}
				getAspectName={getAspectName}
			/>
			<AspectFlowStateComponent getAspectName={getAspectName} />
		</div>
	);
}
