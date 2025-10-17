import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface DashboardStats {
  users: number;
  foods: number;
  exercises: number;
  yoga: number;
  suggestions: number;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  stats: DashboardStats = {
    users: 0,
    foods: 0,
    exercises: 0,
    yoga: 0,
    suggestions: 0
  };
  isLoading: boolean = true;
  adminData: any = null;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.checkAuth();
    this.loadDashboardStats();
  }

  checkAuth() {
    const token = localStorage.getItem('adminToken');
    const adminData = localStorage.getItem('adminData');

    if (!token || !adminData) {
      this.router.navigate(['/admin-login']);
      return;
    }

    try {
      this.adminData = JSON.parse(adminData);
    } catch (error) {
      this.logout();
    }
  }

  loadDashboardStats() {
    const token = localStorage.getItem('adminToken');
    if (!token) return;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get('http://localhost:3000/api/admin/dashboard', { headers })
      .subscribe({
        next: (response: any) => {
          this.stats = response.stats || this.stats;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Failed to load dashboard stats:', error);
          this.isLoading = false;
        }
      });
  }

  logout() {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    this.router.navigate(['/admin-login']);
  }

  seedSampleData() {
    const token = localStorage.getItem('adminToken');
    if (!token) return;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    if (!confirm('This will add sample foods, exercises, and yoga poses to demonstrate the platform. Are you sure?')) {
      return;
    }

    this.http.post('http://localhost:3000/api/admin/seed-data', {}, { headers })
      .subscribe({
        next: (response: any) => {
          alert('Sample data added successfully! Please refresh the dashboard to see updated counts.');
          this.loadDashboardStats(); // Refresh the stats
        },
        error: (error) => {
          console.error('Failed to add sample data:', error);
          alert('Failed to add sample data');
        }
      });
  }
}
