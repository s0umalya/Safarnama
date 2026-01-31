import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
    standalone: true,
    selector: 'app-layout',
    imports: [
        RouterOutlet,
        MatSidenavModule,
        NavbarComponent
    ],
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
    sidenavOpen = signal(false);

    toggleSidenav() {
        this.sidenavOpen.update(v => !v);
    }

    closeSidenav() {
        this.sidenavOpen.set(false);
    }
}
