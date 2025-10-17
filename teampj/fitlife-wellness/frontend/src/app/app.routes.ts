import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
import { DashboardComponent } from './dashboard.component';
import { RecipesComponent } from './recipes.component';
import { TrainingComponent } from './training.component';
import { YogaMeditationComponent } from './yoga-meditation.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminFoodsComponent } from './admin-foods/admin-foods.component';
import { AdminExercisesComponent } from './admin-exercises/admin-exercises.component';
import { AdminYogaComponent } from './admin-yoga/admin-yoga.component';
import { AdminSuggestionsComponent } from './admin-suggestions/admin-suggestions.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  // New wellness pages
  { path: 'recipes', component: RecipesComponent },
  { path: 'training', component: TrainingComponent },
  { path: 'yoga-meditation', component: YogaMeditationComponent },
  // Admin routes
  { path: 'admin-login', component: AdminLoginComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'admin-users', component: AdminUsersComponent },
  { path: 'admin-foods', component: AdminFoodsComponent },
  { path: 'admin-exercises', component: AdminExercisesComponent },
  { path: 'admin-yoga', component: AdminYogaComponent },
  { path: 'admin-suggestions', component: AdminSuggestionsComponent },
  { path: '**', redirectTo: '' }
];
