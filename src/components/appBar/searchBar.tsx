import SearchIcon from '@mui/icons-material/Search';
import Autocomplete from '@mui/material/Autocomplete';
import { useAppDispatch, useAppSelector } from '../../store';
import { Search, SearchIconWrapper, StyledInputBase } from './styledComponent';
import { SyntheticEvent } from 'react';
import { getNeighbourhoodLocs } from '../../selectors';
import { updateSearchValue } from '../../reducers/neighbourhoodSlice';

export default function SearchBar() {
  const dispatch = useAppDispatch();
  const neighbourhoodLocs = useAppSelector(getNeighbourhoodLocs);
  const neighbourhoods = Object.keys(neighbourhoodLocs);

  function onChange(event: SyntheticEvent<Element, Event>) {
    if (event.target instanceof HTMLElement) {
      dispatch(updateSearchValue(event.target.innerText));
    }
  }

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <Autocomplete
        id="search-bar-input"
        options={neighbourhoods}
        sx={{ width: 300 }}
        renderInput={params => (
          <StyledInputBase {...params} ref={params.InputProps.ref} placeholder="Search Neighborhoods..." />
        )}
        onChange={event => onChange(event)}
      />
    </Search>
  );
}
