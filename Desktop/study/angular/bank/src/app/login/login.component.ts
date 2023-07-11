import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  // errorMsg
   errorMsg:string=''
   successMsg:boolean=false


  // loginform group
  loginForm=this.fb.group({
    // array
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[0-9a-zA-Z]*')]]
  })

  constructor( private fb:FormBuilder, private api:ApiService, private router:Router){

  }
  // login function
  login(){

    if(this.loginForm.valid){
    console.log(this.loginForm.value);
    let acno = this.loginForm.value.acno
    let pswd = this.loginForm.value.pswd
    this.api.login(acno,pswd)
    .subscribe(
      // success case
      (result:any)=>{
        // alert(result.message)
        this.successMsg=true
        // to store username in locolstorage 
        localStorage.setItem("username",result.username)
        // to store currentAcno in locolstorage 
        localStorage.setItem("currentAcno",JSON.stringify(result.currentAcno))
        // to store token in locolstorage 
        localStorage.setItem("token",result.token)

        setTimeout(() => {
          // Navigate to login page
        this.router.navigateByUrl('dashboard') 
        }, 2000);
        

      },
      // client error
      (result:any)=>{
        
        this.errorMsg=result.error.message
      }

    )

    }
    else{
      alert('Invaild Form')
    }
    
  }

}
