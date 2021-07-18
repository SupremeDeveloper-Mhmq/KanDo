import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ToDoService } from 'src/app/Shared/to-do.service';
import { ToDo } from 'src/app/Shared/ToDo.model';
@Component({
  selector: 'app-to-do-add',
  templateUrl: './to-do-add.component.html',
  styleUrls: ['./to-do-add.component.scss'],
})
export class ToDoAddComponent implements OnInit {
  constructor(private ToDoService: ToDoService, private router: Router) {}
  loadedToDo: ToDo[] = [];
  ShowAddNotes!: boolean;
  ShowIcon!: boolean;
  error = null;
  Priority!: string;
  PriorityStyle!: string;
  onPostToDo(ToDoForm: NgForm) {
    this.ToDoService.onPostToDo(ToDoForm.value).subscribe(
      (responseData: any) => {
        console.log(responseData);
        Swal.fire('Added', 'Added Note And Its Description', 'success');
      }
    );
  }
  ngOnInit(): void {}
  onNavigate() {
    const Url = localStorage.getItem('Url');
    this.router.navigate([Url]);
  }
}
