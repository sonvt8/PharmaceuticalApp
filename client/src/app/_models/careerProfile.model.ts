export class CareerProfile{
    public id?: number;
    public jobName: string;
    public salary: number;
    public location: string;
    public isApproved: boolean;
    public appUserId: number;

    constructor(jobName: string, salary: number, location: string, isApproved: boolean, appUserId: number){
        this.jobName = jobName;
        this.salary = salary;
        this.location = location;
        this.isApproved = isApproved;
        this.appUserId = appUserId;
    }
}