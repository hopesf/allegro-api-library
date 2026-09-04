# allegro-api-library

Allegro.pl REST wrapper. OAuth token in, offers and categories out.

```bash
npm i allegro-api-library
```

```ts
import allegroApi from 'allegro-api-library';

await allegroApi.initialize(process.env.ALLEGRO_TOKEN);

const categories = await allegroApi.getCategories();
const offer = await allegroApi.getProductByOfferId(id);
await allegroApi.createProduct(payload);
await allegroApi.updateProduct(id, payload);
await allegroApi.publishProduct(payload);
```

Apache-2.0
