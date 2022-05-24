import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class FileService {
    public constructor(private http: HttpClient) {}

    getChildren(params: any): Observable<Object> {
        return this.http.get("/api/fileexplorer/object", 
        { 
            params: {
                folderId: params.folderId
            } 
        });
    }
}