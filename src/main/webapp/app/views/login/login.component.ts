import { Component, OnInit } from '@angular/core';
import { LoginService, Principal } from 'app/core';
import { JhiEventManager } from 'ng-jhipster';

@Component({
    selector: 'jhi-dashboard',
    templateUrl: 'login.component.html',
    styles: ['login.component.scss']
})
export class LoginComponent implements OnInit {

    account: Account;

    constructor(
        private loginService: LoginService,
        private principal: Principal,
        private eventManager: JhiEventManager
    ) {}

    ngOnInit() {
        console.log('Inside ngOnInit method');
        this.principal.identity().then(account => {
            console.log('Inside principal service');
            this.account = account;
            console.log(this.account);
        });
        this.registerAuthenticationSuccess();
    }

    registerAuthenticationSuccess() {
        console.log('authenticationSuccess');
        this.eventManager.subscribe('authenticationSuccess', message => {
            this.principal.identity().then(account => {
                this.account = account;
                console.log(this.account);
            });
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        console.log('Default Layout Component Login');
        this.loginService.login();
    }

    logout() {
        this.loginService.logout();
    }

}
