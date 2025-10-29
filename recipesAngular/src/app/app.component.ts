import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import {NavComponent} from './components/nav/nav.component'
import { provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
//import {ShowIfLoggedInDirective} from './Directive/show-if-logged-in.directive'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavComponent, FormsModule,CommonModule,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'myp';

}
