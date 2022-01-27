import * as React from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";

import Button, { ButtonGroup } from "components/common/Button/Button";
import Form from "components/common/Form";
import MaxWidthContainer from "components/common/MaxWidthContainer";
import RRule from "./RRule";

import styles from "./addEditTask.module.scss";

export default function AddEditTask({
  foreignId,
  defaultTask = {
    task: "",
    description: "",
    dtStart: new Date(),
    foreignId: foreignId,
  },
  updateTask,
  addTask,
  mode = "add",
}) {
  const navigate = useNavigate();
  const [dirty, setDirty] = React.useState(false);
  const [task, setTask] = React.useState({ ...defaultTask });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === "edit") {
      updateTask(task);
    } else {
      addTask(task);
    }
    navigate.goBack();
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

  const handleRRuleDirty = () => {
    if (!dirty) {
      setDirty(true);
    }
  };

  const handleDateChange = (date) => {
    setTask({ ...task, dtStart: date });
    if (!dirty) {
      setDirty(true);
    }
    return;
  };

  return (
    <div className={styles.addEditTask}>
      <MaxWidthContainer>
        <Form
          handleSubmit={handleSubmit}
          name={mode === "add" ? "addtask" : "edittask"}
        >
          <Form.Header title={mode === "add" ? "add task" : "edit task"} />
          <Form.Body>
            <label htmlFor="task">task</label>
            <input
              id="task"
              name="task"
              type="text"
              value={task.task}
              onChange={handleChange}
            />
            <label htmlFor="description">description</label>
            <textarea
              id="description"
              name="description"
              rows="5"
              value={task.description}
              onChange={handleChange}
            ></textarea>
            <label htmlFor="dp">start date</label>
            <DatePicker
              id="dp"
              selected={new Date(task.dtStart)}
              onChange={(date) => handleDateChange(date)}
              shouldCloseOnSelect={true}
              className={styles.date}
            />
            <RRule task={task} handleRRuleDirty={handleRRuleDirty} />
          </Form.Body>
          <Form.Footer>
            <ButtonGroup>
              <Button onClick={() => navigate(-1)}>Cancel</Button>
              <Button type="submit" disabled={!dirty}>
                Save
              </Button>
            </ButtonGroup>
          </Form.Footer>
        </Form>
      </MaxWidthContainer>
    </div>
  );
}
