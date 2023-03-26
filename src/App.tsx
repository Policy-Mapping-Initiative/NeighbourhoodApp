import { Map } from './components/map';
import { TopAppBar } from './components/appBar';
import { styled } from '@mui/material/styles';
import { useEffectOnce, useLocalStorage } from 'usehooks-ts';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './store';
import { fetchNeighbourhoodData } from './reducers/neighbourhoodSlice';
import { fetchZoneData } from './reducers/zoneSlice';
import { CircularProgress } from '@mui/material';
import './App.css';
import { isNeighbourhoodInitComplete, isZoneInitComplete } from './selectors';

const Main = styled('div')({});

export function App() {
  const [searchText, setSearchText] = useLocalStorage('searchText', '');
  const [zone, setZone] = useLocalStorage('zone', 'single');
  const dispatch = useAppDispatch();
  const isZoneLoad = useAppSelector(isZoneInitComplete);
  const isNeighbourhoodLoad = useAppSelector(isNeighbourhoodInitComplete);
  const isLoading = !isNeighbourhoodLoad && !isZoneLoad;

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
      {isLoading ? <CircularProgress id="initial-loader" /> : null}
      <TopAppBar setSearchBar={setSearchText} />
      <div className={isLoading ? 'blurred' : 'unblurred'}>
        <Map setZone={setZone} zoneVar={zone} />
      </div>
    </Main>
  );
}
