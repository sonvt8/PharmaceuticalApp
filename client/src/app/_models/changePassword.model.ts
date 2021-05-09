export class ChangePassword {
    public oldPassword: string;
    public newPassword: string;
    public email: string;

    constructor(oldPassword: string, newPassword: string, email: string){
        this.oldPassword = oldPassword;
        this.newPassword = newPassword;
        this.email = email;
    }
}