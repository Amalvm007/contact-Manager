import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import party from "party-js";
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  fundTransferSuccessMsg:string=''
  fundTransferErrorMsg:string=''

  user:string=""
  signoutDiv:boolean=false
  deleteconfirm:boolean=false
  deleteAnimationDiv:boolean=false

  isCollapse:boolean=true
  currentAcno:Number=0
  acno:any="";
  balance:Number=0
  depositMsg:string=''
  depositForm=this.fb.group({
    amount:['',[Validators.required,Validators.pattern('[0-9]*')]]
  })
  fundTransferForm=this.fb.group({
    toAcno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[0-9a-zA-Z]*')]],
    amount:['',[Validators.required,Validators.pattern('[0-9]*')]],

  })

  constructor( private api:ApiService , private fb:FormBuilder , private router : Router){

  }


  ngOnInit(){
    if(!localStorage.getItem('token')){

      alert('Please Login....!')
      // navigate to login page
      this.router.navigateByUrl('')

    }


    if(localStorage.getItem("username")){
      this.user=localStorage.getItem("username")||''
    }
   
  }

  collapse(){
    this.isCollapse=!this.isCollapse

  }

  // getbalance
  getBalance(){
    if( localStorage.getItem("currentAcno")){
      this.currentAcno=JSON.parse (localStorage.getItem("currentAcno")||'')
         console.log(this.currentAcno);
         this.api.getBalance(this.currentAcno)
         .subscribe(
          (result:any)=>{
            console.log(result);
            this.balance=result.Balance
            

          }
         )
         
   }
  }

  // deposit ()
  deposit(){
    if(this.depositForm.valid){
      let amount = this.depositForm.value.amount
      this.currentAcno= JSON.parse(localStorage.getItem("currentAcno")||'')
      this.api.deposit(this.currentAcno,amount)
      .subscribe((result:any)=>{
        console.log(result);
        this.depositMsg=result.message
        setTimeout(()=>{
          this.depositForm.reset()
          this.depositMsg=''
        },2000)
      },
      (result:any)=>{
        this.depositMsg=result.error.message
        

      })

    }else{
      alert('Invaild Form')

    }
  }

  // showconfetti
showconfetti(source:any){
  party.confetti(source);
  
}

transfer(){
  if(this.fundTransferForm.valid){
    let toAcno = this.fundTransferForm.value.toAcno
    let pswd = this.fundTransferForm.value.pswd
    let amount = this.fundTransferForm.value.amount
    // make api call for fundtransfer
    this.api.fundTransfer(toAcno,pswd,amount)
    .subscribe(
      // success case
      (result:any)=>{
        this.fundTransferSuccessMsg=result.message
        setTimeout(()=>{
          this.fundTransferForm.reset()
          this.fundTransferSuccessMsg=''
        },4000)
      },
      // error case
      (result:any)=>{
        this.fundTransferErrorMsg=result.error.message
        setTimeout(()=>{
          this.fundTransferErrorMsg=''
        },4000)
      },
      
    )

  }else{
    alert('Invaild Form')
  }

}
// close
close(){
  setTimeout(()=>{
    this.fundTransferForm.reset()
    this.fundTransferSuccessMsg=''
    this.fundTransferErrorMsg=''
  },3000)
}

// signout
signout(){
  localStorage.removeItem("token")
  localStorage.removeItem("username")
  localStorage.removeItem("currentAcno")
  this.signoutDiv=true
  setTimeout(() => {
     //  navigate to login page 
  this.router.navigateByUrl('')
  this.signoutDiv=false
  }, 4000);

}

// deleteFunction
deleteFunction(){
  this.acno=localStorage.getItem("currentAcno")
  this.deleteconfirm=true
}

// onCancel
onCancel(){
  this.acno=''
  this.deleteconfirm=false
}

// onDelete acnt
onDelete(event:any){
  let deleteAcno = JSON.parse(event)
  this.api.deleteAccount(deleteAcno)
  .subscribe((result:any)=>{
    this.acno=''
    localStorage.removeItem("token")
  localStorage.removeItem("username")
  localStorage.removeItem("currentAcno")
  this.deleteAnimationDiv=true
  setTimeout(() => {
    //  navigate to login page 
 this.router.navigateByUrl('')
 this.deleteAnimationDiv=false
 }, 5000);
  },
  (result:any)=>{
    alert(result.error.message)
  }
  )

}

}


