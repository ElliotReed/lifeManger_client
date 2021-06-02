import React, { useState } from 'react';
// import classnames from 'classnames';
import Moment from 'react-moment';
import 'moment-timezone';

import Heading from '../UI/Heading';
import Button from '../UI/Button';

import './Aspect.scss';

const lifeAspects = [
	{ id: 1, name: 'Physical Life' },
	{ id: 3, name: 'Mental Life' },
	{ id: 4, name: 'Domestic Life' },
	{ id: 2, name: 'Developer Life' },
	{ id: 5, name: 'Music Life' },
	{ id: 6, name: 'Work Life' },
];

function getTodos() {
	if (!localStorage.getItem('todos')) {
		return [];
	} else {
		const todos = JSON.parse(localStorage.getItem('todos'));
		if (!todos.length > 1) {
			return todos;
		} else {
			return sortTodos(todos);
		}
	}
}

function storeTodos(todos) {
	localStorage.setItem('todos', JSON.stringify(todos));
}

function sortTodos(todos) {
	return todos
		.sort(function(a, b) {
			a = new Date(a.dateDue);
			b = new Date(b.dateDue);
			return a > b ? 1 : a < b ? -1 : 0;
		})
		.sort((a, b) => {
			return a.completed === b.completed ? 0 : a.completed ? 1 : -1;
		});
}

function getAspectName(id) {
	const aspectList = lifeAspects;
	const aspect = aspectList.filter(aspect => aspect.id === id)[0];
	return aspect.name;
}

function AspectList({ aspectId, setAspectId }) {
	const aspectList = lifeAspects.sort((a, b) => {
		a = a.name;
		b = b.name;
		return a > b ? 1 : a < b ? -1 : 0;
	});

	function setAspectPosition(index) {
		const size = 180;
		const center = size / 2;
		const numberOfAspects = aspectList.length;
		const totalDegrees = 360;
		const degrees = totalDegrees / numberOfAspects;
		const aspectDegrees = degrees * index;
		const xoffset = (10 * 20) / 2; // 10em width * 20px
		const yoffset = 16;
		let x;
		let y;

		if (aspectDegrees < 90) {
			x = aspectDegrees * 1.5 + center - xoffset;
			y = aspectDegrees - yoffset;
		} else if (aspectDegrees < 180) {
			x = aspectDegrees + center - xoffset;
			y = aspectDegrees - yoffset;
		} else if (aspectDegrees < 270) {
			x = center - aspectDegrees + xoffset;
			y = 360 - aspectDegrees - yoffset;
		} else if (aspectDegrees < 360) {
			x = center - aspectDegrees + xoffset;
			y = aspectDegrees - 235 - yoffset;
		}

		const aspectStyle = {
			transform: `translate(${x}px, ${y}px)`,
		};
		return aspectStyle;
	}

	return (
		<section className="aspect__list">
			<Heading>Life Aspects</Heading>
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

const TodoForm = ({ aspectId, todos, setTodos }) => {
	const [todoName, setTodoName] = useState('');
	const [recurrence, setRecurrence] = useState(0);
	const [dateDue, setDateDue] = useState(new Date());
	const [duration, setDuration] = useState(0);

	return (
		<section className="todo-form">
			<form
				onSubmit={e => {
					e.preventDefault();
					const todo = {
						name: todoName.trim(),
						recurrence: recurrence,
						dateDue: dateDue,
						aspectId: aspectId,
						duration: duration,
					};
					createTodo(todo, todos, setTodos);
					setTodoName('');
					setRecurrence(0);
				}}
			>
				<label className="todo-form__new-todo">
					New To Do
					<input
						type="text"
						placeholder="Add to do"
						onChange={e => setTodoName(e.target.value)}
						value={todoName}
					/>
				</label>
				<label className="todo-form__duration">
					Duration
					<input
						type="number"
						value={duration}
						onChange={e => setDuration(e.target.value)}
					/>
					minutes
				</label>
				<button type="submit">Save</button>
			</form>
			<Recurrence setRecurrence={setRecurrence} />
		</section>
	);
};

function Recurrence({ setRecurrence }) {
	const recurrenceTypes = ['year', 'month', 'week', 'day'];
	const [scope, setScope] = useState('day');
	const [numberOf, setNumberOf] = useState(0);

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
		<section className="recurrence">
			<p>Recurrence</p>
			<div className="recurrence__radio-group">
				{recurrenceTypes.map((type, i) => (
					<label className="recurrence__radio-group--item" key={i}>
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
			<div className="number-of">
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
				<button onClick={() => setRecurrence(getRecurrence)}>
					Set Recurrence
				</button>
			</div>
		</section>
	);
}

const TodoList = ({ aspectId, todos, setTodos }) => {
	function handleCompleteClick(todo) {
		todo.completed = !todo.completed;
		updateTodo(todo, todos, setTodos);
		if (todo.recurrence > 0) {
			todo.dateDue = new Date(Date.now() + todo.recurrence);
			createTodo(todo, todos, setTodos);
		}
	}

	return (
		<ul className="todos">
			{todos
				? todos
						.filter(todo => {
							const date = new Date();
							const todoDate = new Date(todo.dateDue);
							return (
								aspectId === todo.aspectId &&
								todoDate.getTime() <= date.getTime() &&
								!todo.completed
							);
						})
						.map(todo => {
							const isCompleted = todo.completed ? 'checked' : '';
							return (
								<li key={todo.id} className="todo">
									<ul className="todo__header">
										<li className="todo__header--aspect">
											{getAspectName(todo.aspectId)}
										</li>

										<li className="todo__header--date-due">
											<span>due date</span>
											<Moment format="MMMM DD, YYYY">
												{todo.dateDue}
											</Moment>
										</li>
									</ul>
									<ul className="todo__body">
										<li className="todo__body--check-button">
											<button
												className={`${isCompleted}`}
												onClick={() =>
													handleCompleteClick(todo)
												}
											></button>
										</li>
										<li className="todo__body--name">
											{todo.name}
										</li>
										{todo.duration > 0 ? (
											<li className="todo__body--duration">
												{todo.duration}
												<span>minutes</span>
											</li>
										) : null}
										<li className="todo__body--recurrence">
											{todo.recurrence > 0
												? 'Recurring'
												: 'No Recurrence'}
										</li>
									</ul>
								</li>
							);
						})
				: todos}
		</ul>
	);
};

function createTodo(todo, todos, setTodos) {
	const id = todos ? todos.length + 1 : 1;
	const newTodo = {
		...todo,
		id: id,
		completed: false,
	};

	if (newTodo.name.length > 0) {
		const newTodos = todos ? [...todos, newTodo] : newTodo;
		setTodos(newTodos);
		storeTodos(newTodos);
	}
}

function updateTodo(todo, todos, setTodos) {
	const newTodos = [...todos.filter(item => item.id !== todo.id), todo];
	setTodos(newTodos);
	storeTodos(newTodos);
}

export default function Aspect() {
	const [todos, setTodos] = useState(getTodos);
	const [aspectId, setAspectId] = useState();

	return (
		<div className="aspect">
			<Heading>Aspects</Heading>
			<AspectList aspectId={aspectId} setAspectId={setAspectId} />
			<TodoForm todos={todos} setTodos={setTodos} aspectId={aspectId} />
			<TodoList todos={todos} setTodos={setTodos} aspectId={aspectId} />
		</div>
	);
}
