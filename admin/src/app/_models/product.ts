import { PhotoProduct } from "./photoProduct"


export class Product {
    id: number=0
    productName: string=""
    outPut: string=""
    capsuleSize: string=""
    machineDimension: string=""
    shippingWeight: string=""
    modelNumber: string=""
    dies: number=0
    maxPressure: string=""
    maxDiameter: string=""
    maxDepth: string=""
    productionCapacity: string=""
    machineSize: string=""
    netWeight: string=""
    categoryId: number=0
    description:string = ""
    introductionVideo: string = ""
    photoProductUrl: string=""
    photoProducts: PhotoProduct[];
}