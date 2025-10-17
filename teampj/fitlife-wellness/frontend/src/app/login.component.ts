import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-indigo-100 flex">
      <!-- Left Side - Decorative -->
      <div class="hidden lg:flex lg:flex-1 lg:flex-col lg:justify-center lg:items-center p-12">
        <div class="max-w-md">
          <div class="text-center mb-8">
            <div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full mb-6">
              <span class="text-3xl">🌱</span>
            </div>
            <h2 class="text-3xl font-bold text-gray-900 mb-4">Welcome Back!</h2>
            <p class="text-gray-600 leading-relaxed">
              Continue your wellness journey with personalized health recommendations and guided activities.
            </p>
          </div>

          <div class="space-y-6">
            <div class="flex items-center space-x-4 p-4 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg">
              <div class="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center">
                <span class="text-xl">🏋️</span>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900">Smart Workouts</h3>
                <p class="text-sm text-gray-600">AI-powered fitness plans</p>
              </div>
            </div>

            <div class="flex items-center space-x-4 p-4 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg">
              <div class="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center">
                <span class="text-xl">🧘</span>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900">Mindful Yoga</h3>
                <p class="text-sm text-gray-600">Guided meditation sessions</p>
              </div>
            </div>

            <div class="flex items-center space-x-4 p-4 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg">
              <div class="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center">
                <span class="text-xl">🥗</span>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900">Healthy Nutrition</h3>
                <p class="text-sm text-gray-600">Personalized meal plans</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Side - Login Form -->
      <div class="flex-1 flex items-center justify-center p-6">
        <div class="w-full max-w-md">
          <!-- Back button -->
          <button
            (click)="goHome()"
            class="mb-8 flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            Back to Home
          </button>

          <!-- Login Card -->
          <div class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 p-8">
            <div class="text-center mb-8">
              <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-400 to-green-500 rounded-2xl mb-4">
                <span class="text-3xl">👋</span>
              </div>
              <h2 class="text-3xl font-bold text-gray-900">Welcome Back</h2>
              <p class="text-gray-600 mt-2">Sign in to your FitLife account</p>
            </div>

            <form (ngSubmit)="onSubmit()" #loginForm="ngForm" class="space-y-6">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <div class="relative">
                  <input
                    type="email"
                    [(ngModel)]="loginData.email"
                    name="email"
                    #email="ngModel"
                    required
                    email
                    class="w-full px-4 py-3 pl-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    placeholder="Enter your email"
                  >
                  <div class="absolute left-3 top-3.5 text-gray-400">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                <div class="relative">
                  <input
                    type="password"
                    [(ngModel)]="loginData.password"
                    name="password"
                    #password="ngModel"
                    required
                    minlength="6"
                    class="w-full px-4 py-3 pl-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    placeholder="Enter your password"
                  >
                  <div class="absolute left-3 top-3.5 text-gray-400">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                    </svg>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                [disabled]="!loginForm.valid || loading"
                class="group w-full relative bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-6 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:transform-none disabled:shadow-lg"
              >
                <span class="relative z-10">{{ loading ? 'Signing In...' : 'Sign In to Dashboard' }}</span>
                <div class="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div *ngIf="loading" class="absolute right-4 top-4">
                  <div class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                </div>
              </button>
            </form>

            <!-- Divider -->
            <div class="flex items-center my-6">
              <div class="flex-1 h-px bg-gray-200"></div>
              <span class="px-3 text-sm text-gray-500 bg-white">or</span>
              <div class="flex-1 h-px bg-gray-200"></div>
            </div>

            <!-- Sign Up Link -->
            <div class="text-center">
              <p class="text-gray-600 mb-4">New to FitLife Wellness?</p>
              <a
                routerLink="/register"
                class="inline-flex items-center px-6 py-3 border-2 border-emerald-400 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-500 font-semibold rounded-xl transition-all duration-300"
              >
                Create Free Account
                <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>

            <!-- Error Message -->
            <div *ngIf="errorMessage" class="mt-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl animate-fade-in">
              <div class="flex items-center">
                <svg class="w-5 h-5 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                {{ errorMessage }}
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

    .animate-slide-in {
      animation: slide-in 0.6s ease-out;
    }

    @keyframes slide-in {
      from {
        opacity: 0;
        transform: translateX(-30px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    .animate-bounce-gentle {
      animation: bounce-gentle 2s ease-in-out infinite;
    }

    @keyframes bounce-gentle {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-5px);
      }
    }

    /* Enhanced glass morphism */
    .backdrop-blur-sm {
      backdrop-filter: blur(12px) saturate(180%);
    }

    .glass-card {
      background: rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(16px) saturate(180%);
      border: 1px solid rgba(255, 255, 255, 0.2);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    }

    /* Enhanced input styles */
    .input-field {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .input-field:focus {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(16, 185, 129, 0.15);
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

    /* Icon animations */
    .icon-pulse {
      animation: icon-pulse 2s ease-in-out infinite;
    }

    @keyframes icon-pulse {
      0%, 100% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.1);
      }
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

    /* Form validation styles */
    .input-error {
      animation: shake 0.5s ease-in-out;
    }

    @keyframes shake {
      0%, 100% {
        transform: translateX(0);
      }
      25% {
        transform: translateX(-5px);
      }
      75% {
        transform: translateX(5px);
      }
    }

    /* Success states */
    .input-success {
      animation: success-pulse 0.6s ease-out;
    }

    @keyframes success-pulse {
      0% {
        transform: scale(1);
        box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7);
      }
      70% {
        transform: scale(1.05);
        box-shadow: 0 0 0 10px rgba(34, 197, 94, 0);
      }
      100% {
        transform: scale(1);
        box-shadow: 0 0 0 0 rgba(34, 197, 94, 0);
      }
    }

    /* Responsive improvements */
    @media (max-width: 768px) {
      .login-container {
        padding: 1rem;
      }

      .feature-card {
        margin-bottom: 1rem;
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
  `]
})
export class LoginComponent {
  loginData = {
    email: '',
    password: ''
  };
  loading = false;
  errorMessage = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    this.loading = true;
    this.errorMessage = '';

    this.http.post('http://localhost:3000/api/user/login', this.loginData).subscribe({
      next: (response: any) => {
        this.loading = false;
        if (typeof window !== 'undefined') {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
        }
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = error.error?.message || 'Login failed. Please try again.';
      }
    });
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
