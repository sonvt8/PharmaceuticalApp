import { Product } from "./product.model";

export class Category {
    public id: number;
    public categoryName: string;
    public categoryDescription: string;
    public products: Product[];

    constructor(name: string, desc: string, products: Product[]){
        this.categoryName = name;
        this.categoryDescription = desc;
        this.products = products;
    }
}
