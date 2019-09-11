import React, { useState } from 'react';
import Moment from 'react-moment';
import 'moment-timezone';

import Heading from '../../UI/Heading';

import './LifeFlow.scss';

const lifeAspects = [
	{ id: 1, name: 'Physical Life' },
	{ id: 3, name: 'Mental Life' },
	{ id: 4, name: 'Domestic Life' },
	{ id: 2, name: 'Developer Life' },
	{ id: 5, name: 'Music Life' },
	{ id: 6, name: 'Career' },
];

const initialAspectFlow = [
	{ id: 1, aspectId: 2, duration: 90, date_completed: new Date(1800) },
	{ id: 2, aspectId: 1, duration: 90, date_completed: new Date(1800) },
	{ id: 3, aspectId: 5, duration: 90, date_completed: new Date(1800) },
	{ id: 4, aspectId: 4, duration: 90, date_completed: new Date(1800) },
	{ id: 5, aspectId: 2, duration: 90, date_completed: new Date(1800) },
	{ id: 6, aspectId: 3, duration: 90, date_completed: new Date(1800) },
	{ id: 7, aspectId: 6, duration: 90, date_completed: new Date(1800) },
];

function getAspectFlow() {
	if (!localStorage.getItem('aspectFlow')) {
		saveAspectFlow(initialAspectFlow);
	}
	return sortAspectFlow(JSON.parse(localStorage.getItem('aspectFlow')));
}

function saveAspectFlow(aspectFlow) {
	localStorage.setItem('aspectFlow', JSON.stringify(aspectFlow));
}

function sortAspectFlow(aspectFlow) {
	return aspectFlow.sort(function(a, b) {
		a = new Date(a.dateCompleted);
		b = new Date(b.dateCompleted);
		return a > b ? -1 : a < b ? 1 : 0;
	});
}

function CurrentFlowAspect(props) {
	const { aspectFlow, setAspectFlow } = props;

	function handleCheckboxChange(e, currentAspect) {
		console.log(`handleCheckboxChange: ${setAspectFlow}`);
		const newArray = aspectFlow.filter(function(aspect) {
			return aspect.id !== currentAspect.id;
		});
		currentAspect.date_completed = Date.now();
		newArray.push(currentAspect);
		setAspectFlow(newArray);
		saveAspectFlow(newArray);
		e.currentTarget.checked = false;
	}

	const currentAspect = sortAspectFlow(aspectFlow)[0];
	return (
		<form className="current-flow-aspect">
			<Heading>Current</Heading>
			<div className="current-flow-aspect__item">
				<h3>{getAspectName(currentAspect.aspectId)}</h3>
				<p>
					<div>
						Duration: <span>{currentAspect.duration}</span> minutes
					</div>
					<div>
						Last Completed:{' '}
						<span>
							<Moment format="MMM, DD, YYYY">
								{currentAspect.date_completed}
							</Moment>
						</span>
					</div>
				</p>
				<div className="current-flow-aspect__item--input">
					<label htmlFor="flow-checkbox"></label>
					<input
						name="flow-checkbox"
						type="checkbox"
						onChange={e => handleCheckboxChange(e, currentAspect)}
					/>
				</div>
			</div>
		</form>
	);
}

function getAspectName(id) {
	const aspectList = lifeAspects;
	const aspect = aspectList.filter(aspect => aspect.id === id)[0];
	return aspect.name;
}

function FlowList() {
	const flowList = initialAspectFlow;

	return (
		<React.Fragment>
			<Heading>Life Flow</Heading>
			<ul>
				{flowList.map(flowItem => {
					const itemName = getAspectName(flowItem.aspectId);
					return <li key={flowItem.id}>{itemName}</li>;
				})}
			</ul>
		</React.Fragment>
	);
}
function AspectList() {
	const aspectList = lifeAspects;

	return (
		<React.Fragment>
			<Heading>Life Aspects</Heading>
			<ul>
				{aspectList.map(aspect => (
					<li key={aspect.id}>{aspect.name}</li>
				))}
			</ul>
		</React.Fragment>
	);
}

export default function LifeFlow() {
	const [aspectFlow, setAspectFlow] = useState(getAspectFlow);

	return (
		<div className="life-flow">
			<Heading>LIfe Flow</Heading>
			<CurrentFlowAspect
				aspectFlow={aspectFlow}
				setAspectFlow={setAspectFlow}
			/>
			<div className="life-flow__lists">
				<FlowList />
				<AspectList />
			</div>
		</div>
	);
}
