class Graph {
    constructor() {
        this.vertices = new Map(); // Map to store vertices and their connections
    }

    // Add a vertex to the graph
    addVertex(name) {
        if (!this.vertices.has(name)) {
            this.vertices.set(name, new Map()); // Map to store connections and their weights
        }
    }

    // Add an edge between two vertices with a weight
    addEdge(from, to, weight) {
        if (this.vertices.has(from) && this.vertices.has(to)) {
            this.vertices.get(from).set(to, weight);
            this.vertices.get(to).set(from, weight); // For undirected graph, add the reverse edge
        }
    }

    // Get the connections/edges of a vertex with their weights
    getEdgesWithWeights(name) {
        return this.vertices.get(name);
    }

    // Helper function to get the vertex with the minimum distance
    minDistanceVertex(distances, visited) {
        let min = Infinity;
        let minVertex = null;

        for (const [vertex, distance] of distances.entries()) {
            if (distance < min && !visited.has(vertex)) {
                min = distance;
                minVertex = vertex;
            }
        }

        return minVertex;
    }

    // Dijkstra's algorithm to find the shortest path between two vertices

    // why like got error of 0.1
    shortestPath(start, end) {
        const distances = new Map(); // Map to store distances from start vertex
        const visited = new Set(); // Set to track visited vertices

        // Initialize distances with Infinity except for the start vertex (0)
        for (const vertex of this.vertices.keys()) {
            distances.set(vertex, vertex === start ? 0 : Infinity);
        }

        while (visited.size < this.vertices.size) {
            const current = this.minDistanceVertex(distances, visited); // Get vertex with the minimum distance

            if (current === end || distances.get(current) === Infinity) {
                break; // Reached the end vertex or no path exists
            }

            visited.add(current);

            for (const [neighbor, weight] of this.vertices.get(current).entries()) {
                const alt = distances.get(current) + weight;
                if (alt < distances.get(neighbor)) {
                    distances.set(neighbor, alt);
                }
            }
        }

        return distances.get(end); // Return shortest distance to the end vertex
    }

    shortestPathWithDetails(start, end) {
        const distances = new Map(); // Map to store distances from start vertex
        const visited = new Set(); // Set to track visited vertices
        const previousVertices = new Map(); // Map to store the previous vertex for each vertex

        // Initialize distances with Infinity except for the start vertex (0)
        for (const vertex of this.vertices.keys()) {
            distances.set(vertex, vertex === start ? 0 : Infinity);
        }

        while (visited.size < this.vertices.size) {
            const current = this.minDistanceVertex(distances, visited); // Get vertex with the minimum distance

            if (current === end || distances.get(current) === Infinity) {
                break; // Reached the end vertex or no path exists
            }

            visited.add(current);

            for (const [neighbor, weight] of this.vertices.get(current).entries()) {
                const alt = distances.get(current) + weight;
                if (alt < distances.get(neighbor)) {
                    distances.set(neighbor, alt);
                    previousVertices.set(neighbor, current); // Update previous vertex for neighbor
                }
            }
        }

        // Print the path taken
        let path = [];
        let currentVertex = end;
        while (previousVertices.has(currentVertex)) {
            path.unshift(currentVertex);
            currentVertex = previousVertices.get(currentVertex);
        }
        if (path.length > 0) {
            path.unshift(start);
            console.log(`Shortest path from ${start} to ${end}: ${path.join(' -> ')}`);
        } else {
            console.log(`No path found from ${start} to ${end}`);
        }

        return distances.get(end); // Return shortest distance to the end vertex
    }
}


