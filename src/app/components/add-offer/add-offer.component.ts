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
  isSuccess!:Boolean;
  isAddingOfferResult!:Boolean;
  animationSrc!:string;
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
      title : new FormControl(null,[
        Validators.required,
        ],
      ),
      description: new FormControl(null, [
        Validators.required
      ]
      ),
      offerType: new FormControl(null,[
        Validators.required,
        ],),
      profile: new FormControl(null,[
        Validators.required,
        ],),
      ville: new FormControl(null,[
        Validators.required
        ],),
      education: new FormControl(null,[
        Validators.required
        ],),
      salary: new FormControl(null,[
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
      {
        next: resp => {
          console.log("data ", resp );
          if(resp.status == 201){
            this.addedOffer = resp.data.data;
            if(this.selectedImage) this.uploadImage();
            this.isSuccess = true;
          }
        },
        error: err => {
          this.isSuccess = false
          this.onError()
        }
      }).add(() => {
        this.displayCompletionAnimation();
      });
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

      // console.log("beofre prome ", this.selectedImage.pending)
      new Promise(resolve => setTimeout(resolve, 1000)).then(
        () => this.selectedImage.pending = false
      )
    });

    reader.readAsDataURL(file);
  }


  displayCompletionAnimation(){
    if(this.isSuccess) this.animationSrc = "https://assets3.lottiefiles.com/packages/lf20_lk80fpsm.json";
    else this.animationSrc = "https://assets9.lottiefiles.com/packages/lf20_q9ik4qqj.json";
    this.isAddingOfferResult = true;

    setTimeout(()=> {
      this.isAddingOfferResult = false;
      this.router.navigate(['/employer'])
              .then(() => {
                window.location.reload();
            });
    }, 1500);
  }

}
