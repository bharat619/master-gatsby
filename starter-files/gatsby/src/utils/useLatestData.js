import { useState, useEffect } from 'react';

const gql = String.raw;
const deets = `
    name
    _id
    image {
      asset {
        url
        metadata {
          lqip
        }
      }
    }
`;

export default function useLatestData() {
  // hot slices
  const [hotSlices, setHotSlices] = useState();
  // slicemasters
  const [slicemasters, setSlicemasters] = useState();

  // use a side effect to fetch data from gaphql endpoint

  useEffect(function () {
    // when component loads, fetch the data
    fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: gql`
          query {
            StoreSettings(id: "downtown") {
              name
              slicemasters {
                ${deets}
              }
              hotSlices {
                ${deets}
              }
            }
          }
        `,
      }),
    })
      .then((response) =>
        response.json().then((res) => {
          setHotSlices(res.data.StoreSettings.hotSlices);
          setSlicemasters(res.data.StoreSettings.slicemasters);
        })
      )
      .catch((e) => console.log('SHOOT!! ', e));
  }, []);

  return {
    hotSlices,
    slicemasters,
  };
}