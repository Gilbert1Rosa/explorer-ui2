import { TreeNode } from 'primeng/api';
import { StorageObject } from '../model/storage-object.model';

export class TreeHelper {
    static getTreeNodes(storageObjects: StorageObject[]): TreeNode<StorageObject>[] {
        return storageObjects.map(storageObject => this.getTreeNode(storageObject));
    }

    static getEditingTreeNode(storageObject: StorageObject) : TreeNode<StorageObject> {
        const data = {...storageObject, editing: true};
        return {
            "key": `${storageObject.id}`,
            "label": storageObject.objectName,
            "data": data,
            "expandedIcon": storageObject.objectType == 0 ? "pi pi-folder-open" : "pi pi-file-o",
            "collapsedIcon": storageObject.objectType == 0 ? "pi pi-folder" : "pi pi-file-o",
            "selectable": true,
            "expanded": false,
            "children": storageObject.objectType == 0 ? [{}] : []
        };
    }

    private static getTreeNode(storageObject: StorageObject) : TreeNode<StorageObject> {
        const data = {...storageObject, editing: false};
        return {
            "key": `${storageObject.id}`,
            "label": storageObject.objectName,
            "data": data,
            "expandedIcon": storageObject.objectType == 0 ? "pi pi-folder-open" : "pi pi-file-o",
            "collapsedIcon": storageObject.objectType == 0 ? "pi pi-folder" : "pi pi-file-o",
            "selectable": true,
            "expanded": false,
            "children": storageObject.objectType == 0 ? [{}] : []
        };
    }
}