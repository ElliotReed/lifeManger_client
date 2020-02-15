import React, { useState } from 'react';
import styles from './RecurrenceForm.module.scss';

export default function Recurrence({ form, updateForm }) {
	const prefillRecurrence = recurrence => {
		const days = recurrence / 1000 / 60 / 60 / 24;
		const data = {
			scope: 'day',
			numberOf: 0,
		};

		if (recurrence === 0) {
			return data;
		} else if (days % 365 === 0) {
			data.scope = 'year';
			data.numberOf = days / 365;
		} else if (days % 31 === 0) {
			data.scope = 'month';
			data.numberOf = days / 31;
		} else if (days % 7 === 0) {
			data.scope = 'week';
			data.numberOf = days / 7;
		} else if (days % 1 === 0) {
			data.scope = 'day';
			data.numberOf = days / 1;
		}

		return data;
	};

	const recurrenceTypes = ['year', 'month', 'week', 'day'];
	const [scope, setScope] = useState(
		prefillRecurrence(form.recurrence).scope
	);
	const [numberOf, setNumberOf] = useState(
		prefillRecurrence(form.recurrence).numberOf
	);

	function getRecurrence() {
		const dayMilliseconds = 1000 * 60 * 60 * 24;
		let addTime;

		if (scope === 'year') {
			addTime = numberOf * 365 * dayMilliseconds;
		} else if (scope === 'month') {
			addTime = numberOf * 31 * dayMilliseconds;
		} else if (scope === 'week') {
			addTime = numberOf * 7 * dayMilliseconds;
		} else {
			addTime = numberOf * dayMilliseconds;
		}

		return addTime;
	}

	return (
		<section className={styles.recurrence}>
			<p>Recurrence</p>
			<div className={styles.radioGroup}>
				{recurrenceTypes.map((type, i) => (
					<label className={styles.item} key={i}>
						<input
							type="radio"
							name="recurrence-type"
							value={type}
							onClick={e => {
								setScope(e.target.value);
								e.target.checked = true;
							}}
							defaultChecked={type === scope ? true : false}
						/>
						{type}
					</label>
				))}
			</div>
			<div className={styles.numberOf}>
				<label>
					Recur every
					<input
						type="number"
						name="number-of"
						value={numberOf}
						onChange={e => setNumberOf(e.target.value)}
						min="0"
					/>
					<span>
						{scope}
						{numberOf === 1 ? '' : 's'}
					</span>
				</label>
				<button
					onClick={e => {
						e.target.name = 'recurrence';
						e.target.value = getRecurrence();
						updateForm(e);
					}}
				>
					Set Recurrence
				</button>
			</div>
		</section>
	);
}
