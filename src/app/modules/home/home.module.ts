import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { WelcomeComponent } from '../../components/home/welcome/welcome.component';
import { SharedModule } from '../shared/shared.module';
import {NbLayoutModule} from "@nebular/theme";
import { AboutComponent } from '../../components/home/about/about.component';
import { FaqComponent } from '../../components/home/faq/faq.component';
import { LearnComponent } from '../../components/home/learn/learn.component';

@NgModule({
  declarations: [WelcomeComponent, AboutComponent, FaqComponent, LearnComponent],
    imports: [CommonModule, HomeRoutingModule, SharedModule, NbLayoutModule],
})
export class HomeModule {}
