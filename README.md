# allegro-api-library

A ready-to-use Node.js / TypeScript SDK for the Allegro marketplace REST API. Includes OAuth2 authentication, sandbox environment support, and all core seller operations.

## Installation

```bash
npm install allegro-api-library
```

## Quick Start

```typescript
import allegroApi from 'allegro-api-library';

// Initialize in production
await allegroApi.initialize('YOUR_ACCESS_TOKEN');

// Initialize in sandbox
await allegroApi.initialize('YOUR_ACCESS_TOKEN', { environment: 'sandbox' });

// List offers
const offers = await allegroApi.getOffers({ limit: '20', offset: '0' });

// Get current user info
const me = await allegroApi.getUserInfo();
```

## OAuth2 Authentication

### Client Credentials (Server-side)

For background operations that don't require user interaction:

```typescript
import { getClientCredentialsToken } from 'allegro-api-library';

const token = await getClientCredentialsToken(
  'YOUR_CLIENT_ID',
  'YOUR_CLIENT_SECRET',
  'production' // or 'sandbox'
);

await allegroApi.initialize(token.access_token);
```

### Authorization Code (User Authorization)

```typescript
import {
  getAuthorizationUrl,
  exchangeCodeForToken,
  refreshAccessToken
} from 'allegro-api-library';

// Step 1: Redirect the user to the authorization page
const authUrl = getAuthorizationUrl(
  'YOUR_CLIENT_ID',
  'https://yourapp.com/callback',
  'production'
);
// → redirect the user to authUrl

// Step 2: Exchange the code received in the callback for a token
const token = await exchangeCodeForToken(
  'YOUR_CLIENT_ID',
  'YOUR_CLIENT_SECRET',
  req.query.code,
  'https://yourapp.com/callback'
);

await allegroApi.initialize(token.access_token);

// Refresh the token
const newToken = await refreshAccessToken(
  'YOUR_CLIENT_ID',
  'YOUR_CLIENT_SECRET',
  token.refresh_token!
);
```

## Sandbox Environment

Allegro Sandbox lets you test without affecting your production data. Create a sandbox account at the [Allegro Developer Portal](https://developer.allegro.pl).

```typescript
import { getClientCredentialsToken } from 'allegro-api-library';

const token = await getClientCredentialsToken(
  'SANDBOX_CLIENT_ID',
  'SANDBOX_CLIENT_SECRET',
  'sandbox'
);

await allegroApi.initialize(token.access_token, { environment: 'sandbox' });
```

## API Reference

### `allegroApi.initialize(accessToken, options?)`

| Parameter | Type | Description |
|-----------|------|-------------|
| `accessToken` | `string` | Allegro OAuth2 access token |
| `options.environment` | `'production' \| 'sandbox'` | Target environment (default: `'production'`) |

---

### Offers

| Method | Description |
|--------|-------------|
| `getOffers(params?)` | List seller's offers |
| `getOfferByOfferId(offerId)` | Get an offer by ID |
| `createOffer(values)` | Create a new offer |
| `updateOffer(offerId, values)` | Update an offer (PATCH) |
| `deleteOffer(offerId)` | Delete an offer |
| `publishOffer(commandId, values)` | Publish an offer with a given command ID |
| `publishOfferWithNewCommandId(values)` | Publish an offer with an auto-generated UUID |
| `uploadPhoto(buffer, contentType?)` | Upload an image |

### Categories

| Method | Description |
|--------|-------------|
| `getCategories(parentId?)` | List categories |
| `getCategoryById(categoryId)` | Get a category by ID |
| `getCategoryParameters(categoryId)` | Get parameters for a category |

### Warranties

| Method | Description |
|--------|-------------|
| `getWarranties()` | List warranty documents |
| `getWarrantyById(warrantyId)` | Get a warranty by ID |
| `createWarranty(values)` | Create a new warranty |
| `updateWarranty(warrantyId, values)` | Update a warranty |

### Shipping & Delivery

| Method | Description |
|--------|-------------|
| `getDeliveryMethods()` | List available delivery methods |
| `getShippingRates()` | List shipping rate sets |
| `getShippingRateById(shippingRateId)` | Get a shipping rate set by ID |

### Payments

| Method | Description |
|--------|-------------|
| `getPaymentOperations(params?)` | List payment operations |

### Order Management

| Method | Description |
|--------|-------------|
| `getOrders(params?)` | List orders |
| `getOrderById(orderId)` | Get an order by ID |
| `getOrderItems(orderId)` | Get line items for an order |

### Offer Publication Commands

| Method | Description |
|--------|-------------|
| `getOfferPublicationCommandById(commandId)` | Get a publication command by ID |
| `getOfferPublicationCommandTasks(commandId)` | Get tasks for a publication command |

### Offer Events

| Method | Description |
|--------|-------------|
| `getOfferEvents(params?)` | Get the offer event log |

### Disputes

| Method | Description |
|--------|-------------|
| `getDisputes(params?)` | List disputes |
| `getDisputeById(disputeId)` | Get a dispute by ID |

### User

| Method | Description |
|--------|-------------|
| `getUserInfo()` | Get the currently authenticated user's info |

---

## License

ISC © [Selim Geçin](https://github.com/hopesf)
