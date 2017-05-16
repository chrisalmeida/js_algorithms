function Node(val) {
  this.val = val
  this.left = null
  this.right = null
}

function BinarySearchTree() {
  this._rootNode = null
}

BinarySearchTree.prototype.delete = function(node, val) {
  let currentNode = node
  if (currentNode === null) {
    return currentNode
  } else if (val < currentNode.val) {
    currentNode.left = this.delete(currentNode.left, val)
  } else if (val > currentNode.val){
    currentNode.right = this.delete(currentNode.right, val)
  } else {
    currentNode = this._removeNodes(currentNode)
  }

  return currentNode
}

BinarySearchTree.prototype._removeNodes = function(node) {
  if (node.left === null && node.right === null) {
    node = null
    return node
  } else if (node.left === null) {
    node = node.right
    return node
  } else if (node.right === null) {
    node = node.left
    return node
  } else {
    const min = this.findMinimum(node)
    node.val = min.val
    node.right = this.delete(node.right, min.val)
    node.left = null
  }

  return node
}

BinarySearchTree.prototype.findMinimum = function(node) {
  if (!node) {
    return this._rootNode
  }
  while (node.left) {
    node = node.left
  }
  return node
}

BinarySearchTree.prototype.findMaximum = function(node) {
  if (!node) {
    return this._rootNode
  }
  while (node.right) {
    node = node.right
  }
  return node.val
} 

BinarySearchTree.prototype.insert = function(val) {
  const newNode = new Node(val)
  const root = this._rootNode
  let currentNode = root

  if (root === null) {
    this._rootNode = newNode
    return
  }

  while (currentNode) {
    if (val < currentNode.val) {
      if (!currentNode.left) {
        currentNode.left = newNode
        break;
      } else {
        currentNode = currentNode.left
      }
    } else {
      if (!currentNode.right) {
        currentNode.right = newNode
        break;
      } else {
        currentNode = currentNode.right
      }
    }
  }
}

BinarySearchTree.prototype.searchRecursive = function(node, val) {
  let currentNode = node
  if (node === null || node.val ===  val) {
    return node
  } else if (val < node.val) {
    currentNode = this.searchRecursive(node.left, val)
  } else {
    currentNode = this.searchRecursive(node.right, val)
  }

  return currentNode
}

BinarySearchTree.prototype.searchIterative = function(node, val) {
  let currentNode = node

  while (currentNode) {
    if (currentNode === null || currentNode.val === val) {
      return currentNode
    }
    if (val < currentNode.val) {
      currentNode = currentNode.left
    } else {
      currentNode = currentNode.right
    }
  }
}

var bst = new BinarySearchTree()
bst.insert(5)
bst.insert(10)
bst.insert(15)

bst.delete(bst._rootNode, 15)

bst.searchRecursive(bst._rootNode, 15) // undefined
bst.searchIterative(bst._rootNode, 10)
