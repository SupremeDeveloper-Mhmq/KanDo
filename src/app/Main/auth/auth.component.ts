import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Shared/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading!: boolean;
  error!: string | null;

  constructor(private authService: AuthService, private router: Router) {}
  onAuthenticate(AuthForm: NgForm) {
    if (this.isLoginMode) {
      if (!AuthForm.valid) {
        Swal.fire(
          'Form Is Not Valid',
          'Please Fill the Form Correctly',
          'error'
        );
        return;
      }
      const email = AuthForm.value.email;
      const password = AuthForm.value.password;
      this.isLoading = true;
      console.log(email);
      console.log(password);
      this.authService.Login(email, password).subscribe(
        (resData) => {
          console.log(resData);
          if (resData.registered) {
            localStorage.setItem('UserName', resData.localId);
            localStorage.setItem('token', resData.idToken);
          } else {
            Swal.fire('First Log In', 'Login First', 'error');
          }
          this.isLoading = false;
          Swal.fire(
            'Loged In Successfully',
            'You Have Logged In Successfully',
            'success'
          );
          this.router.navigate(['../Kanban']);
        },
        (error) => {
          this.isLoading = false;
          this.error = 'An Error Occured';
          switch (error.error.error.message) {
            case 'EMAIL_NOT_FOUND': {
              this.error = 'You Have not Signed Up Yet.';
              Swal.fire('Email Not Found', error.error.error.message, 'error');
              break;
            }
            case 'INVALID_PASSWORD': {
              this.error = 'Your Password is Invalid';
              Swal.fire(
                'Password is Incorrect',
                'Type Password Carefully',
                'error'
              );
              break;
            }
            case 'USER_DISABLED': {
              this.error = 'Your Account is Disabled By admin';
              Swal.fire('Account Disabled', 'Try Again Later', 'error');
              break;
            }
          }
          console.log(error);
        }
      );
      AuthForm.reset();
    } else {
      if (!AuthForm.valid) {
        Swal.fire(
          'Form Is Not Valid',
          'Please Fill the Form Correctly',
          'error'
        );
        return;
      }
      const email = AuthForm.value.email;
      const password = AuthForm.value.password;
      this.isLoading = true;
      console.log(email);
      console.log(password);
      this.authService.SignUp(email, password).subscribe(
        (resData) => {
          console.log(resData);
          this.isLoading = false;
          Swal.fire(
            'Signed Up Successfully',
            'You Have Signed Up Successfully',
            'success'
          );
          this.isLoginMode = true;
          this.error = null;
        },
        (error) => {
          this.isLoading = false;
          this.error = 'An Error Occured';
          switch (error.error.error.message) {
            case 'EMAIL_EXISTS': {
              this.error = 'This E-mail Already exists!';
              Swal.fire('Email Exists', error.error.error.message, 'error');
              break;
            }
            case 'OPERATION_NOT_ALLOWED': {
              this.error = 'This Operation Is Not Allowed';
              Swal.fire(
                'This Operation is Not Allowed',
                'Try Again Later',
                'error'
              );
              break;
            }
            case 'TOO_MANY_ATTEMPTS_TRY_LATER': {
              this.error = 'Server is Busy Try Again Later';
              Swal.fire('Server Is Busy', 'Try Again Later', 'error');
              break;
            }
          }
          console.log(error);
        }
      );
      AuthForm.reset();
      console.log(AuthForm.value.email);
      console.log(AuthForm.value.password);
    }
  }

  ngOnInit(): void {}
}
