import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "components/common/Button";

import DateDisplay from "components/common/datetime/DateDisplay";

import styles from "./LifeFlow.module.scss";

export default function LifeFlow({
  currentAspect,
  handleSettingsOffscreenContainer,
  handleCompletedClick,
  children,
}) {
  return (
    <section className={styles.lifeFlow}>
      <div className={styles.currentAspect} data-flow={currentAspect.flow}>
        <p className={styles.name}>{currentAspect?.aspect?.name} </p>
        <p className={styles.value}>
          Value: <span>{currentAspect.pointValue}</span> point
          {currentAspect.pointValue !== 1 ? "s" : null}!
        </p>
        <div className={styles.info}>
          <p>
            Duration: <span>{currentAspect.durationInMinutes}</span> minutes
          </p>
          <p>
            Last Completed:{" "}
            {currentAspect.dtCompleted ? (
              <span>
                <DateDisplay>{currentAspect.dtCompleted}</DateDisplay>
              </span>
            ) : null}
          </p>
        </div>
        <Button onClick={(e) => handleCompletedClick(e, currentAspect)}>
          Click to complete
        </Button>
      </div>
      <FontAwesomeIcon
        icon="ellipsis-v"
        onClick={handleSettingsOffscreenContainer}
        title="More..."
      ></FontAwesomeIcon>
      {children}
    </section>
  );
}
