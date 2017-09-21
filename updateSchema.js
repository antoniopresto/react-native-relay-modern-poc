import fetch from 'isomorphic-fetch';
import { printSchema, introspectionQuery, buildClientSchema } from 'graphql';
import { apiUrl } from './src/config';
import path from 'path';
import fs from 'fs';

fetch(apiUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ query: introspectionQuery }),
})
  .then(res => res.json())
  .then(res => {
    if (res.error) return console.warn(res.error);

    const schema = buildClientSchema(res.data);
    fs.writeFileSync(
      path.join(process.cwd(), './schema.graphql'),
      printSchema(schema),
    );

    fs.writeFileSync(
      path.join(process.cwd(), './schema.json'),
      JSON.stringify(res, null, 2),
    );
  });
