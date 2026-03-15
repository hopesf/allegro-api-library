import axios from "axios";
import { generateHeaders } from "./generateHeaders";
import { v4 as uuidv4 } from 'uuid';
import { IAllegroApi, RequestOptions, AllegroApiOptions } from "../interfaces";
import { ALLEGRO_API_URL, ALLEGRO_SANDBOX_API_URL, headerJson, AllegroEnvironment } from "../config";

const allegroApi: IAllegroApi = {
    headerConfig: null,
    initialized: false,
    environment: "production" as AllegroEnvironment,

    get baseUrl(): string {
        return this.environment === "sandbox" ? ALLEGRO_SANDBOX_API_URL : ALLEGRO_API_URL;
    },

    async initialize(accessToken: string, options?: AllegroApiOptions): Promise<void> {
        if (!accessToken) {
            throw new Error("Access token is required.");
        }

        this.environment = options?.environment ?? "production";
        this.headerConfig = generateHeaders(accessToken, headerJson);
        this.initialized = true;
    },

    async makeRequest<T>({ url, body = null, method = "GET" }: RequestOptions): Promise<T> {
        if (!this.initialized) {
            throw new Error("Allegro API is not initialized. Please call initialize() first.");
        }

        try {
            if (method === "DELETE") {
                const { data } = await axios.delete(url, { headers: this.headerConfig });
                return data;
            }
            if (method === "PUT") {
                const { data } = await axios.put(url, body, { headers: this.headerConfig });
                return data;
            }
            if (method === "PATCH") {
                const { data } = await axios.patch(url, body, { headers: this.headerConfig });
                return data;
            }
            if (body !== null) {
                const { data } = await axios.post(url, body, { headers: this.headerConfig });
                return data;
            }
            const { data } = await axios.get(url, { headers: this.headerConfig });
            return data;
        } catch (error: any) {
            if (error?.response?.data) {
                throw error.response.data;
            }
            throw error;
        }
    },

    async getOffers(params?: Record<string, any>): Promise<any> {
        const query = params ? `?${new URLSearchParams(params as any).toString()}` : "";
        return await this.makeRequest({ url: `${this.baseUrl}/sale/offers${query}` });
    },

    async getOfferByOfferId(offerId: string): Promise<any> {
        return await this.makeRequest({ url: `${this.baseUrl}/sale/product-offers/${offerId}` });
    },

    async createOffer(values: any): Promise<any> {
        return await this.makeRequest({ body: values, method: "POST", url: `${this.baseUrl}/sale/product-offers` });
    },

    async deleteOffer(offerId: string): Promise<any> {
        return await this.makeRequest({ method: "DELETE", url: `${this.baseUrl}/sale/offers/${offerId}` });
    },

    async updateOffer(offerId: string, values: any): Promise<any> {
        return await this.makeRequest({
            body: values,
            method: "PATCH",
            url: `${this.baseUrl}/sale/product-offers/${offerId}`,
        });
    },

    async publishOffer(commandId: string, values: any): Promise<any> {
        const url = `${this.baseUrl}/sale/offer-publication-commands/${commandId}`;
        return await this.makeRequest({ body: values, method: "PUT", url });
    },

    async publishOfferWithNewCommandId(values: any): Promise<any> {
        const url = `${this.baseUrl}/sale/offer-publication-commands/${uuidv4()}`;
        return await this.makeRequest({ body: values, method: "PUT", url });
    },

    async uploadPhoto(imageBuffer: Buffer, contentType: string = "image/jpeg"): Promise<any> {
        const headers = {
            ...this.headerConfig,
            "Content-Type": contentType,
        };
        const url = `${this.baseUrl}/sale/images`;
        const { data } = await axios.post(url, imageBuffer, { headers });
        return data;
    },

    async getCategories(parentId?: string): Promise<any> {
        const query = parentId ? `?parent.id=${parentId}` : "";
        return await this.makeRequest({ url: `${this.baseUrl}/sale/categories${query}` });
    },

    async getCategoryById(categoryId: string): Promise<any> {
        return await this.makeRequest({ url: `${this.baseUrl}/sale/categories/${categoryId}` });
    },

    async getCategoryParameters(categoryId: string): Promise<any> {
        return await this.makeRequest({ url: `${this.baseUrl}/sale/categories/${categoryId}/parameters` });
    },

    async getWarranties(): Promise<any> {
        return await this.makeRequest({ url: `${this.baseUrl}/after-sales-service-conditions/warranties` });
    },

    async getWarrantyById(warrantyId: string): Promise<any> {
        return await this.makeRequest({ url: `${this.baseUrl}/after-sales-service-conditions/warranties/${warrantyId}` });
    },

    async createWarranty(values: any): Promise<any> {
        return await this.makeRequest({ body: values, method: "POST", url: `${this.baseUrl}/after-sales-service-conditions/warranties` });
    },

    async updateWarranty(warrantyId: string, values: any): Promise<any> {
        return await this.makeRequest({
            body: values,
            method: "PUT",
            url: `${this.baseUrl}/after-sales-service-conditions/warranties/${warrantyId}`,
        });
    },

    async getDeliveryMethods(): Promise<any> {
        return await this.makeRequest({ url: `${this.baseUrl}/sale/delivery-methods` });
    },

    async getShippingRates(): Promise<any> {
        return await this.makeRequest({ url: `${this.baseUrl}/sale/shipping-rates` });
    },

    async getShippingRateById(shippingRateId: string): Promise<any> {
        return await this.makeRequest({ url: `${this.baseUrl}/sale/shipping-rates/${shippingRateId}` });
    },

    async getPaymentOperations(params?: Record<string, any>): Promise<any> {
        const query = params ? `?${new URLSearchParams(params as any).toString()}` : "";
        return await this.makeRequest({ url: `${this.baseUrl}/payments/payment-operations${query}` });
    },

    async getOfferPublicationCommandById(offerPublicationCommandId: string): Promise<any> {
        return await this.makeRequest({
            url: `${this.baseUrl}/sale/offer-publication-commands/${offerPublicationCommandId}`,
        });
    },

    async getOfferPublicationCommandTasks(offerPublicationCommandId: string): Promise<any> {
        return await this.makeRequest({
            url: `${this.baseUrl}/sale/offer-publication-commands/${offerPublicationCommandId}/tasks`,
        });
    },

    async getOfferEvents(params?: Record<string, any>): Promise<any> {
        const query = params ? `?${new URLSearchParams(params as any).toString()}` : "";
        return await this.makeRequest({ url: `${this.baseUrl}/sale/offer-events${query}` });
    },

    async getOrders(params?: Record<string, any>): Promise<any> {
        const query = params ? `?${new URLSearchParams(params as any).toString()}` : "";
        return await this.makeRequest({ url: `${this.baseUrl}/order/checkout-forms${query}` });
    },

    async getOrderById(orderId: string): Promise<any> {
        return await this.makeRequest({ url: `${this.baseUrl}/order/checkout-forms/${orderId}` });
    },

    async getOrderShipments(orderId: string): Promise<any> {
        return await this.makeRequest({ url: `${this.baseUrl}/order/checkout-forms/${orderId}/shipments` });
    },

    async getIssues(params?: Record<string, any>): Promise<any> {
        const query = params ? `?${new URLSearchParams(params as any).toString()}` : "";
        return await this.makeRequest({ url: `${this.baseUrl}/sale/issues${query}` });
    },

    async getIssueById(issueId: string): Promise<any> {
        return await this.makeRequest({ url: `${this.baseUrl}/sale/issues/${issueId}` });
    },

    async getUserInfo(): Promise<any> {
        return await this.makeRequest({ url: `${this.baseUrl}/me` });
    },
};

export default allegroApi;
