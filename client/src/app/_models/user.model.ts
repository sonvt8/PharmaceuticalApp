export class User {
    public fullname: string;
    public email: string;
    public token: string;
    public gender: string;
    public password: string;

    constructor(fullname: string, email: string, token: string, gender: string, password: string){
        this.fullname = fullname;
        this.token = token;
        this.email = email;
        this.gender = gender;
        this.password = password;
    }
}