const BASE_URL = ' http://localhost:3001';

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

function request(
  url: string,
  method: RequestMethod = 'GET',
  data: any = null, // we can send any data to the server
): Promise<any> {
  const options: RequestInit = { method };

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };
  }

  // we wait for testing purpose to see loaders
  return fetch(BASE_URL + url, options)
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    });
}

export const client = {
  get: (url: string) => request(url),
  post: (url: string, data: any) => request(url, 'POST', data),
  patch: (url: string, data: any) => request(url, 'PATCH', data),
  delete: (url: string) => request(url, 'DELETE'),
};
