import React from "react";

import Aspect from "./Aspect";
import FlowList from "./FlowList";

import "./SetFlow.scss";

export default function SetFlow({ flow, setAspectFlow }) {
  // Display, edit, Flow
  return (
    <div className="set-flow">
      <Aspect flow={flow} setAspectFlow={setAspectFlow} />
      <FlowList flow={flow} />
    </div>
  );
}
