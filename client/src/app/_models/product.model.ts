import { Photo } from "./photo.model";
import { Review } from "./review.model";

export class Product {
    public id: number;
    public productName: string;
    public categoryName: string;
    public capsuleSize: string;
    public dies: number;
    public machineDimension: string;
    public machineSize: string;
    public maxPressure: string;
    public maxDiameter: string;
    public maxDepth: string;
    public modelNumber: string;
    public netWeight: string;
    public outPut: string;
    public photoProductUrl: string;
    public shippingWeight: string;
    public productionCapacity: string;
    public photos: Photo[];
    public reviews: Review[];

    // constructor(public name: string, public output: number, public imagePath: string){}
}