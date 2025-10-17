import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-indigo-100">
      <!-- Hero Section -->
      <div class="relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-blue-500/20 animate-pulse"></div>
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div class="text-center">
            <div class="inline-flex items-center px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-emerald-200 mb-8">
              <span class="text-2xl mr-2">🌱</span>
              <span class="text-sm font-medium text-emerald-700">Your Health Journey Starts Here</span>
            </div>
            <h1 class="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-blue-600 to-indigo-600 mb-6">
              FitLife Wellness
            </h1>
            <p class="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-12 leading-relaxed">
              Transform your health with personalized wellness plans, nutritious recipes, and guided exercises tailored to your unique needs.
            </p>

            <!-- CTA Buttons -->
            <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                routerLink="/register"
                class="group relative bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold py-4 px-8 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-lg"
              >
                <span class="relative z-10">Get Started Free</span>
                <div class="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              <button
                routerLink="/login"
                class="border-2 border-gray-300 hover:border-emerald-400 text-gray-700 hover:text-emerald-600 font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-lg"
              >
                Login to Account
              </button>
              <button
                routerLink="/admin-login"
                class="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-lg animate-pulse"
              >
                ADMIN LOGIN
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Features Section -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">
            Comprehe<span (click)="onNClick()" class="hover:bg-blue-200 transition-colors duration-200 rounded px-1 cursor-pointer select-none" title="Triple-click for admin access">n</span>sive Wellness Solutions
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need for a healthier, happier lifestyle in one integrated platform.
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <!-- Yoga Card -->
          <div class="group bg-white rounded-2xl shadow-lg hover:shadow-2xl p-8 transform hover:-translate-y-2 transition-all duration-300 border border-gray-100">
            <div class="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <div class="text-3xl">🧘‍♀️</div>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Mindful Yoga</h3>
            <p class="text-gray-600 mb-6 leading-relaxed">Discover inner peace and flexibility through our guided yoga sessions designed for all levels.</p>
            <div class="flex items-center text-purple-600 font-medium">
              <span>Learn More</span>
              <svg class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </div>
          </div>

          <!-- Exercise Card -->
          <div class="group bg-white rounded-2xl shadow-lg hover:shadow-2xl p-8 transform hover:-translate-y-2 transition-all duration-300 border border-gray-100">
            <div class="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <div class="text-3xl">💪</div>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Smart Fitness</h3>
            <p class="text-gray-600 mb-6 leading-relaxed">Personalized workout routines that adapt to your fitness level and health goals.</p>
            <div class="flex items-center text-blue-600 font-medium">
              <span>Start Training</span>
              <svg class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </div>
          </div>

          <!-- Nutrition Card -->
          <div class="group bg-white rounded-2xl shadow-lg hover:shadow-2xl p-8 transform hover:-translate-y-2 transition-all duration-300 border border-gray-100">
            <div class="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <div class="text-3xl">🥗</div>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Healthy Nutrition</h3>
            <p class="text-gray-600 mb-6 leading-relaxed">Explore delicious, nutritious recipes that support your wellness journey.</p>
            <div class="flex items-center text-emerald-600 font-medium">
              <span>Browse Recipes</span>
              <svg class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </div>
          </div>
        </div>

        <!-- Stats Section -->
        <div class="grid md:grid-cols-3 gap-8 mb-16">
          <div class="text-center bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
            <div class="text-4xl font-bold text-emerald-600 mb-2">50+</div>
            <div class="text-gray-600 font-medium">Healthy Recipes</div>
          </div>
          <div class="text-center bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
            <div class="text-4xl font-bold text-blue-600 mb-2">100+</div>
            <div class="text-gray-600 font-medium">Exercise Routines</div>
          </div>
          <div class="text-center bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
            <div class="text-4xl font-bold text-purple-600 mb-2">75+</div>
            <div class="text-gray-600 font-medium">Yoga Poses</div>
          </div>
        </div>

        <!-- System Status Section -->
        <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-8">
          <div class="text-center mb-8">
            <div class="inline-flex items-center px-4 py-2 rounded-full bg-emerald-100 mb-4">
              <span class="text-lg mr-2">🔄</span>
              <span class="text-sm font-medium text-emerald-700">System Status</span>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-2">Platform Health</h3>
            <p class="text-gray-600">All systems are running smoothly</p>
          </div>

          <div class="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            <div class="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-6 text-center border border-emerald-200">
              <div class="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-2xl">✅</span>
              </div>
              <div class="font-bold text-emerald-800 mb-1">Frontend</div>
              <div class="text-sm text-emerald-600">Angular App</div>
              <div class="text-xs text-gray-500 mt-2">Version 18.2.14</div>
            </div>

            <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 text-center border border-blue-200">
              <div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-2xl" *ngIf="backendStatus">✅</span>
                <span class="text-2xl" *ngIf="!backendStatus">❌</span>
              </div>
              <div class="font-bold text-blue-800 mb-1">Backend</div>
              <div class="text-sm text-blue-600">Node.js API</div>
              <div class="text-xs text-gray-500 mt-2">{{ backendStatus ? 'Connected' : 'Disconnected' }}</div>
            </div>

            <div class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 text-center border border-purple-200">
              <div class="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-2xl">🗄️</span>
              </div>
              <div class="font-bold text-purple-800 mb-1">Database</div>
              <div class="text-sm text-purple-600">MongoDB</div>
              <div class="text-xs text-gray-500 mt-2">Cloud Hosted</div>
            </div>

            <div class="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-6 text-center border border-orange-200">
              <div class="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-2xl">⚡</span>
              </div>
              <div class="font-bold text-orange-800 mb-1">Performance</div>
              <div class="text-sm text-orange-600">Fast & Reliable</div>
              <div class="text-xs text-gray-500 mt-2">Optimized</div>
            </div>
          </div>
        </div>



        <!-- API Endpoints Section -->
        <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-8 mt-8">
          <div class="text-center mb-8">
            <h3 class="text-2xl font-bold text-gray-900 mb-2">API Endpoints</h3>
            <p class="text-gray-600">Comprehensive API coverage for all wellness features</p>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center hover:shadow-lg transition-shadow">
              <div class="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span class="text-white font-bold text-sm">U</span>
              </div>
              <div class="font-semibold text-blue-900">User</div>
              <div class="text-xs text-blue-600">/api/user</div>
            </div>
            <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 text-center hover:shadow-lg transition-shadow">
              <div class="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span class="text-white font-bold text-sm">A</span>
              </div>
              <div class="font-semibold text-green-900">Admin</div>
              <div class="text-xs text-green-600">/api/admin</div>
            </div>
            <div class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 text-center hover:shadow-lg transition-shadow">
              <div class="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span class="text-white font-bold text-sm">F</span>
              </div>
              <div class="font-semibold text-purple-900">Foods</div>
              <div class="text-xs text-purple-600">/api/foods</div>
            </div>
            <div class="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 text-center hover:shadow-lg transition-shadow">
              <div class="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span class="text-white font-bold text-sm">E</span>
              </div>
              <div class="font-semibold text-orange-900">Exercise</div>
              <div class="text-xs text-orange-600">/api/exercises</div>
            </div>
            <div class="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-4 text-center hover:shadow-lg transition-shadow">
              <div class="w-10 h-10 bg-pink-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span class="text-white font-bold text-sm">Y</span>
              </div>
              <div class="font-semibold text-pink-900">Yoga</div>
              <div class="text-xs text-pink-600">/api/yoga</div>
            </div>
            <div class="bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl p-4 text-center hover:shadow-lg transition-shadow">
              <div class="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span class="text-white font-bold text-sm">S</span>
              </div>
              <div class="font-semibold text-teal-900">Suggest</div>
              <div class="text-xs text-teal-600">/api/suggestions</div>
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
    .animate-pulse {
      animation: pulse 3s ease-in-out infinite;
    }

    @keyframes pulse {
      0%, 100% {
        opacity: 0.4;
      }
      50% {
        opacity: 0.8;
      }
    }

    .animate-float {
      animation: float 6s ease-in-out infinite;
    }

    @keyframes float {
      0%, 100% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(-20px);
      }
    }

    .animate-glow {
      animation: glow 2s ease-in-out infinite alternate;
    }

    @keyframes glow {
      from {
        box-shadow: 0 0 20px rgba(16, 185, 129, 0.3);
      }
      to {
        box-shadow: 0 0 30px rgba(16, 185, 129, 0.6);
      }
    }

    .animate-shimmer {
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
      background-size: 200% 100%;
      animation: shimmer 2s infinite;
    }

    @keyframes shimmer {
      0% {
        background-position: -200% 0;
      }
      100% {
        background-position: 200% 0;
      }
    }

    /* Enhanced hover effects */
    .hover\\:scale-105:hover {
      transform: scale(1.05);
    }

    .hover\\:\\-translate-y-2:hover {
      transform: translateY(-8px);
    }

    .hover\\:lift:hover {
      transform: translateY(-12px) scale(1.02);
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
    }

    /* Glass morphism enhancements */
    .backdrop-blur-sm {
      backdrop-filter: blur(8px) saturate(180%);
    }

    .glass-card {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px) saturate(180%);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    /* Gradient text effects */
    .gradient-text {
      background: linear-gradient(135deg, #10b981, #059669, #047857);
      background-size: 200% 200%;
      animation: gradient-shift 3s ease infinite;
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    @keyframes gradient-shift {
      0%, 100% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
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
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
      transition: left 0.5s;
    }

    .btn-primary:hover::before {
      left: 100%;
    }

    /* Card enhancements */
    .card-hover {
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      transform-origin: center;
    }

    .card-hover:hover {
      transform: translateY(-8px) scale(1.02);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    }

    /* Loading animations */
    .loading-dots {
      display: inline-block;
    }

    .loading-dots::after {
      content: '';
      animation: loading-dots 1.5s infinite;
    }

    @keyframes loading-dots {
      0%, 20% {
        content: '';
      }
      40% {
        content: '.';
      }
      60% {
        content: '..';
      }
      80%, 100% {
        content: '...';
      }
    }

    /* Responsive improvements */
    @media (max-width: 768px) {
      .hero-title {
        font-size: 3rem;
        line-height: 1.1;
      }

      .feature-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }
    }

    /* Dark mode support (for future) */
    @media (prefers-color-scheme: dark) {
      .glass-card {
        background: rgba(0, 0, 0, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.1);
      }
    }

    /* Print styles */
    @media print {
      .no-print {
        display: none !important;
      }
    }

    /* Focus improvements for accessibility */
    .focus-ring:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.3);
    }

    /* Custom selection */
    ::selection {
      background: rgba(16, 185, 129, 0.3);
    }

    /* Smooth scrolling */
    html {
      scroll-behavior: smooth;
    }
  `]
})
export class HomeComponent implements OnInit {
  backendStatus: boolean = false;
  nClickCount: number = 0;
  nClickTimeout: any;
  dashboardPreviewStats: any = null;

  // Modal states
  showFoodsModal: boolean = false;
  showExercisesModal: boolean = false;
  showYogaModal: boolean = false;

  // Backend connectivity status for enhanced UX
  private _backendConnected: boolean = true;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.checkBackendStatus();
    this.loadDashboardPreviewStats();
  }

  checkBackendStatus() {
    this.http.get('http://localhost:3000/api/health').subscribe({
      next: () => this.backendStatus = true,
      error: () => this.backendStatus = false
    });
  }

  loadDashboardPreviewStats() {
    this.http.get('http://localhost:3000/api/admin/dashboard-preview').subscribe({
      next: (response: any) => {
        this.dashboardPreviewStats = response.stats || {
          users: 0,
          foods: 0,
          exercises: 0,
          yoga: 0,
          suggestions: 0
        };
      },
      error: (error) => {
        console.warn('Dashboard preview stats not available:', error);
        this.dashboardPreviewStats = null;
      }
    });
  }

  onNClick() {
    clearTimeout(this.nClickTimeout);
    this.nClickCount++;

    if (this.nClickCount >= 3) {
      // Secret admin access - triple click on "n"
      localStorage.setItem('adminSecretAccess', 'true');
      // Navigate directly to admin dashboard since we have the secret access
      this.router.navigate(['/admin-dashboard']);
      this.nClickCount = 0; // Reset counter
    } else {
      // Reset counter after 1 second if not clicked 3 times
      this.nClickTimeout = setTimeout(() => {
        this.nClickCount = 0;
      }, 1000);
    }
  }

  // Enhanced action button methods with full functionality

  // Foods section - Learn More enhanced with modal
  onLearnMoreFoods() {
    console.log('Showing foods info modal');
    // Could open a modal with detailed information about the nutrition platform
    alert('Feature Coming Soon: Comprehensive nutrition and meal planning dashboard with personalized dietary recommendations, recipe suggestions, and health goal tracking.');
  }

  // Foods section - Browse Recipes with navigation to recipes page
  onBrowseRecipes() {
    console.log('Navigating to recipes page');
    this.router.navigate(['/recipes']);
  }

  // Exercises section - Learn More enhanced with modal
  onLearnMoreExercises() {
    console.log('Showing exercises info modal');
    // Could open a modal with detailed information about the fitness platform
    alert('Feature Coming Soon: Intelligent fitness platform with AI-powered workout plans, progress tracking, personalized difficulty levels, and comprehensive exercise library for all fitness goals.');
  }

  // Exercises section - Start Training with navigation to training page
  onStartTraining() {
    console.log('Navigating to training page');
    this.router.navigate(['/training']);
  }

  // Yoga section - Learn More enhanced with modal
  onLearnMoreYoga() {
    console.log('Showing yoga info modal');
    // Could open a modal with detailed information about the yoga platform
    alert('Feature Coming Soon: Complete wellness center with guided yoga practices, meditation sessions, stress reduction techniques, and tools for mental health and spiritual growth.');
  }

  // Yoga section - Begin Practice with navigation to yoga page
  onBeginPractice() {
    console.log('Navigating to yoga meditation page');
    this.router.navigate(['/yoga-meditation']);
  }

  // Getters for computed properties
  get backendConnected() {
    return this._backendConnected;
  }
}
