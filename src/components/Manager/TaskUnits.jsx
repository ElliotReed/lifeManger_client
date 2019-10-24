import React from 'react';
import moment from 'moment';

import Moment from 'react-moment';

import './LifeUnits.scss';

export default function LifeUnits({ completedTodos }) {
	const todos = completedTodos();

	function getDaysLifeUnits() {
		let days = 3;
		const lifeUnits = [];

		for (let i = 0; i < days; i++) {
			let dayToCheck = moment()
				.subtract(i, 'days')
				.startOf('day');
			const oneDaysLifeUnits = todos.filter(todo => {
				const completedDate = moment(todo.date_completed).startOf(
					'day'
				);
				return completedDate.isSame(dayToCheck);
			});
			lifeUnits.push({
				lifeUnits: oneDaysLifeUnits.length,
				date: dayToCheck.toISOString(),
			});
		}
		return lifeUnits;
	}

	return (
		<div className="life-units">
			<p>
				You have completed <span><b>{todos.length}</b></span> task
				{todos.length !== 1 ? 's' : ''}!
			</p>
			<ul>
				{getDaysLifeUnits().map(lifeUnits => {
					return (
						<li key={lifeUnits.date}>
							<b>{lifeUnits.lifeUnits}</b> completed on
							<span>
								<Moment format="MMMM DD, YYYY">
									{lifeUnits.date}
								</Moment>
							</span>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
