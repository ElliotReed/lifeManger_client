import classnames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { useNavigate, useMatch } from "react-router-dom";

import useTask from "./useTask";
import MainPortal from "components/common/MainPortal";

import AddEditTask from "./AddEditTask";
// import History from "components/common/History";
import TaskList from "./TaskList";
import Toolbar from "components/common/Toolbar";
import ToolbarButton from "components/common/Button/ToolbarButton";

import styles from "./task.module.scss";

function TaskHeader({ navigate }) {
  return (
    <header>
      <h3>Tasks</h3>
      <Toolbar>
        <ToolbarButton onClick={() => navigate("tasks/add")}>
          <FontAwesomeIcon icon={["fas", "plus"]} />
        </ToolbarButton>
      </Toolbar>
    </header>
  );
}
export default function Task({ foreignId, theme = "theme__light" }) {
  const { tasks, addTask, handleCheckCompleted, updateTasks, updateTask } =
    useTask(foreignId);
  let navigate = useNavigate();
  const match = useMatch("/aspects/tasks/add");

  return (
    <>
      {!match && (
        <div className={classnames(styles.task, styles[theme])}>
          <TaskHeader navigate={navigate} />
          <TaskList
            tasks={tasks}
            updateTasks={updateTasks}
            updateTask={updateTask}
            handleCheckCompleted={handleCheckCompleted}
          />
          {/* <History array={tasks} type="tasks" /> */}
        </div>
      )}
      {match && (
        <MainPortal>
          <AddEditTask mode="add" addTask={addTask} foreignId={foreignId} />
        </MainPortal>
      )}
    </>
  );
}
