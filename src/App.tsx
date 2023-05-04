import { Map } from './components/map/map';
import { TopAppBar } from './components/appBar';
import { ThemeProvider, styled } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from './store';
import { fetchNeighbourhoodData } from './reducers/neighbourhoodSlice';
import { fetchZoneData } from './reducers/zoneSlice';
import { CircularProgress } from '@mui/material';
import {
  getNeighbourhoodState,
  isPolicyModalOpen,
  getZoneState,
  getNeighbourhoodCenters,
  getNeighbourhoods,
  getTTCState,
  isResultsScreenOpen
} from './selectors';
import PolicyModal from './components/policy-modal/policyModal';
import { useEffect, useState } from 'react';
import { addNeighbourhoodLocation } from './reducers/neighbourhoodSlice';
import { INeighbourhood } from './interfaces/neigbourhood';
import { appTheme } from './theme';
import { fetchTTCData } from './reducers/ttcSlice';
import ResultsModal from './components/results-modal/resultsModal';

const Main = styled('div')({});

export function App() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();
  const zoneState = useAppSelector(getZoneState);
  const neighbourhoodState = useAppSelector(getNeighbourhoodState);
  const ttcState = useAppSelector(getTTCState);
  const centers = useAppSelector(getNeighbourhoodCenters);
  const neighbourhoods = useAppSelector(getNeighbourhoods);
  const renderPolicyModal = useAppSelector(isPolicyModalOpen);
  const renderResultsModal = useAppSelector(isResultsScreenOpen);

  useEffect(() => {
    if (zoneState === 'idle') {
      dispatch(fetchZoneData());
    }

    if (neighbourhoodState === 'idle') {
      dispatch(fetchNeighbourhoodData());
    }

    if (ttcState === 'idle') {
      dispatch(fetchTTCData());
    }

    if (neighbourhoodState === 'succeeded' && Object.keys(centers).length === 0) {
      neighbourhoods.forEach(async value => {
        await dispatch(addNeighbourhoodLocation(value as INeighbourhood));
      });
    }

    if (zoneState === 'succeeded' && neighbourhoodState === 'succeeded' && ttcState === "succeeded") {
      setIsLoading(false);
    }
  }, [dispatch, neighbourhoodState, zoneState, ttcState, centers, neighbourhoods, ]);

  if (isLoading) {
    return (
      <Main>
        <ThemeProvider theme={appTheme}>
          <CircularProgress disableShrink sx={{ position: 'absolute', left: '50%', top: '50%' }} />
        </ThemeProvider>
      </Main>
    );
  }

  return (
    <Main>
      <ThemeProvider theme={appTheme}>
        <TopAppBar />
        {renderPolicyModal ? <PolicyModal/> : null}
        {renderResultsModal ? <ResultsModal/> : null}
        <Map />
      </ThemeProvider>
    </Main>
  );
}
