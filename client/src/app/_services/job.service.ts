import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Job } from '../_models/job.model';
import { PaginatedResult } from '../_models/pagination';
import { map } from 'rxjs/operators';
import { JobParams } from '../_models/jobParams.model';
import { AccountService } from './account.service';
import { User } from '../_models/user.model';

@Injectable({
    providedIn: 'root'
})
export class JobService {

    jobParams : JobParams
    constructor(private http: HttpClient) {

    }
    baseUrl = environment.apiUrl + "/jobs";

    getJobNoRequest() {
        return this.http.get(this.baseUrl + '/no-request');
    }

    getJob() {
        return this.http.get(this.baseUrl);
    }

    postJob(val: Job) {
        return this.http.post(this.baseUrl, val);
    }

    putJob(val: Job) {
        return this.http.put(`${this.baseUrl}/${val.id}`, val);
    }

    deleteJob(val: Job) {
        return this.http.delete(`${this.baseUrl}/${val.id}`);
    }

    resetJobParams() {
        this.jobParams = new JobParams();
        return this.jobParams;
    }

    getJobPagination(jobParams: JobParams) {
        let params = this.getPaginationHeaders(jobParams.pageNumber, jobParams.pageSize);

        params = params.append('minSalary', jobParams.minSalary.toString());
        params = params.append('maxSalary', jobParams.maxSalary.toString());

        if (jobParams.search != "") {
            params = params.append('search', jobParams.search);
        }
        return this.getPaginatedResult<Job[]>(this.baseUrl + '/pagination/available', params);
    }

    private getPaginatedResult<T>(url, params) {
        const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();
        return this.http.get<T>(url, { observe: 'response', params }).pipe(
            map(response => {
                paginatedResult.result = response.body;
                if (response.headers.get('Pagination') !== null) {
                    paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
                }
                return paginatedResult;
            })
        );
    }

    private getPaginationHeaders(pageNumber: number, pageSize: number) {
        let params = new HttpParams();

        params = params.append('pageNumber', pageNumber.toString());
        params = params.append('pageSize', pageSize.toString());

        return params;
    }
}