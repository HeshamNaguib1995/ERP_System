import { AfterViewInit, Component, ViewChild, ViewContainerRef } from '@angular/core';
import { DashboardFactoryService } from '../../../Services/dashboard-factory';
import { AuthService } from '../../../Services/auth-service';

@Component({
  selector: 'app-dashboard-loader',
  templateUrl: './dashboard-loader.html',
  styleUrls: ['./dashboard-loader.css']
})
export class DashboardLoader implements AfterViewInit  {
  @ViewChild('dashboardContainer', { read: ViewContainerRef }) container!: ViewContainerRef;

  constructor(private dashboardFactory: DashboardFactoryService,
              private authService: AuthService) {}

  ngAfterViewInit() {
    const Dep = this.authService.getDepartment();
    console.log('DashboardLoader: loading dashboard for department', Dep);
    const dashboard = this.dashboardFactory.getDashboard(Dep!);
    if (dashboard) {
      this.container.createComponent(dashboard);
    } else {
      console.warn('DashboardFactoryService: no dashboard found for HR');
    }
  }
}
