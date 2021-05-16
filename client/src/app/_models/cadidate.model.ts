export class Candidate {
    public photoUserUrl: string;
    public gender: string;
    public streetAddress: string;
    public state: string;
    public city: string;
    public country: string;
    public degree: string;
    public isApproved: boolean = null;
    public isApplied: boolean = true;
    public jobId: number;
    public fullName: string;
    public jobTitle: string;

    constructor(fullName: string, jobTitle: string, photoUserUrl: string, gender: string, streetAddress: string, state: string, city: string, country: string, degree: string, jobId: number){
        this.fullName = fullName;
        this.photoUserUrl = photoUserUrl;
        this.gender = gender;
        this.streetAddress = streetAddress;
        this.state = state;
        this.city = city;
        this.country = country;
        this.degree = degree;
        this.jobId = jobId;
        this.jobTitle = jobTitle;
    }
}