import SearchIcon from '@mui/icons-material/Search';
import { TopAppBarProps } from './index';
import { Search, SearchIconWrapper, StyledInputBase } from '../../styles';

export default function SearchBar(props: TopAppBarProps) {
  function handleUserInput(event: any) {
    if (event.keyCode === 13) {
      props.setSearchBar(event.target.value);
    }
  }

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search Neighborhoods..."
        inputProps={{ 'aria-label': 'search' }}
        onKeyDown={handleUserInput}
      />
    </Search>
  );
}
