import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { TreeModule } from 'primeng/tree';
import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { BreadcrumbModule } from 'primeng/breadcrumb';

import { FileService } from './file.service';
import { FolderTreeComponent } from './components/folder-tree/folder-tree.component';

@NgModule({
  declarations: [
    AppComponent,
    FolderTreeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    InputTextModule,
    TreeModule,
    HttpClientModule,
    ButtonModule,
    DialogModule,
    FileUploadModule,
    BreadcrumbModule,
    FormsModule
  ],
  providers: [
    FileService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
