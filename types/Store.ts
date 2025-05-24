import { Product } from "./Product";

export interface Store
{
    storeId: number;
    storeName: string;
    address: string;
    phoneNumber: string;
    email: string;
    description: string;
    imageURL: string;
    rating: number;
    eggCount: number;
    products?: Product[];
}
 	
