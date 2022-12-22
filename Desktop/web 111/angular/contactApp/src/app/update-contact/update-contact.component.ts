import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MyContact } from 'src/models/mycontact';
import { MyGroup } from 'src/models/myGroup';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-update-contact',
  templateUrl: './update-contact.component.html',
  styleUrls: ['./update-contact.component.css']
})
export class UpdateContactComponent implements OnInit{
  contactId:string=''
  contact:MyContact= {} as MyContact
  groups:MyGroup[]=[] as MyGroup[]
  constructor(private activateRoute:ActivatedRoute,private api:ApiService,private router:Router){

  }
 

  ngOnInit(): void {
    this.activateRoute.params.subscribe((data)=>{
      // get contact id from url parameter using ActivatedRoute class
      console.log(data['contactId']);
      this.contactId=data['contactId']
      
    })
    // call api fo getting particular contact details
    this.api.viewContact(this.contactId).subscribe((data:any)=>{
      this.contact=data
      console.log(this.contact);
      
    })
    // call api for all groups from service class

    this.api.getAllGroup().subscribe((data:any)=>{
      this.groups=data
    })
    
  }
  // update contact
  updateContact(){
    // api call for updating existing contact ,arg: updated contact , id
    this.api.updateContact(this.contactId,this.contact).subscribe((data:any)=>{
      this.router.navigateByUrl('')

    })
  }


}
