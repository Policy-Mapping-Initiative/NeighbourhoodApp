import { Map } from './components/map';
import { TopAppBar } from './components/appBar';
import { ThemeProvider, styled } from '@mui/material/styles';
import { useEffectOnce } from 'usehooks-ts';
import { useAppDispatch, useAppSelector } from './store';
import { fetchNeighbourhoodData } from './reducers/neighbourhoodSlice';
import { fetchZoneData } from './reducers/zoneSlice';
import { CircularProgress } from '@mui/material';
import './App.css';
import { isNeighbourhoodInitComplete, isPolicyModalOpen, isZoneInitComplete } from './selectors';
import PolicyModal from './components/policy-modal/policyModal';
import { appTheme } from './theme';

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
        <ThemeProvider theme={appTheme}>
          <CircularProgress id="initial-loader" />
        </ThemeProvider>
      </Main>
    );
  }

  return (
    <Main>
      <ThemeProvider theme={appTheme}>
        <TopAppBar />
        {renderPolicyModal ? <PolicyModal /> : null}
        <Map />
      </ThemeProvider>
    </Main>
  );
}
