import { Component, EventEmitter, Output } from '@angular/core';
import { Post } from '../post.model';

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
    enteredTitle = ''; //Create new property, you don't need to use "const, let or var" to declare it.
    enteredContent = '';
    @Output() postCreated = new EventEmitter<Post>();

    onAddPost() {
        const post: Post = {
            title: this.enteredTitle,
            content: this.enteredContent
        };

        this.postCreated.emit(post);
    }

}