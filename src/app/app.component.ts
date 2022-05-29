import { Component } from '@angular/core';
import { FileService } from './file.service';

import { MenuItem, TreeNode } from 'primeng/api';
import { StorageObject } from './model/storage-object.model';
import { TreeHelper } from './helper/tree.helper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  ROOT_DEFAULT_ID: number = 1;
  objects: StorageObject[] = [];
  selectedNode: TreeNode<StorageObject> = {};
  uploadDialogVisible = false;
  directionBarItems: MenuItem[] = [];

  constructor(private fileService: FileService) {}

  ngOnInit() {
    this.loadObjects(this.ROOT_DEFAULT_ID);
  }

  loadObjects(folderId: number) {
      this.fileService.getChildren({ folderId: folderId })
      .subscribe((elements: any) => {
        this.objects = elements.children;
      });
  }
  
  onUpload(event: any) {
    this.uploadDialogVisible = true;
  }

  uploader(event: any) {
    if (this.selectedNode.data && this.selectedNode.data.objectType === 0) {
      this.fileService.upload({
        content: event.files[0],
        name: event.files[0].name,
        parent: this.selectedNode.data.id
      }).subscribe(response => {
        // this.loadFolderTreeView(this.ROOT_DEFAULT_ID);
      });
    }
  }

  onDownload(event: any) {
    if (this.selectedNode.data) {
      const storageObject: StorageObject = this.selectedNode.data;
      this.fileService.download(storageObject.id)
      .subscribe(blob => {
        const a = document.createElement('a')
        const objectUrl = URL.createObjectURL(blob)
        a.href = objectUrl
        a.download = storageObject.objectName;
        a.click();
        URL.revokeObjectURL(objectUrl);
      });
    }
  }

  onNodeSelected() {
    if (this.selectedNode && this.selectedNode.data && this.selectedNode.data.objectType === 0) {
      let currentNode = this.selectedNode;
      let items: MenuItem[] = [];
      while (currentNode.data && currentNode.data.id !== this.ROOT_DEFAULT_ID) {
          items.push({ label: currentNode.data.objectName });
          if (!currentNode.parent) {
            break;
          }
          currentNode = currentNode.parent
      }
      this.directionBarItems = items.reverse();
    }
  }

  onMoveFolder(event: any) {
  }

  ngOnDestroy() {
    // TODO: Unsubscribe observables
  }
}
