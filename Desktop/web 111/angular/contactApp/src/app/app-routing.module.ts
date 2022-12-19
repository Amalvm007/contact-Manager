import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddContactComponent } from './add-contact/add-contact.component';
import { ContactManagerComponent } from './contact-manager/contact-manager.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UpdateContactComponent } from './update-contact/update-contact.component';
import { ViewContactComponent } from './view-contact/view-contact.component';

const routes: Routes = [
  // to redirect automatically from localhost:4200 to contactManager
  {
    path:'',redirectTo:'contacts/admin',pathMatch:'full'
  },
  // path for contactManagerComponent
  {
    path:'contacts/admin',component:ContactManagerComponent
  },
  // Add contact path 
  {
    path:'conatcts/add',component:AddContactComponent
  },
  // update contact compounds
  {
    path:'contacts/edit',component:UpdateContactComponent
  },
  {
    path:'contacts/view/:contactId',component:ViewContactComponent
  },
  {
    path:'**',component:PageNotFoundComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
