
export interface RequestOptions {
    url: string;
    body?: any;
    method?: string;
}

export interface IAllegroApi {
    headerConfig: any | null;
    initialized: boolean;

    initialize(accessToken: string): Promise<void>;

    makeRequest<T>(options: RequestOptions): Promise<T>;

    getProducts(body: any): Promise<any>;

    getProductByOfferId(offerId: string): Promise<any>;

    createProduct(values: any): Promise<any>;

    deleteProduct(offerId: string): Promise<any>;

    publishProduct(values: any): Promise<any>;

    uploadPhoto(headers: any, buffer: any): Promise<any>;

    updateProduct(offerId: string, values: any): Promise<any>;

    getCategories(): Promise<any>;

    getCategoryById(categoryId: string): Promise<any>;

    createCategory(values: any): Promise<any>;

    updateCategory(categoryId: string, values: any): Promise<any>;

    deleteCategory(categoryId: string): Promise<any>;

    getCategoryParameters(categoryId: string): Promise<any>;

    getCategoryParameterById(categoryId: string, parameterId: string): Promise<any>;

    createCategoryParameter(categoryId: string, values: any): Promise<any>;

    updateCategoryParameter(categoryId: string, parameterId: string, values: any): Promise<any>;

    deleteCategoryParameter(categoryId: string, parameterId: string): Promise<any>;

    getCategoryParameterOptions(categoryId: string, parameterId: string): Promise<any>;

    getCategoryParameterOptionById(categoryId: string, parameterId: string, optionId: string): Promise<any>;

    createCategoryParameterOption(categoryId: string, parameterId: string, values: any): Promise<any>;

    updateCategoryParameterOption(categoryId: string, parameterId: string, optionId: string, values: any): Promise<any>;

    deleteCategoryParameterOption(categoryId: string, parameterId: string, optionId: string): Promise<any>;

    getWarranties(): Promise<any>;

    getWarrantyById(warrantyId: string): Promise<any>;

    createWarranty(values: any): Promise<any>;

    updateWarranty(warrantyId: string, values: any): Promise<any>;

    deleteWarranty(warrantyId: string): Promise<any>;

    getDeliveryMethods(): Promise<any>;

    getDeliveryMethodById(deliveryMethodId: string): Promise<any>;

    createDeliveryMethod(values: any): Promise<any>;

    updateDeliveryMethod(deliveryMethodId: string, values: any): Promise<any>;

    deleteDeliveryMethod(deliveryMethodId: string): Promise<any>;

    getPayments(): Promise<any>;

    getPaymentById(paymentId: string): Promise<any>;

    createPayment(values: any): Promise<any>;

    updatePayment(paymentId: string, values: any): Promise<any>;

    deletePayment(paymentId: string): Promise<any>;

    getOfferPublicationCommands(): Promise<any>;

    getOfferPublicationCommandById(offerPublicationCommandId: string): Promise<any>;

    createOfferPublicationCommand(values: any): Promise<any>;

    updateOfferPublicationCommand(offerPublicationCommandId: string, values: any): Promise<any>;

    deleteOfferPublicationCommand(offerPublicationCommandId: string): Promise<any>;

    getOfferEvents(): Promise<any>;

    getOfferEventById(offerEventId: string): Promise<any>;

    createOfferEvent(values: any): Promise<any>;

    updateOfferEvent(offerEventId: string, values: any): Promise<any>;

    deleteOfferEvent(offerEventId: string): Promise<any>;
}
