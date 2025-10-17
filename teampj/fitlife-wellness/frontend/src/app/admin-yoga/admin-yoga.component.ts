import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Yoga {
  _id: string;
  name: string;
  sanskritName: string;
  description: string;
  instructions: string[];
  duration: number;
  difficulty: string;
  benefits: string[];
  poseType: string;
  imageUrl?: string;
}

@Component({
  selector: 'app-admin-yoga',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-yoga.component.html',
  styleUrl: './admin-yoga.component.css'
})
export class AdminYogaComponent implements OnInit {
  yoga: Yoga[] = [];
  isLoading: boolean = true;
  showForm: boolean = false;
  isEditing: boolean = false;
  editingYoga: Yoga | null = null;
  errorMessage: string = '';
  isSubmitting: boolean = false;

  // Form fields
  formData = {
    name: '',
    sanskritName: '',
    description: '',
    instructions: '',
    duration: '30',
    difficulty: '',
    benefits: '',
    poseType: ''
  };

  difficultyLevels = ['Beginner', 'Intermediate', 'Advanced'];
  poseTypes = ['Standing', 'Seated', 'Backbend', 'Twist', 'Forward Bend', 'Inversion', 'Balance', 'Restorative'];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.checkAuth();
    this.loadYoga();
  }

  checkAuth() {
    const token = localStorage.getItem('adminToken');
    const adminData = localStorage.getItem('adminData');

    if (!token || !adminData) {
      this.router.navigate(['/admin-login']);
      return;
    }
  }

  loadYoga() {
    const token = localStorage.getItem('adminToken');
    if (!token) return;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get('http://localhost:3000/api/admin/yoga', { headers })
      .subscribe({
        next: (response: any) => {
          this.yoga = response;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Failed to load yoga:', error);
          this.errorMessage = 'Failed to load yoga poses';
          this.isLoading = false;
        }
      });
  }

  openAddForm() {
    this.resetForm();
    this.showForm = true;
    this.isEditing = false;
  }

  editYoga(yogaPose: Yoga) {
    this.formData = {
      name: yogaPose.name,
      sanskritName: yogaPose.sanskritName,
      description: yogaPose.description,
      instructions: yogaPose.instructions.join('\n'),
      duration: yogaPose.duration.toString(),
      difficulty: yogaPose.difficulty,
      benefits: yogaPose.benefits.join(', '),
      poseType: yogaPose.poseType
    };
    this.editingYoga = yogaPose;
    this.showForm = true;
    this.isEditing = true;
  }

  cancelEdit() {
    this.showForm = false;
    this.resetForm();
    this.editingYoga = null;
    this.isEditing = false;
  }

  resetForm() {
    this.formData = {
      name: '',
      sanskritName: '',
      description: '',
      instructions: '',
      duration: '30',
      difficulty: '',
      benefits: '',
      poseType: ''
    };
    this.errorMessage = '';
  }

  saveYoga() {
    if (!this.validateForm()) {
      return;
    }

    this.isSubmitting = true;

    const token = localStorage.getItem('adminToken');
    if (!token) return;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const instructions = this.formData.instructions.split('\n').map(i => i.trim()).filter(i => i);
    const benefits = this.formData.benefits.split(',').map(b => b.trim()).filter(b => b);

    const yogaData = {
      name: this.formData.name,
      sanskritName: this.formData.sanskritName,
      description: this.formData.description,
      instructions: instructions,
      duration: parseInt(this.formData.duration),
      difficulty: this.formData.difficulty,
      benefits: benefits,
      poseType: this.formData.poseType
    };

    if (this.isEditing && this.editingYoga) {
      // Update existing yoga
      this.http.put(`http://localhost:3000/api/yoga/${this.editingYoga._id}`, yogaData, { headers })
        .subscribe({
          next: (response: any) => {
            this.isSubmitting = false;
            const index = this.yoga.findIndex(y => y._id === this.editingYoga!._id);
            if (index !== -1) {
              this.yoga[index] = response.yoga || response;
            }
            this.cancelEdit();
            alert('Yoga pose updated successfully');
          },
          error: (error) => {
            this.isSubmitting = false;
            console.error('Failed to update yoga:', error);
            this.errorMessage = 'Failed to update yoga pose';
          }
        });
    } else {
      // Add new yoga
      this.http.post('http://localhost:3000/api/yoga', yogaData, { headers })
        .subscribe({
          next: (response: any) => {
            this.isSubmitting = false;
            this.yoga.unshift(response.yoga || response);
            this.cancelEdit();
            alert('Yoga pose added successfully');
          },
          error: (error) => {
            this.isSubmitting = false;
            console.error('Failed to add yoga:', error);
            this.errorMessage = 'Failed to add yoga pose';
          }
        });
    }
  }

  validateForm(): boolean {
    if (!this.formData.name || !this.formData.description ||
        !this.formData.instructions || !this.formData.duration ||
        !this.formData.difficulty || !this.formData.poseType) {
      this.errorMessage = 'Please fill in all required fields';
      return false;
    }

    const duration = parseInt(this.formData.duration);
    if (duration <= 0) {
      this.errorMessage = 'Duration must be a positive number';
      return false;
    }

    return true;
  }

  deleteYoga(yogaPose: Yoga) {
    if (!confirm(`Are you sure you want to delete "${yogaPose.name}"? This action cannot be undone.`)) {
      return;
    }

    const token = localStorage.getItem('adminToken');
    if (!token) return;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.delete(`http://localhost:3000/api/yoga/${yogaPose._id}`, { headers })
      .subscribe({
        next: () => {
          this.yoga = this.yoga.filter(y => y._id !== yogaPose._id);
          alert('Yoga pose deleted successfully');
        },
        error: (error) => {
          console.error('Failed to delete yoga:', error);
          alert('Failed to delete yoga pose');
        }
      });
  }

  goBack() {
    this.router.navigate(['/admin-dashboard']);
  }
}
