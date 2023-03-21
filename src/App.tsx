import { Map } from './components/map';
import { TopAppBar } from './components/appBar';
import { styled } from '@mui/material/styles';
import { useElementSize, useLocalStorage } from 'usehooks-ts';
import { useEffect } from 'react';

const Main = styled('div')({});

export function App() {
  const [containerRef, { width, height }] = useElementSize();
  const [searchText, setSearchText] = useLocalStorage('searchText', '');
  const [zone, setZone] = useLocalStorage('zone', 'single');

  useEffect(() => {
    console.log(searchText, '- Has changed');
  }, [searchText]);

  useEffect(() => {
    console.log(zone, '- Has changed');
  }, [zone]);

  return (
    <Main>
      <TopAppBar setSearchBar={setSearchText} />
      <Map parentSizeRef={containerRef} setZone={setZone} zoneVar={zone} />
    </Main>
  );
}
