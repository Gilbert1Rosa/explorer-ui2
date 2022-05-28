import { Component, EventEmitter, Output } from "@angular/core";
import { TreeNode } from "primeng/api";
import { FileService } from "src/app/file.service";
import { StorageObject } from "src/app/model/storage-object.model";


@Component({
    selector: 'folder-tree',
    templateUrl: './folder-tree.component.html',
    styleUrls: [
        'folder-tree.component.css'
    ]
})
export class FolderTreeComponent {
    @Output()
    onSelectFolder = new EventEmitter<StorageObject>();

    @Output()
    onFolderCreated = new EventEmitter<StorageObject>();

    @Output()
    onFolderMoved = new EventEmitter<StorageObject>(); 

    treeNodes: TreeNode<StorageObject>[] = [];
    selectedNode: TreeNode<StorageObject> = {};

    constructor(private fileService: FileService) {}

    ngOnInit() {

    }

    onCreateFolderClicked(event: Event) {

    }

    onMoveFolder(event: Event) {

    }

    onFolderExpanded(event: Event) {

    }

    onNodeSelected() {

    }

    onTreeInput(event: Event, node: TreeNode<StorageObject>) {

    }
}