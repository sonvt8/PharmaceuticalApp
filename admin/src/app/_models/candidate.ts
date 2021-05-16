import { Download } from "./download";
import { PhotoUser } from "./photoUser";

export class Candidate {
    id:number=0;
    fullName:string='';
    email:string='';
    photoUserUrl:string='';
    dateOfBirth:Date;
    gender:string='';
    streetAddress:string='';
    state:string='';
    city:string='';
    country:string='';
    degree:string='';
    experience:string='';
    isApproved:boolean=null;
    jobId: number = 0;
    jobTitle: string = '';
    photoUsers: PhotoUser[];
    download: Download[]
}