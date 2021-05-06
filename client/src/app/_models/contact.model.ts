export class Contact {
    public name: string;
    public email: string;
    public phone: string;
    public country: string;
    public subject: string;
    public description: string;

    constructor(name: string, email: string, phone: string, country: string, subject: string, description: string){
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.country = country;
        this.subject = subject;
        this.description = description;
    }
}