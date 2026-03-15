import { AllegroEnvironment } from "../config";

export interface RequestOptions {
    url: string;
    body?: any;
    method?: string;
}

export interface AllegroApiOptions {
    environment?: AllegroEnvironment;
}

export interface IAllegroApi {
    headerConfig: any | null;
    initialized: boolean;
    environment: AllegroEnvironment;
    readonly baseUrl: string;

    initialize(accessToken: string, options?: AllegroApiOptions): Promise<void>;
    makeRequest<T>(options: RequestOptions): Promise<T>;

    // Offers
    getOffers(params?: Record<string, any>): Promise<any>;
    getOfferByOfferId(offerId: string): Promise<any>;
    createOffer(values: any): Promise<any>;
    deleteOffer(offerId: string): Promise<any>;
    updateOffer(offerId: string, values: any): Promise<any>;
    publishOffer(commandId: string, values: any): Promise<any>;
    publishOfferWithNewCommandId(values: any): Promise<any>;
    uploadPhoto(imageBuffer: Buffer, contentType?: string): Promise<any>;

    // Categories
    getCategories(parentId?: string): Promise<any>;
    getCategoryById(categoryId: string): Promise<any>;
    getCategoryParameters(categoryId: string): Promise<any>;

    // Warranties
    getWarranties(): Promise<any>;
    getWarrantyById(warrantyId: string): Promise<any>;
    createWarranty(values: any): Promise<any>;
    updateWarranty(warrantyId: string, values: any): Promise<any>;

    // Delivery & Shipping
    getDeliveryMethods(): Promise<any>;
    getShippingRates(): Promise<any>;
    getShippingRateById(shippingRateId: string): Promise<any>;

    // Payments
    getPaymentOperations(params?: Record<string, any>): Promise<any>;

    // Publication commands
    getOfferPublicationCommandById(offerPublicationCommandId: string): Promise<any>;
    getOfferPublicationCommandTasks(offerPublicationCommandId: string): Promise<any>;

    // Offer events
    getOfferEvents(params?: Record<string, any>): Promise<any>;

    // Orders
    getOrders(params?: Record<string, any>): Promise<any>;
    getOrderById(orderId: string): Promise<any>;
    getOrderShipments(orderId: string): Promise<any>;

    // Issues (Post-Purchase)
    getIssues(params?: Record<string, any>): Promise<any>;
    getIssueById(issueId: string): Promise<any>;

    // User
    getUserInfo(): Promise<any>;
}
