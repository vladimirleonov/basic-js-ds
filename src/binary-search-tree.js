const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    const node = new Node(data);

    if (!this.rootNode) {
      this.rootNode = node;
      return;
    }

    let current = this.rootNode;
    while (true) {
      if (data < current.data) {
        if (!current.left) {
          current.left = node;
          break;
        }
        current = current.left;
      } else if (data > current.data) {
        if (!current.right) {
          current.right = node;
          break;
        }
        current = current.right;
      } else {
        break;
      }
    }
  }

  has(data) {
    let current = this.rootNode;
    while (current) {
      if (data === current.data) {
        return true;
      }
      if (data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return false;
  }

  find(data) {
    let current = this.rootNode;
    while (current) {
      if (data === current.data) {
        return current;
      }
      if (data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return null;
  }

  remove(data) {
    let current = this.rootNode;
    let parent = null;
    let nodeToDelete = null;
    let childCount;

    while (current) {
      if (data === current.data) {
        nodeToDelete = current;
        childCount = (nodeToDelete.left !== null ? 1 : 0) + (nodeToDelete.right !== null ? 1 : 0);
        break;
      }
      if (data < current.data) {
        parent = current;
        current = current.left;
      } else {
        parent = current;
        current = current.right;
      }
    }

    if (!nodeToDelete) {
      return null;
    }

    if (childCount === 0) {
      if (nodeToDelete === this.rootNode) {
        this.rootNode = null;
      } else {
        if (parent.left === nodeToDelete) {
          parent.left = null;
        } else {
          parent.right = null;
        }
      }
    } else if (childCount === 1) {
      const newChild = (nodeToDelete.left !== null ? nodeToDelete.left : nodeToDelete.right);
      if (nodeToDelete === this.rootNode) {
        this.rootNode = newChild;
      } else {
        if (parent.left === nodeToDelete) {
          parent.left = newChild;
        } else {
          parent.right = newChild;
        }
      }
    } else {
      let smallestNode = nodeToDelete.right;
      let smallestNodeParent = nodeToDelete;
      while (smallestNode.left !== null) {
        smallestNodeParent = smallestNode;
        smallestNode = smallestNode.left;
      }
      nodeToDelete.data = smallestNode.data;
      if (smallestNodeParent.left === smallestNode) {
        smallestNodeParent.left = smallestNode.right;
      } else {
        smallestNodeParent.right = smallestNode.right;
      }
    }

    return nodeToDelete;
  }

  min() {
    if (!this.rootNode) {
      return null;
    }
  
    let node = this.rootNode;
    while (node.left) {
      node = node.left;
    }
    return node.data;
  }
  
  max() {
    if (!this.rootNode) {
      return null;
    }
  
    let node = this.rootNode;
    while (node.right) {
      node = node.right;
    }
    return node.data;
  }
}

module.exports = {
  BinarySearchTree
};