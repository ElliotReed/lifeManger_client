import * as React from "react";
import DateDisplay from "components/common/datetime/DateDisplay";

export default function CurrentDateTime({ updateBy = "second" }) {
  let updateInterval = updateBy === "second" ? 1000 : 1000 * 60;
  const [time, setTime] = React.useState(() => new Date());

  let options = { includeShortTime: true };

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTime(() => new Date());
    }, [updateInterval]); // runs every second

    return () => {
      clearInterval(timer);
    };
  }, [time, updateInterval]);

  return <DateDisplay options={options}>{time}</DateDisplay>;
}
