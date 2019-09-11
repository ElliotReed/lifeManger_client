import React from 'react';
import './ScrollBox.css';

export default function ScrollBox(props) {
  return (
    <div className="scrollbox">{props.children}</div>
  );
}