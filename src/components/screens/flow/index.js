import React from 'react';
import moment from 'moment';

import AspectList from './AspectList';
import LifeFlow from './LifeFlow';
import LifePoints from './LifePoints';
import RecurrenceForm from './RecurrenceForm';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

import OffscreenContainer from 'components/UI/OffscreenContainer';

// import { Redirect } from 'react-router-dom';

// import styles from './index.module.scss';

import { lifeAspects } from './data';

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

function saveTodos(todos) {
	localStorage.setItem('todos', JSON.stringify(todos));
}

function sortTodos(todos) {
	return todos
		.sort(function(a, b) {
			a = new Date(a.date_to_start);
			b = new Date(b.date_to_start);
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

function createTodo(todo, todos, setTodos) {
	const id = todos ? todos.length + 1 : 1;
	const newTodo = {
		...todo,
		id: id,
		date_completed: null,
	};

	if (newTodo.name.length > 0) {
		const newTodos = todos ? [...todos, newTodo] : newTodo;
		setTodos(newTodos);
		saveTodos(newTodos);
	}
}

function updateTodo(todo, todos, setTodos) {
	const newTodos = [...todos.filter(item => item.id !== todo.id), todo];
	setTodos(newTodos);
	saveTodos(newTodos);
}

const initialFormProperties = {
	id: '',
	aspectId: '',
	name: '',
	description: '',
	duration: 0,
	recurrence: 0,
	date_to_start: moment().toISOString(),
	date_due: moment().toISOString(),
	date_completed: null,
};

export default class LifeManager extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			todos: getTodos(),
			aspectId: '',
			showTodoForm: false,
			lifePointsNeedsUpdate: false,
			form: initialFormProperties,
		};
	}

	setTodos = todos => {
		this.setState({ todos });
	};

	setAspectId = aspectId => {
		this.setState({ aspectId });
	};

	setShowTodoForm = showTodoForm => {
		this.setState({ showTodoForm });
	};

	setlifePointsNeedsUpdate = lifePointsNeedsUpdate => {
		this.setState({ lifePointsNeedsUpdate });
	};

	setFormProperties = form => {
		this.setState({ form });
	};

	updateForm = e => {
		const form = this.state.form;
		this.setFormProperties({ ...form, [e.target.name]: e.target.value });
	};

	handleSubmit = e => {
		const form = this.state.form;
		const todos = this.state.todos;
		const todo = {
			id: form.id ? form.id : null,
			name: form.name.trim(),
			recurrence: form.recurrence,
			aspectId: this.state.aspectId,
			duration: form.duration,
			date_to_start: form.date_to_start,
			date_due: form.date_due,
			date_completed: null,
			description: form.description,
		};
		e.preventDefault();
		if (!form.id) {
			createTodo(todo, todos, this.setTodos);
			this.setFormProperties(initialFormProperties);
		} else {
			updateTodo(todo, todos, this.setTodos);
			this.setFormProperties(initialFormProperties);
		}

		this.handleOffscreenContainer();
	};

	handleOffscreenContainer = () => {
		this.setShowTodoForm(!this.state.showTodoForm);
	};

	render() {
		// if (!props.isLoggedIn) {
		// 	return <Redirect to="/" />;
		// }
		const {
			form,
			todos,
			lifePointsNeedsUpdate,
			aspectId,
			showTodoForm,
		} = this.state;

		return (
			<main>
				<LifePoints
					lifePointsNeedsUpdate={lifePointsNeedsUpdate}
					setLifePointsNeedsUpdate={this.setlifePointsNeedsUpdate}
				/>
				<LifeFlow
				  todos={todos}
					setAspectId={this.setAspectId}
					setlifePointsNeedsUpdate={this.setlifePointsNeedsUpdate}
				/>
				<AspectList
					aspectId={aspectId}
					setAspectId={this.setAspectId}
					lifeAspects={lifeAspects}
				/>
				<OffscreenContainer
					isVisible={showTodoForm}
					handleOffscreenContainer={this.handleOffscreenContainer}
				>
					{this.state.showTodoForm && (
						<RecurrenceForm
							form={form}
							updateForm={this.updateForm}
						/>
					)}
					<TodoForm
						todos={todos}
						setTodos={this.setTodos}
						aspectId={aspectId}
						createTodo={createTodo}
						form={form}
						updateForm={this.updateForm}
						handleSubmit={this.handleSubmit}
					/>
				</OffscreenContainer>
				<TodoList
					todos={todos}
					setTodos={this.setTodos}
					aspectId={aspectId}
					updateTodo={updateTodo}
					createTodo={createTodo}
					getAspectName={getAspectName}
					handleOffscreenContainer={this.handleOffscreenContainer}
					setFormProperties={this.setFormProperties}
				/>
				<i
					className="material-icons md-48 btn-add"
					onClick={this.handleOffscreenContainer}
					title="Click to edit."
				>
					add_circle
				</i>
			</main>
		);
	}
}
