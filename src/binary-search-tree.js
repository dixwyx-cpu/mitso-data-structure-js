import { NotImplementedError } from "../extensions/index.js";
import { Node } from '../extensions/list-tree.js';

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
export default class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    this.rootNode = this.addNode(this.rootNode, data);
  }

  addNode(node, data) {
    if (!node) {
      return new Node(data);
    }
    if (data === node.data) {
      return node;
    }
    if (data < node.data) {
      node.left = this.addNode(node.left, data);
    } else {
      node.right = this.addNode(node.right, data);
    }
    return node;
  }

  has(data) {
    return this.find(data) !== null;
  }

  find(data) {
    let node = this.rootNode;
    while (node) {
      if (data === node.data) {
        return node;
      }
      node = data < node.data ? node.left : node.right;
    }
    return null;
  }

  remove(data) {
    this.rootNode = this.removeNode(this.rootNode, data);
  }

  removeNode(node, data) {
    if (!node) {
      return null;
    }
    if (data < node.data) {
      node.left = this.removeNode(node.left, data);
      return node;
    }
    if (data > node.data) {
      node.right = this.removeNode(node.right, data);
      return node;
    }
    if (!node.left && !node.right) {
      return null;
    }
    if (!node.left) {
      return node.right;
    }
    if (!node.right) {
      return node.left;
    }
    let minRight = node.right;
    while (minRight.left) {
      minRight = minRight.left;
    }
    node.data = minRight.data;
    node.right = this.removeNode(node.right, minRight.data);
    return node;
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
