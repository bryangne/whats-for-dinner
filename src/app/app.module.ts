import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './material/material.module';
import { ListComponent } from './shopping-list/list/list.component';
import { ListItemComponent } from './shopping-list/list-item/list-item.component';
import { AddEditModalComponent } from './shopping-list/add-edit-modal/add-edit-modal.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { AuthService } from './authentication/auth.service';
import { GroceriesService } from './shopping-list/groceries.service';
import { GroceryBackendService } from './backend-services/grocery-backend.service';
import { GrocerySearchComponent } from './shopping-list/grocery-search/grocery-search.component';
import { GroceryResultsComponent } from './grocery-results/grocery-results.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectFromLogin = () => redirectLoggedInTo(['shoppinglist'])

const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent,
    canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe: redirectFromLogin} },
  { path: 'register', component: RegisterComponent ,
    canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe: redirectFromLogin} },
  { path: 'shoppinglist', component: ListComponent,
    canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe: redirectUnauthorizedToLogin} },
  { path: 'search/groceries/:item', component: GroceryResultsComponent,
    canActivate: [AngularFireAuthGuard], data: {authGuardPipe: redirectUnauthorizedToLogin} },
];

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    ListItemComponent,
    AddEditModalComponent,
    ToolbarComponent,
    LoginComponent,
    RegisterComponent,
    GrocerySearchComponent,
    GroceryResultsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    RouterModule.forRoot(appRoutes)
  ],
  entryComponents: [AddEditModalComponent],
  exports: [],
  providers: [AngularFireAuthGuard, AuthService, GroceriesService, GroceryBackendService],
  bootstrap: [AppComponent]
})
export class AppModule { }
