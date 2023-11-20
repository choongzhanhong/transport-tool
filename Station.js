class Station {
  /**
   * Creates a Station node in the train network.
   * @param {string} name - The name of the station.
   */
  constructor(name) {
    /**
     * The name of the station.
     * @type {string}
     */
    this.name = name;

    /**
     * Array of neighboring stations.
     * @type {Station[]}
     */
    this.neighborStations = [];

    /**
     * Array of distances to neighboring stations.
     * @type {number[]}
     */
    this.distances = [];

    /**
     * Neighboring stations with their corresponding distances.
     * @type {Object.<string, number>}
     */
    this.neighborsWithDistance = {};
  }

  /**
   * Adds a neighboring station with the distance to it.
   * @param {Station} station - The neighboring station.
   * @param {number} distance - The distance to the neighboring station.
   */
  addNeighbor(station, distance) {
    this.neighborStations.push(station);
    this.distances.push(distance);
    this.neighborsWithDistance[station.name] = distance;
  }

  /**
   * Retrieves an array of neighboring stations.
   * @returns {Station[]} An array of neighboring stations.
   */
  getNeighbors() {
    return this.neighborStations;
  }

  /**
   * Retrieves the distance to a neighboring station at a specified index.
   * @param {number} index - The index of the neighboring station.
   * @returns {number} The distance to the neighboring station at the specified index.
   */
  getDistanceToNeighbor(index) {
    return this.distances[index];
  }

  /**
   * Prints each neighbor and its corresponding distance.
   */
  printNeighbors() {
    console.log(`Neighbors of Station ${this.name}:`);
    this.neighborStations.forEach((neighbor, index) => {
      console.log(`   ${neighbor.name} - Distance: ${this.distances[index]} km`);
    });
  }
}
