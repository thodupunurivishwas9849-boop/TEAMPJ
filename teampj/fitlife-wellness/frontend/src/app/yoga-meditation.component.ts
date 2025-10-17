import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-yoga-meditation',
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
        <!-- Header Section -->
        <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-8 mb-8">
          <div class="text-center mb-8">
            <h2 class="text-3xl font-bold text-gray-900 mb-4">Yoga & Meditation Center</h2>
            <p class="text-lg text-gray-600">Discover inner peace, flexibility, and mindfulness through guided practices</p>
          </div>

          <!-- Practice Overview -->
          <div class="grid md:grid-cols-3 gap-6 mb-8">
            <div class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 text-center border border-purple-200">
              <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-2xl text-white">🧘‍♀️</span>
              </div>
              <h3 class="text-xl font-bold text-purple-900 mb-2">Yoga Poses</h3>
              <p class="text-purple-700">{{ yogaPoses.length }} poses for all levels</p>
            </div>
            <div class="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 text-center border border-blue-200">
              <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-2xl text-white">🧘</span>
              </div>
              <h3 class="text-xl font-bold text-blue-900 mb-2">Meditation</h3>
              <p class="text-blue-700">{{ meditationTechniques.length }} techniques for mindfulness</p>
            </div>
            <div class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 text-center border border-green-200">
              <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-2xl text-white">🌿</span>
              </div>
              <h3 class="text-xl font-bold text-green-900 mb-2">Benefits</h3>
              <p class="text-green-700">Physical & mental wellness</p>
            </div>
          </div>
        </div>

        <!-- Yoga Poses Section -->
        <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-8 mb-8">
          <div class="flex items-center mb-8">
            <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-4">
              <span class="text-2xl text-white">🧘‍♀️</span>
            </div>
            <div>
              <h2 class="text-3xl font-bold text-gray-900">Yoga Poses (Asanas)</h2>
              <p class="text-gray-600">Traditional poses for strength, flexibility, and inner peace</p>
            </div>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div *ngFor="let pose of yogaPoses"
                 class="bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30 p-6 rounded-3xl border-2 border-purple-100 hover:border-pink-300 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 backdrop-blur-sm">
              <div class="text-center mb-6">
                <div class="w-16 h-16 {{ pose.iconColor }} rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <span class="text-3xl">{{ pose.emoji }}</span>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">{{ pose.name }}</h3>
                <p class="text-sm text-gray-600 mb-2">{{ pose.sanskritName }}</p>
                <div class="flex items-center justify-center space-x-2 mb-4">
                  <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    {{ pose.difficulty }}
                  </span>
                  <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
                    {{ pose.duration }} min
                  </span>
                  <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    {{ pose.poseType }}
                  </span>
                </div>
              </div>

              <div class="mb-4">
                <h4 class="font-bold text-gray-800 mb-2">Benefits:</h4>
                <ul class="text-sm text-purple-700 space-y-1">
                  <li *ngFor="let benefit of pose.benefits">
                    ✓ {{ benefit }}
                  </li>
                </ul>
              </div>

              <div class="mb-4">
                <h4 class="font-bold text-gray-800 mb-2">Instructions:</h4>
                <ol class="text-sm text-gray-600 space-y-1">
                  <li *ngFor="let instruction of pose.instructions; let i = index" class="flex">
                    <span class="inline-flex items-center justify-center w-4 h-4 bg-purple-200 text-purple-600 rounded-full mr-2 flex-shrink-0 text-xs">
                      {{ i + 1 }}
                    </span>
                    <span>{{ instruction }}</span>
                  </li>
                </ol>
              </div>

              <div class="mb-4">
                <h4 class="font-bold text-gray-800 mb-2">Contraindications:</h4>
                <p class="text-sm text-red-600">{{ pose.contraindications }}</p>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <button class="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-medium py-2 px-4 rounded-xl transition-all duration-300 transform hover:scale-105">
                  Practice Pose
                </button>
                <button class="w-full bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 font-medium py-2 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 border border-gray-300">
                  View Video
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Meditation Techniques Section -->
        <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-8 mb-8">
          <div class="flex items-center mb-8">
            <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mr-4">
              <span class="text-2xl text-white">🧘</span>
            </div>
            <div>
              <h2 class="text-3xl font-bold text-gray-900">Meditation Techniques</h2>
              <p class="text-gray-600">Mindfulness practices for mental clarity and emotional balance</p>
            </div>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div *ngFor="let technique of meditationTechniques"
                 class="bg-gradient-to-br from-white via-blue-50/30 to-cyan-50/30 p-6 rounded-3xl border-2 border-blue-100 hover:border-cyan-300 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 backdrop-blur-sm">
              <div class="text-center mb-6">
                <div class="w-16 h-16 {{ technique.iconColor }} rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <span class="text-3xl">{{ technique.emoji }}</span>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">{{ technique.name }}</h3>
                <p class="text-sm text-gray-600 mb-2">{{ technique.type }}</p>
                <div class="flex items-center justify-center space-x-2 mb-4">
                  <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {{ technique.duration }} min
                  </span>
                  <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-cyan-100 text-cyan-800">
                    {{ technique.level }}
                  </span>
                </div>
              </div>

              <div class="mb-4">
                <h4 class="font-bold text-gray-800 mb-2">Benefits:</h4>
                <ul class="text-sm text-blue-700 space-y-1">
                  <li *ngFor="let benefit of technique.benefits">
                    ✓ {{ benefit }}
                  </li>
                </ul>
              </div>

              <div class="mb-4">
                <h4 class="font-bold text-gray-800 mb-2">How to Practice:</h4>
                <ol class="text-sm text-gray-600 space-y-1">
                  <li *ngFor="let step of technique.steps; let i = index" class="flex">
                    <span class="inline-flex items-center justify-center w-4 h-4 bg-blue-200 text-blue-600 rounded-full mr-2 flex-shrink-0 text-xs">
                      {{ i + 1 }}
                    </span>
                    <span>{{ step }}</span>
                  </li>
                </ol>
              </div>

              <div class="mb-4">
                <h4 class="font-bold text-gray-800 mb-2">Best Time:</h4>
                <p class="text-sm text-green-600">{{ technique.bestTime }}</p>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <button class="w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-medium py-2 px-4 rounded-xl transition-all duration-300 transform hover:scale-105">
                  Start Session
                </button>
                <button class="w-full bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 font-medium py-2 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 border border-gray-300">
                  Guided Audio
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Wellness Tips Section -->
        <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-8">
          <div class="text-center mb-8">
            <h2 class="text-3xl font-bold text-gray-900 mb-4">Daily Wellness Tips</h2>
            <p class="text-lg text-gray-600">Integrate yoga and meditation into your daily routine</p>
          </div>

          <div class="grid md:grid-cols-2 gap-8">
            <div class="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-6 border border-emerald-200">
              <div class="flex items-center mb-4">
                <div class="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center mr-3">
                  <span class="text-lg">🌅</span>
                </div>
                <h3 class="text-xl font-bold text-emerald-900">Morning Practice</h3>
              </div>
              <ul class="space-y-2 text-emerald-700 text-sm">
                <li class="flex items-start">
                  <span class="text-emerald-500 mr-2">•</span>
                  Start with 5-10 minutes of gentle stretching
                </li>
                <li class="flex items-start">
                  <span class="text-emerald-500 mr-2">•</span>
                  Practice sun salutations for energy
                </li>
                <li class="flex items-start">
                  <span class="text-emerald-500 mr-2">•</span>
                  End with 5 minutes of mindful breathing
                </li>
                <li class="flex items-start">
                  <span class="text-emerald-500 mr-2">•</span>
                  Set positive intentions for the day
                </li>
              </ul>
            </div>

            <div class="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200">
              <div class="flex items-center mb-4">
                <div class="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center mr-3">
                  <span class="text-lg">🌙</span>
                </div>
                <h3 class="text-xl font-bold text-indigo-900">Evening Wind-Down</h3>
              </div>
              <ul class="space-y-2 text-indigo-700 text-sm">
                <li class="flex items-start">
                  <span class="text-indigo-500 mr-2">•</span>
                  Practice restorative poses for relaxation
                </li>
                <li class="flex items-start">
                  <span class="text-indigo-500 mr-2">•</span>
                  Focus on deep breathing exercises
                </li>
                <li class="flex items-start">
                  <span class="text-indigo-500 mr-2">•</span>
                  Release tension from the day
                </li>
                <li class="flex items-start">
                  <span class="text-indigo-500 mr-2">•</span>
                  Prepare for restful sleep
                </li>
              </ul>
            </div>
          </div>

          <div class="mt-8 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
            <h3 class="text-xl font-bold text-orange-900 mb-4">Important Practice Notes</h3>
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <h4 class="font-bold text-orange-800 mb-2">For Beginners:</h4>
                <ul class="space-y-1 text-orange-700 text-sm">
                  <li>• Start with 5-10 minutes daily</li>
                  <li>• Focus on proper breathing</li>
                  <li>• Use modifications as needed</li>
                  <li>• Be patient with yourself</li>
                </ul>
              </div>
              <div>
                <h4 class="font-bold text-orange-800 mb-2">Safety Guidelines:</h4>
                <ul class="space-y-1 text-orange-700 text-sm">
                  <li>• Consult doctor if you have injuries</li>
                  <li>• Practice on empty stomach</li>
                  <li>• Stop if you feel pain</li>
                  <li>• Use proper alignment</li>
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
export class YogaMeditationComponent {
  yogaPoses = [
    {
      name: 'Mountain Pose',
      sanskritName: 'Tadasana',
      emoji: '🏔️',
      iconColor: 'bg-gray-500',
      difficulty: 'Beginner',
      duration: 1,
      poseType: 'Standing',
      benefits: [
        'Improves posture and balance',
        'Strengthens thighs, knees, and ankles',
        'Increases awareness and focus',
        'Reduces flat feet and sciatica'
      ],
      instructions: [
        'Stand with feet together, arms at sides',
        'Ground through all four corners of feet',
        'Lengthen spine and reach crown of head up',
        'Relax shoulders down and back',
        'Engage core and breathe deeply'
      ],
      contraindications: 'Avoid if you have severe headaches, insomnia, or low blood pressure.'
    },
    {
      name: 'Tree Pose',
      sanskritName: 'Vrksasana',
      emoji: '🌳',
      iconColor: 'bg-green-500',
      difficulty: 'Intermediate',
      duration: 2,
      poseType: 'Balance',
      benefits: [
        'Improves balance and stability',
        'Strengthens legs and core',
        'Enhances focus and concentration',
        'Opens hips and stretches inner thighs'
      ],
      instructions: [
        'Start in Mountain Pose',
        'Shift weight to left foot',
        'Place right foot on inner left thigh',
        'Bring hands to heart center',
        'Find a focal point and hold steadily',
        'Repeat on other side'
      ],
      contraindications: 'Avoid if you have ankle, knee, or hip injuries.'
    },
    {
      name: 'Downward-Facing Dog',
      sanskritName: 'Adho Mukha Svanasana',
      emoji: '🐕',
      iconColor: 'bg-yellow-500',
      difficulty: 'Beginner',
      duration: 3,
      poseType: 'Inversion',
      benefits: [
        'Strengthens arms and shoulders',
        'Stretches hamstrings and calves',
        'Energizes the body',
        'Improves circulation and digestion'
      ],
      instructions: [
        'Start on hands and knees',
        'Lift hips up and back',
        'Straighten legs and press heels down',
        'Keep hands shoulder-width apart',
        'Relax neck and breathe deeply'
      ],
      contraindications: 'Avoid if you have carpal tunnel syndrome, high blood pressure, or recent arm/shoulder injury.'
    },
    {
      name: 'Warrior I',
      sanskritName: 'Virabhadrasana I',
      emoji: '⚔️',
      iconColor: 'bg-red-500',
      difficulty: 'Beginner',
      duration: 2,
      poseType: 'Standing',
      benefits: [
        'Strengthens legs and arms',
        'Opens hips and chest',
        'Builds stamina and focus',
        'Improves balance and posture'
      ],
      instructions: [
        'Step one foot back, front foot forward',
        'Bend front knee to 90 degrees',
        'Keep back leg straight',
        'Extend arms overhead',
        'Gaze forward and breathe deeply'
      ],
      contraindications: 'Avoid if you have high blood pressure, heart problems, or shoulder/neck issues.'
    },
    {
      name: 'Warrior II',
      sanskritName: 'Virabhadrasana II',
      emoji: '🛡️',
      iconColor: 'bg-orange-500',
      difficulty: 'Beginner',
      duration: 2,
      poseType: 'Standing',
      benefits: [
        'Strengthens legs and ankles',
        'Opens hips and chest',
        'Builds endurance and concentration',
        'Improves respiratory function'
      ],
      instructions: [
        'Step feet wide apart',
        'Turn one foot out 90 degrees',
        'Bend front knee, back leg straight',
        'Extend arms horizontally',
        'Gaze over front hand'
      ],
      contraindications: 'Avoid if you have neck problems or high blood pressure.'
    },
    {
      name: 'Child\'s Pose',
      sanskritName: 'Balasana',
      emoji: '👶',
      iconColor: 'bg-blue-500',
      difficulty: 'Beginner',
      duration: 3,
      poseType: 'Resting',
      benefits: [
        'Gently stretches hips and thighs',
        'Calms the mind and relieves stress',
        'Releases tension in back and neck',
        'Promotes deep relaxation'
      ],
      instructions: [
        'Kneel on floor with knees wide',
        'Fold forward, arms extended',
        'Rest forehead on ground',
        'Breathe deeply into back',
        'Hold for several breaths'
      ],
      contraindications: 'Avoid if you have knee injuries or are pregnant.'
    },
    {
      name: 'Cobra Pose',
      sanskritName: 'Bhujangasana',
      emoji: '🐍',
      iconColor: 'bg-green-600',
      difficulty: 'Beginner',
      duration: 2,
      poseType: 'Backbend',
      benefits: [
        'Strengthens spine and back muscles',
        'Opens chest and lungs',
        'Improves posture',
        'Stimulates abdominal organs'
      ],
      instructions: [
        'Lie on stomach, hands under shoulders',
        'Press into hands and lift chest',
        'Keep elbows close to body',
        'Gaze forward or slightly up',
        'Breathe deeply'
      ],
      contraindications: 'Avoid if you have back injury, carpal tunnel, or are pregnant.'
    },
    {
      name: 'Seated Forward Bend',
      sanskritName: 'Paschimottanasana',
      emoji: '🙏',
      iconColor: 'bg-purple-500',
      difficulty: 'Intermediate',
      duration: 3,
      poseType: 'Seated',
      benefits: [
        'Stretches hamstrings and back',
        'Calms the mind and reduces anxiety',
        'Stimulates digestion',
        'Improves flexibility'
      ],
      instructions: [
        'Sit with legs extended forward',
        'Hinge from hips and fold forward',
        'Keep back straight initially',
        'Hold feet or ankles',
        'Breathe deeply and relax'
      ],
      contraindications: 'Avoid if you have back injury or sciatica.'
    },
    {
      name: 'Corpse Pose',
      sanskritName: 'Savasana',
      emoji: '😌',
      iconColor: 'bg-indigo-500',
      difficulty: 'Beginner',
      duration: 10,
      poseType: 'Resting',
      benefits: [
        'Deep relaxation for body and mind',
        'Reduces stress and anxiety',
        'Lowers blood pressure',
        'Promotes better sleep'
      ],
      instructions: [
        'Lie flat on back, arms at sides',
        'Close eyes and relax completely',
        'Breathe naturally and deeply',
        'Scan body for tension and release',
        'Stay for 5-10 minutes'
      ],
      contraindications: 'Generally safe for everyone, but avoid if you have severe back pain.'
    }
  ];

