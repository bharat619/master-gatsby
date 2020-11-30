import React from 'react';
import useLatestData from '../utils/useLatestData';
import { HomePageGrid } from '../styles/Grids';
import LoadingGrid from '../components/LoadingGrid';
import ItemGrid from '../components/ItemGrid';

function CurrentlySlicing({ slicemasters }) {
  return (
    <div>
      <h2 className="mark tilt">Slicemasters On</h2>
      <p>Standing by... Ready to blaze you up</p>
      {!slicemasters && <LoadingGrid count={4} />}

      {slicemasters && !slicemasters?.length && (
        <p>No One is working right now!!</p>
      )}
      {slicemasters?.length && <ItemGrid items={slicemasters} />}
    </div>
  );
}
function HotSlicing({ hotSlices }) {
  return (
    <div>
      <h2 className="mark tilt">Hot Slices</h2>
      <p>Blaze UP!! Embrace the PIZZA</p>
      {!hotSlices && <LoadingGrid count={4} />}
      {hotSlices && !hotSlices?.length && <p>Nothing hot is cookin!!</p>}

      {hotSlices?.length && <ItemGrid items={hotSlices} />}
    </div>
  );
}

function HomePage() {
  const { hotSlices, slicemasters } = useLatestData();

  return (
    <>
      <div className="center">
        <h1>Best Pizza Downtown</h1>
        <p>Open from 11AM to 11PM every single day!!!</p>
        <HomePageGrid>
          <CurrentlySlicing slicemasters={slicemasters} />
          <HotSlicing hotSlices={hotSlices} />
        </HomePageGrid>
      </div>
    </>
  );
}

export default HomePage;
