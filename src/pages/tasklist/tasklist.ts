import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-tasklist',
  templateUrl: 'tasklist.html'
})
export class TaskListPage {
  tasks:Array<any> = [];

  constructor(public navCtrl: NavController) {

  }
  ionViewDidLoad(){
    this.tasks=[
      {title:'牛奶',status:'open'},
      {title:'鸡蛋',status:'open'},
      {title:'果汁',status:'open'},
      {title:'煎饼',status:'open'}
    ];
  }

  addTask(){

  }

}
