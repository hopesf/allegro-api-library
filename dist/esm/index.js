import axios from 'axios';
import { v4 } from 'uuid';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

const generateHeaders = (token, contentType) => {
    return {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.allegro.public.v1+json",
        "Content-Type": contentType,
    };
};

const ALLEGRO_API_URL = "https://api.allegro.pl";
const ALLEGRO_SANDBOX_API_URL = "https://api.allegro.pl.allegrosandbox.pl";
const ALLEGRO_UPLOAD_URL = "https://upload.allegro.pl";
const ALLEGRO_SANDBOX_UPLOAD_URL = "https://upload.allegro.pl.allegrosandbox.pl";
const ALLEGRO_AUTH_URL = "https://allegro.pl";
const ALLEGRO_SANDBOX_AUTH_URL = "https://allegro.pl.allegrosandbox.pl";
const headerJson = "application/vnd.allegro.public.v1+json";

const allegroApi = {
    headerConfig: null,
    initialized: false,
    environment: "production",
    get baseUrl() {
        return this.environment === "sandbox" ? ALLEGRO_SANDBOX_API_URL : ALLEGRO_API_URL;
    },
    initialize(accessToken, options) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (!accessToken) {
                throw new Error("Access token is required.");
            }
            this.environment = (_a = options === null || options === void 0 ? void 0 : options.environment) !== null && _a !== void 0 ? _a : "production";
            this.headerConfig = generateHeaders(accessToken, headerJson);
            this.initialized = true;
        });
    },
    makeRequest(_a) {
        return __awaiter(this, arguments, void 0, function* ({ url, body = null, method = "GET" }) {
            var _b;
            if (!this.initialized) {
                throw new Error("Allegro API is not initialized. Please call initialize() first.");
            }
            try {
                if (method === "DELETE") {
                    const { data } = yield axios.delete(url, { headers: this.headerConfig });
                    return data;
                }
                if (method === "PUT") {
                    const { data } = yield axios.put(url, body, { headers: this.headerConfig });
                    return data;
                }
                if (method === "PATCH") {
                    const { data } = yield axios.patch(url, body, { headers: this.headerConfig });
                    return data;
                }
                if (body !== null) {
                    const { data } = yield axios.post(url, body, { headers: this.headerConfig });
                    return data;
                }
                const { data } = yield axios.get(url, { headers: this.headerConfig });
                return data;
            }
            catch (error) {
                if ((_b = error === null || error === void 0 ? void 0 : error.response) === null || _b === void 0 ? void 0 : _b.data) {
                    throw error.response.data;
                }
                throw error;
            }
        });
    },
    getOffers(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = params ? `?${new URLSearchParams(params).toString()}` : "";
            return yield this.makeRequest({ url: `${this.baseUrl}/sale/offers${query}` });
        });
    },
    getOfferByOfferId(offerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest({ url: `${this.baseUrl}/sale/product-offers/${offerId}` });
        });
    },
    createOffer(values) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest({ body: values, method: "POST", url: `${this.baseUrl}/sale/product-offers` });
        });
    },
    deleteOffer(offerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest({ method: "DELETE", url: `${this.baseUrl}/sale/offers/${offerId}` });
        });
    },
    updateOffer(offerId, values) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest({
                body: values,
                method: "PATCH",
                url: `${this.baseUrl}/sale/product-offers/${offerId}`,
            });
        });
    },
    publishOffer(commandId, values) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${this.baseUrl}/sale/offer-publication-commands/${commandId}`;
            return yield this.makeRequest({ body: values, method: "PUT", url });
        });
    },
    publishOfferWithNewCommandId(values) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${this.baseUrl}/sale/offer-publication-commands/${v4()}`;
            return yield this.makeRequest({ body: values, method: "PUT", url });
        });
    },
    uploadPhoto(imageBuffer_1) {
        return __awaiter(this, arguments, void 0, function* (imageBuffer, contentType = "image/jpeg") {
            var _a;
            if (!this.initialized) {
                throw new Error("Allegro API is not initialized. Please call initialize() first.");
            }
            // Image uploads are served from a dedicated upload host, not the main API host.
            const uploadBase = this.environment === "sandbox" ? ALLEGRO_SANDBOX_UPLOAD_URL : ALLEGRO_UPLOAD_URL;
            const headers = Object.assign(Object.assign({}, this.headerConfig), { "Content-Type": contentType });
            try {
                const { data } = yield axios.post(`${uploadBase}/sale/images`, imageBuffer, { headers });
                return data;
            }
            catch (error) {
                if ((_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data) {
                    throw error.response.data;
                }
                throw error;
            }
        });
    },
    getCategories(parentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = parentId ? `?parent.id=${parentId}` : "";
            return yield this.makeRequest({ url: `${this.baseUrl}/sale/categories${query}` });
        });
    },
    getCategoryById(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest({ url: `${this.baseUrl}/sale/categories/${categoryId}` });
        });
    },
    getCategoryParameters(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest({ url: `${this.baseUrl}/sale/categories/${categoryId}/parameters` });
        });
    },
    getWarranties() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest({ url: `${this.baseUrl}/after-sales-service-conditions/warranties` });
        });
    },
    getWarrantyById(warrantyId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest({ url: `${this.baseUrl}/after-sales-service-conditions/warranties/${warrantyId}` });
        });
    },
    createWarranty(values) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest({ body: values, method: "POST", url: `${this.baseUrl}/after-sales-service-conditions/warranties` });
        });
    },
    updateWarranty(warrantyId, values) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest({
                body: values,
                method: "PUT",
                url: `${this.baseUrl}/after-sales-service-conditions/warranties/${warrantyId}`,
            });
        });
    },
    getDeliveryMethods() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest({ url: `${this.baseUrl}/sale/delivery-methods` });
        });
    },
    getShippingRates() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest({ url: `${this.baseUrl}/sale/shipping-rates` });
        });
    },
    getShippingRateById(shippingRateId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest({ url: `${this.baseUrl}/sale/shipping-rates/${shippingRateId}` });
        });
    },
    getPaymentOperations(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = params ? `?${new URLSearchParams(params).toString()}` : "";
            return yield this.makeRequest({ url: `${this.baseUrl}/payments/payment-operations${query}` });
        });
    },
    getOfferPublicationCommandById(offerPublicationCommandId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest({
                url: `${this.baseUrl}/sale/offer-publication-commands/${offerPublicationCommandId}`,
            });
        });
    },
    getOfferPublicationCommandTasks(offerPublicationCommandId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest({
                url: `${this.baseUrl}/sale/offer-publication-commands/${offerPublicationCommandId}/tasks`,
            });
        });
    },
    getOfferEvents(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = params ? `?${new URLSearchParams(params).toString()}` : "";
            return yield this.makeRequest({ url: `${this.baseUrl}/sale/offer-events${query}` });
        });
    },
    getOrders(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = params ? `?${new URLSearchParams(params).toString()}` : "";
            return yield this.makeRequest({ url: `${this.baseUrl}/order/checkout-forms${query}` });
        });
    },
    getOrderById(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest({ url: `${this.baseUrl}/order/checkout-forms/${orderId}` });
        });
    },
    getOrderShipments(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest({ url: `${this.baseUrl}/order/checkout-forms/${orderId}/shipments` });
        });
    },
    getIssues(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = params ? `?${new URLSearchParams(params).toString()}` : "";
            return yield this.makeRequest({ url: `${this.baseUrl}/sale/issues${query}` });
        });
    },
    getIssueById(issueId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest({ url: `${this.baseUrl}/sale/issues/${issueId}` });
        });
    },
    getUserInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.makeRequest({ url: `${this.baseUrl}/me` });
        });
    },
};

