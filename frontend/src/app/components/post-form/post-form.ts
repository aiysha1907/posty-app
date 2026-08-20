import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Post } from '../../models/post';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './post-form.html',
  styleUrl: './post-form.css'
})
export class PostForm {
  @Input() posting = false;

  @Output() postSubmitted = new EventEmitter<Post>();

  newPost: Post = {
    title: '',
    description: ''
  };

  submitPost(): void {
    const post: Post = {
      title: this.newPost.title.trim(),
      description: this.newPost.description.trim()
    };

    if (!post.title || !post.description) {
      return;
    }

    this.postSubmitted.emit(post);

    this.newPost = {
      title: '',
      description: ''
    };
  }
}