
import { PhotoProduct } from "./photoProduct"

export class Product {
    id: number=0
    productName: string=""
    outPut: string=""
    capsuleSize: string=""
    machineDimension: string=""
    shippingWeight: string=""
    modelNumber: number=0
    dies: number=0
    maxPressure: number=0
    maxDiameter: number=0
    maxDepth: number=0
    productionCapacity: string=""
    machineSize: string=""
    netWeight: number=0
    categoryId: number=0
    photoProductUrl: string=""
    photos: PhotoProduct[];
}