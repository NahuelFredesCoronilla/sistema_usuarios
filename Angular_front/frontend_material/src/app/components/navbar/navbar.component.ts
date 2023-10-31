import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLogoutDisabled: boolean = JSON.parse(localStorage.getItem('isLogoutDisabled') || 'false');

  constructor(private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {}

  logout(): void {
    this.isLogoutDisabled = false; 
    localStorage.setItem('isLogoutDisabled', JSON.stringify(this.isLogoutDisabled));
  
    
    localStorage.removeItem("token");
    this.router.navigate(["login"]);
  }
}
