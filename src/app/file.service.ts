import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { StorageObject } from './model/storage-object.model';


@Injectable()
export class FileService {
    public constructor(private http: HttpClient) {}

    createFolder(name: string, type: number, parent: number): Observable<Object> {
        const storageObject = {
            objectName: name,
            objectType: type,
            parent: parent
        };
        return this.http.post("/api/fileexplorer/object", storageObject);
    }

    getChildren(params: any): Observable<Object> {
        return this.http.get("/api/fileexplorer/object", 
        { 
            params: {
                folderId: params.folderId
            } 
        });
    }

    download(fileId: number): Observable<Blob> {
        return this.http.get("/api/fileexplorer/download", { 
            params: { 
                fileId: fileId 
            },
            responseType: 'blob'
        });
    }

    upload(fileData: any): Observable<Object> {
        const formData = new FormData();
        formData.append("file", fileData.content);
        formData.append("filename", fileData.name);
        formData.append("parent", fileData.parent);
        return this.http.post("/api/fileexplorer/upload", formData);
    }
}