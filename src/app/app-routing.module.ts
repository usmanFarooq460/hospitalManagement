import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuardGuard } from "./accounts/auth-guard.guard";
import { MainLayoutdesignComponent } from "./shared/main-layoutdesign/main-layoutdesign.component";

const routes: Routes = [
  { path: "", redirectTo: "/dashboards", pathMatch: "full" },
  {
    path: "basic-ui",
    component: MainLayoutdesignComponent,
    loadChildren: () =>
      import("./basic-ui/basic-ui.module").then((m) => m.BasicUiModule),
    canActivate: [AuthGuardGuard],
  },
  {
    path: "dashboards",
    component: MainLayoutdesignComponent,
    loadChildren: () =>
      import("./app-main/dashboards/dashboards.module").then(
        (m) => m.DashboardsModule
      ),
  },
  {
    path: "pharmacy",
    component: MainLayoutdesignComponent,
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
    component:MainLayoutdesignComponent,
    loadChildren: () =>
      import("./app-main/definitons/definitons.module").then(
        (m) => m.DefinitonsModule
      ),
    canActivate:[AuthGuardGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
