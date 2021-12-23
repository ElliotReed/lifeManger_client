import * as React from "react";

import AspectService from "services/AspectService";
import FlowService from "services/FlowService";

import AspectList from "./AspectList";
// import History from "components/common/History";
import LifeFlow from "./Flow/LifeFlow";
// import LifePoints from "./LifePoints";
// import RecurrenceForm from "./RecurrenceForm";
// import Modal from "components/common/Modal";
import SetFlow from "./SetFlow";
// import TodoForm from "./TodoForm";
// import TodoList from "./TodoList";
import Task from "components/Task";

import Drawer from "components/common/Drawer";
import LoadingSpinner from "components/common/LoadingSpinner";

// import { Redirect } from 'react-router-dom';

import styles from "./aspects.module.scss";

import // getLifeUnits,
// storeLifeUnits,
// getLifePoints,
// storeLifePoints,
// createTodo,
// storeTodos,
"API/flow";

// const initialFormProperties = {
//   id: "",
//   task_aspect: { aspectId: "" },
//   userId: "",
//   action: "",
//   description: "",
//   durationInMinutes: 0,
//   rrule: "",
//   dtStart: new Date(),
//   dtDue: "",
//   dtCompleted: null,
// };

export default function Flow() {
  const [aspectId, setAspectId] = React.useState("");
  const [aspectFlow, setAspectFlow] = React.useState([]);
  const [aspects, setAspects] = React.useState([]);
  // const [form, setForm] = useState(initialFormProperties);
  const [loading, setLoading] = React.useState(false);
  // const [lifePoints, setLifePoints] = useState({});
  // const [lifeUnits, setLifeUnits] = useState([]);
  const [showSettings, setShowSettings] = React.useState(false);

  // const modal = useRef(null);

  const createCurrentAspectObject = () => {
    const currentAspect = { ...aspectFlow[0] };
    return currentAspect;
  };

  // const updateLifeUnits = (setLifeUnits) => {
  //   const previousLifeflowUnits = lifeUnits.filter((lifeUnit) => {
  //     return !moment(lifeUnit.date_completed)
  //       .startOf("day")
  //       .isSame(moment().startOf("day"));
  //   });

  //   let todaysUnits = lifeUnits.filter((lifeUnit) => {
  //     return moment(lifeUnit.date_completed)
  //       .startOf("day")
  //       .isSame(moment().startOf("day"));
  //   })[0];

  //   if (!todaysUnits) {
  //     todaysUnits = {
  //       units: 0,
  //       date_completed: moment().startOf("day").toISOString(),
  //     };
  //   }
  //   todaysUnits.units++;
  //   const newLifeflowUnits = [...previousLifeflowUnits, todaysUnits];
  //   setLifeUnits(newLifeflowUnits);
  // };

  // const zsetLifeUnits = (lifeUnits) => {
  //   setLifeUnits(lifeUnits);
  //   storeLifeUnits(lifeUnits);
  // };

  // const incrementLifePoints = () => {
  //   const newLifePoints = { ...lifePoints };
  //   const rewardThreshold = newLifePoints.rewardThreshold;
  //   newLifePoints.earnedPoints++;

  //   if (newLifePoints.earnedPoints === rewardThreshold) {
  //     newLifePoints.earnedRewards++;
  //     newLifePoints.earnedPoints = 0;
  //   }

  //   setLifePoints(newLifePoints);
  // };

  // const zsetLifePoints = (lifePoints) => {
  //   setLifePoints(lifePoints);
  //   storeLifePoints(lifePoints);
  // };

  // const updateTodo = (todo, todos, setTodos) => {
  //   const newTodos = [...todos.filter((item) => item.id !== todo.id), todo];
  //   setTodos(newTodos);
  //   storeTodos(newTodos);
  // };

  // const updateForm = (e) => {
  //   setForm({ ...form, [e.target.name]: e.target.value });
  // };

  // const handleSubmit = (e) => {
  //   const todo = {
  //     // id: form.id ? form.id : null,
  //     action: form.action.trim(),
  //     // rrule: form.rrule,
  //     aspectId: aspectId,
  //     durationInMinutes: form.durationInMinutes,
  //     dtStart: form.dtStart,
  //     dtDue: form.dtDue,
  //     dtCompleted: null,
  //     description: form.description,
  //   };
  //   e.preventDefault();
  //   if (!form.id) {
  //     TaskService.addTask(todo).then((addedTask) => {
  //       if (!addedTask) console.error("No tasks returned");
  //       const newTodos = todos ? [...todos, addedTask] : addedTask;
  //       setTodos(newTodos);
  //     });

  //     setForm(initialFormProperties);
  //   } else {
  //     updateTodo(todo, todos, setTodos);
  //     setForm(initialFormProperties);
  //   }

  //   handleOffscreenContainer();
  // };

  // const handleOffscreenContainer = () => {
  //   setShowTodoForm(!showTodoForm);
  // };

  const handleSettingsOffscreenContainer = () => {
    setShowSettings(!showSettings);
  };

  const handleCompletedClick = (e, currentAspect) => {
    e.preventDefault();
    currentAspect.dtCompleted = Date.now();
    setLoading(true);
    FlowService.updateFlow(currentAspect).then((completedAction) => {
      const newArray = aspectFlow.filter(function (aspect) {
        return aspect.id !== completedAction.id;
      });
      newArray.push(completedAction);
      setAspectFlow(newArray);
      // e.currentTarget.checked = false;
      setAspectId(newArray[0].aspectId);

      // lifeUnits
      // updateLifeUnits(setLifeUnits);
      // incrementLifePoints();
    });
    setLoading(false);
  };

  // const handleClaimRewardClick = () => {
  //   const newLifePoints = {
  //     ...lifePoints,
  //   };

  //   if (newLifePoints.earnedRewards > 0) {
  //     newLifePoints.earnedRewards--;
  //     setLifePoints(newLifePoints);
  //   }
  // };

  React.useEffect(() => {
    AspectService.getAspects().then((aspects) => {
      setAspects(aspects);
    });
    // getLifeUnits().then((flowUnits) => {
    //   setLifeUnits(flowUnits);
    // });
    // getLifePoints().then((lifePoints) => {
    //   setLifePoints(lifePoints);
    // });
    FlowService.getFlow().then((aspectFlow) => {
      setAspectFlow(aspectFlow);
      // Sets initial current aspect, syncs selected aspect to other components on load
      // const { aspectId } = state;
      if (!aspectId) {
        setAspectId(aspectFlow[0].aspectId);
      }
      // if (aspectFlow && aspects && lifePoints && lifeUnits ) {
      //   setLoading(false);
      // }
    });
    // eslint-disable-next-line
  }, []);

  return loading ? (
    <LoadingSpinner />
  ) : (
    <>
      <section className={styles.aspectManager}>
        {/* <LifePoints
        lifePoints={lifePoints}
        handleClaimRewardClick={handleClaimRewardClick}
      /> */}
        <div className={styles.container}>
          <LifeFlow
            currentAspect={createCurrentAspectObject()}
            setAspectId={setAspectId}
            handleCompletedClick={handleCompletedClick}
            handleSettingsOffscreenContainer={handleSettingsOffscreenContainer}
          >
            {/* This should be a seperate page */}
            {/* <Drawer
              isVisible={showSettings}
              handleOffscreenContainer={handleSettingsOffscreenContainer}
            >
              <SetFlow flow={aspectFlow} setAspectFlow={setAspectFlow} />
            </Drawer> */}
          </LifeFlow>

          {/* <div className={styles.history}>
          <History array={lifeUnits} type="life" />
        </div> */}
          <AspectList
            aspectId={aspectId}
            setAspectId={setAspectId}
            aspects={aspects}
          />
          {/* <OffscreenContainer
        isVisible={showTodoForm}
        handleOffscreenContainer={handleOffscreenContainer}
      >
        {showTodoForm && (
          <aside>
            <RecurrenceForm form={form} updateForm={updateForm} />
            <TodoForm
              todos={todos}
              setTodos={setTodos}
              aspectId={aspectId}
              createTodo={createTodo}
              form={form}
              updateForm={updateForm}
              handleSubmit={handleSubmit}
            />
          </aside>
        )}
      </OffscreenContainer> */}
        </div>
        <Task foreignId={aspectId} />
        {/* <i
        className="material-icons md-48 btn-add"
        onClick={handleOffscreenContainer}
        title="Click to edit."
      >
        add_circle
      </i> */}
      </section>
    </>
  );
}
