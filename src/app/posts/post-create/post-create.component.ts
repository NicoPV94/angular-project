import { Component } from '@angular/core';

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html'
})
export class PostCreateComponent {
    enteredValue = '';
    newPost = 'No Content'; //Create new property, you don't need to use "const, let or var" to declare it.

    onAddPost() {
        this.newPost = this.enteredValue ;
    }

}