import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { CarouselModule } from 'primeng/carousel';
import { HttpClientModule } from '@angular/common/http';
import { MenubarModule } from 'primeng/menubar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { GalleriaModule } from 'primeng/galleria';
import { WatchedListComponent } from './watched-list/watched-list.component';
import { HomeComponent } from './home/home.component';
import { NewSerieComponent } from './new-serie/new-serie.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';










@NgModule({
  declarations: [
    AppComponent,
    WatchedListComponent,
    HomeComponent,
    NewSerieComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, CarouselModule,HttpClientModule, MenubarModule, GalleriaModule, InputTextModule, FloatLabelModule, FormsModule, ReactiveFormsModule, RadioButtonModule, FileUploadModule,
    ToastModule,ButtonModule,DropdownModule,BrowserAnimationsModule,TableModule,PaginatorModule

  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
