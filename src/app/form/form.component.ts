import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {


  selectedFile: File = null;


  hobbiesList: any = [
    { id: 1, name: 'playing' },
    { id: 2, name: 'singing' },
    { id: 3, name: 'travelling' },
    { id: 4, name: 'dancing' },
    { id: 5, name: 'cooking' }
  ];

  // users = {
  //   firstName:" ",
  //   lastName:" ",
  //   contact:" ",
  //   address:" "
  // }



  contactForm: any = FormGroup;

  // crudModelObj : crudModel = new crudModel();

  crudData !: any;



  constructor( private fb: FormBuilder, private formBuilder: FormBuilder, private api: ApiService, private route: ActivatedRoute, private router: Router) {






    this.contactForm = fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      contact: ['', Validators.required],
      address: ['', Validators.required],
      dropdown: ['', Validators.required],
      gender: ['', Validators.required],
      hobbies: this.formBuilder.array([], [Validators.required]),
      image: ['']


    });

  }

  onCheckboxChange(e: any) {
    const hobbies: FormArray = this.contactForm.get('hobbies') as FormArray;


    if (e.target.checked) {
      hobbies.push(new FormControl(e.target.value));

    } else {
      const index = hobbies.controls.findIndex(x => x.value === e.target.value);
      hobbies.removeAt(index);

    }
  }



  //   formSubmit(val:any){
  // var data = val.controls;
  // var firstname = val.firstname;
  // var lastname = val.lastname;
  // var contact = val.contact;
  // var address = val.address;
  //     console.log(firstname+" "+lastname+" "+contact+" "+address);
  // }


  postDataValues() {
    // this.crudModelObj.firstName = this.contactForm.value.firstName;
    // this.crudModelObj.lastName = this.contactForm.value.lastName;
    // this.crudModelObj.contact = this.contactForm.value.contact;
    // this.crudModelObj.address = this.contactForm.value.address;
    // const filedata = new FormData();
    // filedata.append('image',this.selectedFile, this.selectedFile.name)
    // filedata.append('firstName',this.contactForm.value.firstName)
    // filedata.append('lastName',this.contactForm.value.lastName)
    // filedata.append('contact',this.contactForm.value.contact)
    // filedata.append('address',this.contactForm.value.address)
    // this.api.postData(filedata),
    this.api.postData(this.contactForm.value)
      .subscribe((res: any) => {
        console.log(res);
        alert("record added succesfully")
        // this.contactForm.reset();
        this.router.navigate(['view'])
      },
        err => {
          alert("something went wrong")
        })

  }








  ngOnInit(): void {

  }

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
    console.log(event)
  }

}
