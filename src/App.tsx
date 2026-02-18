import { useState } from "react";

type Recipe = {
  id: number;
  name: string;
  category: string;
  tags: string[];
  ingredients: string;
  instructions: string;
  notes?: string; // ✅ add this (optional)
};


const sampleRecipes: Recipe[] = [
  {
    id: 1,
    name: "GF Lemon Chicken",
    category: "Grill",
    tags: ["GF"],
    ingredients: "Chicken breast, lemon, olive oil, garlic",
    instructions: "Season chicken. Grill to 165°F. Finish with lemon."
  },{
  id: 3,
  name: "Caesar Dressing",
  category: "Pantry",
  tags: ["Egg", "Fish", "Dairy", "Cold Hold", "Make Ahead"],
  ingredients: `- 1 qt red wine vinegar
- 3/4 cup chopped garlic',
- 14 oz anchovies
- 1/2 cup sugar
- 1/4 cup salt
- 1 cup cracked black pepper
- 1 cup Dijon mustard
- 5 oz Worcestershire sauce
- 30 whole eggs
- 1.5 cups lemon juice
- 2 gallons salad oil
- 1/2 gallon olive oil`,
  instructions: `1) Combine vinegar, garlic, anchovies, sugar, salt, pepper, Dijon, Worcestershire, eggs, and lemon juice.
2) Blend until smooth.
3) Slowly stream in salad oil and olive oil while blending to emulsify.
4) Continue blending until fully emulsified and thick.
5) Hold refrigerated.`
},
{
  id: 4,
  name: "Red Wine Vinaigrette",
  category: "Pantry",
  tags: ["Vegan", "Gluten Free", "Cold Hold", "Make Ahead"],
  ingredients: `- 1 cup sherry vinegar
- 3 cups red wine vinegar
- 1/3 cup chopped garlic
- 1/3 cup chopped shallots
- 2.5 tbsp cracked black pepper
- 3 tbsp sugar
- 1 tsp Coleman's mustard powder
- 1/4 tsp curry powder
- 3 tbsp lemon juice
- 2.5 tbsp salt
- 3/4 cup Grey Poupon
- 3 cups olive oil
- 7.5 cups vegetable oil`,
  instructions: `1) Combine vinegars, garlic, shallots, pepper, sugar, mustard powder, curry powder, lemon juice, salt, and Dijon.
2) Blend until smooth.
3) Slowly stream in olive oil and vegetable oil while blending to emulsify.
4) Blend until fully incorporated.
5) Hold refrigerated.`
},
{
  id: 5,
  name: "Bang Bang Sauce",
  category: "Sauces",
  tags: ["Egg", "Fish", "Gluten Free", "Cold Hold", "Make Ahead"],
  ingredients: `- 1 gallon Kewpie mayo
- 1/2 gallon sweet chili sauce
- 1 cup sriracha
- 1/2 cup rice wine vinegar
- 6 tbsp Szechuan chili flakes
- 1 cup fish sauce
- 2 tbsp paprika
- 2 tbsp Chinese five spice`,
  instructions: `1) Combine all ingredients in large mixing vessel.
2) Mix thoroughly until fully incorporated.
3) Chill before service.
4) Hold refrigerated.`
},{
  id: 6,
  name: "Adam's Beer Batter",
  category: "Fryer",
  tags: ["Egg", "Gluten", "Vegetarian", "A La Minute"],
  ingredients: `- 8 cups flour
- 8 cups rice flour
- 1/4 cup onion powder
- 1/4 cup garlic powder
- 8 egg yolks
- 1/4 cup salt
- 2 tbsp paprika
- Beer (preferably Kona Hawaiian or similar) — as needed for consistency`,
  instructions: `1) Combine flour, rice flour, onion powder, garlic powder, salt, and paprika.
2) Whisk in egg yolks.
3) Slowly add beer while mixing until desired batter consistency is reached.
4) Use immediately for frying.
5) Hold refrigerated if batching; whisk before use.`
},
{
  id: 7,
  name: "Chicken Wing Rub",
  category: "Fryer",
  tags: ["Gluten Free", "Make Ahead", "Par Fry", "Hot Hold"],
  ingredients: `FOR 1/4 CASE:
- 2 tbsp ground mustard
- 2 tbsp onion powder
- 2 tbsp garlic powder
- 1/4 cup White Magic

FOR 1 FULL CASE:
- 1/2 cup ground mustard
- 1/2 cup onion powder
- 1/2 cup garlic powder
- 1 cup White Magic`,
  instructions: `1) Toss wings evenly with seasoning.
2) Par fry at 325–350°F until cooked through and lightly set.
3) Cool on racks.
4) Hold refrigerated until service.
5) Finish fry at 375°F until crispy and hot.
6) Toss or sauce as needed for service.`
},
{
  id: 8,
  name: "Honey Mustard",
  category: "Sauces",
  tags: ["Egg", "Gluten Free", "Cold Hold", "Make Ahead"],
  ingredients: `- 1 3/4 gallon mayonnaise
- 1/2 gallon yellow mustard
- 3 1/2 cups honey`,
  instructions: `1) Combine mayonnaise, yellow mustard, and honey in large mixing bowl.
2) Mix thoroughly until fully incorporated and smooth.
3) Chill before service.
4) Hold refrigerated.`
},
{
  id: 9,
  name: "Lemon Ricotta Pancakes (Quarter Batch)",
  category: "Pantry",
  tags: ["Egg", "Dairy", "Vegetarian", "Brunch", "A La Minute"],
  ingredients: `- 3 eggs
- 1 quart whole milk
- 1 1/4 cups buttermilk
- 2 1/4 cups ricotta cheese
- 4 oz (1 stick) melted butter
- 1 1/4 quarts AP flour (~5 cups)
- 32–33 g baking powder (~2 tbsp + 1 tsp)
- 3/8 cup sugar (~6 tbsp)
- 1 1/2 tsp kosher salt
- 1 tbsp + 1/8 tsp vanilla extract
- Zest of 3 lemons`,
  instructions: `1) Sift all dry ingredients together.
2) In separate bowl, combine all wet ingredients.
3) Fold wet ingredients into dry ingredients until just combined.
4) Let batter rest to allow dry ingredients to hydrate.
5) Cook on preheated griddle until golden brown and set.`
},
{
  id: 10,
  name: "Lobster Mayo",
  category: "Sauces",
  tags: ["Egg", "Fish", "Soy", "Gluten", "Cold Hold", "Make Ahead"],
  ingredients: `- 3 quarts mayonnaise
- 1 bottle sweet chili sauce
- 1/2 cup sriracha
- 1/4 cup fish sauce
- 1/4 cup soy sauce
- 1 bundle cilantro (stems minced, leaves rough chopped)
- 1/4 cup chopped mint`,
  instructions: `1) Combine mayonnaise, sweet chili, sriracha, fish sauce, and soy sauce.
2) Fold in minced cilantro stems and chopped leaves.
3) Add chopped mint and mix thoroughly.
4) Transfer to container, label, and date.
5) Hold refrigerated.`
},
{
  id: 11,
  name: "Maple Aioli",
  category: "Sauces",
  tags: ["Egg", "Gluten Free", "Cold Hold", "Make Ahead"],
  ingredients: `- 6 cups mayonnaise
- 2 cups maple syrup
- 1/4 cup sriracha + 2 tbsp`,
  instructions: `1) Combine mayonnaise, maple syrup, and sriracha.
2) Mix until fully incorporated and smooth.
3) Adjust seasoning to taste.
4) Transfer to container, label and date.
5) Hold refrigerated.`
},
{
  id: 12,
  name: "Mirepoix (70 lb Short Rib Case)",
  category: "Banquet",
  tags: ["Gluten Free", "Vegan", "Prep Base", "Braised"],
  ingredients: `- 9 lb onions, cleaned and sliced on equator
- 4.5 lb carrots, peeled and left whole
- 4.5 lb celery, cleaned and left whole`,
  instructions: `1) Clean and prep vegetables as specified.
2) Use as braising base for one 70 lb case of short ribs.
3) Spread evenly in bottom of roasting pans or braising vessel.
4) Place short ribs over mirepoix and proceed with braise.`
},
{
  id: 13,
  name: "Miso Glaze",
  category: "Sauces",
  tags: ["Soy", "Sesame", "Gluten Free", "Make Ahead", "Hot Application"],
  ingredients: `- 1 cup mirin
- 1 cup sake
- 6 oz miso paste
- 4 tbsp sugar
- 3 tbsp sesame oil
- 1 tbsp minced ginger
- 1 tbsp minced garlic
- 1 tbsp minced shallot`,
  instructions: `1) Sweat ginger, garlic, and shallot until aromatic.
2) Add mirin, sake, sugar, and miso paste.
3) Bring to a simmer and reduce until lightly syrupy.
4) Remove from heat and stir in sesame oil.
5) Blend until smooth if needed.
6) Chill and hold refrigerated.`
},
{
  id: 14,
  name: "Miso-Honey Chili Aioli",
  category: "Sauces",
  tags: ["Egg", "Soy", "Sesame", "Gluten", "Cold Hold", "Make Ahead"],
  ingredients: `- 2 cups Kewpie mayo
- 2 tbsp white miso paste (Shiro miso)
- 1 1/2 tbsp honey
- 2 tsp rice vinegar
- 1 tsp toasted sesame oil
- 1/2–1 tsp gochujang
- 1/2 tsp soy sauce
- Dash of yuzu juice`,
  instructions: `1) Combine all ingredients in mixing bowl.
2) Whisk until fully smooth and incorporated.
3) Adjust heat level with additional gochujang if desired.
4) Chill before service.
5) Hold refrigerated.`
},
{
  id: 15,
  name: "Neutral Tuile Batter (Savory / Plain)",
  category: "Pantry",
  tags: ["Vegetarian", "Contains Gluten", "Plating Component", "Bake"],
  ingredients: `- 100 g all-purpose flour
- 100 g water
- 100 g neutral oil (grapeseed or canola)
- 1 g salt (adjust based on use)

Optional additions:
- Food coloring
- Fresh herbs
- Squid ink
- Beet juice
- Other flavor infusions`,
  instructions: `1) Whisk all ingredients until fully smooth with no lumps.
2) Rest batter at least 30 minutes to hydrate flour and allow bubbles to settle.
3) Spoon or spread into silicone molds (leaf, coral, lace, etc.).
4) Bake at 300–325°F (150–160°C) for 8–12 minutes until dry, lightly golden, and crisp.
5) Cool completely before removing from molds.
6) For extra crisp texture, substitute a small percentage of flour with rice flour or cornstarch.`
},
{
  id: 16,
  name: "Nut Ragu",
  category: "Sauces",
  tags: ["Contains Nuts", "Vegan", "Gluten Free", "Oven Braised", "Make Ahead"],
  ingredients: `- 1/2 cup raw almonds
- 1/2 cup raw cashews
- 1/2 cup raw hazelnuts
- 1/2 cup raw pistachios
- 1/2 cup raw walnuts
- 1/2 cup olive oil
- 40 garlic cloves, smashed
- 1/2 tsp finely chopped fresh rosemary
- 1/2 tsp finely chopped fresh thyme
- 1/4 tsp freshly ground black pepper
- 1/8 tsp dried chile flakes
- Kosher salt
- 1.5 tbsp tomato paste
- 2.5 cups canned whole peeled tomatoes, crushed by hand with juices`,
  instructions: `1) Chop nuts with chef’s knife until fairly fine with varied texture (not powdery).
2) Heat oven to 300°F.
3) Heat olive oil in heavy-bottom pan.
4) Add garlic and cook gently 4–5 minutes until softened, do not brown.
5) Add chopped nuts and cook gently, stirring frequently, until lightly toasted and fragrant (3–5 minutes).
6) Add rosemary, thyme, pepper, chile flakes, and 1 tsp kosher salt.
7) Add tomato paste and cook until slightly darkened, stirring to coat nuts evenly.
8) Add crushed tomatoes and juices; stir to combine.
9) Bring to simmer 2–3 minutes.
10) Cover and transfer to oven.
11) Cook 1.5–2 hours until nuts are very soft and sauce is concentrated and integrated.
12) Stir occasionally and add water if sauce begins to dry out.`
},
{
  id: 17,
  name: "Onion Jam (Banquet Batch – 4 Cup Yield)",
  category: "Banquet",
  tags: ["Vegetarian", "Gluten Free", "Make Ahead", "Cold Hold", "Banquet"],
  ingredients: `- 6 lb onions (yellow + red mix), thinly sliced
- 4 tbsp olive oil
- 4 tbsp butter
- 2 tsp kosher salt
- 1 tsp black pepper
- 4 cloves garlic, minced
- 1/2 cup brown sugar OR 6 tbsp honey
- 1 cup sherry vinegar
- 1 cup red wine
- 2 tbsp balsamic vinegar (finish)
- 2–3 sprigs thyme`,
  instructions: `1) Heat olive oil and butter in large rondeau.
2) Add onions, salt, and pepper. Cover and cook 10 minutes to soften.
3) Uncover and caramelize low and slow 35–45 minutes until deep brown and jammy.
4) Add garlic and cook 1 minute.
5) Add brown sugar (or honey), sherry vinegar, and red wine.
6) Reduce 15–20 minutes until thick and glossy.
7) Finish with balsamic vinegar and thyme. Adjust seasoning.
8) Cool completely.
9) Store refrigerated up to 1 week or freeze.`
},
{
  id: 18,
  name: "Oreo Cookies (Chocolate Wafer)",
  category: "Pastry",
  tags: ["Vegetarian", "Contains Gluten", "Dairy", "Bake", "Dessert"],
  ingredients: `- 4 oz unsalted butter
- 1/2 cup sugar
- 4 tbsp light corn syrup
- 1/2 tsp baking soda
- 1/4 tsp kosher salt
- 1/4 tsp coconut extract
- 1 1/4 cups all-purpose flour
- 1/3 cup + 1 tbsp cocoa powder`,
  instructions: `1) Combine butter, sugar, corn syrup, baking soda, salt, and coconut extract in stand mixer fitted with paddle.
2) Mix on low to moisten, then increase to medium and beat until light and fluffy (about 5 minutes), scraping bowl halfway through.
3) Sift flour and cocoa powder together.
4) Add dry ingredients to butter mixture while mixing on low.
5) Mix until dough forms; it will appear dry at first, then come together into stiff dough.
6) Proceed with shaping and baking as needed.`
},
{
  id: 20,
  name: "Peanut Butter Chocolate Eggs (Banquet Batch – 70–90 Yield)",
  category: "Banquet",
  tags: ["Contains Nuts", "Dairy", "Vegetarian", "Dessert", "Banquet"],
  ingredients: `- 30 tbsp (1 lb + 14 tbsp) unsalted butter, softened
- 5 cups creamy peanut butter (not natural style)
- 12 1/2 cups confectioners' sugar
- 2 1/2 tsp vanilla extract
- 5/8 tsp salt
- 60 oz semi-sweet chocolate (3 lb 12 oz), chopped
- 5 tsp vegetable oil
- Optional: coarse or flaky sea salt`,
  instructions: `1) Line sheet trays with parchment.
2) Beat butter until smooth and creamy.
3) Add peanut butter and mix until combined.
4) Add confectioners' sugar, vanilla, and salt; mix on low until fully incorporated.
5) Portion 1.5 tbsp (approx 1 oz) per egg and shape into egg form (~3/4 inch thick).
6) Chill at least 1 hour (or up to 1 day).
7) Melt chocolate with oil until smooth; cool slightly before dipping.
8) Dip chilled eggs, tap off excess chocolate, and return to tray.
9) Chill until chocolate fully set (about 30 minutes).
10) Store refrigerated up to 2 weeks or freeze for longer storage.`
},
{
  id: 21,
  name: "Pistachio Pesto",
  category: "Sauces",
  tags: ["Contains Nuts", "Dairy", "Vegetarian", "Gluten Free", "Cold Hold", "Make Ahead"],
  ingredients: `- 4 cups tightly packed fresh basil (leaves and tender stems)
- 1/2 cup unsalted raw pistachios
- 1/4 cup extra virgin olive oil (plus more as needed)
- 1/4 cup grated Parmesan
- 2 garlic cloves
- Sea salt to taste`,
  instructions: `1) Place basil, pistachios, olive oil, Parmesan, and garlic in food processor.
2) Pulse until coarse but cohesive (not fully smooth).
3) Taste and season with sea salt.
4) Add additional olive oil as needed for desired loose consistency.
5) Hold refrigerated with thin layer of oil on top to prevent oxidation.`
},
{
  id: 22,
  name: "Pizza Poolish",
  category: "Pizza",
  tags: ["Contains Gluten", "Fermentation", "Prep Base", "Pizza Station"],
  ingredients: `- 1500 g water
- 1500 g flour
- 10 g yeast`,
  instructions: `1) Combine flour and yeast in mixing bowl.
2) Add water and mix until fully hydrated and no dry flour remains.
3) Cover loosely and ferment at room temperature until bubbly and doubled in size (typically 12–16 hours depending on ambient temperature).
4) Use as preferment for pizza dough.`
},
{
  id: 23,
  name: "Quiche Dough (Banquet Batch – ~4¼ Half-Sheet Pans)",
  category: "Banquet",
  tags: ["Contains Gluten", "Dairy", "Vegetarian", "Prep Base", "Bake"],
  ingredients: `- 37 1/2 oz all-purpose flour (~8 1/2 cups)
- 1 1/2 tsp kosher salt
- 31 1/2 oz cold grated butter (~4 cups)
- 1 cup ice water (adjust slightly as needed during mixing)`,
  instructions: `1) Sift flour and salt together.
2) Add cold grated butter and incorporate just until mixture resembles coarse crumbs.
3) Add ice water and mix just until dough comes together — do not overmix.
4) Rest dough before rolling and lining pans.
5) Roll, dock if needed, and line half-sheet pans as required for quiche production.`
},
{
  id: 24,
  name: "Rochester Chimichurri",
  category: "Saute",
  tags: ["Vegan", "Gluten Free", "Cold Hold", "Make Ahead", "Herb Sauce"],
  ingredients: `- 1 bunch parsley, leaves only
- 1 bunch cilantro, leaves and tender stems
- 1 garlic clove, smashed
- 1 jalapeño, deseeded and rough chopped
- 1/2 shallot, rough chopped
- 1/2 tsp crushed red pepper
- Olive oil (just enough to bind)
- Zest of 1 lime
- Splash of red wine vinegar
- Kosher salt and black pepper to taste`,
  instructions: `1) Combine parsley, cilantro, garlic, jalapeño, shallot, and crushed red pepper in food processor.
2) Pulse until finely chopped but still textured — do not puree.
3) Slowly drizzle in olive oil just until the herbs are lightly coated and spoonable. The sauce should remain herb-forward, not oil-heavy.
4) Season with salt, black pepper, lime zest, and a splash of red wine vinegar.
5) Adjust acidity and seasoning.
6) Hold refrigerated. Bring to room temperature before service.`
},
{
  id: 25,
  name: "Spicy Green Yogurt",
  category: "Sauces",
  tags: ["Dairy", "Vegetarian", "Gluten Free", "Cold Hold", "Make Ahead", "Herb Sauce"],
  ingredients: `- 1 cup olive oil
- 1 cup rough chopped cilantro (stems included)
- 1 cup rough chopped parsley (stems included)
- 10 garlic cloves, smashed
- 4 tsp ground cumin
- 2 tbsp ground coriander
- 2 tbsp lemon juice
- 2 tbsp kosher salt
- 2 jalapeños, deseeded and diced
- 2 cups yogurt`,
  instructions: `1) Place olive oil, cilantro, parsley, garlic, cumin, coriander, lemon juice, salt, and jalapeños into food processor.
2) Pulse until herbs are finely chopped but not fully puréed.
3) In separate bowl, whisk yogurt until smooth.
4) Fold herb mixture into yogurt and whisk until evenly combined.
5) Adjust salt and acidity as needed.
6) Hold refrigerated.`
},
{
  id: 26,
  name: "Steak Rub",
  category: "Grill",
  tags: ["Gluten Free", "Spice Blend", "Make Ahead", "Grill Station"],
  ingredients: `- 1/2 cup dried marjoram
- 1/2 cup dried tarragon
- 1/4 cup dried thyme
- 1 quart onion powder
- 3 cups garlic powder
- 1 cup curry powder
- 1 cup paprika
- 1 cup kosher salt
- 1 cup black pepper`,
  instructions: `1) Grind marjoram, tarragon, and thyme in spice grinder until fine.
2) Combine ground herbs with onion powder, garlic powder, curry powder, paprika, salt, and black pepper.
3) Mix thoroughly until evenly distributed.
4) Store in airtight container in dry storage.
5) Label and date.`
},
{
  id: 27,
  name: "Sushi Rice",
  category: "Pantry",
  tags: ["Gluten Free", "Make Ahead", "Prep Base", "Cold Hold"],
  ingredients: `- 4 cups sushi rice
- 4 1/2 cups water
- Salt to taste

Seasoning:
- 1/2 cup rice wine vinegar
- 1/4 cup + 1 1/2 tsp sugar
- Pinch of salt`,
  instructions: `1) Rinse rice until water runs clear.
2) Combine rice and water in steamer or rice cooker.
3) Steam/cook for approximately 20 minutes until tender.
4) While rice cooks, combine rice wine vinegar, sugar, and salt; stir until dissolved.
5) Transfer hot rice to wide bowl.
6) Gently fold in vinegar mixture using wooden spoon or paddle.
7) Allow rice to cool slightly before service.
8) Hold covered at room temperature for service; do not refrigerate.`
},
{
  id: 28,
  name: "Vegan Smash Burger",
  category: "Grill",
  tags: ["Vegan", "Gluten Free", "Vegetarian", "Make Ahead", "A La Minute"],
  ingredients: `- 2 cups cooked sushi rice
- 1 cup cooked red beans
- 1 diced tomato
- 1 minced jalapeño
- 1 tbsp minced garlic
- 1 tbsp minced shallot
- 1 cup minced mushrooms (cooked)
- 1 tbsp mirin
- 1 tbsp paprika
- 1 tbsp mushroom powder
- 1 tbsp balsamic vinegar
- 1 tbsp nutritional yeast
- 1 tbsp chickpea flour`,
  instructions: `1) While rice and beans are still warm, lightly blend or mash together — leave some texture.
2) Sauté mushrooms, garlic, and shallot until moisture is reduced; cool slightly.
3) Combine rice-bean mixture with cooked mushrooms and remaining ingredients.
4) Mix thoroughly until cohesive.
5) Portion using 2 oz scoop and form into balls.
6) Chill or freeze to firm.
7) Smash on hot flat top and cook until deeply caramelized and heated through.`
},
{
  id: 29,
  name: "Wasabi Mayo",
  category: "Sauces",
  tags: ["Egg", "Gluten Free", "Cold Hold", "Make Ahead"],
  ingredients: `- 4 tbsp wasabi powder
- 1 tbsp water
- 2 cups mayonnaise`,
  instructions: `1) Combine wasabi powder and water to form a smooth paste.
2) Let paste sit 1–2 minutes to fully hydrate and develop heat.
3) Fold wasabi paste into mayonnaise until fully incorporated.
4) Adjust heat level if needed.
5) Transfer to container, label and date.
6) Hold refrigerated.`
},
{
  id: 30,
  name: "White Magic",
  category: "Pantry",
  tags: ["Gluten Free", "Spice Blend", "Make Ahead", "Prep Base"],
  ingredients: `- 1 box kosher salt
- 1/4 cup white pepper`,
  instructions: `1) Combine kosher salt and white pepper.
2) Mix thoroughly until evenly distributed.
3) Store in airtight container.
4) Label and date.`
},
{
  id: 31,
  name: "Asian Meatballs (6 lb Yield)",
  category: "Banquet",
  tags: ["Contains Gluten", "Egg", "Soy", "Sesame", "Make Ahead", "Banquet"],
  ingredients: `- 6 lb ground pork (or 50/50 pork & beef)
- 1 1/4 cup panko breadcrumbs
- 4 large eggs
- 9 cloves garlic, minced
- 4 tbsp fresh ginger, grated
- 6 green onions, finely chopped
- 4 tbsp soy sauce
- 2 tbsp sesame oil
- 2 tbsp chili paste (sambal, gochujang, or sriracha)
- 2 1/2 tbsp brown sugar or honey
- 2 tsp kosher salt
- 1 1/4 tsp black pepper`,
  instructions: `1) Combine all ingredients in large mixing bowl.
2) Mix gently until evenly incorporated — do not overwork.
3) Portion into 1 oz balls.
4) Place on lined sheet trays.
5) Bake or roast until cooked through (internal temp 160–165°F).
6) Cool, label, and hold refrigerated or freeze for service.`
},
{
  id: 32,
  name: "Balsamic Vinaigrette (Banquet Batch)",
  category: "Banquet",
  tags: ["Contains Gluten", "Make Ahead", "Cold Hold", "Salad Station"],
  ingredients: `- 1/2 quart red onion, minced
- 1 bottle Worcestershire sauce
- 6 cups balsamic vinegar
- 1 cup lemon juice
- 12 oz rice wine vinegar
- 4 oz red wine vinegar
- 8 oz Dijon mustard
- 1 gallon olive oil
- 1 gallon salad oil
- 1/2 cup sugar
- 1/8 cup cracked black pepper
- 1/2 cup kosher salt`,
  instructions: `1) Combine red onion, Worcestershire, balsamic vinegar, lemon juice, rice wine vinegar, red wine vinegar, Dijon mustard, sugar, salt, and cracked pepper in large mixing vessel.
2) Blend until onions are well incorporated.
3) Slowly stream in olive oil and salad oil while blending to emulsify.
4) Blend until fully emulsified and smooth.
5) Taste and adjust seasoning.
6) Transfer to labeled containers and refrigerate.`
},
{
  id: 33,
  name: "Beer Cheese",
  category: "Pantry",
  tags: ["Dairy", "Contains Gluten", "Make Ahead", "Cold Hold"],
  ingredients: `- 2 lb shredded cheddar
- 2 lb cream cheese
- 6 tbsp Worcestershire sauce
- 2 tbsp Dijon mustard
- 4–8 garlic cloves, minced
- 8–12 green onions, chopped
- 2 cups beer`,
  instructions: `1) In mixer fitted with paddle, combine cream cheese and cheddar until blended.
2) Add Worcestershire, Dijon, garlic, and green onions; mix until incorporated.
3) Slowly add beer while mixing until desired consistency is reached.
4) Adjust seasoning.
5) Transfer to container, label and date.
6) Hold refrigerated.`
},
{
  id: 34,
  name: "Broccoli Miso Rigatoni",
  category: "Saute",
  tags: ["Contains Gluten", "Dairy", "Soy", "Vegetarian", "A La Minute"],
  ingredients: `- 1 tbsp olive oil
- 1.5 tsp white miso
- Garlic (minced)
- 0.5 tsp coarsely ground black pepper
- Pinch crushed red pepper flakes
- Cooked broccoli
- Cooked rigatoni
- 1/4 cup grated Parmesan
- Reserved pasta water
- Preserved lemon peel, rinsed and drained`,
  instructions: `1) Heat olive oil in sauté pan.
2) Add miso, garlic, black pepper, and red pepper flakes; sauté 30–45 seconds until fragrant.
3) Fold in cooked broccoli.
4) Add rigatoni and toss.
5) Add Parmesan and a splash of reserved pasta water.
6) Toss until glossy and emulsified.
7) Finish with preserved lemon peel.
8) Adjust seasoning and serve immediately.`
},
{
  id: 35,
  name: "Wheatberry Winter Beets",
  category: "Pantry",
  tags: ["Contains Gluten", "Vegetarian", "Cold Hold", "Make Ahead", "Banquet"],
  ingredients: `- 4 cups golden raisins
- 1 cup white wine vinegar
- 16 garlic cloves
- Cooked wheatberries
- Roasted beets
- Lemon juice
- Chopped parsley
- Chopped mint
- Chili flakes
- Kosher salt and black pepper
- Olive oil
- Pistachio butter (for plating)`,
  instructions: `1) Combine golden raisins, white wine vinegar, and garlic; let sit 1 hour.
2) Discard garlic cloves.
3) Fold in cooked wheatberries and roasted beets.
4) Add lemon juice, parsley, mint, and chili flakes.
5) Season with salt and pepper.
6) Add olive oil to finish.
7) Plate over pistachio butter.`
},
{
  id: 35,
  name: "Wheatberry Winter Beets",
  category: "Pantry",
  tags: ["Contains Gluten", "Vegetarian", "Cold Hold", "Make Ahead", "Banquet"],
  ingredients: `- 4 cups golden raisins
- 1 cup white wine vinegar
- 16 garlic cloves
- Cooked wheatberries
- Roasted beets
- Lemon juice
- Chopped parsley
- Chopped mint
- Chili flakes
- Kosher salt and black pepper
- Olive oil
- Pistachio butter (for plating)`,
  instructions: `1) Combine golden raisins, white wine vinegar, and garlic; let sit 1 hour.
2) Discard garlic cloves.
3) Fold in cooked wheatberries and roasted beets.
4) Add lemon juice, parsley, mint, and chili flakes.
5) Season with salt and pepper.
6) Add olive oil to finish.
7) Plate over pistachio butter.`
},
{
  id: 36,
  name: "Cauliflower Bolognese (Banquet Batch)",
  category: "Banquet",
  tags: ["Vegetarian", "Soy", "Dairy Optional", "Make Ahead", "Hot Hold", "Sauce"],
  ingredients: `- 1 7/8 cups olive oil, divided (~1 cup for cauliflower, ~7/8 cup for vegetables)
- 15 lb grated cauliflower
- 3 3/4 cups finely diced onion
- 7 1/2 cups finely diced carrot
- 7 1/2 cups finely diced celery
- 1 7/8 cups white miso (approx 2 cups rounded)
- 15 tbsp soy sauce (~3/4 cup + 3 tbsp)
- 1 7/8 tsp ground nutmeg
- 4 #10 cans crushed tomatoes
- 7 1/2 cups milk or plant-based milk alternative
- Fine sea salt, to taste`,
  instructions: `1) Heat approximately 1 cup olive oil in tilt skillet or large rondeau over medium-high heat.
2) Add grated cauliflower and sauté 4–5 minutes until lightly browned. Remove and reserve.
3) Add remaining olive oil and sweat onions, carrots, and celery over medium heat 5–6 minutes until softened but not browned.
4) Stir in miso, soy sauce, and nutmeg; cook about 1 minute until fragrant.
5) Add crushed tomatoes and milk (or plant-based milk). Simmer gently 15–20 minutes.
6) Return browned cauliflower to pan.
7) Simmer additional 10–15 minutes to meld flavors.
8) Adjust seasoning with fine sea salt.
9) Hold hot for service or cool and refrigerate for later use.`
},
{
  id: 37,
  name: "Cereal Milk (Cornflake)",
  category: "Pastry",
  tags: ["Dairy", "Vegetarian", "Make Ahead", "Cold Hold", "Dessert Component"],
  ingredients: `- 5 1/2 cups cornflakes
- 7 1/2 cups cold milk
- 4 tbsp tightly packed brown sugar
- 1/2 tsp kosher salt`,
  instructions: `1) Spread cornflakes on parchment-lined sheet pan.
2) Toast at 300°F for 15 minutes until lightly golden.
3) Cool completely.
4) Transfer toasted cornflakes to large pitcher.
5) Pour milk over cereal and stir vigorously.
6) Steep 20 minutes at room temperature.
7) Strain through fine-mesh sieve, pressing gently to extract milk (do not force solids through).
8) Whisk in brown sugar and salt until dissolved.
9) Refrigerate up to 1 week.`
},
{
  id: 38,
  name: "Sweet Corn Cereal Milk (Cap’n Crunch)",
  category: "Pastry",
  tags: ["Dairy", "Vegetarian", "Make Ahead", "Cold Hold", "Dessert Component"],
  ingredients: `- Cap’n Crunch cereal
- Milk
- Brown sugar
- Kosher salt`,
  instructions: `1) Measure Cap’n Crunch.
2) Do NOT toast.
3) Crush cereal by hand to coarse sand/gravel texture.
4) Steep in milk 20 minutes at room temperature.
5) Strain gently.
6) Whisk in brown sugar and salt.
7) Refrigerate until needed.`
},
{
  id: 39,
  name: "Beef Barbacoa & Black Bean Soup",
  category: "Soup",
  tags: ["Beef", "Gluten Free", "Hot Hold", "Make Ahead", "Banquet"],
  ingredients: `- 7.5 lb beef barbacoa, shredded (with juices)
- 1 1/2 cups oil (olive or neutral)
- 4 1/2 lb yellow onion, diced
- 3 lb red bell pepper, diced
- 2 1/2 lb carrots, diced
- 1 1/2 lb celery, diced
- 1/2 cup garlic, minced
- 1 cup tomato paste
- 1 bucket roasted tomatoes, drained and rough chopped
- 2 1/2 gallons beef stock (10 qts)
- 3 qts cooked black beans
- 2 lb corn kernels
- 3 tbsp ground cumin
- 3 tbsp smoked paprika
- 1 tbsp ground coriander
- 4–5 chipotles in adobo, minced
- Juice of 6–7 limes
- Salt and pepper to taste`,
  instructions: `1) Sweat onions, peppers, carrots, and celery in oil until softened.
2) Add garlic and tomato paste; cook until fragrant and lightly caramelized.
3) Add roasted tomatoes, beef stock, chipotles, and spices. Simmer 20 minutes.
4) Stir in black beans and corn; cook 10 minutes.
5) Fold in barbacoa and juices; simmer gently 15 minutes.
6) Adjust seasoning with lime juice, salt, and pepper before service.
7) Hold hot for service or cool rapidly for storage.`
},
{
  id: 40,
  name: "Butternut Squash Soup (Banquet Batch – ~4.9 Gallons)",
  category: "Soup",
  tags: ["Dairy", "Vegetarian", "Hot Hold", "Make Ahead", "Banquet"],
  ingredients: `- 13 large butternut squash (~40 lb raw / 30 lb usable flesh)
- 2 1/2 lb yellow onion (6–7 small or 3 large), diced
- 13 garlic cloves
- 3/4 cup canola oil
- 13 qt chicken stock (3 1/4 gal)
- 30–35 sprigs thyme (or ~1/2 cup picked leaves)
- 2 tbsp black peppercorns
- 6–7 bay leaves
- 1 1/2 cups brown sugar
- 1 tbsp nutmeg
- 6 1/2 cups heavy cream (~1.6 qt)
- 1 1/2 cups finely grated Parmesan (~6 oz)
- Kosher salt and black pepper to taste (approx 1/4 cup kosher salt total, adjust as needed)`,
  instructions: `1) Preheat oven to 350°F.
2) Split squash in half, remove seeds, and season with brown sugar, salt, and pepper.
3) Place cut-side up on roasting rack and roast 45 minutes or until tender.
4) Remove from oven and cool.
5) Prepare sachet with thyme, peppercorns, and bay leaves.
6) In large pot over medium heat, add oil and sweat onions and garlic until softened.
7) Scoop roasted squash flesh and discard skins.
8) Add squash, chicken stock, sachet, and nutmeg to pot.
9) Simmer 15 minutes.
10) Remove sachet and blend until smooth with immersion blender.
11) Add heavy cream and simmer additional 10 minutes.
12) Stir in Parmesan and adjust seasoning.
13) Hold hot for service or chill rapidly for storage.`,
  notes: `- Chill rapidly if holding more than same-day service.
- Properly chilled soup holds 3–4 days refrigerated.
- Garnish with soft whipped cream and grated nutmeg.`
},
{
  id: 41,
  name: "Black Bean, Corn & Gochujang Spinach Stew",
  category: "Soup",
  tags: ["Vegan", "Soy", "Sesame", "Gluten Optional", "Hot Hold", "Make Ahead", "Banquet"],
  ingredients: `- 1 cup sesame oil
- 8 shallots, halved and thinly sliced
- 16 garlic cloves, thinly sliced
- 8 large red bell peppers, diced
- 5 lb fresh spinach
- 112 oz black beans, drained and rinsed
- 8 cups fresh or frozen corn
- 8 cups coconut milk
- 2 cups gochujang
- 5 tbsp + 1 tsp soy sauce
- 4 tsp ground black pepper
- Fine sea salt to taste`,
  instructions: `1) Heat sesame oil over medium heat.
2) Add shallots and garlic; sauté 3–4 minutes until translucent.
3) Add diced red bell peppers; sauté 4–5 minutes until just softened.
4) Add spinach in batches, folding in with tongs as it wilts.
5) Cook until spinach is fully wilted and most liquid has evaporated.
6) Add black beans and corn; stir to combine.
7) Stir in coconut milk, gochujang, soy sauce, and black pepper.
8) Bring to a boil over high heat.
9) Immediately reduce heat and simmer 1–2 minutes.
10) Remove from heat and adjust seasoning with fine sea salt.
11) Hold hot for service or cool rapidly for storage.`
},
{
  id: 42,
  name: "Black Bean Soup (2 Gallons)",
  category: "Soup",
  tags: ["Gluten Free", "Hot Hold", "Make Ahead", "Vegetarian Optional", "Banquet"],
  ingredients: `- 4 lb dried black beans (or ~6 #10 cans, rinsed & drained)
- 1/2 cup olive oil OR 1/2 lb bacon/ham (optional)
- 2 1/2 lb onions, diced
- 1 1/2 lb carrots, diced
- 1 1/2 lb celery, diced
- 3 bell peppers (red, yellow, green), diced
- 8 cloves garlic, minced
- 2 tbsp cumin
- 1 tbsp smoked paprika
- 1 tbsp oregano (Mexican oregano preferred)
- 2 tsp chili powder (optional)
- 3 bay leaves
- 2 gallons chicken or vegetable stock
- 1/2 cup tomato paste
- 1/4 cup red wine vinegar or lime juice
- Salt and black pepper to taste
- 1/2 cup chopped cilantro (garnish)`,
  instructions: `1) If using dried beans: soak overnight, then simmer until just tender; drain.
2) Heat oil (or render bacon/ham) in stockpot.
3) Sweat onions, carrots, celery, and peppers 8–10 minutes until softened.
4) Add garlic; cook 1 minute.
5) Stir in cumin, paprika, oregano, chili powder, and tomato paste; cook 2–3 minutes to bloom.
6) Add beans, stock, and bay leaves.
7) Bring to boil, reduce to simmer, cook uncovered 45–60 minutes.
8) Remove bay leaves.
9) Purée approximately 1/3 of soup to thicken while maintaining texture.
10) Stir in vinegar or lime juice; adjust salt and pepper.
11) Hold hot for service or cool rapidly for storage.`,
},
{
  id: 43,
  name: "Brazilian Moqueca (2 Gallons)",
  category: "Soup",
  tags: ["Shellfish", "Fish", "Coconut", "Gluten Free", "Hot Hold", "Banquet"],
  ingredients: `SEAFOOD:
- 2 lb scallops
- 2 lb shrimp, peeled & deveined
- 2 lb firm white fish (snapper, cod, or halibut)

MARINADE:
- Juice of 6 limes
- 10 cloves garlic, minced
- 1 1/2 tbsp salt
- 1 tbsp black pepper
- 1 tbsp paprika

STEW BASE:
- 1/2 cup olive oil
- 4 large onions, finely chopped
- 4 red bell peppers, sliced
- 3 yellow bell peppers, sliced
- 8 large tomatoes, diced
- 1 1/2 tbsp smoked paprika
- 1 tsp red pepper flakes (adjust to heat)
- 6 cups fish or seafood stock
- 4 cans (14 oz each) coconut milk
- 1/2 cup palm oil (dendê oil) (or extra olive oil)
- 1 cup chopped cilantro
- 1/2 cup chopped green onions`,
  instructions: `1) Marinate seafood: combine scallops, shrimp, and fish with lime juice, garlic, salt, pepper, and paprika. Hold 30 minutes.
2) In stockpot, heat olive oil over medium heat. Sauté onions 5 minutes until soft.
3) Add bell peppers and cook 4 minutes.
4) Stir in tomatoes, smoked paprika, and red pepper flakes.
5) Add fish/seafood stock and simmer 10 minutes.
6) Stir in coconut milk.
7) Add marinated seafood and gently simmer 5–7 minutes until shrimp are pink and scallops are opaque (do not overcook).
8) Stir in palm oil (if using).
9) Finish with cilantro and green onions.
10) Serve with white rice and farofa (toasted cassava flour).`
},
{
  id: 44,
  name: "Carrot, Apple & Harissa Soup (2 Gallons)",
  category: "Soup",
  tags: ["Vegan", "Gluten Free", "Hot Hold", "Cold Hold", "Make Ahead", "Banquet"],
  ingredients: `- 10 lb carrots, peeled and cut into 1/2-inch diagonal slices
- 6–7 large Granny Smith apples, cored and cut into 1-inch wedges
- 1/3 cup olive oil
- 1 tbsp + 1/4 tsp kosher salt (for roasting)
- 1 1/2 tsp baking soda
- 6 quarts water
- 3/4 cup + 1 tbsp fresh lemon juice
- 1/3 cup + 1/2 tbsp minced fresh ginger
- 2 tbsp + 1/2 tsp harissa paste
- Salt to taste`,
  instructions: `1) Preheat oven to 350°F.
2) Toss carrots and apples with olive oil, kosher salt, and baking soda until evenly coated.
3) Spread on sheet trays and roast 25–30 minutes until carrots are tender and lightly caramelized.
4) In batches, blend roasted mixture with water, lemon juice, ginger, and harissa until very smooth.
5) Combine batches in large pot and adjust consistency with additional water if needed.
6) Season to taste with salt.
7) Serve hot or chill rapidly for cold service.`
},
{
  id: 45,
  name: "House Chili (Large Batch Production)",
  category: "Soup",
  tags: ["Beef", "Pork", "Contains Gluten", "Hot Hold", "Banquet", "High Volume"],
  ingredients: `MEAT:
- 1 whole top round, medium grind
- 2 pork butts, medium grind
- Additional beef trim equal to 1 top round, medium grind
- Cumin and chili powder (liberal seasoning, overnight)

BEANS:
- 1/2 four-gallon bucket dried red beans, soaked overnight

AROMATICS:
- 1 deep 200 pan medium-diced onions
- 1 deep 200 pan diced mixed peppers
- 1 six-pan minced garlic
- 1 six-pan diced jalapeños

BASE:
- 6 #10 cans tomatoes in juice
- 2 gallons beef stock (for cooking beans)
- 4–5 gallons beef stock (for chili base)
- Tomato paste (for base)
- 4 full scoops all-purpose flour

FINISH SEASONING:
- Salt
- White pepper
- Black pepper
- Cayenne
- Chili powder
- Cumin
- Garlic powder
- Onion powder
- Beef consommé base
- Maggi
- Worcestershire
- Tabasco`,
  instructions: `1) Season all ground meat liberally with cumin and chili powder. Hold overnight.
2) Soak dried beans overnight. Cook in 2 gallons seasoned beef stock until tender.
3) In large kettle, sear ground meat in batches until well browned.
4) Add onions, peppers, garlic, and jalapeños; sauté in rendered fat.
5) Add flour and cook 4–5 minutes to form roux, stirring constantly.
6) Add tomatoes and half of stock/tomato paste mixture, stirring constantly.
7) Add cooked beans with cooking liquid.
8) Adjust thickness with remaining stock and tomato paste.
9) Season aggressively and balance flavors.
10) Simmer, stirring constantly to prevent scorching.
11) Hold hot for service or cool rapidly for storage.`
},
{
  id: 46,
  name: "New England Clam Chowder (Large Batch)",
  category: "Soup",
  tags: ["Shellfish", "Dairy", "Contains Gluten", "Pork", "Hot Hold", "Banquet", "High Volume"],
  ingredients: `AROMATICS:
- 1 full 200 pan diced onion
- 1 full 200 pan diced celery

BASE:
- 1 heaping full 6 pan diced bacon
- 6 oz bacon grease (additional if needed)
- 2 heaping scoops all-purpose flour
- 8–10 #5 cans clam juice
- 2 gallon bucket square-cut raw potatoes
- 2 gallons clams in juice

FINISH:
- Heavy cream (added day of service)

SEASONING:
- Salt
- White pepper
- Tabasco
- Worcestershire
- Clam base`,
  instructions: `1) Render bacon with additional bacon grease until browned.
2) Add onions and celery; sauté until softened.
3) Stir in flour to form roux; cook 3–4 minutes, stirring constantly.
4) Add clam juice gradually (2 cans at a time), mixing constantly to prevent lumps.
5) Add potatoes and cook until tender.
6) Add clams and their juice; heat gently (do not overcook).
7) Adjust thickness with additional clam juice if needed.
8) Finish with heavy cream day of service.
9) Season with salt, white pepper, Tabasco, Worcestershire, and clam base.
10) Hold hot but do not boil after clams are added.`
},
{
  id: 47,
  name: "Corn & Black Bean Soup with Fresno Peppers (3 Gallons)",
  category: "Soup",
  tags: ["Vegetarian Optional", "Gluten Free", "Hot Hold", "Make Ahead", "Banquet"],
  ingredients: `- 1/2 cup neutral oil (canola, sunflower, etc.)
- 6 medium onions, small dice (~3 lb)
- 12 Fresno peppers, thinly sliced (seeded for less heat)
- 18 cloves garlic, minced (~3 oz)
- 6 tbsp ground cumin
- 6 tbsp smoked paprika
- 3 tbsp ground coriander
- 3 gallons vegetable or chicken stock (24 qt)
- 12 cups corn kernels (~6 lb frozen or fresh)
- 9 (15 oz) cans black beans OR 15 cups cooked beans (~7 1/2 lb cooked)
- 3 bay leaves
- Salt and black pepper to taste
- Juice of 6 limes (~3/4 cup)
- 3/4 cup chopped cilantro`,
  instructions: `1) Heat oil in large stockpot or tilt skillet.
2) Add onions and Fresno peppers; sauté ~10 minutes until softened.
3) Add garlic, cumin, smoked paprika, and coriander; cook 1–2 minutes until fragrant.
4) Add stock, corn, black beans, and bay leaves.
5) Bring to a boil, then reduce to a gentle simmer for 25–30 minutes.
6) Remove bay leaves.
7) Stir in lime juice and cilantro.
8) Season to taste with salt and black pepper.
9) Optional: for thicker body, purée about 1 gallon of soup and stir back in.`
},
{
  id: 48,
  name: "French Onion Soup (Large Batch)",
  category: "Soup",
  tags: ["Beef", "Contains Gluten Optional", "Hot Hold", "Banquet", "High Volume"],
  ingredients: `- 15 large onions, julienned
- 1/2 gallon sherry
- 2 gallons beef stock
- Sachet of thyme, black peppercorns, and bay leaves
- Salt to taste
- Coarsely ground black pepper
- Worcestershire
- Tabasco
- Maggi`,
  instructions: `1) In tilt skillet over high heat, caramelize julienned onions.
   (Tip skillet slightly forward so moisture pools at front and onions continue to brown.)
2) Deglaze with half the sherry; scrape fond and allow liquid to fully evaporate.
3) Add remaining sherry and reduce by approximately half.
4) Add beef stock and sachet.
5) Transfer to large pot and simmer covered for 1 hour.
6) Remove sachet.
7) Adjust seasoning with salt, coarse black pepper, Worcestershire, Tabasco, and Maggi.
8) Hold hot for service.`,
},
{
  id: 49,
  name: "Mulligatawny Soup (Anglo-Indian)",
  category: "Soup",
  tags: ["Chicken", "Dairy", "Contains Gluten", "Coconut", "Hot Hold", "Banquet"],
  ingredients: `- 3/4 lb butter (12 tbsp / 1 1/2 sticks)
- 6 large onions, chopped (~3 lb)
- 12 inches fresh ginger, finely chopped (~1 1/2 cups)
- 6 apples, diced with peel (~3 lb)
- 6 carrots, sliced (~2 lb)
- 6 celery ribs, sliced (~1 1/2 lb)
- 6 heaping tbsp curry powder (~2/3 cup)
- 6 tbsp all-purpose flour
- 24 tomatoes, coarsely chopped (~7–8 lb)
- 1/2 cup tomato paste
- 16 cups (1 gallon) chicken stock
- 12 bay leaves
- Kosher salt and fresh ground black pepper to taste
- 3 cups coconut milk
- 3 lb cooked chicken, shredded
- Juice of 3 limes
- Chopped cilantro (garnish)`,
  instructions: `1) Melt butter in large stockpot over medium heat.
2) Add onions and ginger; sweat 10 minutes without browning.
3) Add apples, carrots, and celery; cover and cook 5 minutes.
4) Stir in curry powder; cook 1 minute to bloom.
5) Sprinkle in flour and cook 20–30 seconds, stirring constantly.
6) Add tomatoes and tomato paste.
7) Pour in chicken stock and add bay leaves.
8) Bring to boil, then reduce heat and simmer partially covered 20 minutes.
9) Remove bay leaves.
10) Blend until smooth with immersion blender.
11) Strain to remove fibers and skins for refined texture.
12) Reheat and stir in coconut milk and shredded chicken.
13) Finish with lime juice and adjust seasoning.
14) Garnish with chopped cilantro.`
},
{
  id: 50,
  name: "Mushroom & Farro Soup",
  category: "Soup",
  tags: ["Soup", "Hot Hold"],
  ingredients: `
Base & Aromatics
- ½ cup butter or olive oil (4 oz)
- 3 cups yellow onion, small dice
- 1½ cups celery, small dice
- 1½ cups carrot, small dice
- 2 tablespoons garlic, minced
- 1 tablespoon fresh thyme
- 2 bay leaves

Mushrooms
- 4 pounds mixed mushrooms
- ½ cup sherry wine

Farro & Stock
- 2 cups pearled farro
- 5 quarts stock
`,
  instructions: `
1) Sauté base.
2) Add mushrooms and brown.
3) Deglaze with sherry.
4) Add farro and stock.
5) Simmer 40–45 minutes.
6) Finish with cream and parsley.
`,
},


{
  id: 51,
  name: "Mushroom Barley Soup (2 Gallons)",
  category: "Soup",
  tags: ["Contains Gluten", "Vegetarian Optional", "Dairy Optional", "Hot Hold", "Make Ahead", "Banquet"],
  ingredients: `- 3 lb mushrooms (cremini, button, shiitake), sliced
- 1/2 cup olive oil or butter (4 oz)
- 2 lb onions, diced
- 1 lb carrots, diced
- 1 lb celery, diced
- 6 cloves garlic, minced
- 2 tbsp tomato paste (optional)
- 2 1/2 gallons beef or vegetable stock (start with 2 gallons; adjust as barley absorbs)
- 1 lb pearl barley (~2 1/2 cups)
- 3 bay leaves
- 2 tsp dried thyme (or 3–4 sprigs fresh)
- 2 tsp freshly ground black pepper
- 1/2 cup soy sauce or Worcestershire (optional but recommended)
- Salt to taste
- 1/2 cup chopped parsley (garnish)`,
  instructions: `1) Heat oil or butter in large stockpot.
2) Add mushrooms and sauté 10–12 minutes until browned and moisture evaporates.
3) Remove half of mushrooms and reserve for garnish.
4) Add onions, carrots, and celery; cook 8–10 minutes until softened.
5) Stir in garlic and tomato paste; cook 1–2 minutes.
6) Add stock (start with 2 gallons), barley, bay leaves, thyme, black pepper, and soy sauce/Worcestershire.
7) Bring to boil, then reduce to simmer.
8) Cook uncovered 45–60 minutes, stirring occasionally, until barley is tender.
9) Add additional stock or water as needed to maintain proper consistency.
10) Remove bay leaves.
11) Stir reserved mushrooms back in.
12) Adjust seasoning with salt and pepper.
13) Garnish with chopped parsley before service.`
},

{
  id: 52,
  name: "Roasted Tomato & Banana Pepper Soup (3 Gallons)",
  category: "Soup",
  tags: ["Vegetarian Optional", "Dairy Optional", "Gluten Free", "Hot Hold", "Make Ahead", "Banquet"],
  ingredients: `- 1/2 cup olive oil (divided)
- 8 lb ripe tomatoes (Roma or plum), halved
- 3 lb fresh banana peppers, seeded and sliced
- 4 medium onions (~2 lb), sliced
- 12 cloves garlic, peeled
- 3 tbsp tomato paste
- 3 tbsp smoked paprika
- 3 tbsp sugar
- 3 gallons vegetable or chicken stock
- 3 bay leaves
- 1 1/2 cups heavy cream (optional)
- Juice of 4 lemons (~1/2 cup)
- 1/2 cup fresh basil, chopped
- Salt and black pepper to taste`,
  instructions: `1) Preheat oven to 400°F.
2) Toss tomatoes, banana peppers, onions, and garlic with half the olive oil.
3) Roast 25–30 minutes until caramelized.
4) In large stockpot, heat remaining oil.
5) Add tomato paste and smoked paprika; cook 2 minutes to bloom.
6) Add roasted vegetables, sugar, stock, and bay leaves.
7) Bring to gentle simmer; cook 25–30 minutes.
8) Remove bay leaves.
9) Purée until smooth with immersion blender.
10) Optional: pass through chinois for refined texture.
11) Stir in cream (if using), lemon juice, and basil.
12) Adjust seasoning with salt and black pepper.
13) Hold hot for service or chill rapidly for storage.`
},
{
  id: 53,
  name: "Spiced Chickpea & Chorizo Soup (2 Gallons)",
  category: "Soup",
  tags: ["Pork", "Gluten Free", "Hot Hold", "Make Ahead", "Banquet"],
  ingredients: `- 3 lb Spanish chorizo, small dice
- 1 cup olive oil (as needed)
- 3 lb yellow onions, diced
- 2 lb red bell peppers, diced
- 1 lb carrots, diced
- 1 lb celery, diced
- 1/2 cup garlic, minced
- 1/2 cup tomato paste
- 2 qt roasted tomatoes, crushed
- 1 gallon chicken stock
- 2 qt vegetable stock (or use all chicken stock)
- 4 qt chickpeas, cooked and drained (~8 lb cooked or 3 #10 cans drained)
- 2 tbsp smoked paprika
- 1 tbsp ground cumin
- 1 tbsp ground coriander
- 2 tsp chili flakes (optional)
- 2 tbsp sherry vinegar (or red wine vinegar)
- Salt and black pepper to taste`,
  instructions: `1) In large stockpot or tilt skillet, render chorizo until fat releases and meat begins to crisp. Remove and reserve.
2) Add olive oil if needed; sauté onions, peppers, carrots, and celery ~8 minutes until softened.
3) Add garlic; cook until fragrant.
4) Stir in tomato paste and cook 2–3 minutes to deepen flavor.
5) Add roasted tomatoes, stocks, and spices.
6) Bring to simmer.
7) Stir in chickpeas; simmer 20–25 minutes.
8) Return chorizo to pot; simmer additional 10 minutes.
9) Stir in sherry vinegar.
10) Adjust seasoning with salt and black pepper.
11) Hold hot for service or cool rapidly for storage.`,
},
{
  id: 54,
  name: "Spicy Ground Pork & Potato Soup (3 Gallons)",
  category: "Soup",
  tags: ["Pork", "Gluten Free", "Hot Hold", "Make Ahead", "High Volume", "Banquet"],
  ingredients: `- 10 lb ground pork
- 1/2 cup olive oil (or rendered pork fat)
- 4 large onions (~2 lb), diced
- 4 red bell peppers (~2 lb), diced
- 12 cloves garlic (~3 oz), minced
- 6 tbsp smoked paprika (sweet + hot blend if possible)
- 2 tbsp ground cumin
- 2 tsp crushed red pepper flakes (adjust heat)
- 1 tbsp black pepper
- 1 gallon crushed tomatoes (~#10 can)
- 2 gallons pork, chicken, or vegetable stock
- 5 lb Yukon gold potatoes, 1/2-inch dice
- 2 bunches kale or 2 medium cabbages (~3 lb), chopped
- 2 bay leaves
- Salt to taste (start ~3 tbsp kosher, adjust)
- 1/4 cup sherry vinegar`,
  instructions: `1) Heat oil in tilt skillet or large stockpot.
2) Add ground pork, season lightly with salt, and cook until browned and crumbled. Remove excess fat if needed.
3) Add onions, peppers, and garlic; cook ~10 minutes until softened.
4) Stir in smoked paprika, cumin, chili flakes, and black pepper; cook 1–2 minutes to bloom.
5) Add crushed tomatoes, stock, potatoes, and bay leaves.
6) Bring to boil, then reduce to simmer 30–35 minutes until potatoes are tender.
7) Stir in kale or cabbage; cook 10 minutes until wilted but vibrant.
8) Remove bay leaves.
9) Adjust salt and finish with sherry vinegar.
10) Hold hot for service or cool rapidly for storage.`,
  notes: `Yield: approx. 3 gallons (384 oz)
Portions: ~48 servings (8 oz) or ~60 servings (6 oz starter)`
},
{
  id: 55,
  name: "Stuffed Pepper Soup (2 Gallons)",
  category: "Soup",
  tags: ["Beef", "Contains Gluten Optional", "Hot Hold", "Make Ahead", "Banquet", "High Volume"],
  ingredients: `- 3 lb ground beef (80/20)
- 1/4 cup olive oil (or rendered fat)
- 2 cups onion, small dice
- 2 cups green bell pepper, small dice
- 1 1/2 cups red bell pepper, small dice
- 3 tbsp garlic, minced
- 2 tsp salt
- 1 tsp black pepper
- 1 tbsp paprika
- 1 tbsp Italian seasoning or dried oregano
- 2 tbsp tomato paste
- 2 #10 cans diced tomatoes
- 3 qt beef stock
- 1 cup long-grain rice (uncooked) or 2 cups cooked rice
- 2 bay leaves
- 2 tsp sugar
- Splash Worcestershire (optional)
- Chopped parsley (garnish)
- Optional: Parmesan for service`,
  instructions: `1) Heat oil in large rondeau over medium-high heat.
2) Add ground beef and cook until browned, breaking apart. Drain excess fat if needed.
3) Add onions and peppers; sauté 5–7 minutes until softened.
4) Stir in garlic, salt, pepper, paprika, and herbs; cook 1 minute.
5) Add tomato paste and cook briefly to caramelize.
6) Add diced tomatoes, beef stock, sugar, bay leaves, and Worcestershire.
7) Bring to simmer.
8) Add rice and cook 20–25 minutes (longer if raw), stirring occasionally to prevent sticking.
9) Remove bay leaves.
10) Adjust seasoning with salt, pepper, and optional splash of vinegar or lemon.
11) Garnish with chopped parsley and optional Parmesan.`,
  notes: `Yield: approx. 2 gallons
Portions: 25–30 servings (8 oz ladle)
Rice will continue absorbing liquid during hold; add stock as needed when reheating.`
},
{
  id: 56,
  name: "Sweet Potato Bisque with Curry & Coconut (~2 Gallons)",
  category: "Soup",
  tags: ["Vegan", "Gluten Free", "Hot Hold", "Make Ahead", "Banquet"],
  ingredients: `- 1/2 cup oil
- 2 lb onion, diced
- 6 cloves garlic, minced
- 2 tbsp fresh ginger, minced
- 8 lb sweet potatoes, peeled and diced
- 2 tbsp curry powder
- 5 qt vegetable stock
- 2 qt full-fat coconut milk
- 2 tbsp lime juice
- Salt and black pepper to taste
- Garnish: cilantro, toasted pepitas, or chili oil`,
  instructions: `1) Heat oil in large stockpot.
2) Add onion, garlic, and ginger; sweat until softened.
3) Add curry powder; toast 1 minute to bloom.
4) Add sweet potatoes and vegetable stock.
5) Bring to simmer and cook until potatoes are tender.
6) Purée until smooth.
7) Return to pot and stir in coconut milk and lime juice.
8) Adjust seasoning with salt and black pepper.
9) Hold hot for service or chill rapidly for storage.`,
  notes: `Yield: approx. 2 gallons
Portions: ~32 servings (8 oz)
Holds well; may thicken during hold — loosen with hot stock as needed.`
},
{
  id: 57,
  name: "Thai-Style Pumpkin Coconut Soup (4 Gallons)",
  category: "Soup",
  tags: ["Coconut", "Gluten Free Optional", "Hot Hold", "Make Ahead", "Banquet", "Vegan Optional"],
  ingredients: `- 1 cup neutral oil
- 2 qt diced yellow onions
- 1/2 cup minced garlic
- 1/4 cup minced fresh ginger
- Lemongrass (minced or bruised, amount to taste)
- 2 tbsp ground coriander
- 2 tsp ground cumin
- 2 tsp ground turmeric
- 2 tsp red pepper flakes
- 4 #10 cans pumpkin purée
- 1 gallon full-fat coconut milk
- 1 1/2 gallons vegetable or chicken stock
- 1/4 cup brown sugar
- 1/2 cup fish sauce (or soy sauce for vegan version)
- 1/2 cup lime juice
- 2 tbsp kosher salt (plus more to taste)
- Garnish: chili oil and toasted pumpkin seeds`,
  instructions: `1) Heat oil in large rondeau over medium heat.
2) Add onions and cook until translucent, about 8 minutes.
3) Add garlic, ginger, lemongrass, coriander, cumin, turmeric, and red pepper flakes; cook 2 minutes, stirring constantly.
4) Add pumpkin purée and cook 3 minutes to deepen flavor.
5) Whisk in coconut milk and stock until smooth.
6) Bring to simmer and cook 25–30 minutes.
7) Stir in brown sugar, fish sauce (or soy sauce), and lime juice.
8) Remove lemongrass.
9) Blend until smooth and creamy.
10) Adjust consistency with additional stock or water if needed.
11) Adjust seasoning with salt and lime.
12) Garnish with chili oil and toasted pumpkin seeds.`,
  notes: `Yield: approx. 4 gallons
Holds well in steam well.
For vegan version, use vegetable stock and soy sauce instead of fish sauce.`
},
{
  id: 58,
  name: "Tomato Basil Soup (Scrap Utilization Batch)",
  category: "Soup",
  tags: ["Dairy Optional", "Gluten Free Optional", "Hot Hold", "Make Ahead", "Banquet", "High Volume"],
  ingredients: `- 1 full 4–5 gallon bucket tomato scraps (ends & trim)
- 2 gallons chicken stock
- 2 onions, rough chopped
- 1/2 #10 can tomato paste
- 1 #5 can V-8 juice
- Heavy cream (to desired thickness)
- 1/2 six-pan chiffonade basil
- Salt to taste
- White pepper
- Black pepper
- Worcestershire
- Tabasco
- Maggi
- Lemon juice`,
  instructions: `1) In large stockpot or tilt skillet, combine tomato scraps, rough cut onions, and chicken stock.
2) Bring to boil, then simmer until onions are softened.
3) Purée with immersion blender or tabletop blender until smooth.
4) Strain through fine china cap (not chinois) and return liquid to pot.
5) Add tomato paste, basil, and V-8; purée again until fully incorporated.
6) Add heavy cream gradually until desired richness and thickness is reached.
7) Season with salt, white pepper, black pepper, Worcestershire, Tabasco, Maggi, and lemon juice to balance.
8) Simmer gently and hold hot for service.`,
  notes: `Utilizes tomato trim and reduces waste.
Straining through china cap maintains body while removing seeds/skins.
Add cream gradually — do not boil hard after cream addition.`
},
{
  id: 59,
  name: "Watermelon Gazpacho (4× Batch – 6–8 Quarts)",
  category: "Soup",
  tags: ["Vegan", "Gluten Free", "Cold Hold", "Make Ahead", "Banquet", "Seasonal"],
  ingredients: `- 16 cups (1 gallon) diced watermelon
- 4 cups cucumber, peeled and diced
- 2 red bell peppers
- 1 cup red onion (or 3/4 cup shallot)
- 4 small garlic cloves
- 1/2 cup red wine or sherry vinegar
- 1/2 cup olive oil
- 2–3 tsp kosher salt (to taste)
- 1–2 jalapeños, chopped (optional)
- 1/2 cup packed fresh basil or mint (or split between both)
- Juice of 2 limes`,
  instructions: `1) Combine all ingredients in batches in high-speed blender.
2) Blend until very smooth (or leave slight texture if desired).
3) Optional: strain through chinois for refined texture.
4) Chill at least 2–3 hours before service.
5) Adjust salt, vinegar, and lime after chilling.
6) Garnish with basil chiffonade before serving.`,
  notes: `Yield: approx. 6–8 quarts.
Best served well chilled.
Flavor deepens after resting.
Excellent as 4 oz passed shooter for banquets.`
},
{
  id: 60,
  name: "White Chicken Chili (Large Batch)",
  category: "Soup",
  tags: ["Chicken", "Gluten Free", "Hot Hold", "Make Ahead", "Banquet", "High Volume"],
  ingredients: `- 1/3 six-pan minced garlic
- 1/2 pan each medium-diced onion, green bell pepper, yellow bell pepper
- 8–10 large jalapeños, diced
- 2 gallons chicken stock
- 1 gallon navy beans, soaked overnight (start with 2/3 full dry)
- 1/2 pan medium-diced cooked chicken
- 1 nine-pan cornmeal
- Cumin
- Chili powder
- Salt and black pepper
- Worcestershire
- Tabasco
- Cayenne pepper
- Chicken consommé base`,
  instructions: `1) In large stockpot or tilt skillet, sauté onions, peppers, garlic, and jalapeños with cumin and chili powder.
2) Add soaked beans and chicken stock.
3) Bring to boil, reduce to simmer, cook until beans are tender.
4) In separate skillet, cook cornmeal with some chicken stock until loose roux-like consistency forms and cornmeal is mostly dissolved.
5) Slowly stir cornmeal mixture into main soup until desired thickness is achieved.
6) Add diced cooked chicken.
7) Season with salt, black pepper, cumin, Worcestershire, Tabasco, cayenne, and chicken consommé base.
8) Simmer gently and hold hot for service.`,
  notes: `Cornmeal acts as thickener — stir constantly to avoid scorching.
Adjust thickness gradually; soup will thicken further on hold.
Holds well in steam well; loosen with stock if needed.`
},

{
  id: 61, 
  name: "Chive Sour Cream",
  category: "Pantry",
  tags: ["Cold Hold", "Dairy", "Banquet", "Sauce"],
  ingredients: `
- 6 cups sour cream
- 2 teaspoons onion powder
- 2 ounces lemon juice
- 2 tablespoons fresh chives, finely chopped
  `,
  instructions: `
1) In a mixing bowl, combine sour cream, onion powder, and lemon juice.
2) Fold in chopped chives.
3) Mix until fully incorporated and smooth.
4) Taste and adjust seasoning if needed.
5) Label, date, and store under refrigeration.
  `
},

{
  id: 62,
  name: "RGCC Olive Dip",
  category: "Pantry",
  tags: ["Cold Hold", "Dairy", "Vegetarian", "Banquet", "Appetizer"],
  ingredients: `
- 1 lb cream cheese, softened
- 1 cup sour cream
- 1 1/2 cups Gordal olives, rough chopped
- 1/2 cup Kalamata olives, rough chopped
- 1 tablespoon minced garlic
- 2 tablespoons olive brine
- 1/2 teaspoon crushed red pepper (adjust to taste)
- 1 teaspoon smoked paprika
- 1 tablespoon fresh lemon juice
- Zest of 1 lemon
- 2 tablespoons fresh parsley, chopped
- 1 tablespoon fresh chives, chopped
- Fresh cracked black pepper, to taste
  `,
  instructions: `
1) In a mixer fitted with paddle attachment, whip cream cheese until smooth.
2) Add sour cream and mix until light and fully incorporated.
3) Fold in olives, garlic, olive brine, crushed red pepper, smoked paprika, lemon juice, and lemon zest.
4) Add chopped parsley and chives.
5) Season with cracked black pepper and adjust salt if needed.
6) Chill at least 2 hours before service to allow flavors to develop.
7) Garnish with a drizzle of olive oil, extra herbs, and a pinch of smoked paprika before serving.
  `,
  notes: `
Rustic texture preferred — avoid overmixing olives.
Holds 4–5 days under refrigeration.
Excellent with grilled focaccia or flatbread.
  `
},

{
  id: 63, 
  name: "RGCC French Onion Dip",
  category: "Pantry",
  tags: ["Cold Hold", "Dairy", "Banquet", "Appetizer"],
  ingredients: `
- 2 tablespoons canola oil
- 3 cups yellow onions, small dice
- 1 teaspoon kosher salt
- 1 teaspoon sugar (optional, for caramelization)
- 1 tablespoon Worcestershire sauce
- 1 teaspoon beef base
- 1 tablespoon dry sherry
- 3 cups sour cream
- 1 cup mayonnaise
- 1 teaspoon onion powder
- 1 tablespoon fresh lemon juice
- 1 tablespoon fresh chives, finely chopped
- Fresh cracked black pepper, to taste
  `,
  instructions: `
1) Heat oil over medium-low heat.
2) Add onions, salt, and sugar. Cook low and slow 25–35 minutes until deeply caramelized and jammy.
3) Add Worcestershire, beef base, and dry sherry. Cook 1 minute to reduce.
4) Remove from heat and cool completely.
5) In a mixing bowl, combine sour cream, mayonnaise, and onion powder.
6) Fold in cooled onion mixture and lemon juice.
7) Season with cracked black pepper and adjust salt if needed.
8) Finish with chopped chives.
9) Chill at least 2 hours before service.
10) Label, date, and store under refrigeration.
  `,
  notes: `

  `,
},
{
  id: 64,
  name: "Cheesy Hash Browns",
  category: "Saute",
  tags: ["Brunch", "Banquet", "Hot Hold", "Vegetarian", "Gluten Free"],
  ingredients: `
- 20 lb shredded hash browns, thawed and thoroughly drained
- 4 1/2 quarts heavy cream
- 3 cups yellow onion, fine dice
- 2 tablespoons kosher salt (adjust to taste)
- 2 teaspoons fresh cracked black pepper
- 1 tablespoon Dijon mustard
- 1 tablespoon fresh lemon juice
- 1 cup chopped fresh parsley
- 6 1/2 cups shredded smoked Gouda
- 1 cup finely grated Parmesan
  `,
  instructions: `
1) Sweat diced onion over medium heat until softened and translucent. Do not brown. Cool slightly.
2) In large mixing container, combine heavy cream, salt, pepper, Dijon, lemon juice, parsley, smoked Gouda, and Parmesan.
3) Fold in cooled onions.
4) Add well-drained hash browns and mix thoroughly but gently.
5) Divide evenly into three greased 2" hotel pans.
6) Bake uncovered at 350°F (high fan) for 30–35 minutes until set and lightly golden.
7) Rest 10–15 minutes before service.
8) Taste and adjust seasoning before service.
  `,
  notes: `
Drain hash browns extremely well to prevent excess moisture.
Smoked Gouda provides primary flavor; Parmesan reinforces structure and seasoning.
Raw hold: 2 days refrigerated.
Cooked hold: 1 service.
  `
},
{
  id: 1004, // adjust ID
  name: "RGCC House Ranch Dressing",
  category: "Pantry",
  tags: ["Cold Hold", "Dairy", "Banquet", "Dressing"],
  ingredients: `
- 2 ranch seasoning packets
- 1 gallon mayonnaise
- 1 gallon buttermilk
  `,
  instructions: `
1) Combine mayonnaise and buttermilk in large mixing bowl.
2) Add ranch seasoning packets.
3) Whisk until fully incorporated and smooth.
4) Taste for consistency and adjust with additional buttermilk if needed.
5) Label, date, and store under refrigeration.
  `,
  notes: `
Yield: 2 gallons.
Hold refrigerated.
Shake or stir before service.
  `
},
{
  id: 1005,
  name: "Balsamic Marinated Figs (Piggy Fig Pizza)",
  category: "Pizza",
  tags: ["Vegetarian", "Gluten Free", "Cold Hold", "Garnish"],
  ingredients: `
- 1 lb Black Mission figs, cleaned and quartered
- 2 cups water
- 1/2 cup balsamic vinegar
- 1 cup granulated sugar
- Pinch kosher salt
  `,
  instructions: `
1) In a saucepan, combine water, balsamic vinegar, sugar, and salt.
2) Bring to a boil, then reduce to a gentle simmer.
3) Add figs and simmer 8–10 minutes until slightly softened but still holding shape.
4) Remove from heat and cool in liquid.
5) Once cooled, strain figs lightly — reserve syrup for brushing pizza if desired.
6) Label, date, and store under refrigeration.
  `,
  notes: `
Shelf life: 5 days refrigerated.
Figs should be lightly glazed, not swimming in syrup.
For pizza, drain well before topping to avoid excess moisture.
Reserved syrup can be reduced and brushed lightly after bake.
  `
},
{
  id: 1006,
  name: "Lemon Beurre Blanc (Stabilized for Service)",
  category: "Saute",
  tags: ["Sauce", "Banquet", "Gluten Free", "Hot Hold"],
  ingredients: `
- 1 cup shallots, finely minced
- 1 tablespoon whole black peppercorns, lightly crushed
- 1 bay leaf
- 3 thyme sprigs
- 12 ounces dry white wine
- 6 ounces fresh lemon juice
- 1 cup heavy cream
- 3 pounds cold unsalted butter, cubed
- Kosher salt, to taste
  `,
  instructions: `
1) In sauce pot, combine shallots, peppercorns, bay leaf, thyme, white wine, and lemon juice.
2) Bring to simmer and reduce until almost dry (au sec), leaving just a few tablespoons of liquid.
3) Add heavy cream and simmer gently until slightly thickened and reduced by about one-third.
4) Lower heat to very low.
5) Begin mounting cold butter a few cubes at a time, whisking constantly until emulsified.
6) Continue adding butter gradually while maintaining gentle heat.
7) Once fully mounted and smooth, strain through fine sieve.
8) Adjust seasoning with kosher salt.
9) Hold warm (135–145°F), do not boil.
  `,
  notes: `
Cream provides light stabilization for 3–4 hour service.
Do not exceed 150°F or sauce may break.
If sauce loosens, whisk briefly to re-emulsify.
If breaking begins, whisk in 1 tablespoon cold water.
  `
},


  {
    id: 2,
    name: "Shrimp Scampi",
    category: "Saute",
    tags: ["Shellfish"],
    ingredients: "Shrimp, garlic, butter, white wine",
    instructions: "Sauté garlic. Add shrimp. Finish with butter."
  }
];

