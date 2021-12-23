import { useState } from "react";
import TaskService from "services/TaskService";

import styles from "./rrule.module.scss";

function parseRRule(rruleString) {
  return rruleString
    .split(";")
    .map((keyValue) => {
      return keyValue.split("=");
    })
    .reduce((accumulator, currentValue) => {
      accumulator[currentValue[0]] = currentValue[1];
      return accumulator;
    }, {});
}

export default function RRule({ task, handleRRuleDirty }) {
  //  These functions are declared at the top
  //  to set the initial state of the rrule {}
  const setInitialState = (task) => {
    if (!task.rrule) return { FREQ: "DAILY", INTERVAL: 0 };
    return parseRRule(task.rrule.rule);
  };

  const [rrule, setRRule] = useState(setInitialState(task));
  const frequencyOptions = ["daily", "weekly", "monthly", "yearly"];

  const frequencyNames = {
    daily: "day",
    weekly: "week",
    monthly: "month",
    yearly: "year",
  };
  const handleRRuleChange = (e) => {
    const target = e.target;
    if (target.type === "radio") {
      setRRule({ ...rrule, FREQ: target.value.toUpperCase() });
      e.target.checked = true;
    }
    if (target.type === "number") {
      setRRule({ ...rrule, INTERVAL: parseInt(target.value) });
    }
    handleRRuleDirty();
  };

  const setTaskRule = () => {
    task.rrule = {
      rule: `FREQ=${rrule.FREQ};INTERVAL=${rrule.INTERVAL}`,
    };
  };

  const removeRecurrence = async () => {
    const response = await TaskService.deleteRrule(task.id);
    if (response) {
      delete task.rrule;
    }
  };

  const getRecurrenceQualifier = () => {
    return `${frequencyNames[rrule.FREQ.toLowerCase()]}${
      rrule.INTERVAL !== 1 ? "s" : ""
    }`;
  };

  return (
    <div className={styles.rrule}>
      <section className={styles.recurrence}>
        <p>Recurrence</p>
        <div className={styles.radioGroup}>
          {frequencyOptions.map((option, i) => (
            <div className={styles.radioItem}>
              <input
                id={i}
                type="radio"
                name="recurrence-type"
                value={option}
                onChange={handleRRuleChange}
                defaultChecked={rrule?.FREQ === option.toUpperCase()}
              />
              <label className={styles.label} key={i} htmlFor={i}>
                {option}
              </label>
            </div>
          ))}
        </div>
        <div className={styles.numberOf}>
          <div className={styles.intervalContainer}>
            <label>Recur every</label>
            <input
              type="number"
              name="number-of"
              value={rrule?.INTERVAL}
              onChange={handleRRuleChange}
              min="0"
            />
            <span>{getRecurrenceQualifier()}</span>
          </div>
          <button type="button" onClick={setTaskRule}>
            Set Recurrence
          </button>
          <button type="button" onClick={removeRecurrence}>
            Remove Recurrence
          </button>
        </div>
      </section>
    </div>
  );
}

RRule.parseRRule = parseRRule;
