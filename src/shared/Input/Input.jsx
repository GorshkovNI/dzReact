import React from 'react';
import styles from './Input.module.css';
import cn from 'classnames';
import { Icon } from '../Icons/Icon';

const noop = () => {};

export const Input = ({
  placeholder,
  prefix,
  className,
  incorrect = true,
  disabled,
  value,
  nameIcon,
  onChange = noop,
  mode,
  readOnly = false,
  ...props
}) => {
  const containerClassname = cn(styles.container, className, {
    [styles.disabled]: disabled,
    [styles.incorrect]: !incorrect && !disabled,
  });
  const iconClassName = cn(styles.actionIcon, {
    [styles.up]: props.rotate,
  });

  return (
    <div className={containerClassname} onClick={props.onVisible}>
      <div className={styles.area}>
        <span className={styles.label}>{prefix}</span>
        <input
          className={styles.input}
          type='text'
          placeholder={placeholder}
          disabled={disabled}
          value={mode ? mode(value) : value}
          maxLength={props.maxlength}
          onChange={onChange}
          readOnly={readOnly}
        />
        {!disabled && !!value && (
          <button className={styles.buttonAction} onClick={props.onReset}>
            <Icon name={nameIcon} className={iconClassName} />
          </button>
        )}
        {disabled && <Icon name='locked' className={styles.IconDisabled} />}
      </div>
    </div>
  );
};
