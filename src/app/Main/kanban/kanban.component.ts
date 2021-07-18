import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToDoService } from 'src/app/Shared/to-do.service';
import { ToDo } from 'src/app/Shared/ToDo.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss'],
})
export class KanbanComponent implements OnInit {
  constructor(private ToDoService: ToDoService, private router: Router) {}

  loadedToDo: ToDo[] = [];
  ShowAddNotes!: boolean;
  ShowIcon!: boolean;
  error = null;
  Priority!: string;
  PriorityStyle!: string;
  isLoading = false;
  loadedToDo1: ToDo[] = [];
  loadedToDo2: ToDo[] = [];
  loadedToDo3: ToDo[] = [];
  loadedToDo4: ToDo[] = [];
  loadedToDo5: ToDo[] = [];

  ngOnInit(): void {
    localStorage.removeItem('Url');
    localStorage.setItem('Url', this.router.url);
    this.isLoading = true;
    this.ToDoService.onFetchToDo().subscribe(
      (response: ToDo[]) => {
        this.isLoading = false;
        this.loadedToDo = response;
        if (this.loadedToDo.length < 1) {
          this.ShowAddNotes = true;
          this.ShowIcon = true;
        } else {
          for (let T of this.loadedToDo) {
            if (T.Proggress == 1) {
              this.loadedToDo1.push(T);
            } else {
              if (T.Proggress == 2) {
                this.loadedToDo2.push(T);
              } else {
                if (T.Proggress == 3) {
                  this.loadedToDo3.push(T);
                } else {
                  if (T.Proggress == 4) {
                    this.loadedToDo4.push(T);
                  } else {
                    this.loadedToDo5.push(T);
                  }
                }
              }
            }
          }
          this.ShowAddNotes = false;
          this.ShowIcon = false;
        }
      },
      (error) => {
        this.isLoading = false;
        console.log(error);
        this.error = error.message;
        if (error.message === "Cannot read property '_token' of null") {
          Swal.fire('You Are Not Logged in', 'Log In First', 'error');
          this.router.navigate(['../Auth']);
        }
      }
    );
  }
  onToggle() {
    const Url = localStorage.getItem('Url');
    this.router.navigate(['../AddToDo']);
    this.ShowAddNotes = !this.ShowAddNotes;
    this.ShowIcon = !this.ShowIcon;
    this.ToDoService.onFetchToDo().subscribe((response: ToDo[]) => {
      this.loadedToDo = response;
    });
  }
}
