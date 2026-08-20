import { Component, inject, OnInit, signal } from '@angular/core';

import { PostForm } from './components/post-form/post-form';
import { PostList } from './components/post-list/post-list';
import { Post } from './models/post';
import { PostService } from './services/post.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PostForm, PostList],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private readonly postService = inject(PostService);

  readonly posts = signal<Post[]>([]);

  readonly loading = signal(false);
  readonly posting = signal(false);
  readonly errorMessage = signal('');

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.loading.set(true);
    this.errorMessage.set('');

    this.postService.getPosts().subscribe({
      next: (posts) => {
        this.posts.set(posts);
      },
      error: (error) => {
        console.error(error);
        this.errorMessage.set('Unable to load posts.');
      },
      complete: () => {
        this.loading.set(false);
      },
    });
  }

  createPost(post: Post): void {
    this.posting.set(true);
    this.errorMessage.set('');

    this.postService.createPost(post).subscribe({
      next: (createdPost) => {
        this.posts.update((posts) => [createdPost, ...posts]);
        this.posting.set(false);
      },
      error: (error) => {
        console.error(error);
        this.errorMessage.set('Unable to create the post.');
        this.posting.set(false);
      },
    });
  }
}
