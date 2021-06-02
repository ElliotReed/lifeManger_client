import DateDisplay from "components/common/datetime/DateDisplay";

import Heading from "components/common/Heading";

import styles from "./LifeFlow.module.scss";

export default function LifeFlow({
  currentAspect,
  handleSettingsOffscreenContainer,
  handleCompletedClick,
  children,
}) {
  return (
    <section className={styles.lifeFlow}>
      <div className={styles.currentAspect}>
        <Heading>Current</Heading>
        <div>
          <h3>{currentAspect?.aspect?.name}</h3>
          <div>
            <p>
              Value: {currentAspect.pointValue} point
              {currentAspect.pointValue !== 1 ? "s" : null}!
            </p>
            <div>
              Duration: <span>{currentAspect.durationInMinutes}</span> minutes
            </div>
            {console.log("currenAspect: ", currentAspect)}
            <div>
              Last Completed:{" "}
              {currentAspect.dtCompleted ? (
                <span>
                  <DateDisplay>{currentAspect.dtCompleted}</DateDisplay>
                </span>
              ) : null}
            </div>
          </div>
          <button onClick={(e) => handleCompletedClick(e, currentAspect)}>
            Click to complete
          </button>
        </div>
      </div>
      <i
        className="material-icons md-24 btn-settings"
        onClick={handleSettingsOffscreenContainer}
        title="More..."
      >
        more_vert
      </i>
      {children}
    </section>
  );
}
