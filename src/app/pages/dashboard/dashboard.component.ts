import {Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import {MasterService} from '../../services/master.service';
import {IBuilding, IFloor, IMarkExit, IParking, IParkingExt, ISite, ResponseModel} from '../../model/user.model';
import {FormsModule} from '@angular/forms';
import {DecimalPipe, NgClass, NgForOf} from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [
    FormsModule,
    NgClass,
    NgForOf,
    DecimalPipe
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
  allSpotsPerFloor: IParkingExt[] = [];
  bookedSpotsPerFloor: IParkingExt[] = [];

  ngOnInit(): void {
    this.getSites();
  }

  checkIfSpotBooked(parking: IParkingExt){
    return parking.outTime == null;
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
    this.allSpotsPerFloor = [];
    this.bookedSpotsPerFloor = [];
    this.floorList = [];
    this.masterSrv.getBuildingBySiteId(this.siteId).subscribe((res: ResponseModel) => {
      this.buildingList = res.data;
    })
  }

  changeFloorByBuilding() {
    this.allSpotsPerFloor = [];
    this.bookedSpotsPerFloor = [];
    this.masterSrv.getFloorsByBuildingId(this.buildingId).subscribe((res: ResponseModel) => {
      this.floorList = res.data;
    })
  }

  onFloorSelect() {
    this.allSpotsPerFloor = [];
    this.bookedSpotsPerFloor = [];
    const floor = this.floorList.find((m: IFloor) => m.floorId == this.floorId);
    this.getBooking();
  }

  getBooking() {
    this.masterSrv.getAllParkingByFloor(this.floorId).subscribe((res: ResponseModel) => {
      this.allSpotsPerFloor = res.data;
      this.bookedSpotsPerFloor = this.allSpotsPerFloor.filter(s=>s.outTime == null);
    })
  }

  onBookSpot() {
    this.masterSrv.bookSpot(this.bookSpotObj).subscribe((res: ResponseModel) => {
      alert("Spot Booked");
      this.getBooking();
    })
    this.closeBookModal();
  }

  onExitCard() {
    this.masterSrv.releaseSpot(this.markExitObj).subscribe((res: ResponseModel) => {
      this.getBooking();
      this.closeReleaseModal();
    })
  }
}
