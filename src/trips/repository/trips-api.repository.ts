import { authFetch } from '../../common/authFetch';
import { ErrorMessage, HttpError } from '../../common/error';

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
  ).then((res) => {
    const { status } = res;
    if (status === 403) {
      throw new HttpError(403, ErrorMessage.UNAUTHORIZED);
    } else if (status >= 400 && status < 500) {
      throw new HttpError(400, ErrorMessage.INVALID_REQUEST);
    }
    return res.json();
  });
};
