import { useEffect, useState } from "react";
import DateDisplay from "components/common/datetime/DateDisplay";

export default function CurrentDateTime({ updateBy = "second" }) {
  const [time, setTime] = useState(() => new Date());
  const [updateInterval, setUpdateInterval] = useState(1000);

  let options = { includeShortTime: true };
  useEffect(() => {
    if (updateBy === "minute") {
      setUpdateInterval(updateInterval * 60);
    }
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(() => new Date());
    }, updateInterval); // runs every second

    return () => {
      clearInterval(timer);
    };
  }, [time, updateInterval]);

  return <DateDisplay options={options}>{time}</DateDisplay>;
}
