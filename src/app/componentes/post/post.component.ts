import { Component, OnInit } from '@angular/core';
import { Post, Categoria } from '../../clases/post';
import { PostService } from './../../servicios/post/post.service';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
post: Post;
categorias: Observable<Categoria[]>;
uid:string;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private titleService: Title
  ) {

  }

  ngOnInit() {
    this.uid = this.route.snapshot.paramMap.get('uid');
    this.categorias = this.postService.getCategorias();
    this.postService.getPost(this.uid).subscribe(post=>{
      this.post = post
      this.setTitle(post.title+' - Despertar Mental')
    })
  }
  public setTitle( newTitle: string) {
   this.titleService.setTitle( newTitle );
   }

}
