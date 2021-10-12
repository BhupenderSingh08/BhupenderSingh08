import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';

import { FormGroup,FormBuilder } from '@angular/forms';
import { crudModel } from '../crud.model';



@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  contactForm:any = FormGroup;

  crudModelObj : crudModel = new crudModel();

  crudData !: any;

  constructor( private fb: FormBuilder , private api: ApiService) { }


  getAllData(){
    this.api.getData()
    .subscribe((res:any)=>{
      this.crudData = res;
    })
  }

  deleteData(row : any){
    this.api.deleteData(row.id)
    .subscribe(res=>{
   
      alert("record deleted")
      // location.reload();
      this.getAllData();
    })
  }


  



  ngOnInit(): void {
    this.getAllData();
  }

}
