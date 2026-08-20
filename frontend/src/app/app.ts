import { Component, inject, OnInit } from '@angular/core';

import { PostForm } from './components/post-form/post-form';
import { PostList } from './components/post-list/post-list';
import { Post } from './models/post';
import { PostService } from './services/post.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    PostForm,
    PostList
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private readonly postService = inject(PostService);

  posts: Post[] = [];

  loading = false;
  posting = false;
  errorMessage = '';

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.loading = true;
    this.errorMessage = '';

    this.postService.getPosts().subscribe({
      next: (posts) => {
        this.posts = posts;
        this.loading = false;
      },
      error: (error) => {
        console.error(error);
        this.errorMessage = 'Unable to load posts.';
        this.loading = false;
      }
    });
  }

  createPost(post: Post): void {
    this.posting = true;
    this.errorMessage = '';

    this.postService.createPost(post).subscribe({
      next: (createdPost) => {
        this.posts = [createdPost, ...this.posts];
        this.posting = false;
      },
      error: (error) => {
        console.error(error);
        this.errorMessage = 'Unable to create the post.';
        this.posting = false;
      }
    });
  }
}