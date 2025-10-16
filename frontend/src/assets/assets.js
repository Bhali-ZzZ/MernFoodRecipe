import f1 from './f1.png'
import f2 from './f2.png'
import f3 from './f3.png'
import f4 from './f4.png'
import f5 from './f5.png'

export const assets = {
  f1
}

const recipesData = [
  {
    id: 1,
    title: "Spaghetti Carbonara",
    ingredients: [
      "200g spaghetti",
      "100g pancetta",
      "2 large eggs",
      "50g parmesan cheese",
      "Salt & black pepper to taste",
      "1 tbsp olive oil"
    ],
    instruction:
      "Cook spaghetti in salted water. Fry pancetta in olive oil until crispy. Beat eggs with parmesan. Mix hot pasta with pancetta, remove from heat, then add egg mixture and stir quickly to create a creamy sauce. Serve immediately with extra parmesan.",
    image:f1,
    time: "25 minutes"
  },
  {
    id: 2,
    title: "Chicken Biryani",
    ingredients: [
      "2 cups basmati rice",
      "500g chicken",
      "2 onions (fried)",
      "1 cup yogurt",
      "2 tbsp biryani masala",
      "Saffron and milk mixture",
      "Fresh coriander & mint"
    ],
    instruction:
      "Marinate chicken in yogurt and spices for 1 hour. Cook rice until half done. Layer rice and chicken in a pot, sprinkle fried onions and saffron milk. Cover tightly and cook on low flame for 25 minutes. Serve hot with raita.",
    image:f5,
    time: "1 hour 10 minutes"
  },
  {
    id: 3,
    title: "Classic Pancakes",
    ingredients: [
      "1 1/2 cups all-purpose flour",
      "3 1/2 tsp baking powder",
      "1 tbsp sugar",
      "1 cup milk",
      "1 egg",
      "3 tbsp melted butter"
    ],
    instruction:
      "Mix dry ingredients in a bowl. Whisk milk, egg, and melted butter together. Combine both mixtures until smooth. Pour batter onto hot griddle and cook both sides until golden brown. Serve with syrup or fruits.",
    image:f4,
    time: "20 minutes"
  },
  {
    id: 4,
    title: "Vegetable Stir Fry",
    ingredients: [
      "1 cup broccoli florets",
      "1 cup bell peppers",
      "1 cup carrots (sliced)",
      "2 tbsp soy sauce",
      "1 tbsp olive oil",
      "1 tsp sesame oil"
    ],
    instruction:
      "Heat oil in a wok. Add vegetables and stir fry for 5 minutes. Add soy sauce and sesame oil. Cook until veggies are tender-crisp. Serve hot with rice or noodles.",
    image:f2,
    time: "15 minutes"
  },
  {
    id: 5,
    title: "Chocolate Brownies",
    ingredients: [
      "1/2 cup butter",
      "1 cup sugar",
      "2 eggs",
      "1/3 cup cocoa powder",
      "1/2 cup flour",
      "1 tsp vanilla extract"
    ],
    instruction:
      "Melt butter and mix with sugar and cocoa powder. Add eggs and vanilla, mix well. Stir in flour. Pour into a greased baking tray and bake at 180°C for 25–30 minutes. Let cool before cutting.",
    image:f3,
    time: "35 minutes"
  }
];

export default recipesData;
