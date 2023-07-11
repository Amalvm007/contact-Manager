import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import jspdf from 'jspdf';
import 'jspdf-autotable';
import { Router } from '@angular/router';


@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  allTransaction:any;

  searchkey:string=''


  constructor( private api:ApiService , private router:Router){

  }
  ngOnInit(): void {
    if(!localStorage.getItem('token')){

      alert('Please Login....!')
      // navigate to login page
      this.router.navigateByUrl('')

    }



    this.api.allTransaction()
    .subscribe((result:any)=>{
      this.allTransaction=result.transaction
      console.log(this.allTransaction);
      
    })
    
  }
  // search
  search(event:any){
    this.searchkey=event.target.value

  }
  
  // generatepdf
  generaterPDF(){
    var pdf = new jspdf()
    let col = ['Type','FromAcno','ToAcno','Amount']
    let row:any = []
    pdf.setFontSize(16);
    pdf.text('Transaction History',11,8);
    pdf.setFontSize(12);
    pdf.setTextColor(99);
    
    // to convert allTransactions to nested array

    var itemNew= this.allTransaction

    for( let element of itemNew){
      var temp =[element.type,element.fromAcno,element.toAcno,element.amount]
      row.push(temp)

    }
    

    (pdf as any).autoTable(col,row,{startY:10})
    // open PDF document in browswe new tab
    pdf.output('dataurlnewwindow')

    // download pdf document
    pdf.save('ministatement.pdf')

  }

}
