import { Component, OnInit } from '@angular/core';
import { Post  } from '../../clases/post';
import { PostService } from './../../servicios/post/post.service';
import { Observable } from 'rxjs';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  post: Post;
  latestTwoPost: Observable<Post[]>;

  constructor(
      private postService: PostService,
      private titleService: Title
  ) {
    this.setTitle('Despertar Mental - Blog para expandir la consciencia.')
  }

  ngOnInit() {
    this.latestTwoPost = this.postService.getTwoLatestPosts()
  }
  public setTitle( newTitle: string) {
   this.titleService.setTitle( newTitle );
   }
}
