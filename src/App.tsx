import { Map } from './components/map';
import { TopAppBar } from './components/appBar';
import { styled } from '@mui/material/styles';
import { useEffectOnce, useLocalStorage } from 'usehooks-ts';
import { useEffect } from 'react';
import { useAppDispatch } from './store';
import { fetchNeighbourhoodData } from './reducers/neighbourhoodSlice';
import { fetchZoneData } from './reducers/zoneSlice';


const Main = styled('div')({});

export function App() {
  const [searchText, setSearchText] = useLocalStorage('searchText', '');
  const [zone, setZone] = useLocalStorage('zone', 'single');
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(searchText, '- Has changed');
  }, [searchText]);

  useEffect(() => {
    console.log(zone, '- Has changed');
  }, [zone]);

  useEffectOnce(() => {
    dispatch(fetchNeighbourhoodData());
  });

  useEffectOnce(() => {
    dispatch(fetchZoneData());
  });

  return (
    <Main>
      <TopAppBar setSearchBar={setSearchText} />
      <Map setZone={setZone} zoneVar={zone} />
    </Main>
  );
}