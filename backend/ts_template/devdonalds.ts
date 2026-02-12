import express, { Request, Response } from "express";

// ==== Type Definitions, feel free to add or modify ==========================
interface cookbookEntry {
  name: string;
  type: string;
}

interface requiredItem {
  name: string;
  quantity: number;
}

interface recipe extends cookbookEntry {
  requiredItems: requiredItem[];
}

interface ingredient extends cookbookEntry {
  cookTime: number;
}

// =============================================================================
// ==== HTTP Endpoint Stubs ====================================================
// =============================================================================
const app = express();
app.use(express.json());

// Store your recipes here!
const cookbook: Map<string, cookbookEntry> = new Map();

// Task 1 helper (don't touch)
app.post("/parse", (req:Request, res:Response) => {
  const { input } = req.body;

  const parsed_string = parse_handwriting(input)
  if (parsed_string == null) {
    res.status(400).send("this string is cooked");
    return;
  } 
  res.json({ msg: parsed_string });
  return;
  
});

// [TASK 1] ====================================================================
// Takes in a recipeName and returns it in a form that 
const parse_handwriting = (recipeName: string): string | null => {
  recipeName = recipeName
    .replace(/[-_]/g, " ")
    .replace(/[^a-zA-Z ]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  return recipeName.length > 0 ? recipeName : null;
}

// [TASK 2] ====================================================================
// Endpoint that adds a CookbookEntry to your magical cookbook
app.post("/entry", (req:Request, res:Response) => {
  const { type, name, requiredItems, cookTime } = req.body;

  if (type !== "recipe" && type !== "ingredient") {
    return res.status(400).send({ error: "Type can only be recipe or ingredient." });
  }

  if (type === "ingredient" && cookTime < 0) {
    return res.status(400).send({ error: "cookTime can only be greater than or equal to 0." })
  }

  if (cookbook.has(name)) {
    return res.status(400).send({ error: "Entry names must be unique." });
  }

  if (type === "recipe") {
    const requiredSet = new Set();
    for (const r of requiredItems) {
      requiredSet.add(r.name);
    }

    if (requiredSet.size !== requiredItems.length) {
      return res.status(400).send({ error: "Recipe requiredItems can only have one element per name." });
    }
  }

  cookbook.set(name, req.body);
  return res.status(200).send({});
});

// [TASK 3] ====================================================================
// Endpoint that returns a summary of a recipe that corresponds to a query name
app.get("/summary", (req:Request, res:Response) => {
  const { name } = req.query;

  if (!cookbook.has(name)) {
    return res.status(400).send({ error: "A recipe with the corresponding name cannot be found." });
  }

  const entry = cookbook.get(name);

  if (entry.type !== "recipe") {
    return res.status(400).send({ error: "The searched name is NOT a recipe name (ie. an ingredient)." });
  }

  const dfs = (entry: recipe, multiplier: number = 1) => {
    let totalCookTime = 0;
    const totalIngredients = new Map();

    for (const requiredItem of entry.requiredItems) {
      const { name: itemName, quantity } = requiredItem;

      if (!cookbook.has(itemName)) {
        throw new Error("The recipe contains recipes or ingredients that aren't in the cookbook.");
      }

      const item = cookbook.get(itemName);
      const qty = quantity * multiplier;

      if (item.type === "ingredient") {
        totalCookTime += (item as ingredient).cookTime * qty;

        if (totalIngredients.has(itemName)) {
          totalIngredients.get(itemName).quantity += qty;
        } else {
          totalIngredients.set(itemName, { name: itemName, quantity: qty });
        }
      } else {
        const { cookTime, ingredients } = dfs(item as recipe, qty);

        totalCookTime += cookTime;

        for (const ingredient of ingredients.values()) {
          if (totalIngredients.has(ingredient.name)) {
            totalIngredients.get(ingredient.name).quantity += ingredient.quantity;
          } else {
            totalIngredients.set(ingredient.name, { ...ingredient });
          }
        }
      }
    }

    return { cookTime: totalCookTime, ingredients: totalIngredients };
  }

  try {
    const { cookTime, ingredients } = dfs(entry as recipe);
    return res.status(200).send({
      name,
      cookTime,
      ingredients: Array.from(ingredients.values())
    });
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
});

app.post("/reset", (req, res) => {
  cookbook.clear();
  res.status(200).send({});
});

// =============================================================================
// ==== DO NOT TOUCH ===========================================================
// =============================================================================
const port = 8080;
app.listen(port, () => {
  console.log(`Running on: http://127.0.0.1:8080`);
});
