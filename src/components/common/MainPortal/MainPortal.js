import { createPortal } from "react-dom";

export default function MainPortal({ children }) {
  const mount = document.getElementById("main-portal-root");

  return createPortal(children, mount);
}
