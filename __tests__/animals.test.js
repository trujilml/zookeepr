jest.mock('fs');
const fs = require("fs");
const {filterByQuery, 
       findById, 
       createNewAnimal, 
       validateAnimal,
       } = require("../lib/animals.js");
const { animals } = require("../data/animals");

test("creates an animal", () => {
    const animal = createNewAnimal( {
        name: "George", id: "23434bbd" },
        animals
    );

    expect(animal.name).toBe("George");
    expect(animal.id).toBe("23434bbd");
});

test("filters by query", () => {
     const startingAnimals = [
        {
            id: "3",
            name: "Tobias",
            species: "giraffe",
            diet: "herbivore",
            personalityTraits: ["friendly", "rash"],
        },
        {
            id: "4",
            name: "James",
            species: "gorilla",
            diet: "omnivore",
            personalityTraits: ["hungry", "brave"],
        },
     ];

     const updatedAnimals = filterByQuery({ species: "giraffe"}, startingAnimals);

     expect(updatedAnimals.length).toEqual(1);
});

test("finds by id", () => {
    const startingAnimals = [
        {
            id: "3",
            name: "Tobias",
            species: "giraffe",
            diet: "herbivore",
            personalityTraits: ["friendly", "rash"],
        },
        {
            id: "4",
            name: "James",
            species: "gorilla",
            diet: "omnivore",
            personalityTraits: ["hungry", "brave"],
        },
     ];

     const result = findById("3", startingAnimals);

     expect(result.name).toBe("Tobias");
});

test("validates personality traits", () => {
    const animal = {
        id: "3",
        name: "Tobias",
        species: "giraffe",
        diet: "herbivore",
        personalityTraits: ["friendly", "rash"],
    };

    const invalidAnimal = {
        id: "3",
        name: "Tobias",
        species: "giraffe",
        diet: "herbivore",
    };

    const result = validateAnimal(animal);
    const result2 = validateAnimal(invalidAnimal);

    expect(result).toBe(true);
    expect(result2).toBe(false);
});