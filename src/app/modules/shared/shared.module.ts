import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NbBadgeModule,
  NbButtonModule,
  NbCardModule,
  NbDialogModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbMenuModule,
  NbSearchModule,
  NbSidebarModule,
  NbStepperModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NotifierModule } from 'angular-notifier';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NbLayoutModule,
    NbEvaIconsModule,
    NbCardModule,
    NbFormFieldModule,
    NbIconModule,
    NbStepperModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    NotifierModule.withConfig({}),
    NbSidebarModule.forRoot(),
    NbLayoutModule,
    NbEvaIconsModule,
    NbCardModule,
    NbFormFieldModule,
    NbIconModule,
    NbStepperModule,
    ReactiveFormsModule,
    NbButtonModule,
    FormsModule,
    NbInputModule,
    NbCardModule,
    NbMenuModule.forRoot(),
    NbDialogModule.forRoot(),
  ],
  exports: [
    ReactiveFormsModule,
    NbLayoutModule,
    NbSidebarModule,
    NbEvaIconsModule,
    NbCardModule,
    NbFormFieldModule,
    NbIconModule,
    NbStepperModule,
    ReactiveFormsModule,
    FormsModule,
    NbButtonModule,
    NbInputModule,
    NbSearchModule,
    NbMenuModule,
    NbBadgeModule,
  ],
})
export class SharedModule {}
