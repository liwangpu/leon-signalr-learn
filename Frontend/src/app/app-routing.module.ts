import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: 'tutorial',
        loadChildren: () => import('./tutorial/tutorial.module').then(m => m.TutorialModule)
    },
    { path: '**', redirectTo: 'tutorial' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { enableTracing: false, initialNavigation: 'enabled' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
