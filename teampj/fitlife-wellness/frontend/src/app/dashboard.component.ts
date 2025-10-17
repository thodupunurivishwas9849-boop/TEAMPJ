import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-100">
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
              <div class="flex items-center space-x-2 px-3 py-2 bg-emerald-50 rounded-xl">
                <div class="w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
                  <span class="text-white font-semibold text-sm">
                    {{ currentUser?.name?.charAt(0)?.toUpperCase() || 'U' }}
                  </span>
                </div>
                <span class="text-gray-700 font-medium hidden sm:block">Welcome, {{ currentUser?.name }}</span>
              </div>
              <button
                (click)="logout()"
                class="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <!-- Main Content -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- User Profile Card -->
        <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-8 mb-8">
          <div class="flex items-center mb-6">
            <div class="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center mr-4">
              <span class="text-2xl">{{ currentUser?.name?.charAt(0)?.toUpperCase() }}</span>
            </div>
            <div>
              <h2 class="text-3xl font-bold text-gray-900 mb-1">Your Wellness Profile</h2>
              <p class="text-gray-600">Personalized health insights and recommendations</p>
            </div>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200">
              <div class="flex items-center mb-3">
                <div class="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
                <h3 class="font-bold text-blue-900">Full Name</h3>
              </div>
              <p class="text-blue-700 font-medium text-lg">{{ currentUser?.name }}</p>
            </div>

            <div class="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl border border-green-200">
              <div class="flex items-center mb-3">
                <div class="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <h3 class="font-bold text-green-900">Email</h3>
              </div>
              <p class="text-green-700 font-medium">{{ currentUser?.email }}</p>
            </div>

            <div class="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl border border-purple-200">
              <div class="flex items-center mb-3">
                <div class="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a4 4 0 118 0v4m-4 8v3m-4-3h8m0 0v3m0-3a4 4 0 11-8 0v3m4-11V1"></path>
                  </svg>
                </div>
                <h3 class="font-bold text-purple-900">Age & Gender</h3>
              </div>
              <p class="text-purple-700 font-medium">{{ currentUser?.age }} years old</p>
              <p class="text-purple-600 text-sm capitalize">{{ currentUser?.gender }}</p>
            </div>

            <div class="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-2xl border border-orange-200 md:col-span-2">
              <div class="flex items-center mb-3">
                <div class="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center mr-3">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                </div>
                <h3 class="font-bold text-orange-900">Health Goals & Issues</h3>
              </div>
              <p class="text-orange-700 font-medium">
                {{ currentUser?.healthIssues?.length ? currentUser.healthIssues.join(' • ') : 'General wellness & fitness' }}
              </p>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="grid md:grid-cols-3 gap-8 mb-12">
          <button
            (click)="getFoods()"
            class="group bg-white/80 backdrop-blur-sm hover:bg-white border border-green-200 hover:border-green-300 rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
          >
            <div class="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 mx-auto">
              <div class="text-3xl">🥗</div>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2 text-center">Healthy Foods</h3>
            <p class="text-gray-600 text-center leading-relaxed">Explore nutritious food options backed by health experts</p>
            <div class="mt-4 flex items-center justify-center text-green-600 font-medium">
              <span>Browse Recipes</span>
              <svg class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </div>
          </button>

          <button
            (click)="getExercises()"
            class="group bg-white/80 backdrop-blur-sm hover:bg-white border border-blue-200 hover:border-blue-300 rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
          >
            <div class="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 mx-auto">
              <div class="text-3xl">🏋️‍♀️</div>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2 text-center">Fitness Workouts</h3>
            <p class="text-gray-600 text-center leading-relaxed">Personalized exercise routines for all fitness levels</p>
            <div class="mt-4 flex items-center justify-center text-blue-600 font-medium">
              <span>Start Training</span>
              <svg class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </div>
          </button>

          <button
            (click)="getYogaPoses()"
            class="group bg-white/80 backdrop-blur-sm hover:bg-white border border-orange-200 hover:border-orange-300 rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
          >
            <div class="w-16 h-16 bg-gradient-to-br from-orange-400 to-pink-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 mx-auto">
              <div class="text-3xl">🧘‍♀️</div>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2 text-center">Yoga & Meditation</h3>
            <p class="text-gray-600 text-center leading-relaxed">Mindful yoga poses and meditation practices</p>
            <div class="mt-4 flex items-center justify-center text-orange-600 font-medium">
              <span>Begin Practice</span>
              <svg class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </div>
          </button>
        </div>

        <!-- Personalized Suggestions -->
        <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-8 mb-8">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <div class="flex items-center mb-2">
                <div class="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center mr-3">
                  <span class="text-lg">🎯</span>
                </div>
                <h2 class="text-2xl font-bold text-gray-900">Personalized Suggestions</h2>
              </div>
              <p class="text-gray-600">AI-powered recommendations based on your health profile</p>
            </div>
            <button
              (click)="getSuggestions()"
              class="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-medium"
            >
              <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
              Get Recommendations
            </button>
          </div>

          <div *ngIf="suggestions" class="space-y-8">
            <!-- Health Issue Banner -->
            <div class="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200">
              <div class="flex items-center">
                <div class="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-xl flex items-center justify-center mr-4">
                  <span class="text-xl">🏥</span>
                </div>
                <div>
                  <h3 class="text-lg font-bold text-indigo-900">Tailored for: {{ suggestions.healthIssue }}</h3>
                  <p class="text-indigo-700">Your wellness plan has been customized based on your health profile</p>
                </div>
              </div>
            </div>

            <div class="grid md:grid-cols-3 gap-8">
              <!-- Recommended Foods -->
              <div *ngIf="suggestions.recommendedFoods?.length > 0" class="space-y-4">
                <div class="flex items-center mb-4">
                  <div class="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center mr-3">
                    <span class="text-sm">🥗</span>
                  </div>
                  <h4 class="text-xl font-bold text-gray-900">Recommended Foods</h4>
                </div>
                <div class="space-y-3">
                  <div *ngFor="let food of suggestions.recommendedFoods.slice(0, 3)"
                       class="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200 hover:shadow-md transition-shadow">
                    <h5 class="font-bold text-green-900 mb-1">{{ food.name }}</h5>
                    <p class="text-sm text-green-700 leading-relaxed">{{ food.description }}</p>
                    <div class="flex items-center mt-2">
                      <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {{ food.nutrients?.[0] || 'Healthy' }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Exercises -->
              <div *ngIf="suggestions.exercises?.length > 0" class="space-y-4">
                <div class="flex items-center mb-4">
                  <div class="w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-lg flex items-center justify-center mr-3">
                    <span class="text-sm">🏋️‍♀️</span>
                  </div>
                  <h4 class="text-xl font-bold text-gray-900">Fitness Exercises</h4>
                </div>
                <div class="space-y-3">
                  <div *ngFor="let exercise of suggestions.exercises.slice(0, 3)"
                       class="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-200 hover:shadow-md transition-shadow">
                    <h5 class="font-bold text-blue-900 mb-1">{{ exercise.name }}</h5>
                    <p class="text-sm text-blue-700 leading-relaxed">{{ exercise.benefits?.[0] }}</p>
                    <div class="flex items-center justify-between mt-2">
                      <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {{ exercise.duration }} min
                      </span>
                      <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-cyan-100 text-cyan-800">
                        {{ exercise.difficulty }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Yoga Poses -->
              <div *ngIf="suggestions.yogaPoses?.length > 0" class="space-y-4">
                <div class="flex items-center mb-4">
                  <div class="w-8 h-8 bg-gradient-to-br from-orange-400 to-pink-500 rounded-lg flex items-center justify-center mr-3">
                    <span class="text-sm">🧘‍♀️</span>
                  </div>
                  <h4 class="text-xl font-bold text-gray-900">Yoga Poses</h4>
                </div>
                <div class="space-y-3">
                  <div *ngFor="let pose of suggestions.yogaPoses.slice(0, 3)"
                       class="bg-gradient-to-br from-orange-50 to-pink-50 p-4 rounded-xl border border-orange-200 hover:shadow-md transition-shadow">
                    <h5 class="font-bold text-orange-900 mb-1">{{ pose.poseName }}</h5>
                    <p class="text-sm text-orange-700 leading-relaxed">{{ pose.benefits?.[0] }}</p>
                    <div class="flex items-center justify-between mt-2">
                      <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                        {{ pose.duration }} sec
                      </span>
                      <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
                        {{ pose.difficulty }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Daily Tips -->
            <div *ngIf="suggestions.tips?.length > 0" class="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
              <div class="flex items-center mb-4">
                <div class="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center mr-3">
                  <span class="text-lg">💡</span>
                </div>
                <h4 class="text-xl font-bold text-gray-900">Daily Wellness Tips</h4>
              </div>
              <div class="grid md:grid-cols-2 gap-4">
                <div *ngFor="let tip of suggestions.tips" class="flex items-start">
                  <div class="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span class="text-white text-xs">✓</span>
                  </div>
                  <p class="text-gray-700 leading-relaxed">{{ tip }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div *ngIf="!suggestions && !loadingSuggestions" class="text-center py-12">
            <div class="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span class="text-4xl">🤖</span>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Ready for Personalized Recommendations?</h3>
            <p class="text-gray-600 max-w-md mx-auto leading-relaxed">
              Click "Get Recommendations" to receive AI-powered suggestions tailored specifically to your health profile and wellness goals.
            </p>
          </div>

          <!-- Loading State -->
          <div *ngIf="loadingSuggestions" class="text-center py-12">
            <div class="relative mb-6">
              <div class="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto">
                <span class="text-2xl">🤖</span>
              </div>
              <div class="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full animate-ping"></div>
            </div>
            <div class="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p class="text-lg font-semibold text-gray-900 mb-2">AI is analyzing your profile...</p>
            <p class="text-gray-600">Generating personalized wellness recommendations</p>
          </div>
        </div>

        <!-- Healthy Foods Content View -->
        <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-8" *ngIf="currentView && currentView.title === 'Healthy Foods'">
          <div class="flex items-center justify-between mb-8">
            <div class="flex items-center">
              <div class="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center mr-4">
                <span class="text-2xl">🥗</span>
              </div>
              <div>
                <h2 class="text-3xl font-bold text-gray-900">Healthy Foods</h2>
                <p class="text-gray-600">Nutrient-rich foods for optimal health and wellness</p>
              </div>
            </div>
            <button
              (click)="clearView()"
              class="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center transition-colors"
            >
              <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <!-- Food Categories Filter -->
          <div class="mb-8">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">Filter by Category</h3>
            <div class="flex flex-wrap gap-3">
              <button
                class="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
                [class.bg-green-100]="!selectedCategory"
                [class.text-green-800]="!selectedCategory"
                [class.bg-white]="selectedCategory"
                [class.text-gray-600]="selectedCategory"
                [class.border]="selectedCategory"
                [class.border-gray-300]="selectedCategory"
                (click)="filterFoods(null)">
                All Foods
              </button>
              <button *ngFor="let category of foodCategories"
                class="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
                [class.bg-green-100]="selectedCategory === category"
                [class.text-green-800]="selectedCategory === category"
                [class.bg-white]="selectedCategory !== category"
                [class.text-gray-600]="selectedCategory !== category"
                [class.border]="selectedCategory !== category"
                [class.border-gray-300]="selectedCategory !== category"
                (click)="filterFoods(category)">
                {{ category }}
              </button>
            </div>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div *ngFor="let food of getCurrentFoods()"
                 class="bg-gradient-to-br from-white to-green-50/50 p-6 rounded-2xl border border-green-200 hover:border-green-300 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
              <!-- Food Icon -->
              <div class="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <span class="text-2xl">{{ getFoodEmoji(food.category) }}</span>
              </div>

              <!-- Food Name & Category -->
              <div class="text-center mb-4">
                <h3 class="text-xl font-bold text-gray-900 mb-1 leading-tight">{{ food.name }}</h3>
                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {{ food.category }}
                </span>
              </div>

              <!-- Description -->
              <p class="text-gray-600 mb-4 leading-relaxed text-sm text-center">{{ food.description }}</p>

              <!-- Nutritional Info -->
              <div class="grid grid-cols-2 gap-3 mb-4">
                <div class="bg-green-50 p-3 rounded-xl text-center">
                  <div class="text-lg font-bold text-green-700">{{ food.calories }}</div>
                  <div class="text-xs text-green-600">Calories</div>
                </div>
                <div class="bg-blue-50 p-3 rounded-xl text-center">
                  <div class="text-lg font-bold text-blue-700">{{ food.protein }}g</div>
                  <div class="text-xs text-blue-600">Protein</div>
                </div>
                <div class="bg-orange-50 p-3 rounded-xl text-center">
                  <div class="text-lg font-bold text-orange-700">{{ food.fiber }}g</div>
                  <div class="text-xs text-orange-600">Fiber</div>
                </div>
                <div class="bg-purple-50 p-3 rounded-xl text-center">
                  <div class="text-lg font-bold text-purple-700">{{ food.fat }}g</div>
                  <div class="text-xs text-purple-600">Fat</div>
                </div>
              </div>

              <!-- Key Benefits -->
              <div class="mb-4">
                <div class="text-xs font-semibold text-green-700 uppercase tracking-wide mb-2">Key Benefits</div>
                <div class="flex flex-wrap gap-1">
                  <span *ngFor="let benefit of food.benefits?.slice(0, 3)"
                        class="inline-flex items-center px-2 py-1 rounded-md text-xs bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border border-green-200">
                    ✓ {{ benefit.length > 20 ? benefit.substring(0, 17) + '...' : benefit }}
                  </span>
                </div>
              </div>

              <!-- Special Nutrients -->
              <div *ngIf="food.nutrients" class="mb-4">
                <div class="text-xs font-semibold text-blue-700 uppercase tracking-wide mb-2">Rich in Nutrients</div>
                <div class="flex flex-wrap gap-1">
                  <span *ngFor="let nutrient of food.specialNutrients?.slice(0, 3)"
                        class="inline-flex items-center px-2 py-1 rounded-md text-xs bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 border border-blue-200">
                    {{ nutrient }}
                  </span>
                </div>
              </div>

              <!-- Serving Info -->
              <div class="bg-gray-50 p-3 rounded-xl mb-4">
                <div class="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Serving Size</div>
                <div class="text-sm text-gray-800 font-medium">{{ food.serving }}</div>
              </div>

              <!-- Action Buttons -->
              <div class="grid grid-cols-2 gap-3">
                <button class="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium py-2 px-4 rounded-xl transition-all duration-300 transform hover:scale-105">
                  Add to Plan
                </button>
                <button class="bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 font-medium py-2 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 border border-gray-300">
                  Learn More
                </button>
              </div>
            </div>
          </div>

          <!-- Load More -->
          <div class="text-center mt-8">
            <p class="text-gray-500 text-sm mb-4">
              {{ getCurrentFoods().length }} foods loaded • {{ allFoods?.length }} total available
            </p>
            <button class="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-medium">
              Load More Foods
            </button>
          </div>
        </div>

        <!-- Other Content Views (Exercises & Yoga) -->
        <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-8" *ngIf="currentView && currentView.title !== 'Healthy Foods'">
          <div class="flex items-center justify-between mb-8">
            <div class="flex items-center">
              <div class="w-12 h-12 bg-gradient-to-br from-indigo-400 to-blue-500 rounded-xl flex items-center justify-center mr-4">
                <span class="text-2xl">{{ currentView.title === 'Exercises' ? '🏋️‍♀️' : '🧘‍♀️' }}</span>
              </div>
              <div>
                <h2 class="text-3xl font-bold text-gray-900">{{ currentView.title }}</h2>
                <p class="text-gray-600">Explore and discover new {{ currentView.title.toLowerCase() }}</p>
              </div>
            </div>
            <button
              (click)="clearView()"
              class="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center transition-colors"
            >
              <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

            <div class="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
            <div *ngFor="let item of currentView.data"
                 class="bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 p-8 rounded-3xl border-2 border-blue-100 hover:border-purple-300 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 backdrop-blur-sm">
              <!-- Icon -->
              <div class="w-12 h-12 rounded-xl bg-gradient-to-br mb-4"
                   [class.from-blue-400]="currentView.title === 'Exercises'"
                   [class.to-cyan-500]="currentView.title === 'Exercises'"
                   [class.from-orange-400]="currentView.title === 'Yoga Poses'"
                   [class.to-pink-500]="currentView.title === 'Yoga Poses'"
                   style="display: flex; align-items: center; justify-content: center;">
                <span class="text-xl">{{ currentView.title === 'Exercises' ? '🏋️‍♀️' : '🧘‍♀️' }}</span>
              </div>

              <!-- Title -->
              <h3 class="text-xl font-bold text-gray-900 mb-3 leading-tight">{{ item.name || item.poseName }}</h3>

              <!-- Description -->
              <p class="text-gray-600 mb-4 leading-relaxed text-sm">{{ item.description || item.benefits?.[0] || 'Discover the benefits of this wellness practice' }}</p>

              <!-- Tags -->
              <div class="flex flex-wrap gap-2 mb-4">
                <span *ngIf="item.difficulty" class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
                      [class.bg-red-100]="item.difficulty === 'beginner'"
                      [class.text-red-800]="item.difficulty === 'beginner'"
                      [class.bg-yellow-100]="item.difficulty === 'intermediate'"
                      [class.text-yellow-800]="item.difficulty === 'intermediate'"
                      [class.bg-gray-100]="item.difficulty === 'advanced'"
                      [class.text-gray-800]="item.difficulty === 'advanced'">
                  {{ item.difficulty }}
                </span>
                <span *ngIf="item.duration" class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12,6 12,12 16,14"></polyline>
                  </svg>
                  {{ item.duration }} {{ currentView.title === 'Yoga Poses' ? 'sec' : 'min' }}
                </span>
              </div>

              <!-- Benefits/Instructions Preview -->
              <div *ngIf="item.benefits && item.benefits.length > 0" class="mb-4">
                <div class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Benefits</div>
                <div class="flex flex-wrap gap-1">
                  <span *ngFor="let benefit of item.benefits.slice(0, 2)"
                        class="inline-flex items-center px-2 py-1 rounded-md text-xs bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border border-green-200">
                    ✓ {{ benefit }}
                  </span>
                </div>
              </div>

              <!-- Instructions for Exercises/Yoga -->
              <div *ngIf="item.instructions && item.instructions.length > 0" class="mb-4">
                <div class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  {{ currentView.title === 'Yoga Poses' ? 'Instructions' : 'Steps' }}
                </div>
                <ol class="text-xs text-gray-600 space-y-1">
                  <li *ngFor="let instruction of item.instructions.slice(0, 2); let i = index" class="flex">
                    <span class="inline-flex items-center justify-center w-4 h-4 bg-gray-200 text-gray-600 rounded-full mr-2 flex-shrink-0 text-xs font-medium">
                      {{ i + 1 }}
                    </span>
                    <span class="leading-tight">{{ instruction }}</span>
                  </li>
                </ol>
              </div>

              <!-- Action Button -->
              <button class="w-full bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 font-medium py-2 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 border border-gray-300">
                Learn More
              </button>
            </div>
          </div>

          <!-- Show More Indicator -->
          <div *ngIf="currentView.data.length > 9" class="text-center mt-8">
            <p class="text-gray-500 text-sm">Showing 9 of {{ currentView.data.length }} items</p>
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

    /* Custom scrollbar */
    ::-webkit-scrollbar {
      width: 8px;
    }

    ::-webkit-scrollbar-track {
      background: #f1f5f9;
    }

    ::-webkit-scrollbar-thumb {
      background: linear-gradient(135deg, #10b981, #059669);
      border-radius: 4px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: linear-gradient(135deg, #059669, #047857);
    }

    /* Enhanced animations */
    .animate-fade-in {
      animation: fade-in 0.5s ease-out;
    }

    @keyframes fade-in {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .animate-slide-down {
      animation: slide-down 0.6s ease-out;
    }

    @keyframes slide-down {
      from {
        opacity: 0;
        transform: translateY(-30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .animate-pulse-gentle {
      animation: pulse-gentle 3s ease-in-out infinite;
    }

    @keyframes pulse-gentle {
      0%, 100% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.02);
      }
    }

    /* Enhanced glass morphism */
    .backdrop-blur-sm {
      backdrop-filter: blur(12px) saturate(180%);
    }

    .backdrop-blur-md {
      backdrop-filter: blur(16px) saturate(180%);
    }

    .glass-card {
      background: rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(16px) saturate(180%);
      border: 1px solid rgba(255, 255, 255, 0.2);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    }

    /* Enhanced button styles */
    .btn-primary {
      position: relative;
      overflow: hidden;
      background: linear-gradient(135deg, #10b981, #059669);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .btn-primary::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
      transition: left 0.6s;
    }

    .btn-primary:hover::before {
      left: 100%;
    }

    .btn-secondary {
      position: relative;
      overflow: hidden;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .btn-secondary::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      background: rgba(16, 185, 129, 0.1);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      transition: all 0.4s;
    }

    .btn-secondary:hover::before {
      width: 300px;
      height: 300px;
    }

    /* Loading spinner */
    .animate-spin {
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    /* Enhanced hover effects */
    .hover-lift {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .hover-lift:hover {
      transform: translateY(-8px) scale(1.02);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    }

    /* Card animations */
    .card-enter {
      animation: card-enter 0.6s ease-out;
    }

    @keyframes card-enter {
      from {
        opacity: 0;
        transform: translateY(20px) scale(0.95);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    /* Profile avatar animation */
    .avatar-pulse {
      animation: avatar-pulse 2s ease-in-out infinite;
    }

    @keyframes avatar-pulse {
      0%, 100% {
        box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4);
      }
      50% {
        box-shadow: 0 0 0 8px rgba(59, 130, 246, 0);
      }
    }

    /* Status indicators */
    .status-online {
      animation: status-online 2s ease-in-out infinite;
    }

    @keyframes status-online {
      0%, 100% {
        opacity: 1;
        transform: scale(1);
      }
      50% {
        opacity: 0.7;
        transform: scale(1.1);
      }
    }

    /* Responsive improvements */
    @media (max-width: 768px) {
      .dashboard-grid {
        grid-template-columns: 1fr;
        gap: 1rem;
      }

      .profile-card {
        padding: 1.5rem;
      }
    }

    /* Focus improvements for accessibility */
    .focus-ring:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.4);
    }

    /* Custom selection */
    ::selection {
      background: rgba(16, 185, 129, 0.3);
    }

    /* Print styles */
    @media print {
      .no-print {
        display: none !important;
      }
    }

    /* Dark mode support */
    @media (prefers-color-scheme: dark) {
      .glass-card {
        background: rgba(0, 0, 0, 0.2);
        border: 1px solid rgba(255, 255, 255, 0.1);
      }
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    }

    /* High contrast mode support */
    @media (prefers-contrast: high) {
      .glass-card {
        background: rgba(255, 255, 255, 0.9);
        border: 2px solid #000;
      }
    }
  `]
})
export class DashboardComponent implements OnInit {
  currentUser: any = null;
  suggestions: any = null;
  loadingSuggestions = false;
  currentView: any = null;
  selectedCategory: string | null = null;
  foodCategories: string[] = ['Fruits', 'Vegetables', 'Grains', 'Legumes', 'Nuts', 'Proteins', 'Dairy'];
  allFoods: any[] = [];
  allExercises: any[] = [];
  allYogaPoses: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    if (typeof window !== 'undefined') {
      this.loadUser();
      // Initialize with sample food data for demonstration
      this.initializeSampleFoods();
      this.initializeSampleExercises();
      this.initializeSampleYogaPoses();
    }
  }

  filterFoods(category: string | null) {
    this.selectedCategory = category;
  }

  getCurrentFoods() {
    if (!this.selectedCategory) {
      return this.allFoods;
    }
    return this.allFoods.filter(food => food.category === this.selectedCategory);
  }

  getFoodEmoji(category: string): string {
    const emojiMap: { [key: string]: string } = {
      'Fruits': '🍎',
      'Vegetables': '🥕',
      'Grains': '🌾',
      'Legumes': '🫘',
      'Nuts': '🥜',
      'Proteins': '🥩',
      'Dairy': '🥛'
    };
    return emojiMap[category] || '🍽️';
  }

  initializeSampleFoods() {
    this.allFoods = [
      // FRUITS
      { id: 1, name: 'Strawberries', category: 'Fruits', calories: 32, protein: 0.7, carbs: 7.7, fat: 0.3, fiber: 2, sugar: 4.9,
        description: 'Sweet, vibrant red berries packed with vitamin C and antioxidants.',
        benefits: ['Rich in vitamin C', 'High antioxidant capacity', 'Supports heart health'],
        specialNutrients: ['Vitamin C (130% RDA)', 'Manganese', 'Folate', 'Potassium', 'Fiber'],
        serving: '1 cup (144g)' },
      { id: 2, name: 'Blueberries', category: 'Fruits', calories: 57, protein: 0.7, carbs: 14.5, fat: 0.3, fiber: 2.4, sugar: 10,
        description: 'Small but powerful dark berries loaded with antioxidants and brain-boosting properties.',
        benefits: ['May improve memory', 'Supports urinary tract health', 'Reduces cardiovascular risk'],
        specialNutrients: ['Vitamin K', 'Manganese', 'Vitamin C', 'Fiber'],
        serving: '1 cup (148g)' },
      { id: 3, name: 'Avocados', category: 'Fruits', calories: 160, protein: 2, carbs: 8.5, fat: 14.7, fiber: 6.7, sugar: 0.7,
        description: 'Creamy, nutrient-dense fruit rich in healthy fats and supporting heart health.',
        benefits: ['Heart-healthy fats', 'Eye health support', 'Improves nutrient absorption'],
        specialNutrients: ['Potassium', 'Fiber', 'Folate', 'Vitamin K', 'Vitamin C'],
        serving: '1 medium avocado' },

      // VEGETABLES
      { id: 4, name: 'Kale', category: 'Vegetables', calories: 33, protein: 2.9, carbs: 5.5, fat: 0.5, fiber: 3.6, sugar: 1.3,
        description: 'Nutrient-packed leafy green known for exceptional nutritional profile.',
        benefits: ['Extremely high vitamins A, C, K', 'Rich antioxidants', 'May reduce cholesterol'],
        specialNutrients: ['Vitamin A (391% RDA)', 'Vitamin C', 'Vitamin K', 'Calcium', 'Copper'],
        serving: '1 cup chopped' },
      { id: 5, name: 'Sweet Potatoes', category: 'Vegetables', calories: 86, protein: 2, carbs: 20.1, fat: 0.1, fiber: 3.8, sugar: 6.5,
        description: 'Complex carbohydrate-rich tubers providing sustained energy and beta carotene.',
        benefits: ['Rich in beta carotene', 'Complex carbohydrates', 'Anti-inflammatory properties'],
        specialNutrients: ['Vitamin A', 'Vitamin C', 'Manganese', 'Potassium', 'Fiber'],
        serving: '1 medium potato' },
      { id: 6, name: 'Broccoli', category: 'Vegetables', calories: 31, protein: 2.5, carbs: 6.0, fat: 0.4, fiber: 2.4, sugar: 1.5,
        description: 'Cruciferous vegetable packed with vitamins and potent cancer-fighting compounds.',
        benefits: ['Contains sulforaphane', 'High vitamin C and K', 'Supports detoxification'],
        specialNutrients: ['Vitamin C', 'Vitamin K', 'Folate', 'Potassium'],
        serving: '1 cup chopped' },

      // GRAINS & LEGUMES
      { id: 7, name: 'Quinoa', category: 'Grains', calories: 111, protein: 4.4, carbs: 21.3, fat: 1.9, fiber: 2.6, sugar: 0.9,
        description: 'Complete protein grain providing all essential amino acids.',
        benefits: ['Complete protein', 'Rich in minerals', 'Heart-healthy fats', 'Gluten-free'],
        specialNutrients: ['Iron', 'Manganese', 'Phosphorus', 'Calcium'],
        serving: '1 cup cooked' },
      { id: 8, name: 'Chickpeas', category: 'Legumes', calories: 143, protein: 7.6, carbs: 27.6, fat: 4.6, fiber: 12.5, sugar: 4.8,
        description: 'Nutrient-dense legumes packed with plant-based protein and fiber.',
        benefits: ['Excellent plant protein', 'High soluble fiber', 'Rich B vitamins'],
        specialNutrients: ['Manganese', 'Folate', 'Copper', 'Iron'],
        serving: '1 cup cooked' },

      // NUTS & SEEDS
      { id: 9, name: 'Almonds', category: 'Nuts', calories: 579, protein: 21.2, carbs: 21.6, fat: 49.9, fiber: 12.5, sugar: 4.4,
        description: 'Nutrient-packed tree nuts rich in healthy fats and Vitamin E.',
        benefits: ['Excellent healthy fats', 'Rich Vitamin E', 'Supports heart health'],
        specialNutrients: ['Vitamin E', 'Magnesium', 'Calcium', 'Iron'],
        serving: '1 oz (28g)' },
      { id: 10, name: 'Chia Seeds', category: 'Seeds', calories: 486, protein: 16.5, carbs: 42.1, fat: 30.7, fiber: 34.4, sugar: 0,
        description: 'Tiny seeds packed with omega-3s, fiber, and complete protein.',
        benefits: ['Very high omega-3s', 'Extreme fiber content', 'Complete protein'],
        specialNutrients: ['Omega-3', 'Fiber', 'Calcium', 'Magnesium'],
        serving: '1 tbsp (12g)' },

      // PROTEIN SOURCES
      { id: 11, name: 'Salmon', category: 'Proteins', calories: 206, protein: 25.4, carbs: 0, fat: 12, fiber: 0, sugar: 0,
        description: 'Fatty fish rich in omega-3 fatty acids and high-quality protein.',
        benefits: ['Exceptional omega-3s', 'Complete protein', 'Rich B vitamins'],
        specialNutrients: ['Omega-3', 'Selenium', 'Vitamin B12', 'Vitamin D'],
        serving: '4 oz (113g)' },
      { id: 12, name: 'Greek Yogurt', category: 'Dairy', calories: 100, protein: 17, carbs: 6, fat: 2, fiber: 0, sugar: 4,
        description: 'Thick yogurt strained to concentrate protein content.',
        benefits: ['High-quality protein', 'Rich probiotics', 'Good calcium source'],
        specialNutrients: ['Protein (17g)', 'Probiotics', 'Calcium', 'Vitamin B12'],
        serving: '1 cup plain' }
    ];
  }

  loadUser() {
    // Skip during SSR - localStorage is not available
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') return;

    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!userData || !token) {
      this.router.navigate(['/login']);
      return;
    }

    this.currentUser = JSON.parse(userData);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }

  getFoods() {
    this.router.navigate(['/recipes']);
  }

  getExercises() {
    this.router.navigate(['/training']);
  }

  getYogaPoses() {
    this.router.navigate(['/yoga-meditation']);
  }

  getSuggestions() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.loadingSuggestions = true;
    this.suggestions = null;

    this.http.post('http://localhost:3000/api/suggestions/get', {}, { headers }).subscribe({
      next: (response: any) => {
        this.loadingSuggestions = false;
        this.suggestions = response;
      },
      error: (error) => {
        this.loadingSuggestions = false;
        console.error('Error fetching suggestions:', error);
      }
    });
  }

  clearView() {
    this.currentView = null;
  }

  initializeSampleExercises() {
    this.allExercises = [
      // UPPER BODY EXERCISES
      { id: 1, name: 'Push-ups', difficulty: 'intermediate', duration: 15,
        description: 'Classic bodyweight exercise targeting chest, shoulders, and triceps.',
        benefits: ['Builds upper body strength', 'Improves core stability', 'Boosts metabolism'],
        instructions: ['Assume plank position with hands under shoulders', 'Lower body toward ground while maintaining straight back', 'Push back up to starting position'] },

      { id: 2, name: 'Dumbbell Shoulder Press', difficulty: 'beginner', duration: 12,
        description: 'Effective exercise for building shoulder strength and muscle mass.',
        benefits: ['Develops shoulder muscles', 'Improves posture', 'Enhances stability'],
        instructions: ['Sit or stand with dumbbells at shoulder height', 'Press weights overhead until arms are fully extended', 'Lower weights to starting position with control'] },

      { id: 3, name: 'Bicep Curls', difficulty: 'beginner', duration: 10,
        description: 'Isolated exercise for building bicep muscles and forearm strength.',
        benefits: ['Strengthens biceps', 'Improves arm definition', 'Enhances grip strength'],
        instructions: ['Hold dumbbells with palms facing forward', 'Keep elbows close to sides and curl weights toward shoulders', 'Lower weights slowly to starting position'] },

      // LOWER BODY EXERCISES
      { id: 4, name: 'Squats', difficulty: 'beginner', duration: 20,
        description: 'Fundamental exercise targeting quadriceps, glutes, and core muscles.',
        benefits: ['Strengthens lower body', 'Improves balance and stability', 'Burns significant calories'],
        instructions: ['Stand with feet shoulder-width apart', 'Lower body by bending knees and pushing hips back', 'Return to standing position, keeping chest up and knees aligned with toes'] },

      { id: 5, name: 'Lunges', difficulty: 'intermediate', duration: 15,
        description: 'Unilateral exercise building strength and improving balance in legs.',
        benefits: ['Improves balance and coordination', 'Strengthens glutes and quads', 'Corrects muscle imbalances'],
        instructions: ['Take a large step forward', 'Lower back knee toward ground while keeping front knee at 90 degrees', 'Push off front foot and return to starting position'] },

      { id: 6, name: 'Calf Raises', difficulty: 'beginner', duration: 8,
        description: 'Targeted exercise for building calf muscles and improving ankle strength.',
        benefits: ['Strengthens calves', 'Improves ankle stability', 'Enhances balance'],
        instructions: ['Stand with feet hip-width apart', 'Raise heels off ground by contracting calves', 'Lower heels slowly back to ground'] },

      // CORE EXERCISES
      { id: 7, name: 'Plank', difficulty: 'intermediate', duration: 30,
        description: 'Isometric core exercise strengthening abdominal and stabilizing muscles.',
        benefits: ['Strengthens entire core', 'Improves posture', 'Enhances overall stability'],
        instructions: ['Assume forearm plank position', 'Keep body in straight line from head to heels', 'Maintain tight core and breathe normally'] },

      { id: 8, name: 'Russian Twists', difficulty: 'intermediate', duration: 12,
        description: 'Rotational exercise targeting obliques and improving rotational strength.',
        benefits: ['Strengthens obliques', 'Improves rotational power', 'Enhances core stability'],
        instructions: ['Sit with knees bent and feet off ground', 'Lean back slightly and twist torso side to side', 'Use weight or clasped hands for added resistance'] },

      { id: 9, name: 'Crunches', difficulty: 'beginner', duration: 20,
        description: 'Classic abdominal exercise targeting upper abdominal muscles.',
        benefits: ['Strengthens upper abs', 'Improves core definition', 'Enhances stability'],
        instructions: ['Lie on back with knees bent', 'Lift shoulders off ground toward knees', 'Lower shoulders back to ground with control'] }
    ];
  }

  initializeSampleYogaPoses() {
    this.allYogaPoses = [
      // STANDING POSES
      { id: 1, poseName: 'Tree Pose', difficulty: 'intermediate', duration: 30,
        description: 'Balance pose fostering stability and concentration.',
        benefits: ['Improves balance and stability', 'Strengthens legs and core', 'Enhances focus and concentration'],
        instructions: ['Stand on one foot with the other foot placed on thigh', 'Bring hands to heart center or overhead', 'Find a point of focus and breathe steadily'] },

      { id: 2, poseName: 'Warrior I', difficulty: 'beginner', duration: 45,
        description: 'Strength-building pose promoting power and concentration.',
        benefits: ['Strengthens legs and arms', 'Opens hips and chest', 'Builds stamina and focus'],
        instructions: ['Step one foot back and rotate front foot forward', 'Bend front knee and keep back leg straight', 'Extend arms overhead and gaze forward'] },

      { id: 3, poseName: 'Warrior II', difficulty: 'beginner', duration: 45,
        description: 'Powerful standing pose improving strength and concentration.',
        benefits: ['Strengthens legs and ankles', 'Opens hips and chest', 'Builds endurance and concentration'],
        instructions: ['Step feet wide apart and turn one foot out 90 degrees', 'Bend front knee and extend arms horizontally', 'Keep gaze over front hand'] },

      // SEATED POSES
      { id: 4, poseName: 'Seated Forward Bend', difficulty: 'intermediate', duration: 60,
        description: 'Forward bending pose promoting flexibility and inner calm.',
        benefits: ['Stretches hamstrings and back', 'Calms the mind', 'Relieves stress and anxiety'],
        instructions: ['Sit with legs extended forward', 'Hinge from hips and fold forward', 'Keep back straight and breathe deeply'] },

      { id: 5, poseName: 'Butterfly Pose', difficulty: 'beginner', duration: 90,
        description: 'Hip-opening pose creating space in groin and hips.',
        benefits: ['Opens hips and groin', 'Stretches inner thighs', 'Promotes relaxation'],
        instructions: ['Sit with soles of feet together and knees out to sides', 'Hold feet and gently press knees toward ground', 'Keep spine tall and breathe comfortably'] },

      { id: 6, poseName: 'Easy Pose', difficulty: 'beginner', duration: 120,
        description: 'Basic seated pose for meditation and breathing awareness.',
        benefits: ['Promotes calm and focus', 'Improves posture', 'Grounding breath awareness'],
        instructions: ['Sit cross-legged with hands resting on knees', 'Keep spine tall and shoulders relaxed', 'Focus on natural breath or counting'] },

      // BACKBENDS
      { id: 7, poseName: 'Camel Pose', difficulty: 'advanced', duration: 20,
        description: 'Deep backbend increasing spinal flexibility and chest opening.',
        benefits: ['Opens chest and shoulders', 'Stretches spine and hip flexors', 'Builds confidence and emotional release'],
        instructions: ['Kneel with hips lifted slightly', 'Place hands on heels and stretch chest forward', 'Carefully arch back while keeping neck neutral'] },

      { id: 8, poseName: 'Bridge Pose', difficulty: 'beginner', duration: 30,
        description: 'Supported backbend strengthening spine and opening heart.',
        benefits: ['Strengthens back and glutes', 'Opens chest and heart', 'Enhances energy flow'],
        instructions: ['Lie on back with knees bent and feet hip-width', 'Lift hips toward ceiling and clasp hands beneath', 'Roll shoulders under and press feet into ground'] },

      { id: 9, poseName: 'Fish Pose', difficulty: 'intermediate', duration: 25,
        description: 'Heart-opening pose with supported neck extension.',
        benefits: ['Opens neck and throat', 'Expands chest', 'Supports respiratory function'],
        instructions: ['Lie on back with knees bent', 'Arch back and place crown of head on ground', 'Keep legs active and chest lifted'] }
    ];
  }
}
