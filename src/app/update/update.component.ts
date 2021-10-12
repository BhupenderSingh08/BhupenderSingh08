import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { crudModel } from '../crud.model';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  hobbiesList: any = [
    { id: 1, name: 'playing' },
    { id: 2, name: 'singing' },
    { id: 3, name: 'travelling' },
    { id: 4, name: 'dancing' },
    { id: 5, name: 'cooking' }
  ];


  contactForm: any = FormGroup;
  public id: any;
  response: any;
  post: any;
  row: any = [];
  hobbiesFormControl: any;

  // crudModelObj : crudModel = new crudModel();

  constructor(private fb: FormBuilder, private formBuilder: FormBuilder, private api: ApiService, private route: ActivatedRoute, private router: Router) {

    this.contactForm = fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      contact: ['', Validators.required],
      address: ['', Validators.required],
      dropdown: ['', Validators.required],
      gender: ['', Validators.required],
      hobbies: this.formBuilder.array([], [Validators.required]),
      hobbiesGet: this.formBuilder.array([], [Validators.required])

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

  //   const languageSpoken: FormArray = this.addAffiliateAccountForm.get('LanguagesSpoken') as FormArray;

  // for(j=0;j<selectedLanguages.length;j++)
  //  {
  //  languageSpoken.push(new FormControl(selectedLanguages[j]));
  //  }



  // formSubmit(val:any){
  //   var data = val.controls;
  //   var firstname = val.firstname;
  //   var lastname = val.lastname;
  //   var contact = val.contact;
  //   var address = val.address;
  //       console.log(firstname+" "+lastname+" "+contact+" "+address);
  //   }
  //   onEditUser(id:any){
  //     console.log(this.row)
  //   }

  

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    // console.log(this.id);

    this.api.getValues(this.id)
      .subscribe((res: any) => {
        this.response = res;
        this.contactForm.patchValue({
          firstName: this.response.firstName,
          lastName: this.response.lastName,
          contact: this.response.contact,
          address: this.response.address,
          dropdown: this.response.dropdown,
          gender: this.response.gender,
          // hobbies:this.response.hobbies

        })
        const hobbies: FormArray = this.contactForm.get('hobbies') as FormArray;
        const hobbiesGet: FormArray = this.contactForm.get('hobbiesGet') as FormArray;


        const selectHobbies = this.response.hobbies;

        for (var i = 0; i < this.hobbiesList.length; i++) {
          // console.log(totalLanguages[i]);

          var checkedHobbies = selectHobbies.findIndex((post: any) => {
            this.post = post;
            if (this.post == this.hobbiesList[i].name) {
              return true;
            }
              return false;
          });

          console.log(checkedHobbies);
          if (checkedHobbies >= 0) {
            var checkBool = true;
          }
          else {
            var checkBool = false;
          }
          hobbiesGet.push(new FormControl(checkBool));
        }
        this.hobbiesFormControl = hobbiesGet.controls;
        console.log( this.hobbiesFormControl);








        for (let j = 0; j < this.response.hobbies.length; j++) {
          hobbies.push(new FormControl(this.response.hobbies[j]));
        }
      })

  }


  updateDataValues() {
    console.log(this.contactForm.value)
  
    this.api.updateData(this.contactForm.value, this.id)
      .subscribe(res => {
        console.log(res);
        alert("record updated succesfully")
        this.router.navigate(['view'])

      },
        err => {
          alert("something went wrong")
        })

  }

}


