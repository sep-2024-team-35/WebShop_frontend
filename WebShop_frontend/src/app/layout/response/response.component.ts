import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-response',
  standalone: true,
  imports: [],
  templateUrl: './response.component.html',
  styleUrl: './response.component.css'
})
export class ResponseComponent implements OnInit{

  response:String=''

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.response = params['response']; 
      console.log(this.response);
    });
  }
}
