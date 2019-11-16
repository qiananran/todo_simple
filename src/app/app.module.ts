import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { TaskListPage } from '../pages/tasklist/tasklist';
import { HttpDataProvider } from '../providers/http-data/http-data';
import { HttpClientModule } from '@angular/common/http';
import { InputTaskPage } from '../pages/input-task/input-task';

@NgModule({
  declarations: [
    MyApp,
    TaskListPage,
    InputTaskPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TaskListPage,
    InputTaskPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpDataProvider,
    HttpDataProvider
  ]
})
export class AppModule {}
