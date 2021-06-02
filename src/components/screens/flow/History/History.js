import * as React from "react";
import moment from "moment";
import { startOfDay, isSameDay, sub } from "date-fns";

import useTask from "components/Task/useTask";

import DateDisplay from "components/common/datetime/DateDisplay";

import styles from "./history.module.scss";

function reduceArrayByDateCompleted(array, type = "tasks") {
  let days = 3;
  const groupedByTimeValue = [];
  let timeValue = "days";
  let value;

  for (let i = 0; i < days; i++) {
    let timeValueToCheck = moment().subtract(i, timeValue).startOf("day");

    const oneTimeValuesResults = array.filter((item) => {
      const completedDate = startOfDay(item.date_completed);
      return completedDate.isSame(timeValueToCheck);
    });

    // test for empty array
    if (oneTimeValuesResults < 1) {
      groupedByTimeValue.push({
        value: 0,
        date_completed: timeValueToCheck.toISOString(),
      });
    } else {
      // Single days results
      if (type === "tasks") {
        value = oneTimeValuesResults.length;
      } else if (type === "life") {
        value = oneTimeValuesResults[0].units;
      }

      groupedByTimeValue.push({
        value: value,
        date_completed: timeValueToCheck.toISOString(),
      });
    }
  }
  return groupedByTimeValue;
}

function sumArrayValue(array, objectKey) {
  return array.reduce((previous, current) => {
    return previous + current[objectKey];
  }, 0);
}

function composeHistoryObject(array, type) {
  return {
    title: type === "tasks" ? "Task History" : "Life Unit History",
    total: sumArrayValue(reduceArrayByDateCompleted(array, type), `value`),
    array: reduceArrayByDateCompleted(array, type),
  };
}

export default function History({ array, type }) {
  const { tasks } = useTask();
  // const history = composeHistoryObject(array, type);
  const history = composeHistoryObject(tasks, "tasks");
  return (
    <section className={styles.display}>
      <h2>
        {history.title}
        <span>Over 3 days</span>
      </h2>

      <p>
        <b>{history.total}</b> completed!
      </p>

      <ul>
        {history.array.map((day) => {
          return (
            <li key={day.date_completed}>
              <b>{day.value}</b> completed on
              <span>
                &nbsp;
                <DateDisplay>{day.date_completed}</DateDisplay>
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
