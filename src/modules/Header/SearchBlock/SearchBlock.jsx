import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../../shared/Button/Button';
import useDebounce from '../../../Hooks/useDebounce';
import { Icon } from '../../../shared/Icons/Icon';
import { Search } from '../../../shared/Search/Search';
import { resetState, setData } from '../../../store/slice/filterSlice';
import { FilterBlock } from '../FilterBlock/FilterBlock';
import styles from './SearchBlock.module.css';
import { getFilter } from '../../../store/selector/selector';

export const SearchBlock = () => {
  const [value, setValue] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [isFilterReset, setIsFilterReset] = useState(false);
  const { sumTo, sumFrom, dateTo, dateFrom, search, select } =
    useSelector(getFilter);

  const checkFilter = () => {
    return (
      !sumTo.length &&
      !sumFrom.length &&
      !dateTo.toString().length &&
      !dateFrom.toString().length &&
      !search.length &&
      !select.length
    );
  };

  const dispatch = useDispatch();

  const debouncedValue = useDebounce(value, 500);
  useEffect(() => {
    dispatch(setData({ key: 'search', value: value.toLowerCase() }));
  }, [debouncedValue]);

  const handleValue = ({ target: { value } }) => {
    setValue(value);
  };

  const handleActive = () => {
    setIsActive(!isActive);
  };

  const handleFilterReset = () => {
    setIsFilterReset(!isFilterReset);
    setValue('');
    dispatch(resetState());
  };

  const handleReset = () => {
    setValue('');
    dispatch(setData({ key: 'search', value: '' }));
  };

  const resetButtonClassName = cn({
    [styles.visible]: checkFilter(),
  });

  return (
    <div>
      <div className={styles.wrapper}>
        <div className={styles.filter}>
          <Search
            value={value}
            onChange={handleValue}
            onReset={handleReset}
            onKeyPress={() => {}}
            placeholder='Номер заказа или ФИО'
          />
          <Button
            size='big'
            mode={isActive ? 'primary' : 'transparent'}
            icon='filter'
            onClick={handleActive}
          >
            Фильтры
          </Button>
          <Button
            className={resetButtonClassName}
            mode='transparent'
            onClick={handleFilterReset}
          >
            Сбросить фильтры
          </Button>
        </div>
        <div className={styles.loadArea}>
          <Icon name='refresh' className={styles.icon} />
          <span className={styles.text}>Загрузка</span>
        </div>
      </div>
      {isActive && <FilterBlock isFilterReset={isFilterReset} />}
    </div>
  );
};
