import { Component, OnInit,Input } from '@angular/core';
import {SharedService} from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit-con',
  templateUrl: './add-edit-con.component.html',
  styleUrls: ['./add-edit-con.component.css']
})
export class AddEditConComponent implements OnInit {

  constructor(private service:SharedService) { }

  @Input() con:any;
  Id:string="";
  FirstName:string="";
  LastName:string="";
  Email:string="";
  PhoneNumber:string="";
  
 

  ContactsList:any=[];

  ngOnInit(): void {
    
}

  addContact(){
    var val = {Id:this.Id,
                FirstName:this.FirstName,
                LastName:this.LastName,
                Email:this.Email,
                PhoneNumber:this.PhoneNumber,
            };

    //  this.service.addContact(val).subscribe(res=>{
    //     alert(res.toString());
    //   });
  }

  updateContact(){
    var val = {Id:this.Id,
      FirstName:this.FirstName,
      LastName:this.LastName,
      Email:this.Email,
      PhoneNumber:this.PhoneNumber,
      };

    // this.service.updateContact(val).subscribe(res=>{
    // alert(res.toString());
    // });
  }
}