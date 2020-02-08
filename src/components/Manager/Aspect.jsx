import React from 'react';
import './Aspect.scss';

import Heading from '../UI/Heading';
import Tile from '../UI/Tile';

// data
import { lifeAspects } from './data';

export default function Aspect({
	AspectFlowState,
	saveAspectFlowState,
	getAspectName,
}) {
	return (
		<Tile>
			<div className="life-flow__aspect-list">
				<Heading>Your life aspects</Heading>
				{/* // Display, add, Aspect Items */}
				<ul>
					{lifeAspects.map(aspect => {
						return <li key={aspect.id}>{aspect.name}</li>;
					})}
				</ul>
			</div>
		</Tile>
	);
}
