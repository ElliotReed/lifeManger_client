import React from 'react';
import  styles from './Heading.module.scss';

const Heading = props => <h4 className={styles.heading}>{props.children}</h4>;

export default Heading;
