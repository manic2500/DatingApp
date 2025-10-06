import { Routes } from '@angular/router';
import { authGuard } from '../core/guards/auth-guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('../features/home/home').then(m => m.Home)
    },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [authGuard],
        children: [
            {
                path: 'members',
                loadComponent: () => import('../features/members/member-list/member-list').then(m => m.MemberList)
            },
            {
                path: 'lists',
                loadComponent: () => import('../features/lists/lists').then(m => m.Lists)
            },
            {
                path: 'messages',
                loadComponent: () => import('../features/messages/messages').then(m => m.Messages)
            },
            {
                path: 'errors',
                loadComponent: () => import('../features/test-errors/test-errors').then(m => m.TestErrors),
            },
            {
                path: 'server-error',
                loadComponent: () => import('../shared/errors/server-error/server-error').then(m => m.ServerError),
            },
        ]
    },

    // Catch-all wildcard route
    {
        path: '**',
        loadComponent: () => import('../shared/errors/not-found/not-found').then(m => m.NotFound),
    }
];
