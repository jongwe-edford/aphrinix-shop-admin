import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from 'src/app/components/home/about/about.component';
import { FaqComponent } from 'src/app/components/home/faq/faq.component';
import { LearnComponent } from 'src/app/components/home/learn/learn.component';
import { WelcomeComponent } from 'src/app/components/home/welcome/welcome.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
    children: [
      {
        path: 'about',
        component: AboutComponent,
      },
      {
        path: 'learn',
        component: LearnComponent,
      },
      {
        path: 'faq',
        component: FaqComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
