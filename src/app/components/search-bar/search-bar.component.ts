import { OfferService } from './../../services/offer.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  cities!:any[]
  contracts!:String[]
  searchForm!:FormGroup;

  constructor(private offerService:OfferService) {
    this.offerService.getCitites().subscribe(
      response => this.cities = response.results)
    this.offerService.getAddOfferFields().subscribe(
        response => {
                   this.contracts = response.data.offerType;
        });
  }

  ngOnInit(): void {
    // this.searchForm = new FormGroup({
    //   city: new FormControl('thisemail', [
    //     // Validators.required,

    //   ]
    // ),
    // contract: new FormControl('this.password',[
    //   // Validators.required,
    //   // Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")
    // ],)

    // });

  }

  onSubmit(){
    //submit search
  }

}
