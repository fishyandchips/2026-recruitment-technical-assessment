const request = require("supertest");

describe("Task 1", () => {
  describe("POST /parse", () => {
    const getTask1 = async (inputStr) => {
      return await request("http://localhost:8080")
        .post("/parse")
        .send({ input: inputStr });
    };

    it("example1", async () => {
      const response = await getTask1("Riz@z RISO00tto!");
      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual({ msg: "Rizz Risotto" });
    });

    it("example2", async () => {
      const response = await getTask1("alpHa-alFRedo");
      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual({ msg: "Alpha Alfredo" });
    });

    it("Empty string", async () => {
      const response = await getTask1("");
      expect(response.status).toBe(400);
    });

    it("Hyphens and underscores should be replaced with whitespaces and trimmed", async () => {
      const response = await getTask1("   -___-_- ");
      expect(response.status).toBe(400);
    });

    it("Removing characters that aren't letters or whitespaces", async () => {
      const response = await getTask1("#ell0_T0_-_y^u!");
      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual({ msg: "Ell T Yu" });
    });

    it("Numbers should be removed", async () => {
      const response = await getTask1("12345");
      expect(response.status).toBe(400);
    });

    it("Title case for words", async () => {
      const response = await getTask1("wOrD ONE-Word_tWO");
      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual({ msg: "Word One Word Two" });
    });

    it("Single-letter words", async () => {
      const response = await getTask1("a_b-C");
      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual({ msg: "A B C" });
    });

    it("Multiple whitespaces should become just one whitespace", async () => {
      const response = await getTask1("Long________White               Spaces------Now    One");
      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual({ msg: "Long White Spaces Now One" });
    });

    it("Leading and trailing whitespace is removed", async () => {
      const response = await getTask1("           Leading_-_-_-_Trailing--___--     ");
      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual({ msg: "Leading Trailing" });
    });

    it("Empty result string", async () => {
      const response = await getTask1(" ");
      expect(response.status).toBe(400);
    });

    it("Input string is already correctly formatted", async () => {
      const response = await getTask1("Input Is Correctly Formatted");
      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual({ msg: "Input Is Correctly Formatted" });
    });
  });
});

describe("Task 2", () => {
  describe("POST /entry", () => {
    beforeEach(async () => {
      await request("http://localhost:8080").post("/reset");
    });

    const putTask2 = async (data) => {
      return await request("http://localhost:8080").post("/entry").send(data);
    };

    it("Add ingredients", async () => {
      const entries = [
        { type: "ingredient", name: "Egg", cookTime: 6 },
        { type: "ingredient", name: "Lettuce", cookTime: 1 },
        { type: "ingredient", name: "Tomato", cookTime: 0 },
        { type: "ingredient", name: "Potato", cookTime: 2 },
      ];
      for (const entry of entries) {
        const resp = await putTask2(entry);
        expect(resp.status).toBe(200);
        expect(resp.body).toStrictEqual({});
      }
    });

    it("Add recipe", async () => {
      const resp = await putTask2({
        type: "recipe",
        name: "Meatball",
        requiredItems: [{ name: "Beef", quantity: 1 }]
      });
      expect(resp.status).toBe(200);
      expect(resp.body).toStrictEqual({});
    });

    it("Add recipe with multiple required items", async () => {
      const resp = await putTask2({
        type: "recipe",
        name: "Breakfast",
        requiredItems: [
          { name: "Omelette", quantity: 1 },
          { name: "Egg", quantity: 1 }
        ]
      });
      expect(resp.status).toBe(200);
      expect(resp.body).toStrictEqual({});
    });

    it("Invalid entry type", async () => {
      const resp = await putTask2({
        type: "pan",
        name: "pan",
        cookTime: 20,
      });
      expect(resp.status).toBe(400);
    });

    it("Ingredients with negative cook time", async () => {
      const resp = await putTask2({
        type: "ingredient",
        name: "beef",
        cookTime: -1,
      });
      expect(resp.status).toBe(400);
    });

    it("Duplicate entry names", async () => {
      const resp = await putTask2({
        type: "ingredient",
        name: "Beef",
        cookTime: 10,
      });
      expect(resp.status).toBe(200);
      expect(resp.body).toStrictEqual({});

      const resp2 = await putTask2({
        type: "ingredient",
        name: "Beef",
        cookTime: 8,
      });
      expect(resp2.status).toBe(400);

      const resp3 = await putTask2({
        type: "recipe",
        name: "Beef",
        cookTime: 8,
      });
      expect(resp3.status).toBe(400);
    });

    it("Recipe with duplicate requiredItems names", async () => {
      const resp = await putTask2({
        type: "recipe",
        name: "BadRecipe",
        requiredItems: [
          { name: "Egg", quantity: 1 },
          { name: "Egg", quantity: 2 }
        ]
      });
      expect(resp.status).toBe(400);
    });
  });
});

