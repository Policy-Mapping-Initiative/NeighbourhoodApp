import { Map } from './components/map';
import { TopAppBar } from './components/appBar';
import { styled } from '@mui/material/styles';
import { useEffectOnce, useLocalStorage } from 'usehooks-ts';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './store';
import { fetchNeighbourhoodData } from './reducers/neighbourhoodSlice';
import { fetchZoneData } from './reducers/zoneSlice';
import { fetchSupplementalData } from './reducers/supplementSlice';
import { CircularProgress } from '@mui/material';
import './App.css';
import { isNeighbourhoodInitComplete, isZoneInitComplete, isSupplementInitComplete } from './selectors';

const Main = styled('div')({});

export function App() {
  const [searchText, setSearchText] = useLocalStorage('searchText', '');
  const dispatch = useAppDispatch();
  const isZoneLoad = useAppSelector(isZoneInitComplete);
  const isNeighbourhoodLoad = useAppSelector(isNeighbourhoodInitComplete);
  const isSupplementLoad = useAppSelector(isSupplementInitComplete);
  const isLoading = !isNeighbourhoodLoad && !isZoneLoad && !isSupplementLoad;

  useEffect(() => {
    console.log(searchText, '- Has changed');
  }, [searchText]);

  useEffectOnce(() => {
    dispatch(fetchNeighbourhoodData());
  });

  useEffectOnce(() => {
    dispatch(fetchZoneData());
  });

  useEffectOnce(() => {
    dispatch(fetchSupplementalData());
  });

  if (isLoading) {
    return (
      <Main>
        <CircularProgress id="initial-loader" />
      </Main>
    );
  }

  return (
    <Main>
      <TopAppBar setSearchBar={setSearchText} />
      <Map />
    </Main>
  );
}
