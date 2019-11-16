import { Component } from '@angular/core';
import { NavController,  ItemSliding, ModalController} from 'ionic-angular';
import { Task } from './task';
import { HttpDataProvider } from '../../providers/http-data/http-data';
import { InputTaskPage } from '../input-task/input-task';

@Component({
  selector: 'page-tasklist',
  templateUrl: 'tasklist.html'
})
export class TaskListPage {
  tasks : Task[] = [];

  constructor( public navCtrl: NavController,
    public modalCtrl:ModalController,
    public httpData : HttpDataProvider) {

  }
  ionViewDidLoad(){
    // this.tasks=[
    //   // {title:'牛奶',status:'open'},
    //   // {title:'鸡蛋',status:'open'},
    //   // {title:'果汁',status:'open'},
    //   // {title:'煎饼',status:'open'}
    // ];
    this.httpData.getTaskList().subscribe(tasks => this.tasks = tasks);

  }
  /**
   * 新增待办事项
   */
  addTask(){
    // let theNewTask : string = prompt("新任务");
    // if(theNewTask !== ''){
    //   this.tasks.push({title:theNewTask,status:'open'});
    // }
    let addModal = this.modalCtrl.create(InputTaskPage);

    addModal.onDidDismiss((task:Task)=>{
      if(task){
        this.tasks.push(task);
      }
    });
    addModal.present();
  }
  editTask(task:Task){
    if (task.status === 'done')
      return;
    const index:number = this.tasks.indexOf(task);
    let editModal = this.modalCtrl.create(InputTaskPage,{task:task});

    editModal.onDidDismiss((task)=>{
      if(task){
          this.tasks[index] = task;
      }
    });
    editModal.present();
  }

  /**
   * 标记待办事项
   * @param slidingItem 
   * @param task 
   */
  markAsDone(slidingItem:ItemSliding,task:Task){
    task.status = 'done';
    this.httpData.updateTask(task).subscribe();
    slidingItem.close();

  }

  /**
   *  删除待办事项
   * @param slidingItem 
   * @param task 
   */
  removeTask(slidingItem:ItemSliding,task:Task){
    task.status = 'remove';
    let index = this.tasks.indexOf(task);
    if(index > -1){
      this.tasks.splice(index,1);
    }
    this.httpData.deleteTask(task).subscribe();
    slidingItem.close();
  }

  /**
   * 
   * @param refresher 
   * 下拉刷新待办事项
   */
  doRefresh(refresher : any){
    setTimeout(() => {
      this.httpData.getTaskList().subscribe(tasks=>{
        this.tasks = tasks;
      });
      refresher.complete();
    }, 2000);
  }

}
