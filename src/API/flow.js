import { lifeAspects, initialAspectFlow } from "data";

// aspects
export async function getAspects() {
  if (!localStorage.getItem("aspect")) {
    localStorage.setItem("aspect", JSON.stringify(lifeAspects));
  }
  const aspects = JSON.parse(localStorage.getItem("aspect"));
  const sorted = aspects.sort((a, b) => {
    a = a.name;
    b = b.name;
    return a > b ? 1 : a < b ? -1 : 0;
  });
  return sorted;
}

export function storeAspects(aspect) {
  localStorage.setItem("aspect", JSON.stringify(aspect));
}

// aspectFlow
export async function getAspectFlow() {
  if (!localStorage.getItem("aspect_flow")) {
    storeAspectFlow(initialAspectFlow);
  }
  return sortAspectFlow(JSON.parse(localStorage.getItem("aspect_flow")));
}

export function storeAspectFlow(aspectFlow) {
  localStorage.setItem("aspect_flow", JSON.stringify(aspectFlow));
}

export function sortAspectFlow(aspectFlow) {
  return aspectFlow.sort(function (a, b) {
    a = new Date(a.dateCompleted);
    b = new Date(b.dateCompleted);
    return a > b ? -1 : a < b ? 1 : 0;
  });
}

// lifeflow_units
export async function getLifeUnits() {
  if (!localStorage.getItem("flow_units")) {
    return [];
  }
  return JSON.parse(localStorage.getItem("flow_units"));
}

export function storeLifeUnits(units) {
  localStorage.setItem("flow_units", JSON.stringify(units));
}

// test

// lifePoints
export async function getLifePoints() {
  if (!localStorage.getItem("life_points")) {
    storeLifePoints({
      earnedPoints: 0,
      earnedRewards: 0,
      rewardThreshold: 5,
    });
  }
  return JSON.parse(localStorage.getItem("life_points"));
}

export function storeLifePoints(points) {
  localStorage.setItem("life_points", JSON.stringify(points));
}
// todos
export function createTodo(todo, todos, setTodos) {
  const id = todos ? todos.length + 1 : 1;
  const newTodo = {
    ...todo,
    id: id,
    date_completed: null,
  };

  if (newTodo.name.length > 0) {
    const newTodos = todos ? [...todos, newTodo] : newTodo;
    setTodos(newTodos);
    storeTodos(newTodos);
  }
}

export async function getTodos() {
  if (!localStorage.getItem("todos")) {
    return [];
  } else {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (!todos.length > 1) {
      return todos;
    } else {
      return sortTodos(todos);
    }
  }
}

export function storeTodos(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function sortTodos(todos) {
  return todos
    .sort(function (a, b) {
      a = new Date(a.date_to_start);
      b = new Date(b.date_to_start);
      return a > b ? 1 : a < b ? -1 : 0;
    })
    .sort((a, b) => {
      return a.completed === b.completed ? 0 : a.completed ? 1 : -1;
    });
}
