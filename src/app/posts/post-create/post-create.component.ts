import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';


@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
    enteredTitle = ''; //Create new property, you don't need to use "const, let or var" to declare it.
    enteredContent = '';
    @Output() postCreated = new EventEmitter<Post>();

    onAddPost(form: NgForm) {
        if(form.invalid) {
            return;
        }

        const post: Post = {
            title: form.value.title,
            content: form.value.content
        };

        this.postCreated.emit(post);
    }

    constructor(public postsService: PostsService) {}

}