describe("Task 3", () => {
  describe("GET /summary", () => {
    beforeEach(async () => {
      await request("http://localhost:8080").post("/reset");
    });

    const postEntry = async (data) => {
      return await request("http://localhost:8080").post("/entry").send(data);
    };

    const getTask3 = async (name) => {
      return await request("http://localhost:8080").get(
        `/summary?name=${name}`
      );
    };

    it("Simple summary", async () => {
      const resp = await postEntry({
        type: "recipe",
        name: "Breakfast",
        requiredItems: [
          { name: "Omelette", quantity: 1 },
          { name: "Egg", quantity: 2 }
        ]
      });
      expect(resp.status).toBe(200);

      const resp2 = await postEntry({
        type: "ingredient",
        name: "Omelette",
        cookTime: 2,
      });
      expect(resp2.status).toBe(200);

      const resp3 = await postEntry({
        type: "ingredient",
        name: "Egg",
        cookTime: 4,
      });
      expect(resp3.status).toBe(200);

      const resp4 = await getTask3("Breakfast");
      expect(resp4.status).toBe(200);
      expect(resp4.body.name).toStrictEqual("Breakfast");
      expect(resp4.body.cookTime).toStrictEqual(10); // 1 omelette * 2 cookTime + 2 eggs * 4 cookTime
      expect(resp4.body.ingredients).toEqual(
        expect.arrayContaining([
          { name: "Omelette", quantity: 1 },
          { name: "Egg", quantity: 2 }
        ])
      );
      expect(resp4.body.ingredients).toHaveLength(2);
    });

    it("Complex summary", async () => {
      const entries = [
        {
          type: "recipe",
          name: "BreakfastCombo",
          requiredItems: [
            { name: "Omelette", quantity: 1 },
            { name: "Egg", quantity: 1 },
            { name: "Pizza", quantity: 1 },
            { name: "Sandwich", quantity: 2 },
          ]
        },
        {
          type: "recipe",
          name: "Pizza",
          requiredItems: [
            { name: "Bread", quantity: 1 },
            { name: "Tomato Base", quantity: 1 },
            { name: "Cheese", quantity: 4 },
          ]
        },
        {
          type: "recipe",
          name: "Sandwich",
          requiredItems: [
            { name: "Bread", quantity: 2 },
            { name: "Egg", quantity: 1 },
            { name: "Bacon", quantity: 2 }
          ]
        },
        {
          type: "recipe",
          name: "Cheese",
          requiredItems: [
            { name: "Milk", quantity: 1 },
          ]
        },
        { type: "ingredient", name: "Omelette", cookTime: 2 },
        { type: "ingredient", name: "Bread", cookTime: 3 },
        { type: "ingredient", name: "Tomato Base", cookTime: 0 },
        { type: "ingredient", name: "Milk", cookTime: 1 },
        { type: "ingredient", name: "Egg", cookTime: 4 },
        { type: "ingredient", name: "Bacon", cookTime: 1 },
      ];
      for (const entry of entries) {
        const resp = await postEntry(entry);
        expect(resp.status).toBe(200);
      }

      const resp = await getTask3("BreakfastCombo");
      expect(resp.status).toBe(200);
      expect(resp.body.name).toStrictEqual("BreakfastCombo");
      // 1 omelette = 2 cookTime
      // 1 egg = 4 cookTime
      // 1 pizza = 1 bread (3 cookTime) + 1 tomato base (0 cookTime) + 4 cheese (4 cookTime) = 7 cookTime
      // 2 sandwiches = 4 bread (12 cookTime) + 2 eggs (8 cookTime) + 4 bacon (4 cookTime) = 24 cookTime
      expect(resp.body.cookTime).toStrictEqual(37);
      expect(resp.body.ingredients).toEqual(
        expect.arrayContaining([
          { name: "Omelette", quantity: 1 },
          { name: "Bread", quantity: 5 },
          { name: "Tomato Base", quantity: 1 },
          { name: "Milk", quantity: 4 },
          { name: "Egg", quantity: 3 },
          { name: "Bacon", quantity: 4 },
        ])
      );
      expect(resp.body.ingredients).toHaveLength(6);
    });

    it("Empty cookbook", async () => {
      const resp = await getTask3("nothing");
      expect(resp.status).toBe(400);
    });

    it("No entry with corresponding name found", async () => {
      const resp = await postEntry({
        type: "recipe",
        name: "eggs",
        requiredItems: [],
      });
      expect(resp.status).toBe(200);

      const resp2 = await getTask3("EGGS");
      expect(resp2.status).toBe(400);
    });

    it("Searched name is not a recipe name", async () => {
      const resp = await postEntry({
        type: "ingredient",
        name: "beef",
        cookTime: 2,
      });
      expect(resp.status).toBe(200);

      const resp2 = await getTask3("beef");
      expect(resp2.status).toBe(400);
    });

    it("Recipe contains recipes/ingredients not in the cookbook", async () => {
      const cheese = {
        type: "recipe",
        name: "Cheese",
        requiredItems: [{ name: "Not Real", quantity: 1 }],
      };
      const resp1 = await postEntry(cheese);
      expect(resp1.status).toBe(200);

      const resp2 = await getTask3("Cheese");
      expect(resp2.status).toBe(400);
    });
  });
});
