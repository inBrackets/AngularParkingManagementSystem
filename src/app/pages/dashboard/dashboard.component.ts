import {Component, inject, OnInit} from '@angular/core';
import {MasterService} from '../../services/master.service';
import {ISite, ResponseModel} from '../../model/user.model';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  standalone: true,
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  siteList: ISite[] = []
  masterSrv = inject(MasterService);

  ngOnInit(): void {
    this.getSites();
  }

  getSites() {
    this.masterSrv.getSitesByClientId().subscribe((res: ResponseModel) => {
      this.siteList = res.data;
    })
  }

}
