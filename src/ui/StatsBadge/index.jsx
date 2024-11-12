import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const StatsBadge = ({ label, value, onClick }) => {
  return (
    <div className={styles.wrapper} onClick={onClick} style={{ cursor: 'pointer' }}>
      <span className={`${styles.block} ${styles.label}`}>{label}</span>
      <span className={styles.block}>{value}</span>
    </div>
  );
};

StatsBadge.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onClick: PropTypes.func, 
};

export default StatsBadge;
