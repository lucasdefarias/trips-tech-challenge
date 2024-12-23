export const authFetch = (url, options?) => {
  return fetch(url, {
    ...(options ? options : {}),
    headers: {
      ...(options?.headers ? options.headers : {}),
      'x-api-key': process.env.API_KEY,
    },
  });
};
