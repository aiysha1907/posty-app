import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Post } from './models/post';
import { PostService } from './services/post.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private readonly postService = inject(PostService);

  posts: Post[] = [];

  newPost: Post = {
    title: '',
    description: ''
  };

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

  createPost(): void {
    const post: Post = {
      title: this.newPost.title.trim(),
      description: this.newPost.description.trim()
    };

    if (!post.title || !post.description) {
      this.errorMessage = 'Enter both a title and description.';
      return;
    }

    this.posting = true;
    this.errorMessage = '';

    this.postService.createPost(post).subscribe({
      next: (createdPost) => {
        this.posts = [createdPost, ...this.posts];

        this.newPost = {
          title: '',
          description: ''
        };

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