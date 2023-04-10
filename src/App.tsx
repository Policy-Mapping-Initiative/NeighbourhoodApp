import { Map } from './components/map';
import { TopAppBar } from './components/appBar';
import { ThemeProvider, styled } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from './store';
import { fetchNeighbourhoodData } from './reducers/neighbourhoodSlice';
import { fetchZoneData } from './reducers/zoneSlice';
import { CircularProgress } from '@mui/material';
import './App.css';
import {
  getNeighbourhoodState,
  isPolicyModalOpen,
  getZoneState,
  getNeighbourhoodCenters,
  getNeighbourhoods,
} from './selectors';
import PolicyModal from './components/policy-modal/policyModal';
import { useEffect, useState } from 'react';
import { addNeighbourhoodLocation } from './reducers/neighbourhoodSlice';
import { INeighbourhood } from './interfaces/neigbourhood';
import { appTheme } from './theme';

const Main = styled('div')({});

export function App() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();
  const zoneState = useAppSelector(getZoneState);
  const neighbourhoodState = useAppSelector(getNeighbourhoodState);
  const centers = useAppSelector(getNeighbourhoodCenters);
  const neighbourhoods = useAppSelector(getNeighbourhoods);
  const renderPolicyModal = useAppSelector(isPolicyModalOpen);

  useEffect(() => {
    if (zoneState === 'idle') {
      dispatch(fetchZoneData());
    }

    if (neighbourhoodState === 'idle') {
      dispatch(fetchNeighbourhoodData());
    }

    if (neighbourhoodState === 'succeeded' && Object.keys(centers).length === 0) {
      Object.values(neighbourhoods).forEach(async value => {
        await dispatch(addNeighbourhoodLocation(value as INeighbourhood));
      });
    }

    if (zoneState === 'succeeded' && neighbourhoodState === 'succeeded') {
      setIsLoading(false);
    }
  }, [dispatch, neighbourhoodState, zoneState, centers, neighbourhoods]);

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
