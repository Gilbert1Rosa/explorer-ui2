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
  title = 'explorer-ui2';
  treeNodes: TreeNode<StorageObject>[] = [];

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

  ngOnDestroy() {
    // TODO: Unsubscribe observables
  }
}
