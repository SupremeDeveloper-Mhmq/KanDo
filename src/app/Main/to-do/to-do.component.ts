import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToDoService } from 'src/app/Shared/to-do.service';
import { ToDo } from 'src/app/Shared/ToDo.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.scss'],
})
export class ToDoComponent implements OnInit {
  constructor(private ToDoService: ToDoService, private router: Router) {}

  loadedToDo: ToDo[] = [];
  ShowAddNotes!: boolean;
  ShowIcon!: boolean;
  error = null;
  Priority!: string;
  PriorityStyle!: string;

  ngOnInit(): void {
    this.ToDoService.onFetchToDo().subscribe(
      (response: ToDo[]) => {
        this.loadedToDo = response;
        if (this.loadedToDo.length < 1) {
          this.ShowAddNotes = true;
          this.ShowIcon = true;
        } else {
          this.ShowAddNotes = false;
          this.ShowIcon = false;
        }
      },
      (error) => {
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
    this.ShowAddNotes = !this.ShowAddNotes;
    this.ShowIcon = !this.ShowIcon;
    this.ToDoService.onFetchToDo().subscribe((response: ToDo[]) => {
      this.loadedToDo = response;
    });
  }
  // onClearPosts() {
  //   this.ToDoService.onClearNotes().subscribe(() => {
  //     this.loadedToDo = [];
  //     Swal.fire('Deleted', 'Deleted All Notes', 'success');
  //   });
  // }
}
