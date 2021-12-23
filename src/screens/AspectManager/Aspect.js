import Heading from "components/common/Heading";
import Tile from "components/common/Tile";

import styles from "./aspect.module.scss";

// data
import { lifeAspects } from "data/data";

export default function Aspect({
  AspectFlowState,
  saveAspectFlowState,
  getAspectName,
}) {
  return (
    <Tile>
      <div className={styles.aspectList}>
        <Heading>Your life aspects</Heading>
        {/* // Display, add, Aspect Items */}
        <ul>
          {lifeAspects.map((aspect) => {
            return <li key={aspect.id}>{aspect.name}</li>;
          })}
        </ul>
      </div>
    </Tile>
  );
}
