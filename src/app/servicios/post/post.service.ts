import { Injectable } from '@angular/core';
import { Post ,Categoria } from '../../clases/post';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map,take,takeWhile } from 'rxjs/operators';
import * as marked from 'marked';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  posts: Observable<Post[]>;
  categorias: Observable<Categoria[]>;
  post: Observable<Post>;
  constructor(
    private db: AngularFirestore,
  ) { }
  getPosts(){
    this.posts = this.db.collection<Post>('posts').snapshotChanges().pipe(map(posts=>{
      return posts.map(a=>{
        const post = a.payload.doc.data();
        const uid = a.payload.doc.id;
        return {uid, ...post};
        })
      }))
    return this.posts;
  }
    getTwoLatestPosts(){
      this.posts = this.db.collection<Post>('posts', ref=>{
      return ref.orderBy('createdAt','desc')
    }).snapshotChanges().pipe(take(2),map(posts=>{
        return posts.map(a=>{
          const post = a.payload.doc.data();
          const uid = a.payload.doc.id;
          return {uid, ...post};
          })
        }))
      return this.posts;
    }
    getSixPosts(){
      this.posts = this.db.collection<Post>('posts', ref=>{
      return ref.orderBy('createdAt','desc')
    }).snapshotChanges().pipe(takeWhile(x=>2<=6),map(posts=>{
        return posts.map(a=>{
          const post = a.payload.doc.data();
          const uid = a.payload.doc.id;
          return {uid, ...post};
          })
        }))
      return this.posts;
    }
  getCategorias(){
    this.categorias = this.db.collection<Categoria>('categorias').snapshotChanges().pipe(map(categorias=>{
      return categorias.map(a=>{
        const categoria = a.payload.doc.data();
        const uid = a.payload.doc.id;
        return {uid, ...categoria};
        })
      }))
    return this.categorias;
  }
  getPost(key: string){
  let doc =  this.db.collection("posts").doc(key);
    this.post = doc.snapshotChanges().pipe(map(action=>{
      if(action.payload.exists === false){
        return null;
      }else{
        const data = action.payload.data() as Post;
        data.uid = action.payload.id;
        return data;
      }
    }));
    return this.post;
  }
  // convert markdown string to
  markdownToHtml(md: string) {
    return marked(md)
  }
}
