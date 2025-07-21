import {Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import {MasterService} from '../../services/master.service';
import {IBuilding, IFloor, IMarkExit, IParking, IParkingExt, ISite, ResponseModel} from '../../model/user.model';
import {FormsModule} from '@angular/forms';
import {NgClass, NgForOf} from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [
    FormsModule,
    NgClass,
    NgForOf
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
  parkingSpotArray: number[] = [];
  @ViewChild("bookSpot") bookModal!: ElementRef;
  @ViewChild("releaseSpot") releaseModal!: ElementRef;
  bookSpotObj: IParking = {
    "parkId": 0,
    "floorId": 0,
    "custName": "",
    "custMobileNo": "",
    "vehicleNo": "",
    "parkDate": new Date(),
    "parkSpotNo": 0,
    "inTime": new Date(),
    "outTime": null,
    "amount": 0,
    "extraCharge": 0,
    "parkingNo": ""
  };
  markExitObj: IMarkExit = {
    "parkId": 0,
    "outTime": new Date(),
    "extraCharge": 0
  }
  bookedSpots: IParkingExt[] = [];

  ngOnInit(): void {
    this.getSites();
  }

  checkIfSpotBooked(spotNo: number){
    const isExist = this.bookedSpots.find(s => s.parkSpotNo == spotNo && s.outTime == null);
    if(isExist) {
      return isExist;
    } else {
      return undefined;
    }
  }

  openBookModal(spotNumber: number) {
    this.bookSpotObj.parkSpotNo = spotNumber;
    this.bookSpotObj.floorId = this.floorId;
    if(this.bookModal) {
      this.bookModal.nativeElement.style.display = 'block';
    }
  }

  closeBookModal() {
    if(this.bookModal) {
      this.bookModal.nativeElement.style.display = 'none';
    }
  }

  openReleaseModal(parkId: number | undefined) {
    if (parkId != null) {
      this.markExitObj.parkId = parkId;
    }
    if(this.releaseModal) {
      this.releaseModal.nativeElement.style.display = 'block';
    }
  }

  closeReleaseModal() {
    if(this.releaseModal) {
      this.releaseModal.nativeElement.style.display = 'none';
    }
  }

  getSites() {
    this.masterSrv.getSitesByClientId().subscribe((res: ResponseModel) => {
      this.siteList = res.data;
    })
  }

  getBuilding() {
    this.parkingSpotArray = [];
    this.floorList = [];
    this.masterSrv.getBuildingBySiteId(this.siteId).subscribe((res: ResponseModel) => {
      this.buildingList = res.data;
    })
  }

  changeFloorByBuilding() {
    this.parkingSpotArray = [];
    this.masterSrv.getFloorsByBuildingId(this.buildingId).subscribe((res: ResponseModel) => {
      this.floorList = res.data;
    })
  }

  onFloorSelect() {
    this.parkingSpotArray = [];
    const floor = this.floorList.find((m: IFloor) => m.floorId == this.floorId);
    // @ts-ignore
    for (let index= 1; index <= floor.totalParkingSpots; index++) {
      this.parkingSpotArray.push(index);
    }
    this.getBooking();
  }

  getBooking() {
    this.masterSrv.getAllParkingByFloor(this.floorId).subscribe((res: ResponseModel) => {
      this.bookedSpots = res.data;
    })
  }

  onBookSpot() {
    this.masterSrv.bookSpot(this.bookSpotObj).subscribe((res: ResponseModel) => {
      alert("Spot Booked");
      this.getBooking();
    })
  }

  onExitCard() {
    this.masterSrv.releaseSpot(this.markExitObj).subscribe((res: ResponseModel) => {
      this.getBooking();
      this.closeReleaseModal();
    })
  }
}