export default function App() {
  const [recipes] = useState<Recipe[]>(sampleRecipes);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Recipe | null>(null);

const filtered = recipes.filter((r) => {
  const matchesSearch = r.name
    .toLowerCase()
    .includes(search.toLowerCase());

  if (!selectedFilter) return matchesSearch;

  const matchesCategory = r.category === selectedFilter;
  const matchesTag = r.tags.includes(selectedFilter);

  return matchesSearch && (matchesCategory || matchesTag);
});

const categories = Array.from(
  new Set(recipes.map(r => r.category))
).sort();

const tags = Array.from(
  new Set(recipes.flatMap(r => r.tags))
).sort();

  return (
    <div style={{ padding: 20, fontFamily: "Arial", background: "#111827", color: "white", minHeight: "100vh" }}>
      <h1>RGCC Recipes</h1>

      <input
        type="text"
        placeholder="Search recipes..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ padding: 8, width: "100%", marginBottom: 20 }}
      />
<div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
  <button onClick={() => setSelectedFilter(null)}>
    All
  </button>

  {categories.map(cat => (
    <button key={cat} onClick={() => setSelectedFilter(cat)}>
      {cat}
    </button>
  ))}

  {tags.map(tag => (
    <button key={tag} onClick={() => setSelectedFilter(tag)}>
      #{tag}
    </button>
  ))}
</div>

      {!selected && (
        <div>
          {filtered.map(recipe => (
            <div
              key={recipe.id}
              onClick={() => setSelected(recipe)}
              style={{
                padding: 12,
                marginBottom: 10,
                background: "#1f2937",
                cursor: "pointer",
                borderRadius: 6
              }}
            >
              <strong>{recipe.name}</strong>
              <div style={{ fontSize: 12, opacity: 0.7 }}>
                {recipe.category} | {recipe.tags.join(", ")}
              </div>
            </div>
          ))}
        </div>
      )}

      {selected && (
        <div>
          <button onClick={() => setSelected(null)} style={{ marginBottom: 10 }}>
            ← Back
          </button>

          <h2>{selected.name}</h2>
          <p><strong>Category:</strong> {selected.category}</p>
          <p><strong>Tags:</strong> {selected.tags.join(", ")}</p>

          <h3>Ingredients</h3>
          <p>{selected.ingredients}</p>

          <h3>Instructions</h3>
          <p>{selected.instructions}</p>
        </div>
      )}
    </div>
  );
}
