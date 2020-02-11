import { NgModule } from '@angular/core';
import {
  MatInputModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatSnackBarModule,
  MatDialogModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
} from '@angular/material';

@NgModule({
  //imports: [] will be done automatically by Angular
  exports: [
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatDialogModule,
  ]
})
export class AngularMaterialModule {}
