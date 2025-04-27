import { PostComponent } from './shared/UI/post/post.component';
import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.component').then(
        (m) => m.LoginComponent
      ),
    title: 'Login',
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./components/signup/signup.component').then(
        (m) => m.SignupComponent
      ),
    title: 'Signup',
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./components/profile/profile.component').then(
        (m) => m.ProfileComponent
      ),
    title: 'Profile',
  },
  {
    path: 'changepassword',
    loadComponent: () =>
      import('./components/changepassword/changepassword.component').then(
        (m) => m.ChangepasswordComponent
      ),
    title: 'Change Password',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./components/home/home.component').then((m) => m.HomeComponent),
    canActivate: [authGuard],
    title: 'Time Line',
  },

  
  {
    path: 'post/:id',
    loadComponent: () =>
      import('./shared/UI/post/post.component').then(
        (c) => c.PostComponent
      ),
    title: 'Post',
    canActivate: [authGuard],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./components/notfound/notfound.component').then(
        (m) => m.NotfoundComponent
      ),
  }
];
