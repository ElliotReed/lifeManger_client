import style from "./max-width-container.module.scss";

export default function MaxWidthContainer({ children }) {
  return <div className={style.container}>{children}</div>;
}
