interface ValueI {
  title: string;
  description: string;
}
class TreeNode {
  key: string;
  value: string;
  parent: string | null;
  children: [];
  description: string;
  title: string;

  constructor(key: string, value: ValueI, parent: string | null = null) {
    this.key = key;
    this.value = value.title;
    this.title = value.title;
    this.description = value.description;
    this.parent = parent;
    this.children = [];
  }

  get hasChildren() {
    return this.children.length !== 0;
  }
  get isLeaf() {
    return this.children.length === 0;
  }
}

class Tree {
  root: TreeNode;
  constructor(key: string, value: ValueI) {
    this.root = new TreeNode(key, value);
  }

  *preOrderTraversal(node = this.root): any {
    yield node;
    if (node.children.length) {
      for (let child of node.children) {
        yield* this.preOrderTraversal(child);
      }
    }
  }

  *postOrderTraversal(node = this.root): any {
    if (node.children.length) {
      for (let child of node.children) {
        yield* this.postOrderTraversal(child);
      }
    }
    yield node;
  }

  insert(parentNodeKey: string, key: string, value: ValueI) {
    for (let node of this.preOrderTraversal()) {
      if (node.key === parentNodeKey) {
        node.children.push(new TreeNode(key, value, node));
        return true;
      }
    }
    return false;
  }
  drop(key: string): boolean {
    for (let node of this.preOrderTraversal()) {
      const filtered = node.children.filter((c: any) => c.key !== key);
      if (filtered.length !== node.children.length) {
        node.children = filtered;
        return true;
      }
    }
    return false;
  }

  find(key: string) {
    for (let node of this.preOrderTraversal()) {
      if (node.key === key) return node;
    }
    return undefined;
  }
}
export default Tree;
