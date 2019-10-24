import React from 'react';
import { initialAspectFlow } from './data';

import Heading from '../UI/Heading';

import './FlowList.scss'

export default function FlowList({getAspectName}) {
	const flowList = initialAspectFlow;

	return (
		<section className="life-flow__flow-list">
			<Heading>Life Flow</Heading>
			<ul>
				{flowList.map(flowItem => {
					const itemName = getAspectName(flowItem.aspectId);
					return <li key={flowItem.id}>{itemName}</li>;
				})}
			</ul>
		</section>
	);
}
