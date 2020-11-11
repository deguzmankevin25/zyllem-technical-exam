

import * as moment from 'moment';
export abstract class Article {
    id: string;
    title: string;
    author: string;
    publishedAt: string; // date time in ISO format
    url: string;
    type: ArticleType;

    constructor(props: any) {
        this.id = props.id;
        this.title = props.title;
        this.author = props.author;
        this.publishedAt = moment(props.publishedAt).format('YYYY-MM-DD h:mm:ssA');
        this.url = props.url;
        this.type = props.type;
    }

}

export class NormalArticle extends Article {
    description: string;

    constructor(props: any) {
        super(props);
        this.description = props.description;
    }
}

export class FeaturedArticle extends  Article {
    featureImgUrl: string;

    constructor(props: any) {
        super(props);
        this.featureImgUrl = props.featureImgUrl;
    }
}

export enum ArticleType {
    NORMAL = 'NORMAL',
    FEATURED = 'FEATURED',
}
