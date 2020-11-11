import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ZyllemApiService } from '../app.service';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Subscription } from 'rxjs';
import { Article, ArticleType, FeaturedArticle, NormalArticle } from '../model/article';
import { Location } from '@angular/common';


@AutoUnsubscribe()
@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css']
})
export class ArticleDetailsComponent implements OnInit, OnDestroy {

  articlesubscriptions$: Subscription;
  article: Article;
  articleId: number;
  
  constructor(
    private _zyllemService: ZyllemApiService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _location: Location
  ) {
    this.articleId = +this._route.snapshot.paramMap.get('id');
  }
  

  ngOnInit() {
    this.getArticleDetails(this.articleId);
  }

  getArticleDetails(id: number) {
    this.articlesubscriptions$ = this._zyllemService.getArticle(id)
    .subscribe(res => { 

      if(res.type === this.ARTICLE_TYPE.FEATURED) {
        this.article  = new FeaturedArticle(res);
      } else {
        this.article = new NormalArticle(res);
      } 
    });
  }

  get ARTICLE_TYPE() {
    return ArticleType;
  }

  goBack() {
    this._location.back();
  }

  ngOnDestroy() {
    // We'll throw an error if it doesn't
  }

}
