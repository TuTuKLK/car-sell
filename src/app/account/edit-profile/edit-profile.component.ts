import { AuthService } from './../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from './../../interfaces/user';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit, OnChanges {

  @Input() currentUser!: User;

  userNameForm!: FormGroup;
  emailForm!: FormGroup;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes['currentUser'].currentValue);    
  }

  ngOnInit(): void {
    this.initUserNameForm();
    this.initEmailForm();
  }

  initUserNameForm(): void {
    this.userNameForm = this.formBuilder.group({
      userName: ['', [Validators.required]]
    });
  }

  initEmailForm(): void {
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onEditUserName(modal: any): void {
    this.userNameForm.get('userName')?.setValue(this.currentUser.displayName)
    this.modalService.open(modal, { centered: true });
  }
  
  onEditEmail(modal: any): void {
    this.emailForm.get('email')?.setValue(this.currentUser.email)
    this.modalService.open(modal, { centered: true });
  }

  onSubmitUserNameForm(): void {
    this.currentUser.updateProfile({displayName: this.userNameForm.value.userName})
    .then(() => {
      this.modalService.dismissAll();
    }).catch(console.error);
  }

  onSubmitEmailForm(): void {
    this.authService.signinUser(<string>this.currentUser.email, this.emailForm.value.password)
    .then(() =>{
          this.currentUser.updateEmail(this.emailForm.value.email)
          .then(() => {
            this.modalService.dismissAll();
            this.emailForm.reset();
          }).catch(console.error);
    }).catch(console.error);
  }

}
