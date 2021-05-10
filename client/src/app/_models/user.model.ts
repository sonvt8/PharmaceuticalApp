export class User {
    public id?: string;
    public fullName: string;
    public email: string;
    public token: string;
    public gender?: string;
    public password?: string;
    public streetAddress?: string;
    public phoneNumber?: string;
    public state?: string;
    public city?: string;
    public country?: string;
    public zip?: string;
    public photoUserUrl?: string;

    constructor(fullName: string, email: string, token: string, gender: string, password: string){
        this.fullName = fullName;
        this.token = token;
        this.email = email;
        this.gender = gender;
        this.password = password;
    }
}