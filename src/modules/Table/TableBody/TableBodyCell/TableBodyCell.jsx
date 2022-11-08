import React from 'react';
import styles from './TableBodyCell.module.css';
import cn from 'classnames';
import { CheckBox } from '../../../../shared/Checkbox/Checkbox';

export const TableBodyCell = ({ className, children, checkbox, onClick }) => {
  const cellClassName = cn(styles.wrapper, className);

  return (
    <div className={cellClassName}>
      <div className={styles.area}>
        {checkbox && <CheckBox onClick={onClick} />}
        <span className={styles.text}>{children}</span>
      </div>
    </div>
  );
};
