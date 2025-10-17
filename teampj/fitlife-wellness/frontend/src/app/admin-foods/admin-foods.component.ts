import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Food {
  _id: string;
  name: string;
  type: string;
  description: string;
  nutrients: any;
  benefits: string[];
  category: string;
  imageUrl?: string;
}

@Component({
  selector: 'app-admin-foods',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-foods.component.html',
  styleUrl: './admin-foods.component.css'
})
export class AdminFoodsComponent implements OnInit {
  foods: Food[] = [];
  isLoading: boolean = true;
  showForm: boolean = false;
  isEditing: boolean = false;
  editingFood: Food | null = null;
  errorMessage: string = '';
  isSubmitting: boolean = false;

  // Form fields
  formData = {
    name: '',
    type: '',
    description: '',
    nutrients: '',
    benefits: '',
    category: ''
  };

  foodTypes = ['Fruit', 'Vegetable', 'Grain', 'Protein', 'Dairy'];
  categories = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert'];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.checkAuth();
    this.loadFoods();
  }

  checkAuth() {
    const token = localStorage.getItem('adminToken');
    const adminData = localStorage.getItem('adminData');

    if (!token || !adminData) {
      this.router.navigate(['/admin-login']);
      return;
    }
  }

  loadFoods() {
    const token = localStorage.getItem('adminToken');
    if (!token) return;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get('http://localhost:3000/api/admin/foods', { headers })
      .subscribe({
        next: (response: any) => {
          this.foods = response;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Failed to load foods:', error);
          this.errorMessage = 'Failed to load foods';
          this.isLoading = false;
        }
      });
  }

  openAddForm() {
    this.resetForm();
    this.showForm = true;
    this.isEditing = false;
  }

  editFood(food: Food) {
    this.formData = {
      name: food.name,
      type: food.type,
      description: food.description,
      nutrients: JSON.stringify(food.nutrients, null, 2),
      benefits: food.benefits.join(', '),
      category: food.category
    };
    this.editingFood = food;
    this.showForm = true;
    this.isEditing = true;
  }

  cancelEdit() {
    this.showForm = false;
    this.resetForm();
    this.editingFood = null;
    this.isEditing = false;
  }

  resetForm() {
    this.formData = {
      name: '',
      type: '',
      description: '',
      nutrients: '',
      benefits: '',
      category: ''
    };
    this.errorMessage = '';
  }

  saveFood() {
    if (!this.validateForm()) {
      return;
    }

    this.isSubmitting = true;

    const token = localStorage.getItem('adminToken');
    if (!token) return;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    try {
      const nutrients = JSON.parse(this.formData.nutrients);
      const benefits = this.formData.benefits.split(',').map(b => b.trim()).filter(b => b);

      const foodData = {
        name: this.formData.name,
        type: this.formData.type,
        description: this.formData.description,
        nutrients: nutrients,
        benefits: benefits,
        category: this.formData.category
      };

      if (this.isEditing && this.editingFood) {
        // Update existing food
        this.http.put(`http://localhost:3000/api/food/${this.editingFood._id}`, foodData, { headers })
          .subscribe({
            next: (response: any) => {
              this.isSubmitting = false;
              const index = this.foods.findIndex(f => f._id === this.editingFood!._id);
              if (index !== -1) {
                this.foods[index] = response.food;
              }
              this.cancelEdit();
              alert('Food updated successfully');
            },
            error: (error) => {
              this.isSubmitting = false;
              console.error('Failed to update food:', error);
              this.errorMessage = 'Failed to update food';
            }
          });
      } else {
        // Add new food
        this.http.post('http://localhost:3000/api/food', foodData, { headers })
          .subscribe({
            next: (response: any) => {
              this.isSubmitting = false;
              this.foods.unshift(response.food);
              this.cancelEdit();
              alert('Food added successfully');
            },
            error: (error) => {
              this.isSubmitting = false;
              console.error('Failed to add food:', error);
              this.errorMessage = 'Failed to add food';
            }
          });
      }
    } catch (error) {
      this.isSubmitting = false;
      this.errorMessage = 'Invalid nutrients JSON format';
    }
  }

  validateForm(): boolean {
    if (!this.formData.name || !this.formData.type || !this.formData.description ||
        !this.formData.nutrients || !this.formData.benefits || !this.formData.category) {
      this.errorMessage = 'Please fill in all required fields';
      return false;
    }

    try {
      JSON.parse(this.formData.nutrients);
    } catch (error) {
      this.errorMessage = 'Nutrients must be valid JSON format';
      return false;
    }

    return true;
  }

  deleteFood(food: Food) {
    if (!confirm(`Are you sure you want to delete "${food.name}"? This action cannot be undone.`)) {
      return;
    }

    const token = localStorage.getItem('adminToken');
    if (!token) return;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.delete(`http://localhost:3000/api/food/${food._id}`, { headers })
      .subscribe({
        next: () => {
          this.foods = this.foods.filter(f => f._id !== food._id);
          alert('Food deleted successfully');
        },
        error: (error) => {
          console.error('Failed to delete food:', error);
          alert('Failed to delete food');
        }
      });
  }

  goBack() {
    this.router.navigate(['/admin-dashboard']);
  }
}
