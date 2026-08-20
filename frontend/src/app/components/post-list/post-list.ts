import { Component, Input } from '@angular/core';

import { Post } from '../../models/post';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [],
  templateUrl: './post-list.html',
  styleUrl: './post-list.css'
})
export class PostList {
  @Input() posts: Post[] = [];
  @Input() loading = false;
}