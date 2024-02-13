import { Component, OnInit } from '@angular/core';
import Typed from 'typed.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // Initialize Typed here
    const typed = new Typed(".typing", {
      strings: ["Software Engineer", "Web Developer", "Web Designer"],
      typeSpeed: 100,
      backSpeed: 60,
      loop: true
    });
  }
}


