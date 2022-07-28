import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ProjectGhZonalModule } from './zonal/zonal.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        ProjectGhZonalModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjectGhEntityModule {}
