import axios from "axios";
import { generateHeaders } from "./generateHeaders";
import { uuid } from 'uuidv4';
import { IAllegroApi, RequestOptions } from "../interfaces";
import { ALLEGRO_API_URL, headerJson } from "../config";

const allegroApi: IAllegroApi = {
    headerConfig: null,
    initialized: false,

    async initialize(accessToken: string): Promise<void> {
        if (this.initialized) {
            return;
        }

        try {
            if (!accessToken) {
                throw new Error("Access token is required.");
            }

            this.headerConfig = await generateHeaders(accessToken, headerJson); // Update this line
            this.initialized = true;
        } catch (error) {
            throw error;
        }
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
            const { data } = body === null ? await axios.get(url, { headers: this.headerConfig }) : await axios.post(url, body, { headers: this.headerConfig });
            return data;
        } catch (error: any) {
            throw error.response.data;
        }
    },

    async getProducts(body: any): Promise<any> {
        return await this.makeRequest({ body, method: "POST", url: `${ALLEGRO_API_URL}/sale/offers` });
    },

    async getProductByOfferId(offerId: string): Promise<any> {
        return await this.makeRequest({ url: `${ALLEGRO_API_URL}/sale/product-offers/${offerId}` });
    },

    async createProduct(values: any): Promise<any> {
        return await this.makeRequest({ body: values, method: "POST", url: `${ALLEGRO_API_URL}/sale/product-offers` });
    },

    async deleteProduct(offerId: string): Promise<any> {
        return await this.makeRequest({ method: "DELETE", url: `${ALLEGRO_API_URL}/sale/offers/${offerId}` });
    },

    async publishProduct(values: any): Promise<any> {
        const url = `${ALLEGRO_API_URL}/sale/offer-publication-commands/${uuid()}`;
        return await this.makeRequest({ body: values, method: "PUT", url });
    },

    async uploadPhoto(headers: any, buffer: any): Promise<any> {
        const url = `${ALLEGRO_API_URL}/sale/images`;
        this.headerConfig = headers;
        return await this.makeRequest({ body: buffer, method: "POST", url });
    },

    async updateProduct(offerId: string, values: any): Promise<any> {
        return await this.makeRequest({
            body: values,
            method: "PATCH",
            url: `${ALLEGRO_API_URL}/sale/product-offers/${offerId}`,
        });
    },

    async getCategories(): Promise<any> {
        return await this.makeRequest({ url: `${ALLEGRO_API_URL}/sale/categories` });
    },

    async getCategoryById(categoryId: string): Promise<any> {
        return await this.makeRequest({ url: `${ALLEGRO_API_URL}/sale/categories/${categoryId}` });
    },

    async createCategory(values: any): Promise<any> {
        return await this.makeRequest({ body: values, method: "POST", url: `${ALLEGRO_API_URL}/sale/categories` });
    },

    async updateCategory(categoryId: string, values: any): Promise<any> {
        return await this.makeRequest({
            body: values,
            method: "PUT",
            url: `${ALLEGRO_API_URL}/sale/categories/${categoryId}`,
        });
    },

    async deleteCategory(categoryId: string): Promise<any> {
        return await this.makeRequest({ method: "DELETE", url: `${ALLEGRO_API_URL}/sale/categories/${categoryId}` });
    },

    async getCategoryParameters(categoryId: string): Promise<any> {
        return await this.makeRequest({ url: `${ALLEGRO_API_URL}/sale/categories/${categoryId}/parameters` });
    },

    async getCategoryParameterById(categoryId: string, parameterId: string): Promise<any> {
        return await this.makeRequest({
            url: `${ALLEGRO_API_URL}/sale/categories/${categoryId}/parameters/${parameterId}`,
        });
    },

    async createCategoryParameter(categoryId: string, values: any): Promise<any> {
        return await this.makeRequest({
            body: values,
            method: "POST",
            url: `${ALLEGRO_API_URL}/sale/categories/${categoryId}/parameters`,
        });
    },

    async updateCategoryParameter(categoryId: string, parameterId: string, values: any): Promise<any> {
        return await this.makeRequest({
            body: values,
            method: "PUT",
            url: `${ALLEGRO_API_URL}/sale/categories/${categoryId}/parameters/${parameterId}`,
        });
    },

    async deleteCategoryParameter(categoryId: string, parameterId: string): Promise<any> {
        return await this.makeRequest({
            method: "DELETE",
            url: `${ALLEGRO_API_URL}/sale/categories/${categoryId}/parameters/${parameterId}`,
        });
    },

    async getCategoryParameterOptions(categoryId: string, parameterId: string): Promise<any> {
        return await this.makeRequest({
            url: `${ALLEGRO_API_URL}/sale/categories/${categoryId}/parameters/${parameterId}/options`,
        });
    },

    async getCategoryParameterOptionById(categoryId: string, parameterId: string, optionId: string): Promise<any> {
        return await this.makeRequest({
            url: `${ALLEGRO_API_URL}/sale/categories/${categoryId}/parameters/${parameterId}/options/${optionId}`,
        });
    },

    async createCategoryParameterOption(categoryId: string, parameterId: string, values: any): Promise<any> {
        return await this.makeRequest({
            body: values,
            method: "POST",
            url: `${ALLEGRO_API_URL}/sale/categories/${categoryId}/parameters/${parameterId}/options`,
        });
    },

    async updateCategoryParameterOption(categoryId: string, parameterId: string, optionId: string, values: any): Promise<any> {
        return await this.makeRequest({
            body: values,
            method: "PUT",
            url: `${ALLEGRO_API_URL}/sale/categories/${categoryId}/parameters/${parameterId}/options/${optionId}`,
        });
    },

    async deleteCategoryParameterOption(categoryId: string, parameterId: string, optionId: string): Promise<any> {
        return await this.makeRequest({
            method: "DELETE",
            url: `${ALLEGRO_API_URL}/sale/categories/${categoryId}/parameters/${parameterId}/options/${optionId}`,
        });
    },

    async getWarranties(): Promise<any> {
        return await this.makeRequest({ url: `${ALLEGRO_API_URL}/sale/warranties` });
    },

    async getWarrantyById(warrantyId: string): Promise<any> {
        return await this.makeRequest({ url: `${ALLEGRO_API_URL}/sale/warranties/${warrantyId}` });
    },

    async createWarranty(values: any): Promise<any> {
        return await this.makeRequest({ body: values, method: "POST", url: `${ALLEGRO_API_URL}/sale/warranties` });
    },

    async updateWarranty(warrantyId: string, values: any): Promise<any> {
        return await this.makeRequest({
            body: values,
            method: "PUT",
            url: `${ALLEGRO_API_URL}/sale/warranties/${warrantyId}`,
        });
    },

    async deleteWarranty(warrantyId: string): Promise<any> {
        return await this.makeRequest({ method: "DELETE", url: `${ALLEGRO_API_URL}/sale/warranties/${warrantyId}` });
    },

    async getDeliveryMethods(): Promise<any> {
        return await this.makeRequest({ url: `${ALLEGRO_API_URL}/sale/delivery-methods` });
    },

    async getDeliveryMethodById(deliveryMethodId: string): Promise<any> {
        return await this.makeRequest({ url: `${ALLEGRO_API_URL}/sale/delivery-methods/${deliveryMethodId}` });
    },

    async createDeliveryMethod(values: any): Promise<any> {
        return await this.makeRequest({ body: values, method: "POST", url: `${ALLEGRO_API_URL}/sale/delivery-methods` });
    },

    async updateDeliveryMethod(deliveryMethodId: string, values: any): Promise<any> {
        return await this.makeRequest({
            body: values,
            method: "PUT",
            url: `${ALLEGRO_API_URL}/sale/delivery-methods/${deliveryMethodId}`,
        });
    },

    async deleteDeliveryMethod(deliveryMethodId: string): Promise<any> {
        return await this.makeRequest({
            method: "DELETE",
            url: `${ALLEGRO_API_URL}/sale/delivery-methods/${deliveryMethodId}`,
        });
    },

    async getPayments(): Promise<any> {
        return await this.makeRequest({ url: `${ALLEGRO_API_URL}/sale/payment-methods` });
    },

    async getPaymentById(paymentId: string): Promise<any> {
        return await this.makeRequest({ url: `${ALLEGRO_API_URL}/sale/payment-methods/${paymentId}` });
    },

    async createPayment(values: any): Promise<any> {
        return await this.makeRequest({ body: values, method: "POST", url: `${ALLEGRO_API_URL}/sale/payment-methods` });
    },

    async updatePayment(paymentId: string, values: any): Promise<any> {
        return await this.makeRequest({
            body: values,
            method: "PUT",
            url: `${ALLEGRO_API_URL}/sale/payment-methods/${paymentId}`,
        });
    },

    async deletePayment(paymentId: string): Promise<any> {
        return await this.makeRequest({
            method: "DELETE",
            url: `${ALLEGRO_API_URL}/sale/payment-methods/${paymentId}`,
        });
    },

    async getOfferPublicationCommands(): Promise<any> {
        return await this.makeRequest({ url: `${ALLEGRO_API_URL}/sale/offer-publication-commands` });
    },

    async getOfferPublicationCommandById(offerPublicationCommandId: string): Promise<any> {
        return await this.makeRequest({
            url: `${ALLEGRO_API_URL}/sale/offer-publication-commands/${offerPublicationCommandId}`,
        });
    },

    async createOfferPublicationCommand(values: any): Promise<any> {
        return await this.makeRequest({
            body: values,
            method: "POST",
            url: `${ALLEGRO_API_URL}/sale/offer-publication-commands`,
        });
    },

    async updateOfferPublicationCommand(offerPublicationCommandId: string, values: any): Promise<any> {
        return await this.makeRequest({
            body: values,
            method: "PUT",
            url: `${ALLEGRO_API_URL}/sale/offer-publication-commands/${offerPublicationCommandId}`,
        });
    },

    async deleteOfferPublicationCommand(offerPublicationCommandId: string): Promise<any> {
        return await this.makeRequest({
            method: "DELETE",
            url: `${ALLEGRO_API_URL}/sale/offer-publication-commands/${offerPublicationCommandId}`,
        });
    },

    async getOfferEvents(): Promise<any> {
        return await this.makeRequest({ url: `${ALLEGRO_API_URL}/sale/offer-events` });
    },

    async getOfferEventById(offerEventId: string): Promise<any> {
        return await this.makeRequest({ url: `${ALLEGRO_API_URL}/sale/offer-events/${offerEventId}` });
    },

    async createOfferEvent(values: any): Promise<any> {
        return await this.makeRequest({ body: values, method: "POST", url: `${ALLEGRO_API_URL}/sale/offer-events` });
    },

    async updateOfferEvent(offerEventId: string, values: any): Promise<any> {
        return await this.makeRequest({
            body: values,
            method: "PUT",
            url: `${ALLEGRO_API_URL}/sale/offer-events/${offerEventId}`,
        });
    },

    async deleteOfferEvent(offerEventId: string): Promise<any> {
        return await this.makeRequest({
            method: "DELETE",
            url: `${ALLEGRO_API_URL}/sale/offer-events/${offerEventId}`,
        });
    },
};

export default allegroApi;
