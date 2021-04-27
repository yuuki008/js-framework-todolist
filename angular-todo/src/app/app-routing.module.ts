import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountModule } from './pages/account/account-module';
import { AuthGuard } from './guard/auth.guard';
import { LoginGuard } from './guard/login.guard';

const routes: Routes = [
  {
    path: 'account',
    loadChildren: () => import('./pages/account/account-module').then(m => m.AccountModule),
    canActivate: [LoginGuard],
  },
  {
    path: '',
    loadChildren: () => import('./pages/todo/todo.module').then(m => m.TodoModule), // 変更
    canActivate: [AuthGuard],
  },
  // {
  //   path: '**',
  //   component: PageNotFoundComponent,
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AccountModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
