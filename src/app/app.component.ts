import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-portfolio';

  @ViewChild('navToggle') navToggle!: ElementRef<HTMLInputElement>;

  toggleNav() {
    const navMenu = document.querySelector('.nav-box nav');
    if (navMenu) {
      navMenu.classList.toggle('active');
    }
  }

  ngAfterViewInit() {
    this.navToggle.nativeElement.addEventListener('change', () => {
      this.toggleNav();
    });
  }
  
}