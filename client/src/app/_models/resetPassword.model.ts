export class resetPassword {
    public password: string;
    public confirmedPassword: string;
    public token: string;
    public email: string;

    constructor(password: string, confirmedPassword: string, token: string, email: string){
        this.password = password;
        this.confirmedPassword = confirmedPassword;
        this.token = token;
        this.email = email;
    }
}