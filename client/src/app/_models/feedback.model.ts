export class Feedback {
    public id? : string;
    public fullName: string;
    public company: string;
    public address: string;
    public city: string;
    public postalCode: string;
    public email: string;
    public phone: string;
    public subject: string
    public comments: string

    constructor(fullName: string, company: string, address: string, city: string, postalCode: string, email: string, phone: string, subject: string, comments: string){
        this.fullName = fullName;
        this.company = company;
        this.address = address;
        this.city = city;
        this.postalCode = postalCode;
        this.email = email;
        this.phone = phone;
        this.subject = subject;
        this.comments = comments;
    }
}