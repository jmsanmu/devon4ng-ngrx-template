import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { SearchCriteria } from '../../../shared/models/search-criteria';
import { Router } from '@angular/router';
import { SampleDataModel } from '../models/sampledata.model';

@Injectable({
  providedIn: 'root',
})
export class SampleDataService {
  private urlService: string =
    environment.restServiceRoot + 'sampledatamanagement/v1/sampledata/';

  /* Creates an instance of SampleDataService.
   * @param {HttpClient} http
   * @param {Router} router
   * @memberof SampleDataService
   */
  constructor(private http: HttpClient, public router: Router) {}

  /* @param {number} size
   * @param {number} page
   * @param {*} searchTerms
   * @param {any[]} sort
   * @returns {Observable<SampleDataModel[]>}
   * @memberof SampleDataService
   */
  getSampleData(
    size: number,
    page: number,
    searchTerms: any,
    sort: any[],
  ): Observable<any> {
    const searchCriteria: SearchCriteria = {
      pageable: {
        pageSize: size,
        pageNumber: page,
        sort: sort,
      },
      name: searchTerms.name,
      surname: searchTerms.surname,
      age: searchTerms.age,
      mail: searchTerms.mail,
    };

    return this.http.post<any>(this.urlService + 'search', searchCriteria);
  }

  /* @param {*} data
   * @returns {Observable<Object>}
   * @memberof SampleDataService
   */
  saveSampleData(data: any): Observable<Object> {
    const obj: any = {
      id: data.id,
      name: data.name,
      surname: data.surname,
      age: data.age,
      mail: data.mail,
    };
    return this.http.post(this.urlService, obj);
  }

  /* @param {*} data
   * @returns {Observable<Object>}
   * @memberof SampleDataService
   */
  editSampleData(data: any): Observable<Object> {
    const obj: any = {
      id: data.id,
      name: data.name,
      modificationCounter: data.modificationCounter,
      surname: data.surname,
      age: data.age,
      mail: data.mail,
    };

    return this.http.post(this.urlService, obj);
  }

  /* @param {*} criteria
   * @returns {Observable<Object>}
   * @memberof SampleDataService
   */
  searchSampleData(criteria: any): Observable<Object> {
    return this.http.post(this.urlService + 'search', {
      criteria: criteria,
    });
  }

  /* @param {number} id
   * @returns {Observable<Object>}
   * @memberof SampleDataService
   */
  deleteSampleData(id: number): Observable<Object> {
    return this.http.delete(this.urlService + id);
  }
}
