import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { useHistory, useRouteMatch } from "react-router-dom";

import AddEditTask from "../AddEditTask";
import DateDisplay from "components/common/datetime/DateDisplay";
import MainPortal from "components/common/MainPortal";
import Toolbar from "components/common/Toolbar";
import ToolbarButton from "components/common/Button/ToolbarButton";

import styles from "./task_list.module.scss";

function TaskDetails({ task }) {
  const handleShowDetailsClick = (e) => {
    const details = e.currentTarget.nextSibling;
    if (details.firstChild.textContent.length > 0) {
      details.classList.toggle(styles["show"]);
    }
  };

  return (
    <>
      <div
        className={styles.more}
        onClick={handleShowDetailsClick}
        title="Show details"
      >
        <FontAwesomeIcon icon={["fas", "ellipsis-v"]} />
      </div>
      <div
        className={styles.task__details}
        onClick={(e) => e.currentTarget.classList.toggle(styles["show"])}
      >
        <h6 className={styles.details__header}>{task.task}</h6>
        <p className={styles.description}>{task.description}</p>
      </div>
    </>
  );
}

export default function TaskList({
  tasks,
  updateTasks,
  handleCheckCompleted,
  updateTask,
}) {
  const [selectedTask, setSelectedTask] = React.useState();
  const history = useHistory();
  const match = useRouteMatch("/aspects/tasks/edit/:id");

  const handleEditTaskClick = (e) => {
    // Targets the input id
    const id = e.currentTarget.parentElement.dataset.id;
    const task = tasks.filter((task) => task.id === id)[0];

    setSelectedTask(task);
    history.push(`aspects/tasks/edit/${task.id}`);
  };

  return (
    <>
      {!match && (
        <section className={styles.taskList__container}>
          <ul className={styles.task__list}>
            {tasks.map((task) => {
              return (
                <li key={task.id}>
                  <section className={styles.topbar}>
                    <DateDisplay>{task.dtStart}</DateDisplay>

                    <Toolbar>
                      <div data-id={task.id}>
                        <ToolbarButton onClick={handleEditTaskClick}>
                          <FontAwesomeIcon icon={["fas", "edit"]} />
                        </ToolbarButton>
                        <span
                          title="Recurring"
                          className={
                            task.rrule?.rule ? styles.show : styles.hide
                          }
                        >
                          <ToolbarButton onClick={handleEditTaskClick}>
                            <FontAwesomeIcon icon={["fas", "sync-alt"]} />
                          </ToolbarButton>
                        </span>
                      </div>
                    </Toolbar>
                  </section>
                  <section className={styles.taskInfo}>
                    <div className={styles.checkbox}>
                      <input
                        type="checkbox"
                        name={task.id}
                        id={task.id}
                        onChange={() => handleCheckCompleted(task)}
                        checked={task.dtCompleted !== null ? true : false}
                      />
                      <label htmlFor={task.id} title="Check to complete">
                        {task.task}
                      </label>
                    </div>
                    <TaskDetails task={task} />
                  </section>
                </li>
              );
            })}
          </ul>
        </section>
      )}
      {match && (
        <MainPortal>
          <AddEditTask
            defaultTask={selectedTask}
            updateTasks={updateTasks}
            updateTask={updateTask}
            mode="edit"
          />
        </MainPortal>
      )}
      {/* <Modal ref={modal} fade={true}>
      </Modal> */}
      {/* <TodoList
        todos={todos}
        setTodos={setTodos}
        aspectId={aspectId}
        updateTodo={updateTodo}
        createTodo={createTodo}
        // getAspectName={getAspectName}
        handleOffscreenContainer={handleOffscreenContainer}
        setFormProperties={setForm}
      /> */}
    </>
  );
}
