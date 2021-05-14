export class UserUpdate {
    public fullName: string;
    public email: string;
    public gender: string;
    public streetAddress?: string;
    public phoneNumber?: string;
    public state?: string;
    public city?: string;
    public country?: string;
    public zip?: string;
    public degree?: string;

    constructor(fullName: string, email: string, gender: string, streetAddress: string, phoneNumber: string
        , state: string, city: string, country: string, zip: string){
        this.fullName = fullName;
        this.email = email;
        this.gender = gender;
        this.streetAddress = streetAddress;
        this.phoneNumber = phoneNumber;
        this.state = state;
        this.city = city;
        this.country = country;
        this.zip = zip;
    }
}