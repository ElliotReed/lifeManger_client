import classNames from "classnames";

import Background from "components/common/Background";

import styles from "./aspect-list.module.scss";

export default function AspectList({ aspectId, setAspectId, aspects }) {
  function setRotation(index) {
    const numberOfAspects = aspects.length;
    const degrees = (360 / numberOfAspects) * index;

    const aspectStyle = {
      rotator: { transform: `translate(-50%, -50%) rotate(${degrees}deg)` },
      li: { transform: `translate(-50%, -50%) rotate(-${degrees}deg)` },
    };
    return aspectStyle;
  }

let labelStyle = styles.label

  return (
    <section className={styles.list}>
      <ul>
        <Background size={1} />
        {aspects.map((aspect, index) => {
          const aspectStyle = setRotation(index);
          return (
            <div
              className={styles.rotator}
              key={aspect.id}
              style={aspectStyle.rotator}
            >
              <li
                className={aspectId === aspect.id ? styles.selected : null}
                onClick={() => setAspectId(aspect.id)}
                style={aspectStyle.li}
                tabIndex="0"
              >
                <span className={classNames(styles.label, aspectId === aspect.id ? styles.selectedLabel : null)}>{aspect.name} life</span>
              </li>
            </div>
          );
        })}
      </ul>
    </section>
  );
}
