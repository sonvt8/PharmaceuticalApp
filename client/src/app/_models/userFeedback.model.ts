import { Feedback } from "./feedback.model";

export class UserFeedback {
    public fullName: string;
    public photoUrl: string;
    public comments: string;

    constructor(fullName: string, photoUrl: string, comments: string){
        this.fullName = fullName;
        this.photoUrl = photoUrl;
        this.comments = comments;
    }
}