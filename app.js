// Создаем узлы с CSS-классами
const nodes = new vis.DataSet([
  {id: 1, label: "Node 1", group: "group1", className: "network-node node-group1"},
  {id: 2, label: "Node 2", group: "group1", className: "network-node node-group1"},
  {id: 3, label: "Node 3", group: "group2", className: "network-node node-group2"},
  {id: 4, label: "Node 4", group: "group2", className: "network-node node-group2"},
  {id: 5, label: "Node 5", group: "group3", className: "network-node node-group3"}
]);

const edges = new vis.DataSet([
  {from: 1, to: 2, className: "network-edge"},
  {from: 1, to: 3, className: "network-edge"},
  {from: 2, to: 4, className: "network-edge"},
  {from: 2, to: 5, className: "network-edge"}
]);

// Контейнер для графа
const container = document.getElementById("network");

// Настройки графа
const options = {
  nodes: {
    shape: "dot",
    size: 16,
    font: {
      size: 16,
      color: getComputedStyle(document.documentElement)
        .getPropertyValue('--node-font-color').trim()
    },
    borderWidth: 2
  },
  edges: {
    width: 2,
    color: {
      color: getComputedStyle(document.documentElement)
        .getPropertyValue('--edge-color').trim()
    },
    smooth: {
      type: "continuous"
    }
  },
  physics: {
    enabled: true,
    solver: "forceAtlas2Based",
    forceAtlas2Based: {
      gravitationalConstant: -50,
      centralGravity: 0.01,
      springLength: 100,
      springConstant: 0.08
    }
  }
};

// Инициализация сети
const network = new vis.Network(container, {nodes, edges}, options);

// Функция добавления узла
document.getElementById("add-node-btn").addEventListener("click", function() {
  const newNodeId = nodes.length + 1;
  const groups = ["group1", "group2", "group3"];
  const randomGroup = groups[Math.floor(Math.random() * groups.length)];
  
  nodes.add({
    id: newNodeId,
    label: "Node " + newNodeId,
    group: randomGroup,
    className: `network-node node-${randomGroup}`
  });
  
  if (nodes.length > 1) {
    const randomNodeId = Math.floor(Math.random() * (newNodeId - 1)) + 1;
    edges.add({
      from: randomNodeId,
      to: newNodeId,
      className: "network-edge"
    });
  }
  
  network.focus(newNodeId, {
    scale: 1.5,
    animation: {
      duration: 1000,
      easingFunction: "easeInOutQuad"
    }
  });
});