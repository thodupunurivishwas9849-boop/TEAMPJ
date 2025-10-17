import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-training',
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
        <!-- Age Group Selection Section -->
        <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-8 mb-8" *ngIf="!selectedAgeGroup">
          <div class="text-center mb-8">
            <h2 class="text-3xl font-bold text-gray-900 mb-4">Select Your Age Group</h2>
            <p class="text-lg text-gray-600">Choose your age bracket to receive personalized exercise routines</p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <button
              *ngFor="let group of ageGroups"
              (click)="selectAgeGroup(group)"
              class="group bg-gradient-to-br from-white via-gray-50 to-blue-50/50 p-6 rounded-2xl border-2 border-gray-200 hover:border-blue-300 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 text-center"
            >
              <div class="w-12 h-12 {{ group.iconColor }} rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                <span class="text-2xl">{{ group.icon }}</span>
              </div>
              <h3 class="text-lg font-bold text-gray-900 mb-2">{{ group.name }}</h3>
              <p class="text-gray-600 text-sm">{{ group.description }}</p>
              <div class="mt-4 flex items-center justify-center text-blue-600 font-medium">
                <span>Select Group</span>
                <svg class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
            </button>
          </div>
        </div>

        <!-- Personalized Training Section -->
        <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-8" *ngIf="selectedAgeGroup">
          <div class="flex items-center justify-between mb-8">
            <div>
              <h2 class="text-3xl font-bold text-gray-900 mb-2">Personalized Training for {{ selectedAgeGroup.name }}</h2>
              <p class="text-lg text-gray-600">{{ selectedAgeGroup.description }}</p>
            </div>
            <button
              (click)="resetSelection()"
              class="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Change Age Group
            </button>
          </div>

          <!-- Training Overview -->
          <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-8 border border-blue-200">
            <h3 class="text-xl font-bold text-blue-900 mb-4">Your Customized Workout Plan</h3>
            <div class="grid md:grid-cols-3 gap-6">
              <div class="text-center">
                <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span class="text-2xl text-white">🧘</span>
                </div>
                <h4 class="font-bold text-blue-800 mb-1">Warm-up</h4>
                <p class="text-sm text-blue-600">{{ selectedAgeGroup.plan.warmupDuration }}</p>
              </div>
              <div class="text-center">
                <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span class="text-2xl text-white">💪</span>
                </div>
                <h4 class="font-bold text-blue-800 mb-1">Main Workout</h4>
                <p class="text-sm text-blue-600">{{ selectedAgeGroup.plan.mainDuration }}</p>
              </div>
              <div class="text-center">
                <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span class="text-2xl text-white">🧘‍♀️</span>
                </div>
                <h4 class="font-bold text-blue-800 mb-1">Cool Down</h4>
                <p class="text-sm text-blue-600">{{ selectedAgeGroup.plan.coolDownDuration }}</p>
              </div>
            </div>
            <div class="mt-4 p-4 bg-white/70 rounded-lg">
              <p class="text-blue-700 font-medium">💡 {{ selectedAgeGroup.plan.generalTips }}</p>
            </div>
          </div>

          <!-- Workout Phases -->
          <div class="space-y-8">
            <!-- Warm-up Phase -->
            <div class="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
              <div class="flex items-center mb-6">
                <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-4">
                  <span class="text-2xl text-white">🧘</span>
                </div>
                <div>
                  <h3 class="text-xl font-bold text-purple-900">Phase 1: Warm-up & Mobility</h3>
                  <p class="text-purple-700">Prepare your body and improve circulation</p>
                </div>
              </div>

              <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div *ngFor="let exercise of selectedAgeGroup.plan.warmup"
                     class="bg-white/80 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div class="flex items-start space-x-3">
                    <div class="w-10 h-10 {{ exercise.iconColor }} rounded-lg flex items-center justify-center flex-shrink-0">
                      <span class="text-lg">{{ exercise.emoji }}</span>
                    </div>
                    <div class="flex-1">
                      <h4 class="font-bold text-gray-900 mb-1">{{ exercise.name }}</h4>
                      <p class="text-sm text-gray-600 mb-2">{{ exercise.description }}</p>
                      <div class="flex items-center space-x-2">
                        <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          {{ exercise.duration }}
                        </span>
                        <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {{ exercise.difficulty }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Cardio Phase -->
            <div class="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
              <div class="flex items-center mb-6">
                <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mr-4">
                  <span class="text-2xl text-white">💓</span>
                </div>
                <div>
                  <h3 class="text-xl font-bold text-blue-900">Phase 2: Cardiovascular Exercise</h3>
                  <p class="text-blue-700">Improve heart health and endurance</p>
                </div>
              </div>

              <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div *ngFor="let exercise of selectedAgeGroup.plan.cardio"
                     class="bg-white/80 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div class="flex items-start space-x-3">
                    <div class="w-10 h-10 {{ exercise.iconColor }} rounded-lg flex items-center justify-center flex-shrink-0">
                      <span class="text-lg">{{ exercise.emoji }}</span>
                    </div>
                    <div class="flex-1">
                      <h4 class="font-bold text-gray-900 mb-1">{{ exercise.name }}</h4>
                      <p class="text-sm text-gray-600 mb-2">{{ exercise.description }}</p>
                      <div class="flex items-center space-x-2 mb-3">
                        <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {{ exercise.duration }}
                        </span>
                        <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {{ exercise.intensity }}
                        </span>
                      </div>
                      <ol class="text-xs text-gray-600 space-y-1">
                        <li *ngFor="let step of exercise.steps" class="flex">
                          <span class="inline-flex items-center justify-center w-3 h-3 bg-gray-300 text-gray-600 rounded-full mr-2 flex-shrink-0 text-xs">
                            {{ exercise.steps.indexOf(step) + 1 }}
                          </span>
                          <span>{{ step }}</span>
                        </li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Strength Training Phase -->
            <div class="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-6 border border-emerald-200">
              <div class="flex items-center mb-6">
                <div class="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl flex items-center justify-center mr-4">
                  <span class="text-2xl text-white">💪</span>
                </div>
                <div>
                  <h3 class="text-xl font-bold text-emerald-900">Phase 3: Strength Training</h3>
                  <p class="text-emerald-700">Build muscle strength and bone density</p>
                </div>
              </div>

              <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div *ngFor="let exercise of selectedAgeGroup.plan.strength"
                     class="bg-white/80 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div class="flex items-start space-x-3">
                    <div class="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span class="text-lg">{{ exercise.emoji }}</span>
                    </div>
                    <div class="flex-1">
                      <h4 class="font-bold text-gray-900 mb-1">{{ exercise.name }}</h4>
                      <p class="text-sm text-gray-600 mb-2">{{ exercise.description }}</p>
                      <div class="flex items-center space-x-2 mb-3">
                        <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                          {{ exercise.sets }} sets
                        </span>
                        <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                          {{ exercise.reps }}
                        </span>
                      </div>
                      <div class="text-xs text-emerald-600 font-medium">
                        🎯 {{ exercise.focus }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Cool Down Phase -->
            <div class="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200">
              <div class="flex items-center mb-6">
                <div class="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mr-4">
                  <span class="text-2xl text-white">🧘‍♀️</span>
                </div>
                <div>
                  <h3 class="text-xl font-bold text-indigo-900">Phase 4: Cool Down & Flexibility</h3>
                  <p class="text-indigo-700">Restore your body and promote recovery</p>
                </div>
              </div>

              <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div *ngFor="let exercise of selectedAgeGroup.plan.cooldown"
                     class="bg-white/80 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div class="flex items-start space-x-3">
                    <div class="w-10 h-10 {{ exercise.iconColor }} rounded-lg flex items-center justify-center flex-shrink-0">
                      <span class="text-lg">{{ exercise.emoji }}</span>
                    </div>
                    <div class="flex-1">
                      <h4 class="font-bold text-gray-900 mb-1">{{ exercise.name }}</h4>
                      <p class="text-sm text-gray-600 mb-2">{{ exercise.description }}</p>
                      <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                        {{ exercise.duration }}
                      </span>
                      <div class="mt-2 text-xs text-purple-600 font-medium">
                        🌿 {{ exercise.benefits }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Training Notes -->
          <div class="mt-8 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
            <h3 class="text-xl font-bold text-orange-900 mb-4">Important Training Notes</h3>
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <h4 class="font-bold text-orange-800 mb-2">Before You Start:</h4>
                <ul class="space-y-2 text-orange-700 text-sm">
                  <li *ngFor="let note of selectedAgeGroup.plan.beforeStart" class="flex items-start">
                    <span class="inline-flex items-center justify-center w-4 h-4 bg-orange-500 text-white rounded-full mr-2 flex-shrink-0 text-xs">!</span>
                    {{ note }}
                  </li>
                </ul>
              </div>
              <div>
                <h4 class="font-bold text-orange-800 mb-2">Recovery & Precautions:</h4>
                <ul class="space-y-2 text-orange-700 text-sm">
                  <li *ngFor="let precaution of selectedAgeGroup.plan.precautions" class="flex items-start">
                    <span class="inline-flex items-center justify-center w-4 h-4 bg-red-500 text-white rounded-full mr-2 flex-shrink-0 text-xs">⚠️</span>
                    {{ precaution }}
                  </li>
                </ul>
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
export class TrainingComponent {
  selectedAgeGroup: any = null;

  ageGroups = [
    {
      id: 'teen',
      name: '10–20 Years',
      description: 'Young adults and teenagers building healthy habits',
      icon: '🌱',
      iconColor: 'bg-green-500',
      plan: {
        warmupDuration: '5-8 minutes',
        mainDuration: '30-45 minutes',
        coolDownDuration: '5-10 minutes',
        generalTips: 'Focus on building proper form and enjoying exercise. Start gradually and listen to your body.',
        beforeStart: [
          'Consult with a parent or guardian',
          'Drink plenty of water',
          'Wear comfortable athletic wear',
          'Do not exercise if you feel unwell'
        ],
        precautions: [
          'Stop if you feel pain (beyond normal muscle fatigue)',
          'Warm up properly to prevent injuries',
          'Stay hydrated throughout exercise',
          'Take rest days when needed'
        ],
        warmup: [
          {
            name: 'March in Place',
            emoji: '🚶',
            iconColor: 'bg-purple-500',
            description: 'Light marching to increase heart rate',
            duration: '2 min',
            difficulty: 'Easy'
          },
          {
            name: 'Arm Circles',
            emoji: '🔄',
            iconColor: 'bg-purple-400',
            description: 'Gentle circular arm movements',
            duration: '1 min',
            difficulty: 'Easy'
          },
          {
            name: 'Shoulder Rolls',
            emoji: '🤷',
            iconColor: 'bg-purple-300',
            description: 'Circular shoulder movements',
            duration: '30 sec',
            difficulty: 'Easy'
          },
          {
            name: 'Dynamic Leg Swings',
            emoji: '🦵',
            iconColor: 'bg-purple-200',
            description: 'Gentle leg swings to loosen hips',
            duration: '1 min',
            difficulty: 'Easy'
          }
        ],
        cardio: [
          {
            name: 'Running/Jogging',
            emoji: '🏃‍♀️',
            iconColor: 'bg-blue-500',
            description: 'Build cardiovascular endurance',
            duration: '15-20 min',
            intensity: 'Moderate',
            steps: ['Start with slow jog/walk', 'Pick a comfortable pace', 'Use good running form', 'Breathe through nose and mouth']
          },
          {
            name: 'Jump Rope',
            emoji: '🪢',
            iconColor: 'bg-blue-400',
            description: 'Improve coordination and agility',
            duration: '5-10 min',
            intensity: 'High',
            steps: ['Start with feet together', 'Use soft landings', 'Swing rope from wrists', 'Maintain rhythm and pace']
          },
          {
            name: 'Step-ups',
            emoji: '📏',
            iconColor: 'bg-blue-300',
            description: 'Low impact cardio using stairs',
            duration: '10 min',
            intensity: 'Moderate',
            steps: ['Find a sturdy step or bench', 'Alternate stepping up/down', 'Keep core engaged', 'Use controlled movements']
          }
        ],
        strength: [
          {
            name: 'Push-ups',
            emoji: '💪',
            description: 'Build upper body strength',
            sets: 2,
            reps: '8-12',
            focus: 'Chest, shoulders, arms'
          },
          {
            name: 'Bodyweight Squats',
            emoji: '🏋️‍♀️',
            description: 'Strengthen legs and glutes',
            sets: 2,
            reps: '10-15',
            focus: 'Legs, hips, core'
          },
          {
            name: 'Plank',
            emoji: '🤸‍♀️',
            description: 'Build core stability',
            sets: 2,
            reps: '20-30 sec',
            focus: 'Core, shoulders'
          }
        ],
        cooldown: [
          {
            name: 'Stretching',
            emoji: '🧘‍♀️',
            iconColor: 'bg-indigo-500',
            description: 'Gentle static stretches',
            duration: '5 min',
            benefits: 'Improves flexibility and reduces muscle soreness'
          },
          {
            name: 'Deep Breathing',
            emoji: '🫁',
            iconColor: 'bg-indigo-400',
            description: 'Slow diaphragmatic breathing',
            duration: '2 min',
            benefits: 'Reduces heart rate and promotes relaxation'
          },
          {
            name: 'Comfy Cooling Pose',
            emoji: '😌',
            iconColor: 'bg-indigo-300',
            description: 'Relaxation in comfortable position',
            duration: '3 min',
            benefits: 'Allows body to recover and lowers blood pressure'
          }
        ]
      }
    },
    {
      id: 'young-adult',
      name: '21–35 Years',
      description: 'Peak physical performance and fitness building',
      icon: '⚡',
      iconColor: 'bg-blue-500',
      plan: {
        warmupDuration: '8-12 minutes',
        mainDuration: '45-60 minutes',
        coolDownDuration: '8-12 minutes',
        generalTips: 'Focus on progressive overload and maintaining proper form. Incorporate varied exercises for well-rounded fitness.',
        beforeStart: [
          'Proper meal 2-3 hours before workout',
          'Hydrate well throughout the day',
          'Wear appropriate athletic shoes',
          'Have water bottle ready'
        ],
        precautions: [
          'Warm up adequately to prevent strains',
          'Use proper form to avoid injuries',
          'Take rest days between intense sessions',
          'Stop if you experience sharp pain'
        ],
        warmup: [
          {
            name: 'Jumping Jacks',
            emoji: '🏃‍♀️',
            iconColor: 'bg-purple-500',
            description: 'Full body dynamic warm-up',
            duration: '2 min',
            difficulty: 'Easy'
          },
          {
            name: 'Inchworms',
            emoji: '👏',
            iconColor: 'bg-purple-400',
            description: 'Hamstring and calf mobilizer',
            duration: '2 min',
            difficulty: 'Medium'
          },
          {
            name: 'Rotator Cuff Warm-up',
            emoji: '🤹‍♀️',
            iconColor: 'bg-purple-300',
            description: 'Shoulder joint preparation',
            duration: '2 min',
            difficulty: 'Easy'
          },
          {
            name: 'Hip Opener Rotations',
            emoji: '🌀',
            iconColor: 'bg-purple-200',
            description: 'Loosens hip joints',
            duration: '2 min',
            difficulty: 'Medium'
          }
        ],
        cardio: [
          {
            name: 'Brisk Walking/Running',
            emoji: '🏃‍♀️',
            iconColor: 'bg-blue-500',
            description: 'Optimal cardiovascular training',
            duration: '20-30 min',
            intensity: 'Moderate-Vigorous',
            steps: ['Maintain conversational pace', 'Use heart rate zones for intensity', 'Include speed intervals', 'Focus on breathing rhythm']
          },
          {
            name: 'High-Intensity Intervals (HIIT)',
            emoji: '🚀',
            iconColor: 'bg-blue-400',
            description: 'Short bursts of intense activity',
            duration: '15-20 min',
            intensity: 'Very High',
            steps: ['Work hard for 30-60 seconds', 'Recover for 60-90 seconds', 'Repeat cycle 6-8 times', 'Monitor heart rate recovery']
          },
          {
            name: 'Stair Climbing',
            emoji: '🏔️',
            iconColor: 'bg-blue-300',
            description: 'Excellent cardiovascular challenge',
            duration: '15 min',
            intensity: 'High',
            steps: ['Use sturdy steps or climbing machine', 'Maintain rhythm and pace', 'Engage core for stability', 'Vary step pace occasionally']
          }
        ],
        strength: [
          {
            name: 'Standard Push-ups',
            emoji: '💪',
            description: 'Full upper body strength builder',
            sets: 3,
            reps: '12-15',
            focus: 'Chest, triceps, shoulders, core'
          },
          {
            name: 'Goblet Squats',
            emoji: '🏋️‍♀️',
            description: 'Hold weight for increased challenge',
            sets: 3,
            reps: '12-15',
            focus: 'Quadriceps, glutes, core'
          },
          {
            name: 'Dumbbell Rows',
            emoji: '🤼',
            description: 'One-arm back exercise with weight',
            sets: 3,
            reps: '10-12 per side',
            focus: 'Lats, rhomboids, rear shoulders'
          },
          {
            name: 'Lunge Variations',
            emoji: '🦵',
            description: 'Lateral or backward movement',
            sets: 3,
            reps: '10 per leg',
            focus: 'Quadriceps, glutes, balance'
          }
        ],
        cooldown: [
          {
            name: 'Full Body Stretching',
            emoji: '🧘‍♀️',
            iconColor: 'bg-indigo-500',
            description: 'Comprehensive static stretching routine',
            duration: '8-10 min',
            benefits: 'Prevents muscle tightness and improves range of motion'
          },
          {
            name: 'Progressive Muscle Relaxation',
            emoji: '😌',
            iconColor: 'bg-indigo-400',
            description: 'Tense and relax muscle groups systematically',
            duration: '3 min',
            benefits: 'Reduces muscle tension and promotes mental relaxation'
          },
          {
            name: 'Mindful Breathing',
            emoji: '🫁',
            iconColor: 'bg-indigo-300',
            description: 'Focused diaphragmatic breathing',
            duration: '4 min',
            benefits: 'Lowers cortisol and prepares mind for recovery'
          }
        ]
      }
    },
    {
      id: 'adult',
      name: '36–50 Years',
      description: 'Maintain fitness and prevent age-related decline',
      icon: '🔥',
      iconColor: 'bg-red-500',
      plan: {
        warmupDuration: '10-15 minutes',
        mainDuration: '40-50 minutes',
        coolDownDuration: '10-15 minutes',
        generalTips: 'Focus on joint health, gradual progression, and adequate recovery. Mix cardiovascular and strength training.',
        beforeStart: [
          'Eat 2-3 hours before workout',
          'Perform joint mobility assessment',
          'Wear supportive athletic shoes',
          'Keep water and towel handy'
        ],
        precautions: [
          'Listen to body and modify as needed',
          'Include adequate warm-up and cool-down',
          'Avoid exercising with pain',
          'Take longer recovery periods'
        ],
        warmup: [
          {
            name: 'Light Cardio Warm-up',
            emoji: '🚶',
            iconColor: 'bg-purple-500',
            description: 'Gentle cardiovascular preparation',
            duration: '4 min',
            difficulty: 'Easy'
          },
          {
            name: 'Dynamic Stretching',
            emoji: '🤸‍♀️',
            iconColor: 'bg-purple-400',
            description: 'Active stretches with movement',
            duration: '5 min',
            difficulty: 'Medium'
          },
          {
            name: 'Joint Mobilization',
            emoji: '🔄',
            iconColor: 'bg-purple-300',
            description: 'Gentle range of motion exercises',
            duration: '3 min',
            difficulty: 'Easy'
          },
          {
            name: 'Balance Activation',
            emoji: '⚖️',
            iconColor: 'bg-purple-200',
            description: 'Proprioception exercises',
            duration: '3 min',
            difficulty: 'Medium'
          }
        ],
        cardio: [
          {
            name: 'Brisk Walking',
            emoji: '🚶‍♀️',
            iconColor: 'bg-blue-500',
            description: 'Low-impact cardiovascular training',
            duration: '25-30 min',
            intensity: 'Moderate',
            steps: ['Maintain steady walking pace', 'Use proper posture', 'Swing arms naturally', 'Breathe rhythmically']
          },
          {
            name: 'Swimming',
            emoji: '🏊‍♀️',
            iconColor: 'bg-blue-400',
            description: 'Joint-friendly full body exercise',
            duration: '15-20 min',
            intensity: 'Moderate-High',
            steps: ['Choose comfortable swimming style', 'Focus on smooth strokes', 'Maintain neck alignment', 'Keep water temperature comfortable']
          },
          {
            name: 'Stationary Cycling',
            emoji: '🚲',
            iconColor: 'bg-blue-300',
            description: 'Controlled cycling at moderate intensity',
            duration: '20 min',
            intensity: 'Moderate',
            steps: ['Maintain proper bike setup', 'Pedal smoothly', 'Change resistance as needed', 'Keep focus on breathing technique']
          }
        ],
        strength: [
          {
            name: 'Modified Push-ups',
            emoji: '💪',
            description: 'On knees or wall - focus on form',
            sets: 3,
            reps: '10-12',
            focus: 'Chest, shoulders (modified for joint health)'
          },
          {
            name: 'Bodyweight Squats',
            emoji: '🏋️‍♀️',
            description: 'Controlled movement for strength',
            sets: 3,
            reps: '12-15',
            focus: 'Legs, glutes, maintaining mobility'
          },
          {
            name: 'Resistance Band Pulls',
            emoji: '🏗️',
            description: 'Low-resistance strength training',
            sets: 3,
            reps: '12-15',
            focus: 'Back, biceps (gentle resistance)'
          },
          {
            name: 'Wall Angel Exercises',
            emoji: '👼',
            description: 'Supported shoulder mobility',
            sets: 3,
            reps: '10',
            focus: 'Shoulder joint health'
          }
        ],
        cooldown: [
          {
            name: 'Comprehensive Stretching',
            emoji: '🧘‍♀️',
            iconColor: 'bg-indigo-500',
            description: 'Full body static stretching with longer holds',
            duration: '10 min',
            benefits: 'Prevents muscle stiffness and maintains range of motion'
          },
          {
            name: 'Foam Rolling',
            emoji: '🌀',
            iconColor: 'bg-indigo-400',
            description: 'Self myofascial release technique',
            duration: '3-5 min',
            benefits: 'Relieves muscle tension and improves tissue mobility'
          },
          {
            name: 'Gentle Walking',
            emoji: '🚶‍♂️',
            iconColor: 'bg-indigo-300',
            description: 'Low intensity movement to cool circulatory system',
            duration: '2-3 min',
            benefits: 'Assists recovery and prevents blood pooling'
          },
          {
            name: 'Recovery Breathing',
            emoji: '🫁',
            iconColor: 'bg-indigo-200',
            description: 'Conscious breathing for stress release',
            duration: '5 min',
            benefits: 'Lowers cortisol and initiates parasympathetic response'
          }
        ]
      }
    },
    {
      id: 'senior',
      name: '50+ Years',
      description: 'Gentle maintenance and fall prevention focus',
      icon: '🌅',
      iconColor: 'bg-orange-500',
      plan: {
        warmupDuration: '10-15 minutes',
        mainDuration: '30-45 minutes',
        coolDownDuration: '10-15 minutes',
        generalTips: 'Prioritize form over intensity, include balance work, and listen carefully to body signals. Focus on joint health.',
        beforeStart: [
          'Medical clearance if required',
          'Hydrate thoroughly beforehand',
          'Wear comfortable supportive shoes',
          'Have chair nearby for balance support'
        ],
        precautions: [
          'Stop immediately if experiencing dizziness',
          'Modify exercises for any joint pain',
          'Use support when balance feels unsteady',
          'Take longer rest periods between exercises'
        ],
        warmup: [
          {
            name: 'Gentle Marching',
            emoji: '🚶',
            iconColor: 'bg-purple-500',
            description: 'Very gentle movement warm-up',
            duration: '3 min',
            difficulty: 'Easy'
          },
          {
            name: 'Shoulder Rolls',
            emoji: '🤷‍♀️',
            iconColor: 'bg-purple-400',
            description: 'Gentle circular arm movements',
            duration: '2 min',
            difficulty: 'Easy'
          },
          {
            name: 'Hip Circles',
            emoji: '🌀',
            iconColor: 'bg-purple-300',
            description: 'Very gentle hip joint mobilization',
            duration: '3 min',
            difficulty: 'Easy'
          },
          {
            name: 'Balance Standing',
            emoji: '⚖️',
            iconColor: 'bg-purple-200',
            description: 'Stand with feet shoulder width',
            duration: '2 min',
            difficulty: 'Easy'
          }
        ],
        cardio: [
          {
            name: 'Gentle Walking',
            emoji: '🚶‍♀️',
            iconColor: 'bg-blue-500',
            description: 'Low-intensity walking for circulation',
            duration: '20-25 min',
            intensity: 'Light-Moderate',
            steps: ['Use sturdy walking shoes', 'Walk on level surfaces', 'Maintain good posture', 'Stop if feeling fatigued or dizzy']
          },
          {
            name: 'Chair Aerobics',
            emoji: '🪑',
            iconColor: 'bg-blue-400',
            description: 'Seated cardiovascular movements',
            duration: '15 min',
            intensity: 'Light',
            steps: ['Sit on sturdy chair', 'Perform gentle arm movements', 'Add seated marching as comfortable', 'Maintain steady breathing pace']
          },
          {
            name: 'Gentle Swimming',
            emoji: '🏊‍♀️',
            iconColor: 'bg-blue-300',
            description: 'Low-impact pool exercise',
            duration: '15-20 min',
            intensity: 'Light-Moderate',
            steps: ['Use pool rails for support', 'Maintain slow steady pace', 'Keep shoulders relaxed', 'Stop if feeling discomforted']
          }
        ],
        strength: [
          {
            name: 'Wall Push-ups',
            emoji: '🤲',
            description: 'Supported upper body strengthening',
            sets: 2,
            reps: '8-10',
            focus: 'Shoulders, arms (minimal joint stress)'
          },
          {
            name: 'Chair-assisted Squats',
            emoji: '🪑',
            description: 'Seated standing/sitting repetitions',
            sets: 2,
            reps: '8-10',
            focus: 'Legs, balance (with support)'
          },
          {
            name: 'Resistance Band Arm Work',
            emoji: '💪',
            description: 'Very light resistance exercises',
            sets: 2,
            reps: '8-10',
            focus: 'Arms, shoulder stability (gentle)'
          },
          {
            name: 'Toe Lifts',
            emoji: '🦶',
            description: 'Ankle strength for fall prevention',
            sets: 2,
            reps: '10 per foot',
            focus: 'Ankles, lower leg stability'
          }
        ],
        cooldown: [
          {
            name: 'Seated Full Body Stretches',
            emoji: '🧘‍♀️',
            iconColor: 'bg-indigo-500',
            description: 'Gentle seated stretching routines',
            duration: '10 min',
            benefits: 'Maintains flexibility and prevents muscle shortening'
          },
          {
            name: 'Neck and Shoulder Tension Release',
            emoji: '😌',
            iconColor: 'bg-indigo-400',
            description: 'Gentle neck rolls and shoulder shrugs',
            duration: '3 min',
            benefits: 'Reduces accumulated muscle tension from daily stress'
          },
          {
            name: 'Relaxation Breathing',
            emoji: '🌬️',
            iconColor: 'bg-indigo-300',
            description: 'Deep diaphragmatic breathing',
            duration: '5 min',
            benefits: 'Promotes parasympathetic nervous system activation'
          },
          {
            name: 'Light Walking Cool-down',
            emoji: '🚶‍♂️',
            iconColor: 'bg-indigo-200',
            description: 'Very gentle walking to continue circulation',
            duration: '4 min',
            benefits: 'Prevents blood pressure drop while exercise winds down'
          }
        ]
      }
    }
  ];

  constructor(private router: Router) {}

  selectAgeGroup(group: any) {
    this.selectedAgeGroup = group;
  }

  resetSelection() {
    this.selectedAgeGroup = null;
  }

  goToHome() {
    this.router.navigate(['/']);
  }
}
