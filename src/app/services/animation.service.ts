import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {

  constructor(private router:Router) { }


  displayCompletionAnimation(isSuccess:Boolean, navigateTo:String){


    // setTimeout(()=> {
      // this.loadingSignupResult = false;
      // this.router.navigate(['/login'])
    //           .then(() => {
    //             window.location.reload();
    //         });
    // }, 1500);
  }
}
