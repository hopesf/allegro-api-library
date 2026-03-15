import { AllegroEnvironment } from "../config";
export interface AllegroTokenResponse {
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
export declare function getClientCredentialsToken(clientId: string, clientSecret: string, environment?: AllegroEnvironment): Promise<AllegroTokenResponse>;
/**
 * Authorization Code Flow — adım 1: kullanıcıyı bu URL'e yönlendir
 */
export declare function getAuthorizationUrl(clientId: string, redirectUri: string, environment?: AllegroEnvironment): string;
/**
 * Authorization Code Flow — adım 2: kodu token ile değiştir
 */
export declare function exchangeCodeForToken(clientId: string, clientSecret: string, code: string, redirectUri: string, environment?: AllegroEnvironment): Promise<AllegroTokenResponse>;
/**
 * Mevcut refresh_token ile yeni access_token al
 */
export declare function refreshAccessToken(clientId: string, clientSecret: string, refreshToken: string, environment?: AllegroEnvironment): Promise<AllegroTokenResponse>;
