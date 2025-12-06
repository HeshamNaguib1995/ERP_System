export interface ProductAdd {
    name: string;
    productCategoryId: number;
    price: number;
    discount: number;
    imageUrl: string | null;
    description: string | null;
    brandId: number;
}
