/******************************************************************************
*  Property of Kenbrian
*  Kenbrian Confidential Proprietary
*  Kenbrian Copyright (C) 2018 All rights reserved
*  ----------------------------------------------------------------------------
*  Date: 2018/08/02 11:27:58
*  Target: yarn
*******************************************************************************/
// Angular
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Components Routing
import { ConfigurationRoutingModule } from 'app/entities/configuration/configuration.routing.module';
import { ZonalComponent } from 'app/entities/configuration/zonal.component';

import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
// import { AlertModule } from 'ngx-bootstrap';

// Display the tooltip, Added the NgbModel from bootsrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProjectGhSharedModule } from 'app/shared';

// For Date picker
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateMomentAdapter } from '../../shared/util/datepicker-adapter';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ModalModule.forRoot(),
        // AlertModule.forRoot(),
        TabsModule.forRoot(),
        ConfigurationRoutingModule,
        FontAwesomeModule,
        NgbModule.forRoot(),
        ProjectGhSharedModule
    ],
    declarations: [
        ZonalComponent
    ],
    providers: [
        { provide: NgbDateAdapter, useClass: NgbDateMomentAdapter }
    ],
    exports: [NgbModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ConfigurationModule {}
