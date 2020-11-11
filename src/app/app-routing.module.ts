import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleDetailsComponent } from './components/article-details/article-details.component';
import { ArticleListComponent } from './components/article-list/article-list.component';

const routes: Routes = [
    { path: 'articles', component: ArticleListComponent },
    { path: 'article/:id', component: ArticleDetailsComponent },
    { path: '', redirectTo: 'articles', pathMatch: 'full' },
    { path: '**', redirectTo: 'articles' }
  ];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    declarations: []
  })
  export class AppRoutingModule {}
