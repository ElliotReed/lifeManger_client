import React from 'react';
import './Facet.css';

const Facet = (props) => (
  <section className="facet">
    {props.children}
  </section>
);

export default Facet;
