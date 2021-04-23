export interface User{
    username: string;
    token: string;
}
export class User {
    public username: string;
    public token: string;
    public gender: string;

    constructor(username: string, token: string, gender: string){
        this.username = username;
        this.token = token;
        this.gender = gender;
    }
}