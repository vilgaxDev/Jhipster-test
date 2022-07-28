import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProjectGhSharedModule } from 'app/shared';
import { HOME_ROUTE, HomeComponent } from './';
// For Core UI
import { TabsModule } from 'ngx-bootstrap/tabs';

@NgModule({
    imports: [
        ProjectGhSharedModule,
        RouterModule.forChild([HOME_ROUTE]),
        TabsModule.forRoot()
    ],
    declarations: [HomeComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjectGhHomeModule {}
