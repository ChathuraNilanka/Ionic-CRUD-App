import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBItvwX-hySStrd5RcSFNSj65F93C3lKaU",
  authDomain: "usersapp-ef773.firebaseio.com",
  databaseURL: "https://usersapp-ef773.firebaseio.com",
  projectId: "usersapp-ef773",
  storageBucket: "usersapp-ef773.firebaseio.com",
  messagingSenderId: "826990882984"
};
firebase.initializeApp(config);

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
