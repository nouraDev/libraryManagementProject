
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import { LibraryPageComponent } from './pages/library-page/library-page.component';
import { SingleBookComponent } from './pages/single-book/single-book.component';
import { BooksListComponent } from './pages/books-list/books-list.component';
import { LoginPageComponent } from './pages/auth/login-page/login-page.component';
import { RegisterPageComponent } from './pages/auth/register-page/register-page.component';
import { userRouteGuardGuard } from './_guards/user-route-guard.guard';
import { NgModule } from '@angular/core';
import { NewBookComponent } from './pages/new-book/new-book.component';
import { AuthGuard } from './_guards/auth-guard.guard';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';



export const routes: Routes = [

  { path:'auth',
  children:[
    {path:'login', component:LoginPageComponent},
    {path:'register',component:RegisterPageComponent}
  ]
  },  

  { path: 'library',
    children: [
      { path:'books',component:BooksListComponent,
        children:[
          { path:'new-book', component:NewBookComponent,canActivate:[AuthGuard]},
          { path:'book-description/:bookId',component:SingleBookComponent} //,canActivate:[userRouteGuardGuard]
        ]
      },
      {path:'library-page',component:LibraryPageComponent}

    ]
    
  },

  { path:'profile', component:UserProfileComponent, canActivate:[AuthGuard]},
  { path: '',
    children:[
      { path: '', component: LibraryPageComponent }
    ] 
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true,
    preloadingStrategy: PreloadAllModules})],
  // exports: [RouterModule]
})
export class AppRoutingModule { }
