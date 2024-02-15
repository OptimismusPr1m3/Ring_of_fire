import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp({
          projectId: 'ring-of-fire-285e2',
          appId: '1:726582463012:web:6d2c171e74e59ebfcf66b1',
          storageBucket: 'ring-of-fire-285e2.appspot.com',
          apiKey: 'AIzaSyDtadcU3jXLjGHMqn7TlYUSDmLQy8x9MX4',
          authDomain: 'ring-of-fire-285e2.firebaseapp.com',
          messagingSenderId: '726582463012',
        })
      )
    ),
    importProvidersFrom(provideFirestore(() => getFirestore())),
  ],
};
