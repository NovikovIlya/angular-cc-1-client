import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule,CommonModule,FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})


export class HeaderComponent {
  constructor(private apiService:ApiService) {}
  name : string= '';
  setData() {
    this.apiService.setData(this.name)
  }
}
