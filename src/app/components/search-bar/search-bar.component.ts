import { OfferService } from './../../services/offer.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FilterOperation } from 'src/app/interfaces/filterOperation';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  cities!:any[]
  contracts!:String[]
  filterForm!:FormGroup;
  filterCriteriaObj!:FilterOperation[];

  constructor(private offerService:OfferService) {
    this.offerService.getCitites().subscribe(
      response => this.cities = response.results)
    this.offerService.getAddOfferFields().subscribe(
        response => {
                   this.contracts = response.data.offerType;
        });
  }

  ngOnInit(): void {
    this.filterForm = new FormGroup({
      text: new FormControl(null, [
        // Validators.required,
      ]),
      contract: new FormControl(null,[
      // Validators.required,
      ],),
      city: new FormControl(null,[
      // Validators.required,
      ],)
    });

  }

  applySearchFilter(){
    //submit search
    console.log(" form" , this.filterForm.value)
    this.filterCriteriaObj = [
      {
        key:"text",
        value: this.text?.value,
        operation: ":"
      },
      {
        key:"city",
        value: this.city?.value,
        operation: ":"
      },
      {
        key:"contract",
        value: this.contract?.value,
        operation: ":"
      },
    ]
    this.offerService.forwardSeachValues(this.filterCriteriaObj);
  }



  get text()  { return this.filterForm.get('text'); }
  get city() { return this.filterForm.get('city'); }
  get contract() { return this.filterForm.get('contract'); }

}
