import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const options ={
  headers : new HttpHeaders

}
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor( private http:HttpClient) { }

  // register api call
  register(name:any,acno:any,pswd:any){

    const body ={
      name,
      acno,
      pswd

    }
    return this.http.post('http://localhost:3000/register',body)

  }

  // api call for login 
  login(acno:any,pswd:any){
    const body ={
      acno,pswd
    }
    return this.http.post('http://localhost:3000/login',body)
  }

  //  appending token to headers
  appendToken(){
   
       // fetch token form localstroage 
    const token=localStorage.getItem("token")||''

    // create http header
    var headers = new HttpHeaders()
    if(token){
      // appending token in headers
      headers=headers.append('token',token)
      // overloading 
      options.headers=headers

    }
    return options
   
  }
  // getbalance api call
  getBalance(acno:any){
    return this.http.get('http://localhost:3000/getBalance/'+acno,this.appendToken())

  }
  // deposit api call
  deposit(acno:any,amount:any ){
    const body ={
      acno,
      amount
    }
    return this.http.post('http://localhost:3000/deposit', body,this.appendToken())

  }

  // fundTransfer
  fundTransfer(toAcno:any,pswd:any,amount:any){
    const body={
      toAcno,
      pswd,
      amount
    }
    return this.http.post('http://localhost:3000/fundTransfer', body,this.appendToken())

  }

  // transactions history
  allTransaction(){
    return this.http.get('http://localhost:3000/all-transaction',this.appendToken())
  }

  // deleteAccount
  deleteAccount(acno:number){
    return this.http.delete('http://localhost:3000/delete-account/'+acno,this.appendToken())


  }
}
