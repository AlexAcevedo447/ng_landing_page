import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-backoffice',
  templateUrl: './users-backoffice.component.html',
  styleUrls: ['./users-backoffice.component.scss']
})
export class UsersBackofficeComponent implements OnInit {
 
  constructor(private router: Router,) { }
  info=[{name:"Juan Perez",email:"Juan@gmail.com"}]
  
  ngOnInit(): void {
  }
  
  create():void{
    this.router.navigateByUrl("backoffice/users/create");
  }
}
