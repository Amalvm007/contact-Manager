import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent {

 @Input() item:string|undefined
  @Output() onCancel = new EventEmitter()
  @Output() onDelete = new EventEmitter()

 cancel(){
//  to occer userdefined events (emits are used)

  this.onCancel.emit()
 }

//  deleteAcc
deleteAcc(){
  this.onDelete.emit(this.item)
}
}
