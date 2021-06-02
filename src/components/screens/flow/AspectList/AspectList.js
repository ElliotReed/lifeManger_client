import styles from './aspect-list.module.scss';

export default function AspectList({ aspectId, setAspectId, aspects }) {

	function setAspectPosition(index) {
		const numberOfAspects = aspects.length;
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
		<section className={styles.list}>
			<ul>
				{aspects.map((aspect, index) => {
					const aspectStyle = setAspectPosition(index);
					return (
						<li
							className={
								aspectId === aspect.id ? styles.selected : null
							}
							key={aspect.id}
							style={aspectStyle}
							onClick={() => setAspectId(aspect.id)}
						>
							<span>{aspect.name} life</span>
						</li>
					);
				})}
			</ul>
		</section>
	);
}
