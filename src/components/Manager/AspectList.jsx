import React from 'react';
import './AspectList.scss';

export default function AspectList({ aspectId, setAspectId, lifeAspects }) {
	const aspectList = lifeAspects.sort((a, b) => {
		a = a.name;
		b = b.name;
		return a > b ? 1 : a < b ? -1 : 0;
	});

	function setAspectPosition(index) {
		const numberOfAspects = aspectList.length;
		const percentOfCircle = (100 / numberOfAspects) * index;
		let x;
		let y;

		if (percentOfCircle < 25) {
			x = percentOfCircle + 50;
			y = percentOfCircle * 2;
		} else if (percentOfCircle < 50) {
			x = percentOfCircle / 2 + 50;
			y = percentOfCircle * 2;
		} else if (percentOfCircle < 75) {
			x = 100 - percentOfCircle;
			y = 150 - percentOfCircle;
		} else if (percentOfCircle < 100) {
			x = percentOfCircle - 50;
			y = percentOfCircle - 50;
		}

		const aspectStyle = {
			top: `${y}%`,
			left: `${x}%`,
			transform: `translate(-50%, -50%)`,
		};
		return aspectStyle;
	}

	return (
		<section className="aspect__list">
			<ul>
				{aspectList.map((aspect, index) => {
					const aspectStyle = setAspectPosition(index);
					return (
						<li
							className={
								aspectId === aspect.id ? 'selected' : null
							}
							key={aspect.id}
							style={aspectStyle}
							onClick={() => setAspectId(aspect.id)}
						>
							<span>{aspect.name}</span>
						</li>
					);
				})}
			</ul>
			{/* <div className="aspect__list--center"></div> */}
		</section>
	);
}
