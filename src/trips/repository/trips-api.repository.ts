import { authFetch } from 'src/common/authFetch';

const TRIPS_API_URL =
  'https://z0qw1e7jpd.execute-api.eu-west-1.amazonaws.com/default/trips';

export const searchTrips = async ({
  origin,
  destination,
}: {
  origin: string;
  destination: string;
}) => {
  return authFetch(
    `${TRIPS_API_URL}?origin=${origin}&destination=${destination}`,
  ).then((res) => res.json());
};
