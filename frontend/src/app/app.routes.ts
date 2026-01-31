import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/components/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/home/home.page')
            .then(m => m.HomePage)
      },
    //   {
    //     path: 'trips',
    //     loadChildren: () =>
    //       import('./features/trips/trips.routes')
    //         .then(m => m.TRIPS_ROUTES)
    //   }
    ]
  }
];