  meditationTechniques = [
    {
      name: 'Mindful Breathing',
      emoji: '🫁',
      iconColor: 'bg-blue-500',
      type: 'Concentration',
      duration: 5,
      level: 'Beginner',
      benefits: [
        'Reduces stress and anxiety',
        'Improves focus and concentration',
        'Lowers blood pressure',
        'Enhances emotional regulation'
      ],
      steps: [
        'Sit comfortably with straight spine',
        'Close eyes and relax body',
        'Focus attention on natural breath',
        'Notice sensation of air entering/leaving nostrils',
        'When mind wanders, gently return to breath'
      ],
      bestTime: 'Any time, especially when feeling stressed'
    },
    {
      name: 'Body Scan Meditation',
      emoji: '🔍',
      iconColor: 'bg-green-500',
      type: 'Awareness',
      duration: 10,
      level: 'Beginner',
      benefits: [
        'Increases body awareness',
        'Releases physical tension',
        'Improves sleep quality',
        'Reduces chronic pain'
      ],
      steps: [
        'Lie down or sit comfortably',
        'Close eyes and take deep breaths',
        'Bring attention to toes and feet',
        'Slowly scan up through entire body',
        'Notice sensations without judgment'
      ],
      bestTime: 'Evening, before sleep'
    },
    {
      name: 'Loving-Kindness Meditation',
      emoji: '💝',
      iconColor: 'bg-pink-500',
      type: 'Compassion',
      duration: 15,
      level: 'Intermediate',
      benefits: [
        'Increases self-compassion',
        'Improves relationships',
        'Reduces negative emotions',
        'Enhances emotional intelligence'
      ],
      steps: [
        'Sit comfortably with closed eyes',
        'Generate feelings of love and kindness',
        'Direct loving thoughts toward yourself',
        'Extend to loved ones, then acquaintances',
        'Finally include all beings everywhere'
      ],
      bestTime: 'Morning or when feeling disconnected'
    },
    {
      name: 'Walking Meditation',
      emoji: '🚶‍♀️',
      iconColor: 'bg-orange-500',
      type: 'Movement',
      duration: 20,
      level: 'Beginner',
      benefits: [
        'Combines mindfulness with exercise',
        'Improves balance and coordination',
        'Reduces stress while staying active',
        'Enhances present-moment awareness'
      ],
      steps: [
        'Walk slowly in quiet space',
        'Focus on sensation of feet touching ground',
        'Coordinate breath with steps',
        'Notice surroundings mindfully',
        'Maintain slow, deliberate pace'
      ],
      bestTime: 'Morning or during lunch break'
    },
    {
      name: 'Mantra Meditation',
      emoji: '📿',
      iconColor: 'bg-purple-500',
      type: 'Concentration',
      duration: 15,
      level: 'Intermediate',
      benefits: [
        'Quiets mental chatter',
        'Improves concentration',
        'Reduces anxiety and depression',
        'Enhances spiritual connection'
      ],
      steps: [
        'Choose a meaningful mantra or word',
        'Sit comfortably with straight spine',
        'Repeat mantra silently or aloud',
        'Focus completely on sound and vibration',
        'Return to mantra when mind wanders'
      ],
      bestTime: 'Early morning or before important tasks'
    },
    {
      name: 'Guided Visualization',
      emoji: '🌅',
      iconColor: 'bg-yellow-500',
      type: 'Imagination',
      duration: 20,
      level: 'Beginner',
      benefits: [
        'Reduces stress and anxiety',
        'Improves sleep quality',
        'Enhances creativity',
        'Boosts motivation and confidence'
      ],
      steps: [
        'Sit or lie down comfortably',
        'Close eyes and relax body',
        'Imagine peaceful, safe place',
        'Engage all senses in visualization',
        'Stay in imagined space for duration'
      ],
      bestTime: 'Evening or when needing relaxation'
    }
  ];

  constructor(private router: Router) {}

  goToHome() {
    this.router.navigate(['/']);
  }
}
