import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-indigo-100">
      <!-- Navigation -->
      <nav class="bg-white/80 backdrop-blur-md border-b border-white/50 shadow-lg">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <div class="flex items-center">
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-gradient-to-br from-emerald-400 to-green-500 rounded-lg flex items-center justify-center">
                  <span class="text-white font-bold text-sm">F</span>
                </div>
                <h1 class="text-xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                  FitLife Wellness
                </h1>
              </div>
            </div>
            <div class="flex items-center space-x-4">
              <button
                (click)="goToHome()"
                class="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold py-2 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                ← Back to Home
              </button>
            </div>
          </div>
        </div>
      </nav>

      <!-- Main Content -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Health Selection Section -->
        <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-8 mb-8" *ngIf="!selectedCondition">
          <div class="text-center mb-8">
            <h2 class="text-3xl font-bold text-gray-900 mb-4">Select Your Health Condition</h2>
            <p class="text-lg text-gray-600">Choose your health concern to receive personalized nutrition recommendations</p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <button
              *ngFor="let condition of healthConditions"
              (click)="selectCondition(condition)"
              class="group bg-gradient-to-br from-white via-gray-50 to-emerald-50/50 p-6 rounded-2xl border-2 border-gray-200 hover:border-emerald-300 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 text-left"
            >
              <div class="w-12 h-12 {{ condition.iconColor }} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <span class="text-2xl">{{ condition.icon }}</span>
              </div>
              <h3 class="text-lg font-bold text-gray-900 mb-2">{{ condition.name }}</h3>
              <p class="text-gray-600 text-sm">{{ condition.description }}</p>
              <div class="mt-4 flex items-center text-emerald-600 font-medium">
                <span>Select Condition</span>
                <svg class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
            </button>
          </div>
        </div>

        <!-- Personalized Recipes Section -->
        <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-8" *ngIf="selectedCondition">
          <div class="flex items-center justify-between mb-8">
            <div>
              <h2 class="text-3xl font-bold text-gray-900 mb-2">Personalized Recipes for {{ selectedCondition.name }}</h2>
              <p class="text-lg text-gray-600">{{ selectedCondition.description }}</p>
            </div>
            <button
              (click)="resetSelection()"
              class="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Change Condition
            </button>
          </div>

          <!-- Diet Overview -->
          <div class="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-6 mb-8 border border-emerald-200">
            <h3 class="text-xl font-bold text-emerald-900 mb-4">Recommended Diet Overview</h3>
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <h4 class="font-bold text-emerald-800 mb-2">Focus Foods:</h4>
                <ul class="space-y-1 text-emerald-700">
                  <li *ngFor="let food of selectedCondition.recommendations.focusFoods.slice(0, 5)">
                    ✓ {{ food }}
                  </li>
                </ul>
              </div>
              <div>
                <h4 class="font-bold text-emerald-800 mb-2">Foods to Limit:</h4>
                <ul class="space-y-1 text-red-700">
                  <li *ngFor="let food of selectedCondition.recommendations.limitFoods.slice(0, 5)">
                    X {{ food }}
                  </li>
                </ul>
              </div>
            </div>
            <div class="mt-4 p-4 bg-white/70 rounded-lg">
              <p class="text-emerald-700 font-medium">💡 {{ selectedCondition.recommendations.dietaryTips }}</p>
            </div>
          </div>

          <!-- Recipe Cards -->
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div *ngFor="let recipe of selectedCondition.recipes"
                 class="bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 p-6 rounded-3xl border-2 border-blue-100 hover:border-purple-300 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 backdrop-blur-sm">
              <div class="text-center mb-6">
                <div class="w-16 h-16 {{ recipe.iconColor }} rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <span class="text-3xl">{{ recipe.emoji }}</span>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">{{ recipe.name }}</h3>
                <div class="flex items-center justify-center space-x-2 mb-4">
                  <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {{ recipe.calories }} cal
                  </span>
                  <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {{ recipe.difficulty }}
                  </span>
                  <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    {{ recipe.time }} min
                  </span>
                </div>
              </div>

              <div class="mb-4">
                <h4 class="font-bold text-gray-800 mb-2">Ingredients:</h4>
                <ul class="text-sm text-gray-600 space-y-1">
                  <li *ngFor="let ingredient of recipe.ingredients.slice(0, 4)">
                    • {{ ingredient }}
                  </li>
                  <li *ngIf="recipe.ingredients.length > 4" class="text-xs text-gray-500">And {{ recipe.ingredients.length - 4 }} more...</li>
                </ul>
              </div>

              <div class="mb-4">
                <h4 class="font-bold text-gray-800 mb-2">Benefits for {{ selectedCondition.name }}:</h4>
                <ul class="text-sm text-emerald-700 space-y-1">
                  <li *ngFor="let benefit of recipe.benefits">
                    ✓ {{ benefit }}
                  </li>
                </ul>
              </div>

              <div class="mb-4">
                <h4 class="font-bold text-gray-800 mb-2">Preparation:</h4>
                <p class="text-sm text-gray-600 leading-relaxed">{{ recipe.description }}</p>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <button class="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium py-2 px-4 rounded-xl transition-all duration-300 transform hover:scale-105">
                  View Full Recipe
                </button>
                <button class="w-full bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 font-medium py-2 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 border border-gray-300">
                  Add to Plan
                </button>
              </div>
            </div>
          </div>

          <!-- Additional Tips -->
          <div class="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
            <h3 class="text-xl font-bold text-blue-900 mb-4">Additional Dietary Tips</h3>
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <h4 class="font-bold text-blue-800 mb-2">Morning Routine:</h4>
                <p class="text-blue-700">{{ selectedCondition.recommendations.morningRoutine }}</p>
              </div>
              <div>
                <h4 class="font-bold text-blue-800 mb-2">Evening Habits:</h4>
                <p class="text-blue-700">{{ selectedCondition.recommendations.eveningHabits }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
  `]
})
export class RecipesComponent {
  selectedCondition: any = null;

  healthConditions = [
    {
      id: 'high-bp',
      name: 'High Blood Pressure',
      description: 'Hypertension management through diet',
      icon: '💓',
      iconColor: 'bg-red-500',
      recommendations: {
        focusFoods: ['Leafy Greens', 'Fish', 'Cherries', 'Bananas', 'Oatmeal', 'Beets', 'Kale', 'Kiwi'],
        limitFoods: ['Salt', 'Processed Foods', 'Red Meat', 'High Sodium Foods'],
        dietaryTips: 'Follow DASH diet focusing on fruits, vegetables, whole grains, and low-fat dairy.',
        morningRoutine: 'Start with oatmeal, banana and herbal tea.',
        eveningHabits: 'Avoid caffeine after 2 PM, eat light dinner before 7 PM.'
      },
      recipes: [
        {
          name: 'Banana Oatmeal Bowl',
          emoji: '🍌',
          iconColor: 'bg-yellow-500',
          calories: 320,
          difficulty: 'Easy',
          time: 10,
          ingredients: ['Oatmeal (1/2 cup)', 'Banana', 'Cinnamon', 'Honey', 'Almonds'],
          benefits: ['Potassium for heart health', 'Fiber for digestion', 'Antioxidants for blood vessels'],
          description: 'Blend oats with sliced bananas and cinnamon for a heart-healthy breakfast.'
        },
        {
          name: 'Grilled Salmon Salad',
          emoji: '🐟',
          iconColor: 'bg-pink-500',
          calories: 285,
          difficulty: 'Medium',
          time: 25,
          ingredients: ['Salmon fillet', 'Mixed greens', 'Tomatoes', 'Olive oil', 'Lemon', 'Herbs'],
          benefits: ['Omega-3s reduce inflammation', 'Lean protein maintains muscle', 'Vitamins K& D for bones'],
          description: 'Fresh herbs and olive oil bring flavor without sodium.'
        },
        {
          name: 'Baked Beet Chips',
          emoji: '🍠',
          iconColor: 'bg-purple-500',
          calories: 150,
          difficulty: 'Easy',
          time: 35,
          ingredients: ['Beets', 'Olive oil', 'Salt substitute', 'Herbs'],
          benefits: ['Nitric oxide boosts circulation', 'Dietary nitrate converts to NO for vessels', 'Antioxidants reduce cholesterol'],
          description: 'Thinly sliced beets baked crisp provide nitric oxide your vessels need.'
        },
        {
          name: 'Kiwi Spinach Smoothie',
          emoji: '🥝',
          iconColor: 'bg-green-500',
          calories: 180,
          difficulty: 'Easy',
          time: 5,
          ingredients: ['Kiwi', 'Spinach', 'Greek yogurt', 'Honey', 'Flaxseeds'],
          benefits: ['Vitamins C&K strengthen vessels', 'Enzymes support circulation', 'Magnesium relaxes arteries'],
          description: 'Blend 2 kiwis, 2 cups spinach, yogurt, and honey for vitamin-C rich arteries.'
        },
        {
          name: 'Oatmeal Berry Bowl',
          emoji: '🫐',
          iconColor: 'bg-blue-500',
          calories: 290,
          difficulty: 'Easy',
          time: 15,
          ingredients: ['Oatmeal', 'Blueberries', 'Cherries', 'Cinnamon', 'Walnuts'],
          benefits: ['Anthocyanins prevent arterial stiffening', 'Flavanols relax blood vessels', 'Dietary fiber reduces cholesterol absorption'],
          description: 'Cashews optional - cherries add tartness while cinnamon amplifies sweetness.'
        }
      ]
    },
    {
      id: 'low-bp',
      name: 'Low Blood Pressure',
      description: 'Hypotension support through balanced nutrition',
      icon: '🩺',
      iconColor: 'bg-blue-500',
      recommendations: {
        focusFoods: ['Salt (in moderation)', 'Fluids', 'Caffeine', 'Protein', 'Vitamin B12', 'Folic Acid'],
        limitFoods: ['Large meals', 'Hot showers', 'Alcohol', 'Sudden position changes'],
        dietaryTips: 'Increase salt intake moderately, stay hydrated, and eat smaller, frequent meals.',
        morningRoutine: 'Start with saline solution and protein-rich breakfast.',
        eveningHabits: 'Avoid heavy evening meals, maintain hydration before bed.'
      },
      recipes: [
        {
          name: 'Salmon Protein Bowl',
          emoji: '🐟',
          iconColor: 'bg-pink-500',
          calories: 450,
          difficulty: 'Medium',
          time: 30,
          ingredients: ['Salmon fillet', 'Sweet potatoes', 'Broccoli', 'Salt', 'Herbs'],
          benefits: ['Complete protein supports energy', 'Omega-3s maintain vessel health', 'Vitamins B12 & D deficiency prevention'],
          description: 'Salt your salmon for blood pressure support.'
        },
        {
          name: 'Greek Yogurt Parfait',
          emoji: '🥛',
          iconColor: 'bg-white border-2 border-orange-500',
          calories: 380,
          difficulty: 'Easy',
          time: 10,
          ingredients: ['Greek yogurt', 'Granola', 'Berries', 'Honey', 'Nuts'],
          benefits: ['High protein stabilizes blood sugar', 'Nutrients support adrenal function', 'Balanced fats maintain energy'],
          description: 'Use full-fat yogurt for blood pressure support.'
        },
        {
          name: 'Spinach Egg Muffins',
          emoji: '🥚',
          iconColor: 'bg-white border-2 border-green-500',
          calories: 220,
          difficulty: 'Easy',
          time: 25,
          ingredients: ['Eggs', 'Spinach', 'Feta cheese', 'Mushrooms', 'Salt'],
          benefits: ['Complete protein with minerals', 'Vitamin-rich greens', 'High iron content'],
          description: 'Baked egg filling fluid needs when feeling dizzy in high pressure.'
        },
        {
          name: 'Nutty Energy Bars',
          emoji: '🥜',
          iconColor: 'bg-amber-500',
          calories: 320,
          difficulty: 'Medium',
          time: 45,
          ingredients: ['Almonds', 'Cashews', 'Dates', 'Honey', 'Sea salt'],
          benefits: ['Magnesium prevents muscle cramps during episodes', 'Natural electrolytes', 'Complex fats for sustained energy'],
          description: 'Salt these during baking for immediate absorption benefits.'
        },
        {
          name: 'Avocado Egg Salad',
          emoji: '🥑',
          iconColor: 'bg-green-500',
          calories: 380,
          difficulty: 'Easy',
          time: 15,
          ingredients: ['Avocados', 'Hard-boiled eggs', 'Lemon juice', 'Salt', 'Black pepper'],
          benefits: ['Healthy fats support adrenal glands', 'Complete proteins provide stable energy', 'Folic acid for blood cell production'],
          description: 'Healthy fats from avocados strengthen blood vessels for hypotension.'
        }
      ]
    },
    {
      id: 'diabetes',
      name: 'Diabetes/Sugar',
      description: 'Blood sugar management through low-glycemic nutrition',
      icon: '🩸',
      iconColor: 'bg-red-600',
      recommendations: {
        focusFoods: ['Low GI Carbohydrates', 'Lean Proteins', 'Healthy Fats', 'High Fiber', 'Non-starchy Vegetables'],
        limitFoods: ['Refined Sugars', 'White Carbohydrates', 'Sweetened Beverages', 'Trigger Foods'],
        dietaryTips: 'Follow low-glycemic eating, monitor portions, stay hydrated, and eat regular meals.',
        morningRoutine: 'Start with protein and vegetables, follow with whole grains.',
        eveningHabits: 'Light dinner of protein and vegetables 3 hours before bed.'
      },
      recipes: [
        {
          name: 'Quinoa Veggie Bowl',
          emoji: '🍚',
          iconColor: 'bg-yellow-600',
          calories: 340,
          difficulty: 'Medium',
          time: 35,
          ingredients: ['Quinoa', 'Mixed vegetables', 'Chicken breast', 'Olive oil', 'Herbs'],
          benefits: ['Low GI complex carbohydrates', 'High protein stabilizes blood sugar', 'Vegetable fiber slows glucose absorption'],
          description: 'Quinoa avoid rapid blood sugar increases, complex carbohydrates optimal for diabetes.'
        },
        {
          name: 'Greek Yogurt Bowl',
          emoji: '🥄',
          iconColor: 'bg-white border-2 border-orange-500',
          calories: 280,
          difficulty: 'Easy',
          time: 10,
          ingredients: ['Greek yogurt', 'Chia seeds', 'Berries', 'Cinnamon', 'Nuts'],
          benefits: ['High protein prevents glucagon response', 'Prebiotic fiber assists gut health', 'Antioxidants protect pancreatic cells'],
          description: 'Low sugar berries with cinnamon stabilize blood sugar perfectly for diabetes.'
        },
        {
          name: 'Grilled Chicken Salad',
          emoji: '🥗',
          iconColor: 'bg-green-500',
          calories: 320,
          difficulty: 'Easy',
          time: 20,
          ingredients: ['Chicken breast', 'Mixed greens', 'Cucumbers', 'Tomatoes', 'Dressing'],
          benefits: ['Lean protein promotes satiety', 'Low carb vegetables have minimal impact', 'Chlorophyll supports liver detoxification'],
          description: 'Glucose-absorbing compounds mitigate diabetic complications blood sugar management.'
        },
        {
          name: 'Sweet Potato Hash',
          emoji: '🍠',
          iconColor: 'bg-orange-500',
          calories: 290,
          difficulty: 'Medium',
          time: 25,
          ingredients: ['Sweet potatoes', 'Eggs', 'Spinach', 'Mushrooms', 'Olive oil'],
          benefits: ['Low GI compared to potatoes', 'Balanced protein + vegetable meal', 'Complex carbohydrates release slowly'],
          description: 'Sweet potatoes balanced meal supports blood sugar without spikes for diabetes.'
        },
        {
          name: 'Chickpea Curry',
          emoji: '🍛',
          iconColor: 'bg-yellow-500',
          calories: 350,
          difficulty: 'Medium',
          time: 40,
          ingredients: ['Chickpeas', 'Tomatoes', 'Onions', 'Spices', 'Coconut oil'],
          benefits: ['Plant protein stabilizes blood sugar', 'Complex carbohydrates release slowly', 'Cinnamon increases insulin sensitivity'],
          description: 'Soluble fiber chickpeas important for diabetic diets.'
        }
      ]
    },
    {
      id: 'obesity',
      name: 'Obesity',
      description: 'Weight management through nutrient-dense, portion-controlled eating',
      icon: '⚖️',
      iconColor: 'bg-orange-500',
      recommendations: {
        focusFoods: ['Vegetables', 'Lean Proteins', 'Whole Grains', 'Healthy Fats', 'Portion Control', 'High Volume/Low Calorie'],
        limitFoods: ['Fattening Foods', 'Sugary Beverages', 'Processed Snacks', 'Large Portions'],
        dietaryTips: 'Focus on whole foods, practice portion control, stay hydrated, and include regular physical activity.',
        morningRoutine: 'High-protein breakfast with vegetables and water.',
        eveningHabits: 'Light dinner before 7 PM, avoid grazing after dark.'
      },
      recipes: [
        {
          name: 'Vegetable Stir-Fry Bowl',
          emoji: '🥦',
          iconColor: 'bg-green-500',
          calories: 280,
          difficulty: 'Easy',
          time: 20,
          ingredients: ['Mixed vegetables', 'Tofu', 'Brown rice', 'Soy sauce', 'Ginger'],
          benefits: ['High volume/low calories satisfy hunger', 'Vegetable fiber promotes satiety', 'Protein prevents muscle loss during weight loss'],
          description: 'Broc oysters and partial beauty add nutrition to low calorie meal.'
        },
        {
          name: 'Grilled Tuna Salad',
          emoji: '🐟',
          iconColor: 'bg-gray-500',
          calories: 320,
          difficulty: 'Easy',
          time: 15,
          ingredients: ['Tuna steak', 'Mixed greens', 'Cucumber', 'Tomatoes', 'Lemon dressing'],
          benefits: ['Lean protein builds muscle', 'High volume greens fill you up', 'Omega-3s reduce inflammation during weight loss'],
          description: 'Bulk replacing nutrients makes satisfying meal that supports weight loss.'
        },
        {
          name: 'Egg White Omelet',
          emoji: '🥚',
          iconColor: 'bg-white border-2 border-yellow-500',
          calories: 180,
          difficulty: 'Easy',
          time: 10,
          ingredients: ['Egg whites', 'Spinach', 'Tomatoes', 'Mushrooms', 'Herbs'],
          benefits: ['High protein suppresses appetite', 'Vegetables add volume without calories', 'Nutrients support metabolic function during deficit'],
          description: 'Egg whites high protein suppresses hunger while keeping weight loss while counting calories.'
        },
        {
          name: 'Cauliflower Rice Bowl',
          emoji: '🥯',
          iconColor: 'bg-white border-2 border-green-500',
          calories: 250,
          difficulty: 'Medium',
          time: 25,
          ingredients: ['Cauliflower rice', 'Chicken breast', 'Broccoli', 'Green beans', 'Garlic'],
          benefits: ['Substitutes carb-heavy grains', 'Lean protein maintains muscle', 'High volume satisfies hunger', 'Low glycemic impact'],
          description: 'Riced cauliflower creates low-calorie substitute for carb-heavy rice or pasta starch.'
        },
        {
          name: 'Greek Yogurt Soufflé',
          emoji: '🥄',
          iconColor: 'bg-white border-2 border-orange-500',
          calories: 220,
          difficulty: 'Easy',
          time: 40,
          ingredients: ['Greek yogurt', 'Egg whites', 'Sugar substitute', 'Cinnamon', 'Berries'],
          benefits: ['High protein promotes satiety', 'Calcium supports bone health during weight loss', 'Natural probiotics improve digestion'],
          description: 'Satisfying yet low-calorie dessert maintains weight management goals.'
        }
      ]
    }
  ];

  constructor(private router: Router) {}

  selectCondition(condition: any) {
    this.selectedCondition = condition;
  }

  resetSelection() {
    this.selectedCondition = null;
  }

  goToHome() {
    this.router.navigate(['/']);
  }
}
