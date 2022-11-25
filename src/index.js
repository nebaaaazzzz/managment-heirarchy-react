const treeData = [
  {
    value: "parent 1",
    title: "parent 2",
    children: [
      {
        value: "parent 1-0",
        title: "parent 1-0",
        children: [
          {
            value: "leaf1",
            title: "leaf1",
          },
          {
            value: "leaf2",
            title: "leaf2",
          },
        ],
      },
      {
        value: "parent 1-1",
        title: "parent 1-1",
        children: [
          {
            value: "leaf3",
            title: "leaf",
          },
        ],
      },
    ],
  },
  ``,
];
const list = [];
function traverse(arr) {
  for (let i = 0; i < [...arr.values()].length; i++) {
    if (arr[i].children) {
      list.push(arr[i].title);
      traverse(arr[i].children);
    } else {
      list.push(arr[i].title);
    }
  }
}
traverse(treeData);
console.log(list);
