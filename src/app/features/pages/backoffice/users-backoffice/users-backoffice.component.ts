import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/lib/interfaces/entity.interfaces';

import {MatPaginator} from '@angular/material/paginator';
import {  deleteUser,loadUsers } from 'src/app/shared/state/actions/users.actions';
import { selectLoading, selectUser} from 'src/app/shared/state/selectors/users.selectors';

import { DialogUserFormComponent } from './dialog-user-form/dialog-user-form.component';


export interface PeriodicElement {
  n0:string;
  name: string;
  email: string;
}

@Component({
  selector: 'app-users-backoffice',
  templateUrl: './users-backoffice.component.html',
  styleUrls: ['./users-backoffice.component.scss']
})

export class UsersBackofficeComponent implements OnInit {
  dataSource = new MatTableDataSource<User>();
  newUser!:string;
  loading$:Observable<boolean>=new Observable<boolean>();
  users$:Observable<any>=new Observable();
  row!:User[];
  oneUser!:any[]
  //user!:User;

  pageIndex = 0;
  pageSize = 10;
  constructor(
    @Inject(User) public user:User,
    private router: Router,
    private store:Store<any>,
    public dialog: MatDialog,
  ) { }

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  fill(){
    this.store.dispatch(loadUsers())
  }


  updateTable() {
    this.dataSource.data = this.row;
    this.dataSource.paginator = this.paginator;
    this.paginator.page.subscribe((data: any) => {
      this.pageIndex = data.pageIndex;
      this.pageSize = data.pageSize;
    });
  }
  ngOnInit(): void {
    this.fill() 
    this.loading$=this.store.select(selectLoading)
    this.store.select(selectUser).subscribe((data:any)=>{

      if(data.data){
        this.row=data.data;
       
        this.updateTable()
      }else{
        console.log('nodata')
      }
    })

  }
//************* */

getOne(id: number): User {
  let user: Array<User>;
  user = this.dataSource.filteredData.filter((user) => user.id === id);
  this.user.setIdUser= user[0].id;
  this.user.setName = user[0].name;
  this.user.setEmail = user[0].email;
  this.user.setPassword = user[0].password;
  this.user.setAddress = user[0].address;
  this.user.setProfileImage=user[0].profile_image
  
  return this.user;
}

  openEditDialogForm(id: number): void {
    console.log(id)
    let user: any = {
      user: this.getOne(id),
      title: "Editar Usuario No. " + id,
      type: "edit",
    };
    this.dialog.open(DialogUserFormComponent, {
      width: "600px",
      data: user,
    });
  }
  //************** */
  edit(id:string):void{
    console.log(id)
    this.router.navigate(['backoffice/users/edit',id]);
  }
  create():void{
    this.newUser='create'
    this.router.navigate(['backoffice/users/',this.newUser])
  }
  deleteUser(i:number):void{
  let id=i.toString();
  let userDelete:any={
    title:"Borrar Usuario",
    type:"before-deleted",
    id
  };
  this.dialog.open(DialogUserFormComponent,{
    width: "600px",
    height:"200px",
    data: userDelete,
  })

    /*
    const realIndex = i + this.pageIndex * this.pageSize;
    console.log(realIndex);
    console.log(i)
    this.dialog
      .open(DialogComponent,{
        data:{
          title:"confirmacion",
          message:`¿Estás seguro que deseas eliminar al usuario ${this.row[realIndex].name} ?`,
          confirmText:'Si',
          cancelText:'No'
        }
      })
      .afterClosed()
      .subscribe((confirm:Boolean)=>{
        if (confirm) {
          this.store.dispatch(
            deleteUser({
              id:(this.row[realIndex].id).toString()
            }));
          this.row=this.row.filter(
            (e:any)=>
              e.id != this.row[realIndex].id
            );
            this.updateTable();
        }
      })
   */
  }


  displayedColumns: string[] = ['n0', 'name', 'email', 'actions'];


}