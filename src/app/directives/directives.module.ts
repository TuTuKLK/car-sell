import { UppercaseInputDirective } from './uppercase-input.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    UppercaseInputDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    UppercaseInputDirective
  ]
})
export class DirectivesModule { }
