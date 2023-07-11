import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MyContact } from 'src/models/myContacts';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl:string='http://localhost:3000/contacts'

  constructor(private http:HttpClient) { }

  // function for get all contacts
  getAllContacts():Observable<MyContact>{
    return this.http.get(this.baseUrl)
  }

  // function for view contact
  viewContact(contactId:string){
    return this.http.get(`${this.baseUrl}/${contactId}`)
  }

  // function for get group id
  getGroupName(id:string){
   return  this.http.get('http://localhost:3000/groupId/'+id)
  }

  
}
