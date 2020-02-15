import React from 'react';
import styles from './Aspect.module.scss';

import Heading from '../../UI/Heading';
import Tile from '../../UI/Tile';

// data
import { lifeAspects } from './data';

export default function Aspect({
	AspectFlowState,
	saveAspectFlowState,
	getAspectName,
}) {
	return (
		<Tile>
			<div className={styles.aspectList}>
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
