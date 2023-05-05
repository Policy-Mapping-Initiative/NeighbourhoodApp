import SearchIcon from '@mui/icons-material/Search';
import Autocomplete from '@mui/material/Autocomplete';
import { useAppDispatch, useAppSelector } from '../../store';
import { Search, SearchIconWrapper, StyledInputBase } from './styledComponent';
import { SyntheticEvent } from 'react';
import { getNeighbourhoods, getNameMap } from '../../selectors';
import { updateSelectedId } from '../../reducers/neighbourhoodSlice';

export default function SearchBar() {
  const dispatch = useAppDispatch();
  const neighbourhoods = useAppSelector(getNeighbourhoods);
  const nameToId = useAppSelector(getNameMap);
  const neighbourhoodNames = neighbourhoods.map(elem => elem.properties.name);

  function onChange(event: SyntheticEvent<Element, Event>) {
    if (event.target instanceof HTMLElement) {
      dispatch(updateSelectedId(nameToId[event.target.innerText]));
    }
  }

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <Autocomplete
        id="search-bar-input"
        options={neighbourhoodNames}
        sx={{ width: 300 }}
        renderInput={params => (
          <StyledInputBase {...params} ref={params.InputProps.ref} placeholder="Search Neighborhoods..." />
        )}
        onChange={event => onChange(event)}
      />
    </Search>
  );
}
