import React from 'react';
import { initialAspectFlow } from './data';

import Heading from '../UI/Heading';
import Tile from '../UI/Tile';

import './AspectFlowState.scss';

function FlowList({ getAspectName }) {
	const flowList = initialAspectFlow;

	return (
		<Tile>
			<section className="life-flow__flow-list">
				<Heading>Life Flow</Heading>
				<ul>
					{flowList.map(flowItem => {
						const itemName = getAspectName(flowItem.aspectId);
						return <li key={flowItem.id}>{itemName}</li>;
					})}
				</ul>
			</section>
		</Tile>
	);
}

export default function AspectFlowStateComponent({ getAspectName }) {
	return <FlowList getAspectName={getAspectName} />;
}
