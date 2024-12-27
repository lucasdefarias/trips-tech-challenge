import { searchTrips } from './trips-api.repository';
import { authFetch } from '../../common/authFetch';
import { HttpError, ErrorMessage } from '../../common/error';

jest.mock('../../common/authFetch');

describe('searchTrips', () => {
  const origin = 'NYC';
  const destination = 'LAX';

  it('should return trips data for a valid request', async () => {
    const mockResponse = {
      status: 200,
      json: jest.fn().mockResolvedValue({ trips: [] }),
    };
    (authFetch as jest.Mock).mockResolvedValue(mockResponse);

    const result = await searchTrips({ origin, destination });

    expect(authFetch).toHaveBeenCalledWith(
      `https://z0qw1e7jpd.execute-api.eu-west-1.amazonaws.com/default/trips?origin=${origin}&destination=${destination}`,
    );
    expect(result).toEqual({ trips: [] });
  });

  it('should throw an HttpError with code 403 for unauthorized request', async () => {
    const mockResponse = { status: 403 };
    (authFetch as jest.Mock).mockResolvedValue(mockResponse);

    await expect(searchTrips({ origin, destination })).rejects.toThrow(
      HttpError,
    );
    await expect(searchTrips({ origin, destination })).rejects.toThrowError(
      new HttpError(403, ErrorMessage.UNAUTHORIZED),
    );
  });

  it('should throw an HttpError with code 400 for invalid request', async () => {
    const mockResponse = { status: 400 };
    (authFetch as jest.Mock).mockResolvedValue(mockResponse);

    await expect(searchTrips({ origin, destination })).rejects.toThrow(
      HttpError,
    );
    await expect(searchTrips({ origin, destination })).rejects.toThrowError(
      new HttpError(400, ErrorMessage.INVALID_REQUEST),
    );
  });

  it('should throw an HttpError with code 400 for other client errors', async () => {
    const mockResponse = { status: 404 };
    (authFetch as jest.Mock).mockResolvedValue(mockResponse);

    await expect(searchTrips({ origin, destination })).rejects.toThrow(
      HttpError,
    );
    await expect(searchTrips({ origin, destination })).rejects.toThrowError(
      new HttpError(400, ErrorMessage.INVALID_REQUEST),
    );
  });
});
