import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { TreeModule } from 'primeng/tree';
import { HttpClientModule } from '@angular/common/http';

import { FileService } from './file.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    InputTextModule,
    TreeModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    FileService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
