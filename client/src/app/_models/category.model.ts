import { Product } from "../products/product.model";

export class Category {
    public name: string;
    public description: string;
    public products: Product[];

    constructor(name: string, desc: string, products: Product[]){
        this.name = name;
        this.description = desc;
        this.products = products;
    }
}
