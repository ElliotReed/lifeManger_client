import React, { useState, useEffect } from "react";
import Moment from "react-moment";
import moment from "moment";
import "moment-timezone";

import Heading from "../UI/Heading";
import LifeUnits from "./LifeUnits";
import TaskUnits from "./TaskUnits";
import SetFlow from "./SetFlow";

import OffscreenContainer from "../UI/OffscreenContainer";
import "./LifeFlow.scss";

import { lifeAspects, initialAspectFlow } from "./data";

function getLifeUnits() {
  if (!localStorage.getItem("lifeflow_units")) {
    return [];
  }
  return JSON.parse(localStorage.getItem("lifeflow_units"));
}

function saveLifeUnits(units) {
  localStorage.setItem("lifeflow_units", JSON.stringify(units));
}

function getAspectFlow() {
  if (!localStorage.getItem("aspectFlow")) {
    saveAspectFlow(initialAspectFlow);
  }
  return sortAspectFlow(JSON.parse(localStorage.getItem("aspectFlow")));
}

function saveAspectFlow(aspectFlow) {
  localStorage.setItem("aspectFlow", JSON.stringify(aspectFlow));
}

function sortAspectFlow(aspectFlow) {
  return aspectFlow.sort(function(a, b) {
    a = new Date(a.dateCompleted);
    b = new Date(b.dateCompleted);
    return a > b ? -1 : a < b ? 1 : 0;
  });
}

function updateLifeUnits(setLifeUnits) {
  const previousLifeflowUnits = getLifeUnits().filter(lifeUnit => {
    return !moment(lifeUnit.date_completed)
      .startOf("day")
      .isSame(moment().startOf("day"));
  });

  let todaysUnits = getLifeUnits().filter(lifeUnit => {
    return moment(lifeUnit.date_completed)
      .startOf("day")
      .isSame(moment().startOf("day"));
  })[0];

  if (!todaysUnits) {
    todaysUnits = {
      units: 0,
      date_completed: moment()
        .startOf("day")
        .toISOString()
    };
  }
  todaysUnits.units++;
  const newLifeflowUnits = [...previousLifeflowUnits, todaysUnits];
  setLifeUnits(newLifeflowUnits);
  saveLifeUnits(newLifeflowUnits);
}

function CurrentFlowAspect(props) {
  const {
    aspectFlow,
    setAspectFlow,
    setLifeUnits,
    setAspectId,
    setLifeUnitRewardsNeedsUpdate
  } = props;

  function handleCompletedClick(e, currentAspect) {
    e.preventDefault();
    const newArray = aspectFlow.filter(function(aspect) {
      return aspect.id !== currentAspect.id;
    });
    currentAspect.date_completed = Date.now();
    newArray.push(currentAspect);
    setAspectFlow(newArray);
    saveAspectFlow(newArray);
    e.currentTarget.checked = false;
    setAspectId(newArray[0].aspectId);

    // lifeUnits
    updateLifeUnits(setLifeUnits);
    // TODO call a function that updates reward count
    setLifeUnitRewardsNeedsUpdate(true);
  }

  const currentAspect = sortAspectFlow(aspectFlow)[0];
  return (
    <form className="current-flow-aspect">
      <Heading>Current</Heading>
      <div className="current-flow-aspect__item">
        <h3>{getAspectName(currentAspect.aspectId)}</h3>
        <div>
          <div>
            Duration: <span>{currentAspect.duration}</span> minutes
          </div>
          <div>
            Last Completed:{" "}
            <span>
              <Moment format="MMM, DD, YYYY">
                {currentAspect.date_completed}
              </Moment>
            </span>
          </div>
        </div>
        <button onClick={e => handleCompletedClick(e, currentAspect)}>
          Click to complete
        </button>
      </div>
    </form>
  );
}

function getAspectName(id) {
  const aspectList = lifeAspects;
  const aspect = aspectList.filter(aspect => aspect.id === id)[0];
  return aspect.name;
}

export default function LifeFlow({
  setAspectId,
  completedTodos,
  setLifeUnitRewardsNeedsUpdate
}) {
  const [aspectFlow, setAspectFlow] = useState(getAspectFlow);
  const [lifeUnits, setLifeUnits] = useState(getLifeUnits);
  const [showSettings, setShowSettings] = useState(false); // false, true for development

  // syncs selected aspect to other components on load
  useEffect(() => {
    setAspectId(aspectFlow[0].aspectId);
	}, []);
	
  const handleSettingsOffscreenContainer = () => {
    setShowSettings(!showSettings);
  };
  return (
    <div className="life-flow">
      <i
        className="material-icons md-24 btn-settings"
        onClick={handleSettingsOffscreenContainer}
        title="More..."
      >
        more_vert
      </i>
      <LifeUnits lifeUnits={lifeUnits} completedTodos={completedTodos} />
      <CurrentFlowAspect
        aspectFlow={aspectFlow}
        setAspectFlow={setAspectFlow}
        setLifeUnits={setLifeUnits}
        setAspectId={setAspectId}
        setLifeUnitRewardsNeedsUpdate={setLifeUnitRewardsNeedsUpdate}
      />
      <TaskUnits completedTodos={completedTodos} />
      <OffscreenContainer
        isVisible={showSettings}
        handleOffscreenContainer={handleSettingsOffscreenContainer}
      >
        <SetFlow
          getAspectName={getAspectName}
          AspectFlowState={aspectFlow}
          setAspectFlowState={setAspectFlow}
        />
      </OffscreenContainer>
    </div>
  );
}
