import { Injectable, Type } from '@angular/core';
import { HrDashboard } from '../Components/Dashboards/hr-dashboard/hr-dashboard';
import { FinanceDashboard } from '../Components/Dashboards/finance-dashboard/finance-dashboard';
import { SalesDashboard } from '../Components/Dashboards/sales-dashboard/sales-dashboard';
import { InventoryDashboard } from '../Components/Dashboards/inventory-dashboard/inventory-dashboard';
@Injectable({
  providedIn: 'root'
})
export class DashboardFactoryService {
    private dashboards: { [role: string]: Type<any> } = {
    HR: HrDashboard,
    Finance: FinanceDashboard,
    Sales: SalesDashboard,
    Inventory: InventoryDashboard
  };

  getDashboard(role: string): Type<any> | null {
    return this.dashboards[role] || null;
  }
}
