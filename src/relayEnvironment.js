import { Environment, Network, Store, RecordSource } from 'relay-runtime';
import { apiUrl } from './config';

const source = new RecordSource();
const store = new Store(source);

export function getEnvironment(reduxStore) {
  // const token =
  //   reduxStore && reduxStore.getState && reduxStore.getState().auth.token;

  const network = Network.create(function(operation, variables) {
    return fetch(apiUrl, {
      method: 'POST',
      headers: {
        // server will substring 4 characters'
        'Content-Type': 'application/json',
        Accept: 'application/json',
        // authorization: token ? `....${token}` : '',
      },
      body: JSON.stringify({
        query: operation.text,
        variables,
      }),
    }).then(res => res.json());
  });

  return new Environment({
    store,
    network,
  });
}
