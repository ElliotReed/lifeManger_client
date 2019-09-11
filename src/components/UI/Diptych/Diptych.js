import React from 'react';
import './Diptych.css';

const Diptych = (props) => {
  const {
    facet,
    selector,
    view,
  } = props;

  let className = 'diptych';

  if (view) {
    className += ` ${view}`;
  };

  return (
    <main className={className}>
      <div className="diptych__selector">
        {selector}
      </div>
      <div className="diptych__facet">
        {facet}
      </div>
    </main>
  );
}

export default Diptych;
