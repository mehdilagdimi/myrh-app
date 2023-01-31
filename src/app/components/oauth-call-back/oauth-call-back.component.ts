import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-oauth-call-back',
  templateUrl: './oauth-call-back.component.html',
  styleUrls: ['./oauth-call-back.component.css']
})
export class OauthCallBackComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    console.log(" getting callback params")
    this.activatedRoute.params.subscribe(
      {
        next: (params) => {
          console.log("parms");
          console.log(params)
        }
      }
    )
  }

}
