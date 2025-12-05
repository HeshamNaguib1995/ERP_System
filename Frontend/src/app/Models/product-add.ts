export interface ProductAdd {
    name: string;
    productCategoryId: number;
    price: number;
    discount: number;
    imageUrl: string | null;
    discription: string | null;
    brandId: number;
}
