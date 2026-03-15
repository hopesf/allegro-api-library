declare const ALLEGRO_API_URL = "https://api.allegro.pl";
declare const ALLEGRO_SANDBOX_API_URL = "https://api.allegro.pl.allegrosandbox.pl";
declare const ALLEGRO_AUTH_URL = "https://allegro.pl";
declare const ALLEGRO_SANDBOX_AUTH_URL = "https://allegro.pl.allegrosandbox.pl";
declare const headerJson = "application/vnd.allegro.public.v1+json";
type AllegroEnvironment = "production" | "sandbox";

interface RequestOptions {
    url: string;
    body?: any;
    method?: string;
}
interface AllegroApiOptions {
    environment?: AllegroEnvironment;
}
interface IAllegroApi {
    headerConfig: any | null;
    initialized: boolean;
    environment: AllegroEnvironment;
    readonly baseUrl: string;
    initialize(accessToken: string, options?: AllegroApiOptions): Promise<void>;
    makeRequest<T>(options: RequestOptions): Promise<T>;
    getOffers(params?: Record<string, any>): Promise<any>;
    getOfferByOfferId(offerId: string): Promise<any>;
    createOffer(values: any): Promise<any>;
    deleteOffer(offerId: string): Promise<any>;
    updateOffer(offerId: string, values: any): Promise<any>;
    publishOffer(commandId: string, values: any): Promise<any>;
    publishOfferWithNewCommandId(values: any): Promise<any>;
    uploadPhoto(imageBuffer: Buffer, contentType?: string): Promise<any>;
    getCategories(parentId?: string): Promise<any>;
    getCategoryById(categoryId: string): Promise<any>;
    getCategoryParameters(categoryId: string): Promise<any>;
    getWarranties(): Promise<any>;
    getWarrantyById(warrantyId: string): Promise<any>;
    createWarranty(values: any): Promise<any>;
    updateWarranty(warrantyId: string, values: any): Promise<any>;
    getDeliveryMethods(): Promise<any>;
    getShippingRates(): Promise<any>;
    getShippingRateById(shippingRateId: string): Promise<any>;
    getPaymentOperations(params?: Record<string, any>): Promise<any>;
    getOfferPublicationCommandById(offerPublicationCommandId: string): Promise<any>;
    getOfferPublicationCommandTasks(offerPublicationCommandId: string): Promise<any>;
    getOfferEvents(params?: Record<string, any>): Promise<any>;
    getOrders(params?: Record<string, any>): Promise<any>;
    getOrderById(orderId: string): Promise<any>;
    getOrderShipments(orderId: string): Promise<any>;
    getIssues(params?: Record<string, any>): Promise<any>;
    getIssueById(issueId: string): Promise<any>;
    getUserInfo(): Promise<any>;
}

declare const allegroApi: IAllegroApi;

interface AllegroTokenResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
    scope: string;
    allegro_api: boolean;
    jti: string;
    refresh_token?: string;
}
/**
 * Client Credentials Flow — sunucu tarafı uygulamalar için
 */
declare function getClientCredentialsToken(clientId: string, clientSecret: string, environment?: AllegroEnvironment): Promise<AllegroTokenResponse>;
/**
 * Authorization Code Flow — adım 1: kullanıcıyı bu URL'e yönlendir
 */
declare function getAuthorizationUrl(clientId: string, redirectUri: string, environment?: AllegroEnvironment): string;
/**
 * Authorization Code Flow — adım 2: kodu token ile değiştir
 */
declare function exchangeCodeForToken(clientId: string, clientSecret: string, code: string, redirectUri: string, environment?: AllegroEnvironment): Promise<AllegroTokenResponse>;
/**
 * Mevcut refresh_token ile yeni access_token al
 */
declare function refreshAccessToken(clientId: string, clientSecret: string, refreshToken: string, environment?: AllegroEnvironment): Promise<AllegroTokenResponse>;

export { ALLEGRO_API_URL, ALLEGRO_AUTH_URL, ALLEGRO_SANDBOX_API_URL, ALLEGRO_SANDBOX_AUTH_URL, allegroApi, exchangeCodeForToken, getAuthorizationUrl, getClientCredentialsToken, headerJson, refreshAccessToken };
export type { AllegroApiOptions, AllegroEnvironment, AllegroTokenResponse, IAllegroApi, RequestOptions };
