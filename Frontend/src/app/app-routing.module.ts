import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: 'tutorial',
        loadChildren: () => import('./tutorial/tutorial.module').then(m => m.TutorialModule)
    },
    {
        path: 'mirror',
        loadChildren: () => import('./mirror/mirror.module').then(m => m.MirrorModule)
    },
    { path: '**', redirectTo: 'mirror' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { enableTracing: false, initialNavigation: 'enabled' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
