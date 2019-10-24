import React from 'react';
import Moment from 'react-moment';
import moment from 'moment';
import 'moment-timezone';
import './TodoList.scss';

const TodoList = ({
	aspectId,
	todos,
	setTodos,
	updateTodo,
	createTodo,
	getAspectName,
	handleOffscreenContainer,
	setFormProperties,
}) => {
	async function handleCompleteClick(todo) {
		todo.date_completed = moment().toISOString();
		updateTodo(todo, todos, setTodos);
		if (todo.recurrence > 0) {
			const date = moment()
				.add(todo.recurrence, 'ms')
				.toISOString();
			todo.date_to_start = date;
			createTodo(todo, todos, setTodos);
		}
	}

	return (
		<ul className="todos">
			{todos
				? todos
						.filter(todo => {
							const date = new Date();
							const todoDate = new Date(todo.date_to_start);
							return (
								aspectId === todo.aspectId &&
								todoDate <= date &&
								todo.date_completed === null
							);
						})
						.map(todo => {
							const isCompleted = todo.date_completed
								? 'todo__body--check-button checked'
								: 'todo__body--check-button';
							return (
								<li key={todo.id} className="todo">
									<ul className="todo__header">
										<li className="todo__header--aspect">
											{getAspectName(todo.aspectId)}
										</li>

										<li className="todo__header--date-due">
											<Moment format="MMMM DD, YYYY">
												{todo.date_to_start}
											</Moment>
										</li>
									</ul>
									<ul className="todo__body">
										<li className="todo__body--check-name">
											<button
												className={`${isCompleted}`}
												onClick={() =>
													handleCompleteClick(todo)
												}
											></button>
											<span className="todo__body--name">
												{todo.name}
											</span>
											<button
												className="todo__body--show-description"
												title="show description"
												onClick={e => {
													console.log(
														e.currentTarget.parentElement.parentElement.parentElement.lastChild.classList.toggle(
															'show'
														)
													);
												}}
											>
												...
											</button>
										</li>
										<div className="todo__body--lower-wrapper">
											{todo.duration > 0 ? (
												<li className="todo__body--duration">
													{`	${todo.duration} minutes`}
												</li>
											) : (
												''
											)}
											<li className="todo__body--recurrence">
												{todo.recurrence > 0
													? 'Recurring'
													: 'No Recurrence'}
											</li>
											<i
												className="material-icons md-18 todo__body--edit"
												onClick={() => {
													handleOffscreenContainer();
													// temp code for todos set without duration
													if (!todo.duration) {
														const todoWithDuration = {
															...todo,
															duration: '',
														};
														setFormProperties(
															todoWithDuration
														);
													} else {
														setFormProperties(todo);
													}
												}}
												title="Click to edit."
											>
												create
											</i>
										</div>
									</ul>
									<div className="todo__body--description">
										{todo.description}
									</div>
								</li>
							);
						})
				: todos}
		</ul>
	);
};

export default TodoList;
