import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Task } from '../../pages/tasklist/task';

@Injectable()
export class HttpDataProvider {

  private readonly baseUrl: string = 'http://api2.bmob.cn/1';
  private readonly httpOptions : object = {
    headers: new HttpHeaders({
      'X-Bmob-Application-Id': 'e2b10545f275457159b5bacdfd3b3d21',
      'X-Bmob-REST-API-Key': 'a00e1be264573b45b05814de5e287eba',
      'Content-Type': 'application/json',
    })
  };

  constructor(public http: HttpClient) {
    console.log('获取Http数据服务加载');
  }

  //获取搜有的值
  /**
   * 获取待办事项的列表
   * @returns {Observable<Task[]>} 待办事项列表集合
   */
  getTaskList():Observable<Task[]>{
    return this.http.get<Task[]>(`${this.baseUrl}/classes/ToDoList`,
    this.httpOptions).map(data => data["results"]);
  }

  /**
   * 更新指定待办事项
   * @param task
   * @returns {Observable<Task[]>}响应结构
   */
  updateTask(task : Task): Observable<Task>{
    let _task = {title:task.title,status:task.status
    ,description:task.description}
    return this.http.put<Task>(`${this.baseUrl}/classes/ToDoList/${task.objectId}`,_task,
    this.httpOptions)
  }

  deleteTask(task: Task){
    return this.http.delete<Task>(`${this.baseUrl}/classes/ToDoList/${task.objectId}`,
    this.httpOptions);
  }

}
