import { OfferService } from './../../services/offer.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ICity } from 'src/app/interfaces/ICity';

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.css']
})
export class AddOfferComponent implements OnInit {
  addOfferForm!:FormGroup;
  offerTypes:String[] = []
  educations:String[] = []
  profiles:String[] = []
  cities:any[] = []

  constructor(private offerService:OfferService) {
    this.offerService.getAddOfferFields().subscribe(
      response => {
                 this.offerTypes = response.data.offerType;
                 this.educations = response.data.education;
                 this.profiles = response.data.profile;
      });

      this.offerService.getCitites().subscribe(
        response => {
          // const {asciiname}:{asciiname:String} = response.results;
          this.cities = response.results;
        }
      );

    this.addOfferForm = new FormGroup({
      title : new FormControl('',[
        Validators.required,
        ],
      ),
      description: new FormControl('', [
        Validators.required
      ]
      ),
      offerType: new FormControl('',[
        Validators.required,
        ],),
      profile: new FormControl('',[
        Validators.required,
        ],),
      city: new FormControl('',[
        Validators.required
        ],),
      education: new FormControl('',[
        Validators.required
        ],),
      salary: new FormControl('',[
        Validators.required
        ],),
    })
  }

  ngOnInit(): void {
  }

  get title (){ return this.addOfferForm.get('title')};
  get description (){ return this.addOfferForm.get('description')};
  get education (){ return this.addOfferForm.get('education')};
  get city (){ return this.addOfferForm.get('city')};
  get profile (){ return this.addOfferForm.get('profile')};
  get offerType (){ return this.addOfferForm.get('offerType')};
  get salary (){ return this.addOfferForm.get('salary')};

  onSubmit(event:any) {
    this.offerService.saveOffer(this.addOfferForm.value);
    console.log(event)
  }

}
