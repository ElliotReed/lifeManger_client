import React from 'react';
import './TodoForm.scss';

export default function TodoForm({ form, updateForm, handleSubmit }) {
	return (
		<form className="todo-form" onSubmit={handleSubmit}>
			<label className="todo-form__new-todo">
				New To Do
				<input
					placeholder="Add to do"
					value={form.name}
					onChange={e => updateForm(e)}
					onKeyDown={e => {
						if (e.keyCode === 13) {
							e.preventDefault();
							return false;
						}
					}}
					name="name"
					required
					type="text"
				/>
			</label>
			<label className="todo-form__duration">
				Duration
				<input
					type="number"
					value={form.duration}
					onChange={e => updateForm(e)}
					name="duration"
					min="0"
				/>
				minutes
			</label>
			<label className="todo-form__date_to_start">
				Date to start
				<input
					type="date"
					value={form.date_to_start}
					onChange={e => updateForm(e)}
					name="date_to_start"
				/>
			</label>
			<label className="todo-form__description">
				Description
				<textarea
					placeholder="Add description"
					value={form.description}
					onChange={e => updateForm(e)}
					name="description"
					rows="5"
				/>
			</label>
			<button type="submit">Save</button>
		</form>
	);
}
