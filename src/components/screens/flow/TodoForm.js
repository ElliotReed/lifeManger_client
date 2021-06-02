import React from "react";
import styles from "./TodoForm.module.scss";

export default function TodoForm({ form, updateForm, handleSubmit }) {
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label>
        New To Do
        <input
          placeholder="Add to do"
          value={form.action}
          onChange={(e) => updateForm(e)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              return false;
            }
          }}
          name="action"
          required
          type="text"
        />
      </label>
      <label className={styles.duration}>
        Duration
        <input
          type="number"
          value={form.durationInMinutes}
          onChange={(e) => updateForm(e)}
          name="durationInMinutes"
          min="0"
        />
        minutes
      </label>
      <label className="todo-form__date_to_start">
        Date to start
        <input
          type="date"
          value={form.dtStart}
          onChange={(e) => updateForm(e)}
          name="dtStart"
        />
      </label>
      <label className={styles.description}>
        Description
        <textarea
          placeholder="Add description"
          value={form.description}
          onChange={(e) => updateForm(e)}
          name="description"
          rows="5"
        />
      </label>
      <button type="submit">Save</button>
    </form>
  );
}
