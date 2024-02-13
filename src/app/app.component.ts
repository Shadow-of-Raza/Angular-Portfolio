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
  constructor() { }

  changeColor(boxColor: string, shadowColor1: string, shadowColor2: string, shadowColor3: string, shadowColor4: string, shadowColor5: string): void {
    const variables = `
      --box-color: ${boxColor};
      --icon-color: ${boxColor};
      --box-shadow-color: ${boxColor};
      --shadow-color-1: ${shadowColor1};
      --shadow-color-2: ${shadowColor2};
      --shadow-color-3: ${shadowColor3};
      --shadow-color-4: ${shadowColor4};
      --shadow-color-5: ${shadowColor5};

      --text-icon : ${boxColor};
      --title-before-color : ${boxColor};
      --button-border : ${boxColor};
      --scrollBar-color : ${boxColor};
      --circleInner-color : ${boxColor};
      --lineBar-color : ${boxColor};
      --downloadIcon-color : ${boxColor};
    `;

    const root = document.documentElement;
    root.style.cssText = variables;

      const elementsWithId = document.documentElement;
      const titleHeads = document.documentElement;
      const border = document.documentElement;
      const scrollBar = document.documentElement;
      const circleInner = document.documentElement;
      const lineBar = document.documentElement;
      const downloadIcon = document.documentElement;

      elementsWithId.style.cssText = variables;
      titleHeads.style.cssText = variables;
      border.style.cssText = variables;
      scrollBar.style.cssText = variables;
      circleInner.style.cssText = variables;
      lineBar.style.cssText = variables;
      downloadIcon.style.cssText = variables;
  }
}
  
  




