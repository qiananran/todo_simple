import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { HttpDataProvider } from '../../providers/http-data/http-data';
import { Task } from '../tasklist/task';
import { isRightSide } from 'ionic-angular/umd/util/util';

/**
 * Generated class for the InputTaskPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-input-task',
  templateUrl: 'input-task.html',
})
export class InputTaskPage {
  title : string;
  status: string = 'open';
  description:string;
  objectId:string;

  action:string = '新增';

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public viewCtrl : ViewController,
     public http: HttpDataProvider
     ) {
    
    
  }

  ionViewDidLoad() {
    let task:Task = this.navParams.get("task");
    if(task){
      this.title = task.title;
      this.status = task.status;
      this.description = task.description;
      this.objectId = task.objectId;
      this.action = '编辑';
    }
  }

  close(){
      this.viewCtrl.dismiss();
  }
  saveTask(){
    let _task:Task = {
      title:this.title,
      status:this.status,
      description:this.description,
      objectId:this.objectId
    };
    if (this.action==='新增') {
      this.http.addTask(_task).subscribe(data=>_task.objectId = data.objectId);
    }else if(this.action === '编辑'){
      this.http.updateTask(_task).subscribe();
    }

    this.viewCtrl.dismiss(_task);
  }

}
