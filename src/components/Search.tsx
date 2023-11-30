import React from 'react'
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import type { TRootState } from '../redux/store';
import { changeSearchField } from '../redux/actions';

export interface ISearch {
  placeholder?: string
}

export const Search: React.FC<ISearch> = (props) => {
  const useAppSelector : TypedUseSelectorHook<TRootState> = useSelector;
  const { items, loading, error, search } = useAppSelector((state) => state.search);
  const dispatch = useDispatch();
  const hasQuery = search.trim() !== '';

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    dispatch(changeSearchField(value));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  }

  return (
    <form name='search' className='search__form'>
      <input className='search__input' onSubmit={handleSubmit} onChange={handleSearch} 
        required type='text' placeholder={props.placeholder || ''} value={search} 
      />
      <div className='search__status'>
        {!hasQuery && 'Type something to search'}
        {hasQuery && loading && 'searching...'}
        {error && (
          <span className='search__status-error'>
            { `Error occured: ${error}` }
          </span>
        )}
      </div>
      <ul className='search__results'>
        {items.map((item) => (
          <li className='search__results_item' key={item.id}>{item.name}</li>
        ))}
      </ul>
    </form>
  )
}
