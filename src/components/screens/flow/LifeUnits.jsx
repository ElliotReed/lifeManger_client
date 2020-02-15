import React from 'react';
import moment from 'moment';

import Moment from 'react-moment';

import styles from './LifeUnits.module.scss';

export default function LifeUnits({ lifeUnits }) {
	function getDaysLifeUnits() {
		let days = 3;
		const daysLifeUnits = [];

		for (let i = 0; i < days; i++) {
			let dayToCheck = moment()
				.subtract(i, 'days')
				.startOf('day');
			const oneDaysLifeUnits = lifeUnits.filter(lifeUnit => {
				const completedDate = moment(lifeUnit.date_completed).startOf(
					'day'
				);
				return completedDate.isSame(dayToCheck);
			})[0];

			if (!oneDaysLifeUnits) {
				daysLifeUnits.push({
					units: 0,
					date_completed: dayToCheck.toISOString(),
				});
			} else {
				daysLifeUnits.push(oneDaysLifeUnits);
			}
		}
		return daysLifeUnits;
	}

	function getTotalLifeUnits(lifeUnits) {
		return lifeUnits.reduce((previous, current) => {
			return previous + current.units;
		}, 0);
	}

	return (
		<div className={styles.lifeUnits}>
			<p>
				You have completed{' '}
				<span>
					<b>{getTotalLifeUnits(lifeUnits)}</b>
				</span>{' '}
				life unit
				{lifeUnits.length !== 1 ? 's' : ''}!
			</p>
			<ul>
				{getDaysLifeUnits().map(lifeUnits => {
					return (
						<li key={lifeUnits.date_completed}>
							<b>{lifeUnits.units}</b> completed on
							<span>
								<Moment format="MMMM DD, YYYY">
									{lifeUnits.date_completed}
								</Moment>
							</span>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
