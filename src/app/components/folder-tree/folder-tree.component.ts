import { Component, EventEmitter, Input, Output } from "@angular/core";
import { TreeNode } from "primeng/api";
import { FileService } from "src/app/file.service";
import { TreeHelper } from "src/app/helper/tree.helper";
import { StorageObject } from "src/app/model/storage-object.model";


@Component({
    selector: 'folder-tree',
    templateUrl: './folder-tree.component.html',
    styleUrls: [
        'folder-tree.component.css'
    ]
})
export class FolderTreeComponent {
    ROOT_DEFAULT_ID: number = 1;

    @Output()
    onSelectFolder = new EventEmitter<StorageObject>();

    @Output()
    onFolderCreated = new EventEmitter<any>();

    @Output()
    onFolderMoved = new EventEmitter<StorageObject>();

    @Output()
    onNodeSelected = new EventEmitter<any>();

    @Input()
    public selectedNode: TreeNode<StorageObject> = {};
    
    treeNodes: TreeNode<StorageObject>[] = [];

    constructor(private fileService: FileService) {}

    @Input()
    set objects(objects: StorageObject[]) {
        this.treeNodes = TreeHelper.getTreeNodes(objects);
    }

    ngOnInit() {
        this.loadFolderTreeView(this.ROOT_DEFAULT_ID);
    }

    loadFolderTreeView(folderId: number) {
        this.fileService.getChildren({ folderId: folderId })
        .subscribe((elements: any) => {
          this.treeNodes = TreeHelper.getTreeNodes(elements.children);
        });
    }

    onCreateFolderClicked(event: Event) {
        if (this.selectedNode.data && this.selectedNode.children) {
            this.selectedNode.children = [...this.selectedNode.children, TreeHelper.getEditingTreeNode({
              id: 0,
              objectName: "",
              objectType: 0,
              parent: this.selectedNode.data.id
            })];
        }
    }

    onMoveFolder(event: any) {

    }

    onFolderExpanded(event: any) {
        this.fileService.getChildren({ folderId: event.node.data.id })
        .subscribe((elements: any) => {
          event.node.children = TreeHelper.getTreeNodes(elements.children);
        });
    }

    onTreeInput(event: any, treeNode: TreeNode<StorageObject>) {
        if (event.code === "Enter" && treeNode.data && treeNode.label) {
            const name = treeNode.label;
            if (this.selectedNode.parent && this.selectedNode.parent.data) {
              this.fileService.createFolder(name, 0, this.selectedNode.parent.data.id)
              .subscribe((response: any) => {
                if (response.success) {
                    this.onFolderCreated.emit();
                }
              });
            }
        }
    }
}