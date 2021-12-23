import Heading from "components/common/Heading";
import Tile from "components/common/Tile";

import styles from "./flow-list.module.scss";

export default function FlowList({ flow }) {
  return (
    <Tile>
      <section className={styles.flowList}>
        <Heading>Life Flow</Heading>
        <ul>
          {flow.map((flowItem) => {
            return <li key={flowItem.id}>{flowItem.aspect.name}</li>;
          })}
        </ul>
      </section>
    </Tile>
  );
}
