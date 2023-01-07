import { Offer } from 'src/app/interfaces/offer';
import { OfferService } from './../../services/offer.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ICity} from 'src/app/interfaces/ICity';
import { ImageService } from 'src/app/services/image.service';
import { ImageSnippet } from 'src/app/interfaces/ImageSnippet';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.css']
})
export class AddOfferComponent implements OnInit {
  addOfferForm!:FormGroup;
  addedOffer!:Offer;
  offerTypes:String[] = []
  educations:String[] = []
  profiles:String[] = []
  cities:any[] = []
  selectedImage!:ImageSnippet;

  constructor(private offerService:OfferService, private imageService:ImageService, private router:Router) {
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
      offerType: new FormControl("CDI",[
        Validators.required,
        ],),
      profile: new FormControl([
        Validators.required,
        ],),
      ville: new FormControl([
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
  get ville (){ return this.addOfferForm.get('ville')};
  get profile (){ return this.addOfferForm.get('profile')};
  get offerType (){ return this.addOfferForm.get('offerType')};
  get salary (){ return this.addOfferForm.get('salary')};

  onSubmit(event:any) {
    if(this.selectedImage) this.selectedImage.pending = true;

    this.offerService.saveOffer(this.addOfferForm.value).subscribe(
      response => {
          if(response.status == 201){
            this.addedOffer = response.data.data;
            if(this.selectedImage) this.uploadImage();
            window.location.reload();
          } else {
            this.onError()
          }
        }
      );
    console.log(this.addOfferForm.value)
  }

  uploadImage(){
    this.imageService.uploadImage(this.selectedImage.file, this.addedOffer.id!).subscribe(
      {
        next: (v) => this.onSuccess(),
        error: (e) => this.onError(),
        complete: () => console.info('complete')
      }
    )
  }

  private onSuccess() {
    this.selectedImage.pending = false;
    this.selectedImage.status = 'ok';
  }

  private onError() {
    this.selectedImage.pending = false;
    this.selectedImage.status = 'fail';
    this.selectedImage.src = '';
  }


  processImage(imageInput:any){
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedImage = new ImageSnippet(event.target.result, file);
      this.selectedImage.pending = true;

      console.log("beofre prome ", this.selectedImage.pending)
      new Promise(resolve => setTimeout(resolve, 1000)).then(
        () => this.selectedImage.pending = false
      )
    });

    reader.readAsDataURL(file);
  }


}
