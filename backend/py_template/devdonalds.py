from dataclasses import dataclass
from typing import List, Dict, Union
from flask import Flask, request, jsonify
import re

# ==== Type Definitions, feel free to add or modify ===========================
@dataclass
class CookbookEntry:
	name: str

@dataclass
class RequiredItem():
	name: str
	quantity: int

@dataclass
class Recipe(CookbookEntry):
	required_items: List[RequiredItem]

@dataclass
class Ingredient(CookbookEntry):
	cook_time: int


# =============================================================================
# ==== HTTP Endpoint Stubs ====================================================
# =============================================================================
app = Flask(__name__)

# Store your recipes here!
cookbook = {}

# Task 1 helper (don't touch)
@app.route("/parse", methods=['POST'])
def parse():
	data = request.get_json()
	recipe_name = data.get('input', '')
	parsed_name = parse_handwriting(recipe_name)
	if parsed_name is None:
		return 'Invalid recipe name', 400
	return jsonify({'msg': parsed_name}), 200

# [TASK 1] ====================================================================
# Takes in a recipeName and returns it in a form that 
def parse_handwriting(recipeName: str) -> Union[str | None]:
	recipeName = recipeName.replace("-", " ").replace("_", " ")
	recipeName = re.sub(r'[^a-zA-Z ]+', "", recipeName)
	recipeName = re.sub(r'\s+', " ", recipeName)
	recipeName = recipeName.strip()

	return recipeName.title() if len(recipeName) > 0 else None


# [TASK 2] ====================================================================
# Endpoint that adds a CookbookEntry to your magical cookbook
@app.route('/entry', methods=['POST'])
def create_entry():
	data = request.json
	entryType, name, requiredItems, cookTime = (
		data.get("type"),
		data.get("name"),
		data.get("requiredItems"),
		data.get("cookTime"),
	)

	if entryType not in ["recipe", "ingredient"]:
		return "Type can only be recipe or ingredient.", 400

	if entryType == "ingredient" and cookTime < 0:
		return "cookTime can only be greater than or equal to 0.", 400
	
	if name in cookbook:
		return "Entry names must be unique.", 400

	if entryType == "recipe":
		requiredSet = set()
		for item in requiredItems:
			requiredSet.add(item.get("name"))

		if len(requiredSet) != len(requiredItems):
			return "Recipe requiredItems can only have one element per name.", 400

	cookbook[name] = data
	return {}, 200


# [TASK 3] ====================================================================
# Endpoint that returns a summary of a recipe that corresponds to a query name
@app.route('/summary', methods=['GET'])
def summary():
	name = request.args.get("name")

	if name not in cookbook:
		return "A recipe with the corresponding name cannot be found.", 400

	entry = cookbook[name]

	if entry.get("type") != "recipe":
		return "The searched name is NOT a recipe name (ie. an ingredient).", 400

	def dfs(entry, multiplier=1):
		totalCookTime = 0
		totalIngredients = {}

		for requiredItem in entry.get("requiredItems"):
			itemName = requiredItem.get("name")
			quantity = requiredItem.get("quantity")

			if itemName not in cookbook:
				raise ValueError("The recipe contains recipes or ingredients that aren't in the cookbook.")

			item = cookbook[itemName]
			qty = quantity * multiplier

			if item.get("type") == "ingredient":
				totalCookTime += item.get("cookTime") * qty

				if itemName in totalIngredients:
					totalIngredients[itemName]["quantity"] += qty
				else:
					totalIngredients[itemName] = {"name": itemName, "quantity": qty}
			else:
				cookTime, ingredients = dfs(item, qty)

				totalCookTime += cookTime

				for ingredientName, ingredientData in ingredients.items():
					if ingredientName in totalIngredients:
							totalIngredients[ingredientName]["quantity"] += ingredientData["quantity"]
					else:
							totalIngredients[ingredientName] = ingredientData.copy()

		return totalCookTime, totalIngredients

	try:
		cookTime, ingredients = dfs(entry)
		return jsonify({
			"name": name,
			"cookTime": cookTime,
			"ingredients": list(ingredients.values())
		}), 200
	except ValueError as e:
		return str(e), 400

@app.route('/reset', methods=['POST'])
def reset():
	cookbook.clear()
	return {}, 200

# =============================================================================
# ==== DO NOT TOUCH ===========================================================
# =============================================================================

if __name__ == '__main__':
	app.run(debug=True, port=8080)
