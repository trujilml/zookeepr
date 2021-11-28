jest.mock("fs");
const fs = require("fs");
const {filterByQuery, 
       findById, 
       createNewZookeeper, 
       validateZookeeper,
       } = require("../lib/zookeepers.js");
const { zookeepers } = require("../data/zookeepers");
const { hasUncaughtExceptionCaptureCallback } = require("process");


test("creates a zookeeper", () => {
    const zookeeper = createNewZookeeper(
        {name: "Jane", id: "tarzan1998"},
        zookeepers
    );

    expect(zookeeper.name).toBe("Jane");
    expect(zookeeper.id).toBe("tarzan1998");
});

test("filters by query", () => {
    const startingZookeepers = [
        {
            id: "3",
            name: "Tobias",
            age: 24,
            favoriteAnimal: "jaguar",
        },
        {
            id: "4",
            name: "Candace",
            age: 32,
            favoriteAnimal: "playtpus",
        },
    ];

    const updatedZookeepers = filterByQuery({ age: 24 }, startingZookeepers);

    expect(updatedZookeepers.length).toEqual(1);
});

test("find by id", () => {
    const startingZookeepers = [
        {
            id: "3",
            name: "Tobias",
            age: 24,
            favoriteAnimal: "jaguar",
        },
        {
            id: "4",
            name: "Candace",
            age: 32,
            favoriteAnimal: "playtpus",
        },
    ];

    const result = findById("3", startingZookeepers);
    expect(result.name).toBe("Tobias");
});

test("validates age", () => {
    const zookeeper = {
            id: "3",
            name: "Tobias",
            age: 24,
            favoriteAnimal: "jaguar",
        };
    
    const invalidateZookeeper = {
            id: "4",
            name: "Candace",
            age: "32",
            favoriteAnimal: "playtpus",
        };

        const result = validateZookeeper(zookeeper);
        const result2 = validateZookeeper(invalidateZookeeper);

        expect(result).toBe(true);
        expect(result2).toBe(false);
});
