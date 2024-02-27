import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { BookManagementServiceService } from 'src/app/services/book-management-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-book',
  standalone: true,
  imports: [CommonModule, ],
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.scss']
})
export class NewBookComponent implements OnInit{

  public bookForm?: UntypedFormGroup;
  public formErrors:any = {
    title: '',
    author: '',
    description: '',
  };
  private subscriptions: Array<Subscription> = [];

  constructor(
    private fb: UntypedFormBuilder,
    private bookmanagementService:BookManagementServiceService
    ){
  }
  ngOnInit(): void {
    
  }

  public createForm() {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      description: ['', Validators.required],
      image:"",
    });
    this.subscriptions.push(this.bookForm.valueChanges.subscribe(data => this.onValueChanged(data)));
    this.onValueChanged();
  }
  //Generate Error
  public onValueChanged(data ? : any) {
    if (!this.bookForm) {
      return;
    }
    const form = this.bookForm;

    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        //const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += 'field required ';
        }
      }
    }
  }

  //add new book
  public addBook(){
    let newBook={
      
    }

  }

  public onUploadSingleImage(event:any){
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
        subscription.unsubscribe();
    });
  }

}
