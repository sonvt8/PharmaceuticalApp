import { FeedBack } from "./feedback";
import { PhotoUser } from "./photoUser";

export class User {
    id:number;
    fullName: string;
    userName: string;
    email: string;
    gender:string;
    token: string;
    phoneNumber: string
    photoUserUrl: string;
    streetAddress:string;
    state:string;
    city:string;
    country:string;
    roles: string[];
    photoUsers: PhotoUser[];
    feedBack: FeedBack[];
}