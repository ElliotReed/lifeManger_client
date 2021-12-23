import * as React from "react";
import { useHistory, useLocation } from "react-router";

import Fields from "./TaskFormFields";

import Button from "components/common/Button/Button";
import Form from "components/common/Form";

export default function AddEditTask({
  addTask,
  foreignId,
  mode,
  defaultTask = {
    task: "",
    description: "",
    dtStart: new Date(),
    foreignId: foreignId,
  },
}) {
  const [dirty, setDirty] = React.useState(false);
  let history = useHistory();
  let location = useLocation();
  // let foreignId = location.state.foreignId;
  // const mode = location.state.mode;
  const [task, setTask] = React.useState({ ...defaultTask });
  // const defaultTask = {
  //   task: "",
  //   description: "",
  //   dtStart: new Date(),
  //   foreignId: foreignId,
  // };

  let updateTask;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === "edit") {
      updateTask(task);
    } else {
      addTask(task);
    }

    history.push("/aspects");
  };

  const handleChange = (e) => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setTask({ ...task, [name]: value });

    if (!dirty) {
      setDirty(true);
    }
  };

  const handleDateChange = (date) => {
    console.log("date: ", date);
    setTask({ ...task, dtStart: date });
    if (!dirty) {
      setDirty(true);
    }
    return;
  };

  return (
    <Form
      handleSubmit={handleSubmit}
      name={mode === "add" ? "addtask" : "edittask"}
    >
      <Form.Header title={mode === "add" ? "add task" : "edit task"} />
      <Form.Body>{Fields(task, handleChange, handleDateChange)}</Form.Body>
      <Form.Footer>
        <Button onClick={() => history.goBack()}>Cancel</Button>
        <Button type="submit" disabled={!dirty}>
          Save
        </Button>
      </Form.Footer>
    </Form>
  );
}
