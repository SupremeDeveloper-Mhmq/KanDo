import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './Main/auth/auth.component';
import { KanbanComponent } from './Main/kanban/kanban.component';
import { PiorityComponent } from './Main/piority/piority.component';
import { ToDoComponent } from './Main/to-do/to-do.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'Auth', pathMatch: 'full' },
  { path: 'Auth', component: AuthComponent },
  { path: 'ToDo', component: ToDoComponent },
  { path: 'Kanban', component: KanbanComponent },
  { path: 'Priority', component: PiorityComponent },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
