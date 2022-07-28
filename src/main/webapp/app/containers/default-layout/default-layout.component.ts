import { Component, OnInit } from '@angular/core';
import { navItems } from 'app/_nav';
import { LoginService, Principal } from 'app/core';
import { JhiEventManager } from 'ng-jhipster';

@Component({
    selector: 'jhi-dashboard',
    templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {
    account: Account;
    public navItems = navItems;
    public sidebarMinimized = true;
    private changes: MutationObserver;
    public element: HTMLElement = document.body;
    constructor(
        private loginService: LoginService,
        private principal: Principal,
        private eventManager: JhiEventManager
    ) {
        this.changes = new MutationObserver(mutations => {
            this.sidebarMinimized = document.body.classList.contains('sidebar-minimized');
        });

        this.changes.observe(<Element>this.element, {
            attributes: true
        });
    }

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
