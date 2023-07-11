import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { MyContact } from 'src/models/myContacts';

@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.css']
})
export class ContactManagerComponent implements OnInit{

  allContact:MyContact[]=[]

  constructor( private api:ApiService){

  }
  ngOnInit(): void{
    this.api.getAllContacts().subscribe((data:any)=>{
      console.log(data);
      this.allContact=data

      
    })

  }
}
