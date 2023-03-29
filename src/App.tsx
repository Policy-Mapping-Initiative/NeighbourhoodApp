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
import { isNeighbourhoodInitComplete, isPolicyModalOpen, isZoneInitComplete } from './selectors';
import PolicyModal from './components/policy-modal/policyModal';

const Main = styled('div')({});

export function App() {
  const [searchText, setSearchText] = useLocalStorage('searchText', '');
  const dispatch = useAppDispatch();
  const isZoneLoad = useAppSelector(isZoneInitComplete);
  const isNeighbourhoodLoad = useAppSelector(isNeighbourhoodInitComplete);
  const isLoading = !isNeighbourhoodLoad && !isZoneLoad;
  const renderPolicyModal = useAppSelector(isPolicyModalOpen);
  console.log(`Render Policy Modal ${renderPolicyModal}`)

  useEffect(() => {
    console.log(searchText, '- Has changed');
  }, [searchText]);


  
  useEffectOnce(() => {
    dispatch(fetchNeighbourhoodData());
  });

  useEffectOnce(() => {
    dispatch(fetchZoneData());
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
      {renderPolicyModal ? <PolicyModal/> : null}
      <Map />
    </Main>
  );
}
