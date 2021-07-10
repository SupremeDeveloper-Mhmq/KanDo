import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KanbanComponent } from './Main/kanban/kanban.component';
import { ToDoComponent } from './Main/to-do/to-do.component';
import { AuthComponent } from './Main/auth/auth.component';
import { HeaderComponent } from './header/header.component';
import { PiorityComponent } from './Main/piority/piority.component';

@NgModule({
  declarations: [
    AppComponent,
    KanbanComponent,
    ToDoComponent,
    AuthComponent,
    HeaderComponent,
    PiorityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
