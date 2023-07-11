import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(allContact: any[],searcKey:string,propName:string): any[] {
    const result :any=[]
    
    return result;
  }

}
