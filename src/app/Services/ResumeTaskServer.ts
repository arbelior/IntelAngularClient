import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Resume_model } from "../Models/Resume_model";

@Injectable({
    providedIn: 'root'
  })
  export class ResumeService {
public constructor( private h:HttpClient){}

    public AddTaskToSaveResume(AddRes: Resume_model): Promise<Resume_model>
    {
      const observable = this.h.post<Resume_model>("https://localhost:44367/api/Resumedata/AddTask", AddRes);
      return observable.toPromise();
    }

    public ResumeSave(): Promise<Resume_model[]>
    {
      const observable = this.h.get<Resume_model[]>("https://localhost:44367/api/Resumedata");
      return observable.toPromise();
    }

    public DeleteItemFormTable(id:number): Promise<undefined>
    {
      const observable = this.h.delete<undefined>("https://localhost:44367/API/Resumedata/"+id);
      return observable.toPromise();
    }
  }  