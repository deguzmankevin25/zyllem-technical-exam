import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ZyllemApiService } from '../../app.service';
import { Article, FeaturedArticle, NormalArticle, ArticleType } from '../../model/article';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';


@AutoUnsubscribe()
@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit, OnDestroy  {

  displayedColumns = [ 'title', 'author', 'type', 'publishedAt'];
  dataSource: MatTableDataSource<Article>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sortTable: MatSort;
  articlesSubscriptions$: Subscription;
  articles: Article[] = [];
  dataLoaded: boolean;

  articleTypeArray: any[] = [
    {type: '', label: 'All'},
    {type: 'FEATURED', label: 'Featured'},
    {type: 'NORMAL', label: 'Normal'},
  ];


  constructor(
    private _zyllemService: ZyllemApiService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.getArticles();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  getArticles() {
    this.articlesSubscriptions$ = this._zyllemService.getArticles().subscribe((articles) => {

      if (articles && articles.length > 0) {
        this.articles = articles.map(article => {

          const content: Article = article;

          if (article.type === this.ARTICLE_TYPE.FEATURED) {
            return new FeaturedArticle(content);
          } else {
            return new NormalArticle(content);
          }

        });

        this.dataLoaded = true;
        this.dataSource = new MatTableDataSource(this.articles);
      }
    });
  }

  get ARTICLE_TYPE() {
    return ArticleType;
  }

  showDetailsPage(row) {
    this._router.navigateByUrl('article/' + row.id);
  }

  ngOnDestroy() {
    // We'll throw an error if it doesn't
  }

}
