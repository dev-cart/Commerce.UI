import { Product } from "./product.model";

export class Category {
    constructor(
        public id?: number,
        public name?: string,
        public products: Product[] = []
    ){}
}