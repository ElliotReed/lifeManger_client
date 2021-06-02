module.exports = {
	meals: [
		{
			id: 0,
			name: 'Skip Meal',
			recipe: {
				ingredients: ['Nothing'],
				steps: ['Dont eat'],
			},
		},
		{
			id: 1,
			name: 'Rice and Veggie Bowl',
			recipe: {
				ingredients: [
					'1/2 cup rice',
					'3/4 cup water',
					'2 cups veggies',
					'4 Ts. sauce',
					'3 shakes parmesean cheese',
				],
				steps: [
					'Microwave rice and water for 8 minutes',
					'Add veggies, microwave for anoter 7 minutes',
					'Add sauce and cheese',
				],
			},
		},
		{
			id: 2,
			name: 'Oatmeal',
			recipe: {
				ingredients: ['Oats', 'Fruit', 'Brown Sugar', 'Water'],
				steps: [
					'Mix oats and water. Ellie: 3/4 cup oats, 1 cup water. Daddy: 1 cup oats, 1 1/3 cup water',
					'Microwave for 2 min. 45 sec.',
					'Add fruit and brown sugar',
				],
			},
		},
		{
			id: 3,
			name: 'Nourish Bowl',
			recipe: {
				ingredients: [
					'Lettuce',
					'Bell Peppers',
					'Broccoli',
					'Cucumber',
					'Chicken',
					'Pineapple',
					'Peanuts',
				],
				steps: ['Mix ingredients in a bowl'],
			},
		},
		{
			id: 4,
			name: 'Chicken Wrap',
			recipe: {
				ingredients: ['Tortilla', 'Chicken', 'Lettuce', 'Mustard'],
				steps: [],
			},
		},
		{
			id: 5,
			name: 'Scrambled Eggs',
			recipe: {
				ingredients: ['2-4 Eggs', 'Green Chile Sauce', 'Bell Peppers'],
				steps: [],
			},
		},
		{
			id: 6,
			name: 'Rice Cakes with Peanut Butter',
			recipe: {
				ingredients: ['Rice cakes', 'Peanut butter'],
				steps: ['Spread peanut butter on rice cake'],
			},
		},
		{
			id: 7,
			name: 'Cereal',
			recipe: {
				ingredients: ['Cereal', 'Almond Milk', 'Fruit'],
				steps: ['Mix ingredients'],
			},
		},
		{
			id: 8,
			name: "Daddy's Eggs",
			recipe: {
				ingredients: ['4 Eggs', 'Black Beans', 'Fruit', 'Green Chile'],
				steps: ['Add 1 Tbl. water', 'Microwave, stir and check every 45 seconds', 'Mix in remaining ingredients'],
			},
		},
		{
			id: 9,
			name: 'Black Bean Veggie Burgers',
			recipe: {
				ingredients: ['2 Veggie Patties', '2 Tortillas', 'Fruit', 'Lettuce', 'Chips (20 g)'],
				steps: ['Microwave patties for 2:15 minutes', 'Put on tortilla'],
			},
		},
		{
			id: 10,
			name: 'Ramen Soup',
			recipe: {
				ingredients: ['Ramen Soup', '? cups Peas', '? grams Crackers', '? cups Water'],
				steps: ['Microwave for 4:30 minutes', 'Drain, stir in seasoning','Add peas and crackers'],
			},
		},
		{
			id: 11,
			name: 'Pasta',
			recipe: {
				ingredients: ['Spaghetti', 'Bread', 'Parmesean Cheese', 'Garlic', 'Dill Weed'],
				steps: ['Microwave pasta for 12 minutes', 'Strain and season', 'add parmesean'],
			},
		},
		{
			id: 12,
			name: 'Mac & Cheese',
			recipe: {
				ingredients: ['2 cups Pasta shells', '1 1/2 cups Vegetables', '4 oz Cheese'],
				steps: ['Microwave pasta for 12 minutes', 'Strain', 'Put cheese in bowl and microwave for 1 minute', 'Add pasta and stir', 'Add vegetables and stir'],
			},
		},
	],
	meal_plan: {
		breakfast: [0, 0, 0, 0, 0, 0, 0],
		lunch: [10, 3, 4, 2, 3, 4, 8],
		snack: [0, 6, 7, 6, 7, 6, 0],
		dinner: [1, 10, 9, 1, 11, 12, 1],
	},
};
