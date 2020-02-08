import React, { useState } from 'react';
import moment from 'moment';

import AspectList from './AspectList';
import TodoForm from './TodoForm';
import RecurrenceForm from './RecurrenceForm';
import TodoList from './TodoList';
import LifeUnitsReward from './LifeUnitsReward';

import OffscreenContainer from '../UI/OffscreenContainer';
import './Aspect.scss';

import { Redirect } from 'react-router-dom';

import LifeFlow from './LifeFlow';

import './Manager.scss';

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

const completedTodos = todos => {
	const oldestDate = moment().subtract(7, 'days');
	return todos.filter(
		todo =>
			todo.date_completed !== null &&
			moment(todo.date_completed) >= oldestDate
	);
};

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

export default function Manager(props) {
	const [todos, setTodos] = useState(getTodos);
	const [aspectId, setAspectId] = useState();
	const [showTodoForm, setShowTodoForm] = useState(false);
	const [
		lifeUnitRewardsNeedsUpdate,
		setLifeUnitRewardsNeedsUpdate,
	] = useState(false);

	const [form, setFormProperties] = useState(initialFormProperties);

	const updateForm = e => {
		setFormProperties({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = e => {
		e.preventDefault();
		const todo = {
			id: form.id ? form.id : null,
			name: form.name.trim(),
			recurrence: form.recurrence,
			aspectId: aspectId,
			duration: form.duration,
			date_to_start: form.date_to_start,
			date_due: form.date_due,
			date_completed: null,
			description: form.description,
		};
		if (!form.id) {
			createTodo(todo, todos, setTodos);
			setFormProperties(initialFormProperties);
		} else {
			updateTodo(todo, todos, setTodos);
			setFormProperties(initialFormProperties);
		}

		handleOffscreenContainer();
	};

	const handleOffscreenContainer = () => {
		setShowTodoForm(!showTodoForm);
	};

	if (!props.isLoggedIn) {
		return <Redirect to="/" />;
	}

	return (
		<main className="manager">
			<LifeUnitsReward
				lifeUnitRewardsNeedsUpdate={lifeUnitRewardsNeedsUpdate}
				setLifeUnitRewardsNeedsUpdate={setLifeUnitRewardsNeedsUpdate}
			/>
			<LifeFlow
				setAspectId={setAspectId}
				completedTodos={() => completedTodos(todos)}
				setLifeUnitRewardsNeedsUpdate={setLifeUnitRewardsNeedsUpdate}
			/>
			<AspectList
				aspectId={aspectId}
				setAspectId={setAspectId}
				lifeAspects={lifeAspects}
			/>
			<OffscreenContainer
				isVisible={showTodoForm}
				handleOffscreenContainer={handleOffscreenContainer}
			>
				{showTodoForm && (
					<RecurrenceForm form={form} updateForm={updateForm} />
				)}
				<TodoForm
					todos={todos}
					setTodos={setTodos}
					aspectId={aspectId}
					createTodo={createTodo}
					form={form}
					updateForm={updateForm}
					handleSubmit={handleSubmit}
				/>
			</OffscreenContainer>
			<TodoList
				todos={todos}
				setTodos={setTodos}
				aspectId={aspectId}
				updateTodo={updateTodo}
				createTodo={createTodo}
				getAspectName={getAspectName}
				handleOffscreenContainer={handleOffscreenContainer}
				setFormProperties={setFormProperties}
			/>
			<i
				className="material-icons md-48 btn-add"
				onClick={handleOffscreenContainer}
				title="Click to edit."
			>
				add_circle
			</i>
		</main>
	);
}
