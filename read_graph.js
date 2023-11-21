// Define a simple Graph class
class Graph {
  constructor() {
    this.vertices = {};
  }

  addVertex(id, name, line) {
    if (!this.vertices[id]) {
      this.vertices[id] = { id, name, line, edges: {} };
    }
  }

  addEdge(id1, id2, distance) {
    if (this.vertices[id1] && this.vertices[id2]) {
      this.vertices[id1].edges[id2] = distance;
      this.vertices[id2].edges[id1] = distance;
    }
  }

  getVertex(id) {
    return this.vertices[id];
  }

  dijkstra(start, end) {
    return 1
  }
}

// Function to process the CSV data
function processCSV(csvData) {
  const lines = csvData.trim().split('\n').slice(1); // Exclude header
  const graph = new Graph();

  lines.forEach(line => {
    const [id1, station1, id2, station2, lineName, distance] = line.split(',');
    graph.addVertex(id1, station1, lineName);
    graph.addVertex(id2, station2, lineName);
    graph.addEdge(id1, id2, parseFloat(distance));
  });

  // Usage example: Find shortest path between two stations
  const startStation = 'BP6';
  const endStation = 'BP7';
  const shortestPath = graph.dijkstra(startStation, endStation);
  // Process and display the shortest path as needed
}

// Fetch the CSV file
fetch('data/mrts.csv') // Replace with your CSV file name
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    return response.text();
  })
  .then(csvData => {
    processCSV(csvData);
  })
  .catch(error => {
    console.error('Error fetching CSV:', error);
  });