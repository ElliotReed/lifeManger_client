import * as React from "react";
import { isSameDay, subDays } from "date-fns";

import DateDisplay from "components/common/datetime/DateDisplay";

import styles from "./history.module.scss";

function reduceArrayByDateCompleted(array, type = "tasks") {
  let days = 3;
  const groupedByTimeValue = [];
  let value;

  for (let i = 0; i < days; i++) {
    let timeValueToCheck = subDays(new Date(), i);
    console.log("timeValueToCheck: ", timeValueToCheck);
    const oneTimeValuesResults = array.filter((item) => {
      console.log("item: ", item);
      console.log("item.dtCompleted: ", item.dtCompleted);
      const completedDate = new Date(item.dtCompleted);
      console.log("completedDate: ", completedDate);
      return isSameDay(timeValueToCheck, completedDate);
    });

    // test for empty array
    if (oneTimeValuesResults < 1) {
      groupedByTimeValue.push({
        value: 0,
        dtCompleted: timeValueToCheck.toISOString(),
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
        dtCompleted: timeValueToCheck.toISOString(),
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
  const history = composeHistoryObject(array, type);
  return (
    <section className={styles.display}>
      {console.log("history: ", history)}
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
            <li key={day.dtCompleted}>
              <b>{day.value}</b> completed on
              <span>
                &nbsp;
                <DateDisplay>{day.dtCompleted}</DateDisplay>
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
