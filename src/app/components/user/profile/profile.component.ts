import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/interfaces/auth/response/user';
import { AuthenticationService } from 'src/app/core/services/auth/authentication.service';
import { UserService } from 'src/app/core/services/auth/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: User = {
    id: 0,
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    photoUrl: '',
    shopId: '',
    enabled: false,
    phoneNumber: '',
    roles: [],
  };
  progress = 0;
  message = '';
  fileInfos?: Observable<any>;
  selectedFile!: File;
  constructor(
    private authService: AuthenticationService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.currentUser();
  }

  currentUser() {
    this.authService.currentUser().subscribe(
      (res) => {
        this.user = res;
        console.log(this.user);
      },
      (error) => {},
      () => {}
    );
  }

  selectProfilePicture(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }
  upload(): void {
    this.progress = 0;
    if (this.selectedFile) {
      const file: File | null = this.selectedFile;

      this.userService.updateProfilePicture(this.user.email, file).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round((100 * event.loaded) / event.total);
            console.log('Current progress::', this.progress);
          } else if (event instanceof HttpResponse) {
            this.message = event.body.message;
          }
        },
        (err: any) => {
          console.log(err);
          this.progress = 0;
          if (err.error && err.error.message) {
            this.message = err.error.message;
          } else {
            this.message = 'Could not upload the file!';
          }
        }
      );
    }
  }
}
