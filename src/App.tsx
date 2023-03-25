import { Map } from './components/map';
import { TopAppBar } from './components/appBar';
import { styled } from '@mui/material/styles';
import { useLocalStorage } from 'usehooks-ts';
import { Component, useEffect } from 'react';
import { fetchNeighbourhoodData } from './reducers/neighbourhoodSlice';
import { fetchZoneData } from './reducers/zoneSlice';
import { useAppDispatch } from './store';

const Main = styled('div')({});

export default class App extends Component {

  dispatch = useAppDispatch()

  componentDidMount(): void {
    this.dispatch(fetchNeighbourhoodData);
    this.dispatch(fetchZoneData);
  }

  render() {
    // TODO: functional com
    //const [searchText, setSearchText] = useLocalStorage('searchText', '');
    //const [zone, setZone] = useLocalStorage('zone', 'single');
    
    return (
      <Main>
        <TopAppBar setSearchBar={this.dispatchsetSearchText} />
        <Map setZone={setZone} zoneVar={zone} />
      </Main>
    );
  }
}
