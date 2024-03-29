import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuardGuard } from "./accounts/auth-guard.guard";
import { MainLayoutdesignComponent } from "./shared/main-layoutdesign/main-layoutdesign.component";

const routes: Routes = [
  { path: "", redirectTo: "/dashboards", pathMatch: "full" },
  {
    path: "basic-ui",
    loadChildren: () =>
      import("./basic-ui/basic-ui.module").then((m) => m.BasicUiModule),
    canActivate: [AuthGuardGuard],
  },
  {
    path: "icons",
    loadChildren: () =>
      import("./icons/icons.module").then((m) => m.IconsModule),
    canActivate: [AuthGuardGuard],
  },
  {
    path: "dashboards",
    loadChildren: () =>
      import("./app-main/dashboards/dashboards.module").then(
        (m) => m.DashboardsModule
      ),
  },
  {
    path: "pharmacy",
    loadChildren: () =>
      import("./app-main/pharmacy/pharmacy.module").then(
        (m) => m.PharmacyModule
      ),
    canActivate: [AuthGuardGuard],
  },
  {
    path: "Accounts",
    loadChildren: () =>
      import("./accounts/accounts.module").then((m) => m.AccountsModule),
  },
  {
    path: "definitions",
    loadChildren: () =>
      import("./app-main/definitons/definitons.module").then(
        (m) => m.DefinitonsModule
      ),
    canActivate: [AuthGuardGuard],
  },
  {
    path: "staff",
    loadChildren: () =>
      import("./app-main/staff/staff.module").then((m) => m.StaffModule),
    canActivate: [AuthGuardGuard],
  },
  {
    path: "patient",
    loadChildren: () =>
      import("./app-main/patients/patients.module").then(
        (m) => m.PatientsModule
      ),
    canActivate: [AuthGuardGuard],
  },
  {
    path: "department",
    loadChildren: () =>
      import("./app-main/department/department.module").then(
        (m) => m.DepartmentModule
      ),
    canActivate: [AuthGuardGuard],
  },
  {
    path: "appointment",
    loadChildren: () =>
      import("./app-main/appointments/appointments.module").then(
        (m) => m.AppointmentsModule
      ),
    canActivate: [AuthGuardGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
