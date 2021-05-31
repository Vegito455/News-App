import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopHeadlineComponent } from './componenets/topheadline/topheadline.component';
import { HomepageComponent } from './componenets/homepage/homepage.component';
import { NotFoundComponent } from './componenets/not-found/not-found.component';
import { ExploreComponent } from './componenets/explore/explore.component';
import { TopicComponent } from './componenets/topic/topic.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  
  {
    path: 'home',
    component: HomepageComponent,
    children: [
      { path: '', redirectTo: 'top-headlines', pathMatch: 'full' },
      { path: 'top-headlines', component: TopHeadlineComponent },
      { path: 'explore', component: ExploreComponent },
      { path: 'topic', component: TopicComponent },
      
    ],
  },

  // url not found
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