function getAuthBaseUrl(environment = "production") {
    return environment === "sandbox" ? ALLEGRO_SANDBOX_AUTH_URL : ALLEGRO_AUTH_URL;
}
function buildBasicAuthHeader(clientId, clientSecret) {
    const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
    return `Basic ${credentials}`;
}
/**
 * Client Credentials Flow — sunucu tarafı uygulamalar için
 */
function getClientCredentialsToken(clientId_1, clientSecret_1) {
    return __awaiter(this, arguments, void 0, function* (clientId, clientSecret, environment = "production") {
        const url = `${getAuthBaseUrl(environment)}/auth/oauth/token`;
        const { data } = yield axios.post(url, new URLSearchParams({ grant_type: "client_credentials" }), {
            headers: {
                Authorization: buildBasicAuthHeader(clientId, clientSecret),
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        return data;
    });
}
/**
 * Authorization Code Flow — adım 1: kullanıcıyı bu URL'e yönlendir
 */
function getAuthorizationUrl(clientId, redirectUri, environment = "production") {
    const base = getAuthBaseUrl(environment);
    const params = new URLSearchParams({
        response_type: "code",
        client_id: clientId,
        redirect_uri: redirectUri,
    });
    return `${base}/auth/oauth/authorize?${params.toString()}`;
}
/**
 * Authorization Code Flow — adım 2: kodu token ile değiştir
 */
function exchangeCodeForToken(clientId_1, clientSecret_1, code_1, redirectUri_1) {
    return __awaiter(this, arguments, void 0, function* (clientId, clientSecret, code, redirectUri, environment = "production") {
        const url = `${getAuthBaseUrl(environment)}/auth/oauth/token`;
        const { data } = yield axios.post(url, new URLSearchParams({
            grant_type: "authorization_code",
            code,
            redirect_uri: redirectUri,
        }), {
            headers: {
                Authorization: buildBasicAuthHeader(clientId, clientSecret),
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        return data;
    });
}
/**
 * Mevcut refresh_token ile yeni access_token al
 */
function refreshAccessToken(clientId_1, clientSecret_1, refreshToken_1) {
    return __awaiter(this, arguments, void 0, function* (clientId, clientSecret, refreshToken, environment = "production") {
        const url = `${getAuthBaseUrl(environment)}/auth/oauth/token`;
        const { data } = yield axios.post(url, new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token: refreshToken,
        }), {
            headers: {
                Authorization: buildBasicAuthHeader(clientId, clientSecret),
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        return data;
    });
}

export { ALLEGRO_API_URL, ALLEGRO_AUTH_URL, ALLEGRO_SANDBOX_API_URL, ALLEGRO_SANDBOX_AUTH_URL, ALLEGRO_SANDBOX_UPLOAD_URL, ALLEGRO_UPLOAD_URL, allegroApi, exchangeCodeForToken, getAuthorizationUrl, getClientCredentialsToken, headerJson, refreshAccessToken };
