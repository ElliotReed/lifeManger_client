import React from 'react';
import Moment from 'react-moment';
import moment from 'moment';
import 'moment-timezone';

import classnames from 'classnames';
import styles from './TodoList.module.scss';

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
		<ul className={styles.todos}>
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
								? classnames(styles.checkButton, styles.checked)
								: styles.checkButton;
							return (
								<li key={todo.id} className={styles.todo}>
									<ul className={styles.todoHeader}>
										<li className={styles.headerAspect}>
											{getAspectName(todo.aspectId)}
										</li>

										<li className={styles.dateDue}>
											<Moment format="MMMM DD, YYYY">
												{todo.date_to_start}
											</Moment>
										</li>
									</ul>
									<ul className={styles.body}>
										<li className={styles.name}>
											<button
												className={isCompleted}
												onClick={() =>
													handleCompleteClick(todo)
												}
											></button>
											<span className={styles.name}>
												{todo.name}
											</span>
											<button
												className={
													styles.showDescription
												}
												title="show description"
												onClick={e => {
													console.log(
														e.currentTarget.parentElement.parentElement.parentElement.lastChild.classList.toggle(
															styles['show']
														)
													);
												}}
											>
												...
											</button>
										</li>
										<div className={styles.lowerWrapper}>
											{todo.duration > 0 ? (
												<li className={styles.duration}>
													{`	${todo.duration} minutes`}
												</li>
											) : (
												''
											)}
											<li className={styles.recurrence}>
												{todo.recurrence > 0
													? 'Recurring'
													: 'No Recurrence'}
											</li>
											<i
												className={classnames("material-icons", "md-18", styles.edit)}
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
									<div className={styles.description}>
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
