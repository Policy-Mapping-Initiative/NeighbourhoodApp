import { Map } from './components/map';
import { TopAppBar } from './components/appBar';
import { styled } from '@mui/material/styles';
import { useEffectOnce } from 'usehooks-ts';
import { useAppDispatch, useAppSelector } from './store';
import { fetchNeighbourhoodData } from './reducers/neighbourhoodSlice';
import { fetchZoneData } from './reducers/zoneSlice';
import { CircularProgress } from '@mui/material';
import './App.css';
import { isNeighbourhoodInitComplete, isPolicyModalOpen, isZoneInitComplete } from './selectors';
import PolicyModal from './components/policy-modal/policyModal';

const Main = styled('div')({});

export function App() {
  const dispatch = useAppDispatch();
  const isZoneLoad = useAppSelector(isZoneInitComplete);
  const isNeighbourhoodLoad = useAppSelector(isNeighbourhoodInitComplete);
  const isLoading = !isNeighbourhoodLoad && !isZoneLoad;
  const renderPolicyModal = useAppSelector(isPolicyModalOpen);
  console.log(`Render Policy Modal ${renderPolicyModal}`);

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
      <TopAppBar />
      {renderPolicyModal ? <PolicyModal /> : null}
      <Map />
    </Main>
  );
}
