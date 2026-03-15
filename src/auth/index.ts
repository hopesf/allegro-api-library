import axios from "axios";
import { AllegroEnvironment, ALLEGRO_AUTH_URL, ALLEGRO_SANDBOX_AUTH_URL } from "../config";

export interface AllegroTokenResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
    scope: string;
    allegro_api: boolean;
    jti: string;
    refresh_token?: string;
}

function getAuthBaseUrl(environment: AllegroEnvironment = "production"): string {
    return environment === "sandbox" ? ALLEGRO_SANDBOX_AUTH_URL : ALLEGRO_AUTH_URL;
}

function buildBasicAuthHeader(clientId: string, clientSecret: string): string {
    const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
    return `Basic ${credentials}`;
}

/**
 * Client Credentials Flow — sunucu tarafı uygulamalar için
 */
export async function getClientCredentialsToken(
    clientId: string,
    clientSecret: string,
    environment: AllegroEnvironment = "production"
): Promise<AllegroTokenResponse> {
    const url = `${getAuthBaseUrl(environment)}/auth/oauth/token`;
    const { data } = await axios.post<AllegroTokenResponse>(
        url,
        new URLSearchParams({ grant_type: "client_credentials" }),
        {
            headers: {
                Authorization: buildBasicAuthHeader(clientId, clientSecret),
                "Content-Type": "application/x-www-form-urlencoded",
            },
        }
    );
    return data;
}

/**
 * Authorization Code Flow — adım 1: kullanıcıyı bu URL'e yönlendir
 */
export function getAuthorizationUrl(
    clientId: string,
    redirectUri: string,
    environment: AllegroEnvironment = "production"
): string {
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
export async function exchangeCodeForToken(
    clientId: string,
    clientSecret: string,
    code: string,
    redirectUri: string,
    environment: AllegroEnvironment = "production"
): Promise<AllegroTokenResponse> {
    const url = `${getAuthBaseUrl(environment)}/auth/oauth/token`;
    const { data } = await axios.post<AllegroTokenResponse>(
        url,
        new URLSearchParams({
            grant_type: "authorization_code",
            code,
            redirect_uri: redirectUri,
        }),
        {
            headers: {
                Authorization: buildBasicAuthHeader(clientId, clientSecret),
                "Content-Type": "application/x-www-form-urlencoded",
            },
        }
    );
    return data;
}

/**
 * Mevcut refresh_token ile yeni access_token al
 */
export async function refreshAccessToken(
    clientId: string,
    clientSecret: string,
    refreshToken: string,
    environment: AllegroEnvironment = "production"
): Promise<AllegroTokenResponse> {
    const url = `${getAuthBaseUrl(environment)}/auth/oauth/token`;
    const { data } = await axios.post<AllegroTokenResponse>(
        url,
        new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token: refreshToken,
        }),
        {
            headers: {
                Authorization: buildBasicAuthHeader(clientId, clientSecret),
                "Content-Type": "application/x-www-form-urlencoded",
            },
        }
    );
    return data;
}
