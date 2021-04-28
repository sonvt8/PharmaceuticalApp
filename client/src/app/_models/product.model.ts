import { Photo } from "./photo.model";
import { Review } from "./review.model";

export class Product {
    public productName: string;
    public outPut: string;
    public capsuleSize: string;
    public machineDimension: string;
    public shippingWeight: string;
    public modelNumber: string;
    public dies: number;
    public maxPressure: string;
    public maxDiameter: string;
    public maxDepth: string;
    public productionCapacity: string;
    public machineSize: string;
    public netWeight: string;
    public photos: Photo[];
    public reviews: Review[];

    // constructor(public name: string, public output: number, public imagePath: string){}
}