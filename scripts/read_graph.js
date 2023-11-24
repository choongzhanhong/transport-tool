console.log("yo");

// Consider if I want to create a Station class with ID also.
const uniqueStationNames = [
        ...new Set(jsonData.flatMap(edge => [edge.station1, edge.station2])
    )];
console.log(uniqueStationNames);

jsonData.forEach(station => {
    console.log(station.station1); // Accessing each station's name
    console.log(station.id1); // Accessing each station's name
});

// Create a new graph
const graph = new Graph();

function convertKilometersToMeters(kilometers) {
    // Parse kilometers as float and multiply by 1000 to get meters, then convert to integer
    return parseInt(parseFloat(kilometers) * 1000);
}

jsonData.forEach(connection => {
    const station1 = connection.station1;
    const station2 = connection.station2;
    const distance = convertKilometersToMeters(connection.distance);

    // Add vertices if not already added
    graph.addVertex(station1);
    graph.addVertex(station2);

    // Add edges between stations with their weights
    graph.addEdge(station1, station2, distance);
});

console.log(graph);

// Example: Find the shortest distance between two vertices
const shortestDistance = graph.shortestPath('City Hall', 'Bukit Batok');
console.log(shortestDistance); // Output the shortest distance

const shortestDistanceWithDetails = graph.shortestPathWithDetails('Bukit Batok', 'Choa Chu Kang');
console.log(shortestDistanceWithDetails); // Output the shortest distance