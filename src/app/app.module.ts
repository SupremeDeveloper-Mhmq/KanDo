import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KanbanComponent } from './Main/kanban/kanban.component';
import { ToDoComponent } from './Main/to-do/to-do.component';
import { AuthComponent } from './Main/auth/auth.component';
import { HeaderComponent } from './header/header.component';
import { PiorityComponent } from './Main/piority/piority.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { LoadingComponent } from './loading/loading.component';
import { ToDoAddComponent } from './Main/to-do/to-do-add/to-do-add.component';

@NgModule({
  declarations: [
    AppComponent,
    KanbanComponent,
    ToDoComponent,
    AuthComponent,
    HeaderComponent,
    PiorityComponent,
    PageNotFoundComponent,
    LoadingComponent,
    ToDoAddComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
