import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactManagerComponent } from './contact-manager/contact-manager.component';
import { AddContactComponent } from './add-contact/add-contact.component';
import { UpdateContactComponent } from './update-contact/update-contact.component';
import { ViewContactComponent } from './view-contact/view-contact.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path:'' , redirectTo:'contacts/admin' ,pathMatch:'full'

  },
  // ContactManagerComponent
  {
    path:'contacts/admin',component:ContactManagerComponent
  },
  // AddContactComponent
  {
    path:'contacts/add', component:AddContactComponent
  },
  // UpdateContactComponent
  {
    path:'contacts/edit/:contactId',component:UpdateContactComponent
  },
  // ViewContactComponent
  {
    path:'contacts/view/:contactId', component:ViewContactComponent
  },
  // PageNotFoundComponent
  {
    path:"**",component:PageNotFoundComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
