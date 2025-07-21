export class User {
  emailId: string;
  password: string;

  constructor() {
    this.emailId = '';
    this.password = '';
  }
}

export interface IUserModel {
  userId: number
  emailId: string
  password: string
  createdDate: string
  projectName: string
  fullName: string
  mobileNo: string
  extraId: number
}

export interface ResponseModel {
  message: string
  result: boolean
  data: any
}

export interface ISite {
  siteId: number
  clientId: number
  siteName: string
  siteCity: string
  siteAddress: string
  sitePinCode: string
  totalBuildings: number
  createdDate: string
}

export interface IBuilding {
  buildingId: number
  siteId: number
  buildingName: string
  buildingManagerName: string
  contactNo: string
  siteName: string
}

export interface IFloor {
  floorId: number
  buildingId: number
  floorNo: string
  isOperational: boolean
  totalParkingSpots: number
}

export interface IParking {
  parkId: number
  floorId: number
  custName: string
  custMobileNo: string
  vehicleNo: string
  parkDate: Date
  parkSpotNo: number
  inTime: Date
  outTime: Date | null
  amount: number
  extraCharge: number
  parkingNo: string
}

export interface IParkingExt {
  parkId: number
  custName: string | null;
  custMobileNo: string
  vehicleNo: string
  parkDate: Date
  parkSpotNo: number
  inTime: Date
  outTime: Date | null
  amount: number
  extraCharge: number
  floorNo: string
  buildingName: string
  siteName: string
  parkingNo: string
  clientName: string
}

export interface IMarkExit {
  parkId: number
  outTime: Date | null
  extraCharge: number
}




