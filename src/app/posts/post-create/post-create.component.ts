import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { PostsService } from '../posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';
import { mimetype } from './mime-type.validator';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  enteredTitle = ''; //Create new property, you don't need to use "const, let or var" to declare it.
  enteredContent = '';
  post: Post;
  isLoading = false;
  form: FormGroup;
  imagePreview: string;
  private mode = 'create';
  private postId: string;

  constructor(
    public postsService: PostsService,
    public route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
        updateOn: 'blur',
      }),
      content: new FormControl(null, {
        validators: [Validators.required],
        updateOn: 'blur',
      }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimetype],
      }),
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postsService.getPost(this.postId).subscribe(postData => {
          this.isLoading = false;
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content,
            imagePath: null
          };
          this.form.setValue({
            title: this.post.title,
            content: this.post.content,
          });
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  onImagePicked(event: Event) {
    /*Store the image that was picked in a constant. Telling TS that 'event.target' is an HTMLInputElement
     *so we can acces the 'files' property which is an array of files. In that we select the first element
     *which is the image that was picked, since we only select one file.
     */
    const file = (event.target as HTMLInputElement).files[0];
    //patchValue() acts similar to setValue() except that it only sets the value for the selected property.
    this.form.patchValue({ image: file });
    //Calls updateValueAndValidity() that runs all the validations to test if the file selected is a valid image.
    this.form.get('image').updateValueAndValidity();
    //Creating the reader.
    const reader = new FileReader();
    //Asynchronous callback 'onload' that happens when the reader is done reading the file.
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    //
    reader.readAsDataURL(file);
  }

  onSavePost() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.postsService.addPost(
        this.form.value.title,
        this.form.value.content,
        this.form.value.image
      );
    } else {
      this.postsService.updatePost(
        this.postId,
        this.form.value.title,
        this.form.value.content
      );
    }
    this.form.reset();
  }
}
