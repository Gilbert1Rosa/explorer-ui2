import { TreeNode } from 'primeng/api';
import { StorageObject } from '../model/storage-object.model';

export class TreeHelper {
    static getTreeNodes(storageObjects: StorageObject[]): TreeNode<StorageObject>[] {
        return storageObjects.map(storageObject => this.getTreeNode(storageObject));
    }

    private static getTreeNode(storageObject: StorageObject) : TreeNode<StorageObject> {
        return {
            "key": `${storageObject.id}`,
            "label": storageObject.objectName,
            "data": storageObject,
            "expandedIcon": storageObject.objectType == 0 ? "pi pi-folder-open" : "pi pi-file-o",
            "collapsedIcon": storageObject.objectType == 0 ?"pi pi-folder" : "pi pi-file-o",
            "selectable": true,
            "expanded": false,
            "children": [
                {}
            ]
        };
    }
}