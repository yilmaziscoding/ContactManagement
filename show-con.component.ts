import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {SharedService} from 'src/app/shared.service';

@Component({
  selector: 'app-show-con',
  templateUrl: './show-con.component.html',
  styleUrls: ['./show-con.component.css']
})
export class ShowConComponent implements OnInit {
  dataLoaded = false;
  angForm:any= FormGroup;
  exform:any=FormGroup;

  constructor(private service:SharedService,private toastr: ToastrService,
    private fb: FormBuilder) {
      this.createForm();
     }
     createForm() {
      this.angForm = this.fb.group({
         name: ['', Validators.required ]
      });
    }

  ContactList:any=[];

  public addContactModel = {
    Id:0,
    FirstName:"",
    LastName:"",
    Email:"",
    PhoneNumber:"",
  }; 

  ModalTitle:string="";
  ActivateAddEditConComp:boolean=false;
  con:any;
  IdFilter:string="";
  ContactNameFilter:string="";
  ContactLastNameFilter:string="";
  ContactListWithoutFilter:any=[];
  errorMessage = "";

  ngOnInit(): void {
    this.refreshConList();

    this.exform = new FormGroup({
      'FirstName' : new FormControl(null, Validators.required),
      'email' : new FormControl(null, [Validators.required, Validators.email]),
      'phoneNumber' : new FormControl(
        null,
        [
          Validators.required,
          Validators.pattern('^\\s*(?:\\+?(\\d{1,3}))?[-. (]*(\\d{3})[-. )]*(\\d{3})[-. ]*(\\d{4})(?: *x(\\d+))?\\s*$')
        ]),
      'message' : new FormControl(null, [Validators.required, Validators.minLength(10)])
    });
  }
 
  saveContact(){
      this.service.addContact(this.addContactModel).subscribe(data=>{
      //alert(data.toString());
      this.toastr.success("Added Successfully!","Success")
      this.refreshConList();    
      
      this.addContactModel={
        Id:0,
        FirstName:"",
        LastName:"",
        Email:"",
        PhoneNumber:""
      }
    });
  }

  editContact(){
      this.service.updateContact(this.addContactModel).subscribe(data=>{
      //alert(data.toString());
      this.toastr.info("Updated Successfully!","Information")
      this.refreshConList();    
      
      this.addContactModel={
        Id:0,
        FirstName:"",
        LastName:"",
        Email:"",
        PhoneNumber:""
      }
    });
  }

  addClick(){
    this.con={
      Id:0,
      FirstName:"",
      LastName:"",
      Email:"",
      PhoneNumber:""
    }
    this.ModalTitle="Add Contact";
    //this.ActivateAddEditConComp=true;   
    this.addContactModel = this.con;
  }

  editClick(item:any){
    console.log(item);  
    this.con=item;
    this.ModalTitle="Edit Contact";
    //this.ActivateAddEditConComp=true;
    this.addContactModel = item;       
  }

  deleteClick(item:any){
    if(confirm('Are you sure??')){
      this.service.deleteContact(item.Id).subscribe(data=>{
        //alert(data.toString());
        this.toastr.warning("This contact has been deleted!","Warning")
        this.refreshConList();        
      })
    }
  }

  // closeClick(){
  //   this.ActivateAddEditConComp=false;
  //   this.refreshConList();
  // }

  refreshConList(){
    this.service.getConList().subscribe((response:any)=>{
        if(response.Success){
        this.ContactList=response.Data;
        this.ContactListWithoutFilter=response.Data;
        this.errorMessage = response.Message;
        this.dataLoaded=true
      }
      else{
          this.errorMessage = response.Message;
      }
    },(err)=>{
      console.log(err);
    });
  }

  FilterFn(){
    var IdFilter = this.IdFilter;
    var ContactNameFilter = this.ContactNameFilter;
    this.ContactList = this.ContactListWithoutFilter.filter(function (el:any){
      return el.Id.toString().toUpperCase().includes(
        IdFilter.toString().trim().toUpperCase()
      )&&
      el.FirstName.toString().toUpperCase().includes(
        ContactNameFilter.toString().trim().toUpperCase()
      )
  });
  }

  FilterLn(){
    var IdFilter = this.IdFilter;
    var ContactLastNameFilter = this.ContactLastNameFilter;
    this.ContactList = this.ContactListWithoutFilter.filter(function (el:any){
      return el.Id.toString().toUpperCase().includes(
        IdFilter.toString().trim().toUpperCase()
      )&&
      el.LastName.toString().toUpperCase().includes(
        ContactLastNameFilter.toString().trim().toUpperCase()
      )
  });
  }
}
