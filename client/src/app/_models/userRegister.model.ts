export class UserRegister{
    public fullName: string;
    public email: string;
    public password: string;
    public gender: string;

    constructor(fullName: string, email: string, password: string, gender: string){
        this.fullName = fullName;
        this.email = email;
        this.password = password;
        this.gender = gender;
    }
}