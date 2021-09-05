import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs'; 
@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly APIUrl="https://localhost:44347/api";
  readonly PhotoUrl = "http://localhost:44347/Photos";


  constructor(private http:HttpClient) { }

  getConList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/Contact');
  }

  addContact(val:any){
    return this.http.post(this.APIUrl+'/Contact',val);
  }

  updateContact(val:any){
    return this.http.put(this.APIUrl+'/Contact',val);
  }

  deleteContact(val:any){
    return this.http.delete(this.APIUrl+'/Contact/'+val);
  }


  UploadPhoto(val:any){
    return this.http.post(this.APIUrl+'/Contact/SaveFile',val);
  }
}
