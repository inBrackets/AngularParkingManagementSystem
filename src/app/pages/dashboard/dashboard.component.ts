import {Component, inject, OnInit} from '@angular/core';
import {MasterService} from '../../services/master.service';
import {IBuilding, IFloor, ISite, ResponseModel} from '../../model/user.model';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  imports: [
    FormsModule
  ],
  templateUrl: './dashboard.component.html',
  standalone: true,
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  siteList: ISite[] = [];
  buildingList: IBuilding[] = [];
  floorList: IFloor[] = [];
  masterSrv = inject(MasterService);
  siteId: number = 0;
  buildingId: number = 0;
  floorId: number = 0;
  parkingSpotArray: number[] = []

  ngOnInit(): void {
    this.getSites();
  }

  getSites() {
    this.masterSrv.getSitesByClientId().subscribe((res: ResponseModel) => {
      this.siteList = res.data;
    })
  }

  getBuilding() {
    this.masterSrv.getBuildingBySiteId(this.siteId).subscribe((res: ResponseModel) => {
      this.buildingList = res.data;
    })
  }

  changeFloorByBuilding() {
    this.masterSrv.getFloorsByBuildingId(this.buildingId).subscribe((res: ResponseModel) => {
      this.floorList = res.data;
    })
  }

  onFloorSelect() {
    const floor = this.floorList.find((m: IFloor) => m.floorId == this.floorId);
    // @ts-ignore
    for (let index= 1; index <= floor.totalParkingSpots; index++) {
      this.parkingSpotArray.push(index);
    }
  }
}
