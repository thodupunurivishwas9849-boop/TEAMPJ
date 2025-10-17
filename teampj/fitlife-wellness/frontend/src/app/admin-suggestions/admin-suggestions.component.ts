import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Suggestion {
  _id: string;
  content: string;
  category: string;
  status: string;
  createdAt: string;
  userId: {
    _id: string;
    username: string;
    email: string;
  };
}

@Component({
  selector: 'app-admin-suggestions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-suggestions.component.html',
  styleUrl: './admin-suggestions.component.css'
})
export class AdminSuggestionsComponent implements OnInit {
  suggestions: Suggestion[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  // Computed properties for template
  get pendingCount(): number {
    return this.suggestions.filter(s => s.status === 'pending').length;
  }

  get approvedCount(): number {
    return this.suggestions.filter(s => s.status === 'approved').length;
  }

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.checkAuth();
    this.loadSuggestions();
  }

  checkAuth() {
    const token = localStorage.getItem('adminToken');
    const adminData = localStorage.getItem('adminData');

    if (!token || !adminData) {
      this.router.navigate(['/admin-login']);
      return;
    }
  }

  loadSuggestions() {
    const token = localStorage.getItem('adminToken');
    if (!token) return;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get('http://localhost:3000/api/admin/suggestions', { headers })
      .subscribe({
        next: (response: any) => {
          this.suggestions = response;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Failed to load suggestions:', error);
          this.errorMessage = 'Failed to load suggestions';
          this.isLoading = false;
        }
      });
  }

  deleteSuggestion(suggestion: Suggestion) {
    if (!confirm(`Are you sure you want to delete this suggestion? This action cannot be undone.`)) {
      return;
    }

    const token = localStorage.getItem('adminToken');
    if (!token) return;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.delete(`http://localhost:3000/api/admin/suggestions/${suggestion._id}`, { headers })
      .subscribe({
        next: () => {
          this.suggestions = this.suggestions.filter(s => s._id !== suggestion._id);
          alert('Suggestion deleted successfully');
        },
        error: (error) => {
          console.error('Failed to delete suggestion:', error);
          alert('Failed to delete suggestion');
        }
      });
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString() + ' ' + new Date(dateString).toLocaleTimeString();
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  getCategoryColor(category: string): string {
    const colors: { [key: string]: string } = {
      'food': 'bg-blue-100 text-blue-800',
      'exercise': 'bg-green-100 text-green-800',
      'yoga': 'bg-purple-100 text-purple-800',
      'general': 'bg-gray-100 text-gray-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  }

  goBack() {
    this.router.navigate(['/admin-dashboard']);
  }
}
