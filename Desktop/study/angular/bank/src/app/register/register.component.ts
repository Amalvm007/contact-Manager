import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  // register Group

  registerForm=this.fb.group({
    // array
    name:['',[Validators.required ,Validators.pattern('[A-Za-z]*')]],
    acno:['',[Validators.required, Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[0-9a-zA-Z]*')]]

  })

  constructor( private fb:FormBuilder , private api:ApiService , private router:Router){

  }
// register function
  register(){
    if(this.registerForm.valid){
      
      let name =this.registerForm.value.name
      let acno = this.registerForm.value.acno
      let pswd = this.registerForm.value.pswd
      this.api.register(name,acno,pswd)
      .subscribe(
        // success
        (data:any)=>{
        alert(data.message)
        console.log(data.message); 
        // Navigate to login page
        this.router.navigateByUrl('') 
      },
      // client error
      (data:any)=>{
        alert(data.error.message)
      }
      )
        
      

      

    }else{
      alert('Invaild Form')
    }

  }

}
