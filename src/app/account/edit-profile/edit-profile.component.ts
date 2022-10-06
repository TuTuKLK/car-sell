import { User } from './../../interfaces/user';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit, OnChanges {

  @Input() currentUser!: User;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes['currentUser'].currentValue);    
  }

  ngOnInit(): void {
  }

}
