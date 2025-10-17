import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Exercise {
  _id: string;
  name: string;
  type: string;
  description: string;
  instructions: string[];
  duration: number;
  difficulty: string;
  muscles: string[];
  benefits?: string[];
  category?: string;
}

@Component({
  selector: 'app-admin-exercises',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-exercises.component.html',
  styleUrl: './admin-exercises.component.css'
})
export class AdminExercisesComponent implements OnInit {
  exercises: Exercise[] = [];
  isLoading: boolean = true;
  showForm: boolean = false;
  isEditing: boolean = false;
  editingExercise: Exercise | null = null;
  errorMessage: string = '';
  isSubmitting: boolean = false;

  // Form fields
  formData = {
    name: '',
    type: '',
    description: '',
    instructions: '',
    duration: 0,
    difficulty: '',
    muscles: '',
    benefits: '',
    category: ''
  };

  exerciseTypes = ['Cardio', 'Strength', 'Flexibility', 'Balance', 'HIIT', 'Endurance'];
  difficultyLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
  muscleGroups = ['Chest', 'Back', 'Shoulders', 'Arms', 'Core', 'Legs', 'Glutes', 'Full Body'];
  categories = ['Upper Body', 'Lower Body', 'Core', 'Full Body', 'Cardiovascular'];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.checkAuth();
    this.loadExercises();
  }

  checkAuth() {
    const token = localStorage.getItem('adminToken');
    const adminData = localStorage.getItem('adminData');

    if (!token || !adminData) {
      this.router.navigate(['/admin-login']);
      return;
    }
  }

  loadExercises() {
    const token = localStorage.getItem('adminToken');
    if (!token) return;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get('http://localhost:3000/api/admin/exercises', { headers })
      .subscribe({
        next: (response: any) => {
          this.exercises = response.exercises || response;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Failed to load exercises:', error);
          this.errorMessage = 'Failed to load exercises';
          this.isLoading = false;
        }
      });
  }

  openAddForm() {
    this.resetForm();
    this.showForm = true;
    this.isEditing = false;
  }

  editExercise(exercise: Exercise) {
    this.formData = {
      name: exercise.name,
      type: exercise.type,
      description: exercise.description,
      instructions: exercise.instructions.join('\n'),
      duration: exercise.duration || 0,
      difficulty: exercise.difficulty,
      muscles: exercise.muscles.join(', '),
      benefits: exercise.benefits?.join(', ') || '',
      category: exercise.category || ''
    };
    this.editingExercise = exercise;
    this.showForm = true;
    this.isEditing = true;
  }

  cancelEdit() {
    this.showForm = false;
    this.resetForm();
    this.editingExercise = null;
    this.isEditing = false;
  }

  resetForm() {
    this.formData = {
      name: '',
      type: '',
      description: '',
      instructions: '',
      duration: 0,
      difficulty: '',
      muscles: '',
      benefits: '',
      category: ''
    };
    this.errorMessage = '';
  }

  saveExercise() {
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
    const muscles = this.formData.muscles.split(',').map(m => m.trim()).filter(m => m);
    const benefits = this.formData.benefits ? this.formData.benefits.split(',').map(b => b.trim()).filter(b => b) : [];

    const exerciseData = {
      name: this.formData.name,
      type: this.formData.type,
      description: this.formData.description,
      instructions: instructions,
      duration: parseInt(this.formData.duration.toString()),
      difficulty: this.formData.difficulty,
      muscles: muscles,
      category: this.formData.category,
      ...(benefits.length > 0 && { benefits })
    };

    if (this.isEditing && this.editingExercise) {
      // Update existing exercise
      this.http.put(`http://localhost:3000/api/exercises/${this.editingExercise._id}`, exerciseData, { headers })
        .subscribe({
          next: (response: any) => {
            this.isSubmitting = false;
            const index = this.exercises.findIndex(e => e._id === this.editingExercise!._id);
            if (index !== -1) {
              this.exercises[index] = response.exercise || response;
            }
            this.cancelEdit();
            alert('Exercise updated successfully');
          },
          error: (error) => {
            this.isSubmitting = false;
            console.error('Failed to update exercise:', error);
            this.errorMessage = 'Failed to update exercise';
          }
        });
    } else {
      // Add new exercise
      this.http.post('http://localhost:3000/api/exercises', exerciseData, { headers })
        .subscribe({
          next: (response: any) => {
            this.isSubmitting = false;
            this.exercises.unshift(response.exercise || response);
            this.cancelEdit();
            alert('Exercise added successfully');
          },
          error: (error) => {
            this.isSubmitting = false;
            console.error('Failed to add exercise:', error);
            this.errorMessage = 'Failed to add exercise';
          }
        });
    }
  }

  validateForm(): boolean {
    if (!this.formData.name || !this.formData.type || !this.formData.description ||
        !this.formData.instructions || !this.formData.duration || !this.formData.difficulty ||
        !this.formData.muscles) {
      this.errorMessage = 'Please fill in all required fields';
      return false;
    }

    if (this.formData.duration <= 0) {
      this.errorMessage = 'Duration must be a positive number';
      return false;
    }

    return true;
  }

  deleteExercise(exercise: Exercise) {
    if (!confirm(`Are you sure you want to delete "${exercise.name}"? This action cannot be undone.`)) {
      return;
    }

    const token = localStorage.getItem('adminToken');
    if (!token) return;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.delete(`http://localhost:3000/api/exercises/${exercise._id}`, { headers })
      .subscribe({
        next: () => {
          this.exercises = this.exercises.filter(e => e._id !== exercise._id);
          alert('Exercise deleted successfully');
        },
        error: (error) => {
          console.error('Failed to delete exercise:', error);
          alert('Failed to delete exercise');
        }
      });
  }

  goBack() {
    this.router.navigate(['/admin-dashboard']);
  }
}
