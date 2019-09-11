import React from 'react';
import './OffscreenContainer.css';

function OffscreenContainer(props) {
  const { isVisible, children } = props;
  let classNames = 'offscreen-container';
  const show = 'offscreen-container-show';

  if (isVisible) {
    classNames += ` ${show}`;
  };
  return (
    <div className={classNames}>
      {children}
    </div>
  );
}

export default OffscreenContainer;