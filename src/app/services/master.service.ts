import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IParking, ResponseModel} from '../model/user.model';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  userSrv = inject(UserService);

  constructor(private http: HttpClient) {
  }

  apiUrl: string = 'https://api.freeprojectapi.com/api/SmartParking/';

  getSitesByClientId(): Observable<ResponseModel> {
    const clientId = this.userSrv.loggedUserData.extraId;
    return this.http.get<ResponseModel>(`${this.apiUrl}GetSitesByClientId?id=${clientId}`)
  }

  getBuildingBySiteId(siteId: number): Observable<ResponseModel> {
    return this.http.get<ResponseModel>(`${this.apiUrl}GetBuildingBySiteId?id=${siteId}`)
  }

  getFloorsByBuildingId(buildingId: number): Observable<ResponseModel> {
    return this.http.get<ResponseModel>(`${this.apiUrl}GetFloorsByBuildingId?id=${buildingId}`)
  }

  getAllParkingByFloor(floorId: number): Observable<ResponseModel> {
    return this.http.get<ResponseModel>(`${this.apiUrl}GetAllParkingByFloor?id=${floorId}`)
  }

  bookSpot(obj:any): Observable<ResponseModel> {
    return this.http.post<ResponseModel>(`${this.apiUrl}AddParking`, obj)
  }

  releaseSpot(obj:any): Observable<ResponseModel> {
    return this.http.post<ResponseModel>(`${this.apiUrl}MarExit`, obj)
  }
}
