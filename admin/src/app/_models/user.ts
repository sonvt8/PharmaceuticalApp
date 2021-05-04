import { PhotoUser } from "./photoUser";

export class User {
    id:number;
    fullName: string;
    email: string;
    gender:string;
    token: string;
    phoneNumber: string
    photoUserUrl: string;
    streetAddress:string;
    state:string;
    city:string;
    photoUsers: PhotoUser[];
}