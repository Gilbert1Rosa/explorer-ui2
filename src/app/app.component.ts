import { Component } from '@angular/core';
import { FileService } from './file.service';

import { TreeNode } from 'primeng/api';
import { StorageObject } from './model/storage-object.model';
import { TreeHelper } from './helper/tree.helper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  ROOT_DEFAULT_ID: number = 1;
  path = "";
  treeNodes: TreeNode<StorageObject>[] = [];
  selectedNode: TreeNode<StorageObject> = {};
  uploadDialogVisible = false;

  constructor(private fileService: FileService) {}

  ngOnInit() {
    this.loadFolderTreeView(this.ROOT_DEFAULT_ID);
  }

  loadFolderTreeView(folderId: number) {
    this.fileService.getChildren({ folderId: folderId })
    .subscribe((elements: any) => {
      this.treeNodes = TreeHelper.getTreeNodes(elements.children);
    });
  }

  onFolderExpanded(event: any) {
    console.log(event);
    this.fileService.getChildren({ folderId: event.node.data.id })
    .subscribe((elements: any) => {
      event.node.children = TreeHelper.getTreeNodes(elements.children);
    });
  }

  onUpload(event: any) {
    this.uploadDialogVisible = true;
  }

  uploader(event: any) {
    console.log(event);
    if (this.selectedNode.data && this.selectedNode.data.objectType === 0) {
      this.fileService.upload({
        content: event.files[0],
        name: event.files[0].name,
        parent: this.selectedNode.data.id
      }).subscribe(response => {
        this.loadFolderTreeView(this.ROOT_DEFAULT_ID);
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

  onCreateFolderClicked(event: any) {
    if (this.selectedNode.data && this.selectedNode.children) {
      this.selectedNode.children = [...this.selectedNode.children, TreeHelper.getEditingTreeNode({
        id: 0,
        objectName: "",
        objectType: 0,
        parent: this.selectedNode.data.id
      })];
    }
  }

  onTreeInput(event: any, treeNode: TreeNode<StorageObject>) {
    if (event.code === "Enter" && treeNode.data && treeNode.label) {
      const name = treeNode.label;
      if (this.selectedNode.parent && this.selectedNode.parent.data) {
        this.fileService.createFolder(name, 0, this.selectedNode.parent.data.id)
        .subscribe(response => {
          this.loadFolderTreeView(this.ROOT_DEFAULT_ID);
        });
      }
    }
  }

  onMoveFolder(event: any) {
  }

  ngOnDestroy() {
    // TODO: Unsubscribe observables
  }
}
