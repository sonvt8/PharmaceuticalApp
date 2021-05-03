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
    public description: string;
    public introductionVideo: string;
    public photoProducts: Photo[];
    public reviews: Review[];

    constructor(
        id: number,
        productName: string,
        categoryName: string,
        capsuleSize: string,
        dies: number,
        machineDimension: string,
        machineSize: string,
        maxPressure: string,
        maxDiameter: string,
        maxDepth: string,
        modelNumber: string,
        netWeight: string,
        outPut: string,
        photoProductUrl: string,
        shippingWeight: string,
        productionCapacity: string,
        description: string,
        introductionVideo: string,
        photoProducts: Photo[],
        reviews: Review[],
    ){
        this.id = id;
        this.productName = productName;
        this.categoryName = categoryName;
        this.capsuleSize = capsuleSize;
        this.dies = dies;
        this.machineDimension = machineDimension;
        this.machineSize = machineSize;
        this.maxPressure = maxPressure;
        this.maxDiameter = maxDiameter;
        this.maxDepth = maxDepth;
        this.modelNumber = modelNumber;
        this.netWeight = netWeight;
        this.outPut = outPut;
        this.photoProductUrl = photoProductUrl;
        this.shippingWeight = shippingWeight;
        this.productionCapacity = productionCapacity;
        this.description = description;
        this.introductionVideo = introductionVideo;
        this.photoProducts = photoProducts;
        this.reviews = reviews;
    }
}