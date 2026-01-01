# TigerTest iPhone App Development Plan

## Executive Summary

This document outlines the comprehensive plan for building a native iPhone app for TigerTest, the DMV practice test platform. The app will provide iOS users with an optimized mobile experience for preparing for their driving license written exams across all 50 US states.

---

## 1. Technology Stack Recommendation

### Recommended Approach: Native SwiftUI

**Primary Choice: SwiftUI + Swift**

| Criteria | SwiftUI (Native) | React Native | Flutter |
|----------|-----------------|--------------|---------|
| Performance | Excellent | Good | Good |
| iOS Integration | Native | Bridge-based | Bridge-based |
| App Size | ~15-30MB | ~50-80MB | ~40-60MB |
| Firebase Support | Official SDK | Community SDK | Official SDK |
| Development Speed | Moderate | Fast | Fast |
| Long-term Maintenance | Low | Medium | Medium |
| Apple Features | Full Access | Limited | Limited |

**Rationale for SwiftUI:**
1. **Optimal Performance**: Native compilation provides the best user experience for test-taking
2. **Firebase iOS SDK**: First-class support for Authentication and Firestore
3. **Future-proof**: Apple's strategic UI framework with continuous improvements
4. **App Store Optimization**: Native apps receive preferential treatment in rankings
5. **Smaller Bundle Size**: Question data (~20MB) + app code stays under 50MB total
6. **Offline Capabilities**: Native Core Data/SwiftData integration for robust offline support

### Minimum iOS Version
- **iOS 16.0+** (SwiftUI 4)
- Supports 95%+ of active iPhones
- Enables modern SwiftUI features (NavigationStack, Charts)

---

## 2. Architecture Design

### 2.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    TigerTest iOS App                        │
├─────────────────────────────────────────────────────────────┤
│  Presentation Layer (SwiftUI Views)                         │
│  ├── DashboardView                                          │
│  ├── TrainingView                                           │
│  ├── TestView                                               │
│  ├── ResultsView                                            │
│  ├── StatsView                                              │
│  └── SettingsView                                           │
├─────────────────────────────────────────────────────────────┤
│  ViewModel Layer (ObservableObject)                         │
│  ├── AppState (Main store - replaces Zustand)               │
│  ├── TrainingViewModel                                      │
│  ├── TestViewModel                                          │
│  └── StatsViewModel                                         │
├─────────────────────────────────────────────────────────────┤
│  Domain Layer (Business Logic)                              │
│  ├── TestGenerator (deterministic test creation)            │
│  ├── ScoreCalculator                                        │
│  ├── ProgressTracker                                        │
│  └── PassProbabilityCalculator                              │
├─────────────────────────────────────────────────────────────┤
│  Data Layer                                                 │
│  ├── QuestionRepository (bundled JSON)                      │
│  ├── UserDataRepository (local + Firestore sync)            │
│  └── AuthRepository (Firebase Auth)                         │
├─────────────────────────────────────────────────────────────┤
│  Infrastructure                                             │
│  ├── Firebase SDK (Auth, Firestore)                         │
│  ├── UserDefaults (simple preferences)                      │
│  └── SwiftData/CoreData (offline cache)                     │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 State Management Pattern

**MVVM with @Observable (iOS 17+) or ObservableObject (iOS 16)**

```swift
// Main app state - equivalent to Zustand store
@Observable
class AppState {
    // User state
    var isGuest: Bool = true
    var userId: String?
    var selectedState: String?

    // Training data
    var training: TrainingData
    var trainingSets: [Int: TrainingSetData]

    // Test data
    var currentTests: [Int: TestSession]
    var completedTests: [TestSession]
    var testAttempts: [TestAttemptStats]

    // Computed
    var passPercentage: Double { /* calculation */ }
}
```

### 2.3 Data Flow

```
User Action → View → ViewModel → Repository → Data Source
                                     ↓
                              Local Cache ←→ Firebase Sync
```

---

## 3. Feature Roadmap

### Phase 1: MVP (Weeks 1-4)

**Core Features:**
- [ ] User authentication (email/password, Google Sign-In)
- [ ] State selection (all 50 states)
- [ ] Training mode (onboarding with 10 correct answers requirement)
- [ ] Practice tests (4 tests per state, 50 questions each)
- [ ] Results display with explanations
- [ ] Basic progress tracking
- [ ] Offline question access

**Technical Milestones:**
- [ ] Project setup with Firebase integration
- [ ] Question data bundling (2,160 questions)
- [ ] Core data models implementation
- [ ] Navigation structure (tab-based)
- [ ] Basic UI components

### Phase 2: Enhanced Experience (Weeks 5-6)

**Features:**
- [ ] Training sets (4 post-onboarding sets per state)
- [ ] Advanced statistics dashboard
- [ ] Pass probability calculation with tiger faces
- [ ] Category-wise performance breakdown
- [ ] Test history with all attempts
- [ ] Profile management (photo upload)

**Technical:**
- [ ] Charts integration (Swift Charts)
- [ ] Image upload to Firebase Storage
- [ ] Background sync optimization
- [ ] Performance analytics

### Phase 3: Polish & Launch (Weeks 7-8)

**Features:**
- [ ] Onboarding flow for first-time users
- [ ] Push notifications (study reminders)
- [ ] Haptic feedback for interactions
- [ ] Dark mode support
- [ ] Accessibility (VoiceOver, Dynamic Type)
- [ ] App Store optimization assets

**Technical:**
- [ ] App Store submission preparation
- [ ] Privacy policy and terms
- [ ] Analytics integration
- [ ] Crash reporting (Firebase Crashlytics)
- [ ] Performance optimization
- [ ] TestFlight beta testing

---

## 4. Data Management

### 4.1 Question Data Strategy

**Bundling Approach:**

```
App Bundle/
├── Questions/
│   ├── universal.json (160 questions, ~1.5MB)
│   └── states/
│       ├── CA.json (40 questions)
│       ├── TX.json (40 questions)
│       └── ... (48 more states)
```

**Loading Strategy:**
1. Universal questions loaded on app launch
2. State-specific questions loaded on state selection
3. All data cached in memory during active session
4. Total bundled size: ~20-25MB (acceptable for App Store)

### 4.2 Data Models (Swift)

```swift
struct Question: Codable, Identifiable {
    let id: String // questionId (U-001, CA-001)
    let type: QuestionType // .universal, .stateSpecific
    let state: String // "ALL" or state code
    let category: QuestionCategory
    let questionText: String
    let options: [String] // A, B, C, D
    let correctAnswer: Int // 0-3 (index)
    let explanation: String
}

struct TestSession: Codable, Identifiable {
    let id: String
    let testNumber: Int // 1-4
    let state: String
    var questions: [Question]
    var answers: [Int?] // User's selected options
    let startedAt: Date
    var completedAt: Date?
    var score: Int?
}

struct UserProgress: Codable {
    var training: TrainingData
    var trainingSets: [Int: TrainingSetData]
    var completedTests: [TestSession]
    var testAttempts: [TestAttemptStats]
}
```

### 4.3 Offline-First Architecture

```
┌─────────────────┐      ┌─────────────────┐
│   SwiftData     │ ←──→ │    Firebase     │
│  (Local Cache)  │ sync │   Firestore     │
└─────────────────┘      └─────────────────┘
        ↑                         ↑
        │                         │
        └────────────┬────────────┘
                     │
              ┌──────┴──────┐
              │ Repository  │
              │   Layer     │
              └──────┬──────┘
                     │
              ┌──────┴──────┐
              │  ViewModel  │
              └─────────────┘
```

**Sync Strategy:**
1. All writes go to local cache first (immediate UI feedback)
2. Background sync to Firebase when online
3. Conflict resolution: latest timestamp wins
4. Guest data merges on account creation

---

## 5. Authentication Flow

### 5.1 Supported Methods

1. **Guest Mode**: Start using immediately, data stored locally
2. **Email/Password**: Firebase Authentication
3. **Sign in with Apple**: Required for App Store (if social login offered)
4. **Google Sign-In**: Optional OAuth

### 5.2 Flow Diagram

```
App Launch
    │
    ├── New User ──→ Guest Mode ──→ Use App ──→ Prompt Sign Up
    │                                               │
    │                                    ┌──────────┴──────────┐
    │                                    ↓                     ↓
    │                              Create Account        Continue Guest
    │                                    │
    │                              Merge Guest Data
    │
    └── Returning User ──→ Auto Sign In ──→ Sync Data ──→ Use App
```

### 5.3 Account Conflict Resolution

When user signs in but has guest data:
1. Show conflict dialog (same as web)
2. Options: "Use Existing Account" or "Keep Current Progress"
3. Selected option determines data merge strategy

---

## 6. UI/UX Design

### 6.1 Navigation Structure

```
TabView (5 tabs)
├── Dashboard (Home)
│   ├── Welcome message
│   ├── Quick stats
│   ├── Continue test button
│   └── Progress overview
│
├── Training
│   ├── Onboarding mode (if < 10 correct)
│   └── Training sets (if onboarded)
│
├── Tests
│   ├── Test 1-4 cards
│   ├── In-progress indicator
│   └── Best score badges
│
├── Stats
│   ├── Pass probability (tiger face)
│   ├── Overall accuracy
│   ├── Category breakdown
│   └── Test history
│
└── Settings
    ├── State selection
    ├── Profile management
    ├── Account settings
    └── Reset progress
```

### 6.2 Key Screens

**Test Taking Screen:**
- Progress bar (question X of 50)
- Question card with options (A, B, C, D)
- Submit button (forward-only, no going back)
- Timer (optional, for practice)

**Results Screen:**
- Score display (e.g., 45/50 - 90%)
- Pass/Fail status
- Question review list
- Explanation expandable for each question
- Retake button

### 6.3 Design System

**Colors (matching web):**
- Primary: Orange (#F97316)
- Success: Green (#22C55E)
- Error: Red (#EF4444)
- Background: White/Gray
- Dark mode: System adaptive

**Typography:**
- SF Pro (system font)
- Dynamic Type support for accessibility

**Components:**
- Rounded cards (12px radius)
- Progress bars with animations
- Haptic feedback on answer selection
- Smooth transitions between views

---

## 7. Testing Strategy

### 7.1 Unit Tests

**Coverage Targets:**
- Test generation algorithm: 100%
- Score calculation: 100%
- Pass probability: 100%
- Data models encoding/decoding: 100%
- ViewModels: 80%

**Key Test Cases:**
```swift
func testTestGeneration_returnsCorrectQuestionCount() {
    let test = TestGenerator.generateTest(testNumber: 1, state: "CA")
    XCTAssertEqual(test.questions.count, 50)
}

func testTestGeneration_hasDeterministicQuestions() {
    let test1 = TestGenerator.generateTest(testNumber: 1, state: "CA")
    let test2 = TestGenerator.generateTest(testNumber: 1, state: "CA")
    XCTAssertEqual(test1.questions.map(\.id), test2.questions.map(\.id))
}

func testPassProbability_calculatesCorrectly() {
    let scores = [45, 42, 48, 44]
    let probability = PassProbabilityCalculator.calculate(scores: scores)
    XCTAssertEqual(probability, 0.895, accuracy: 0.001)
}
```

### 7.2 UI Tests

**Critical Flows:**
- Onboarding completion
- Test taking (start → complete)
- State switching
- Authentication (guest → signed in)

### 7.3 Manual Testing

**Device Matrix:**
- iPhone 15 Pro (latest)
- iPhone 13 (mid-range)
- iPhone SE (small screen)
- iPad (if supporting)

**Test Scenarios:**
- Offline mode functionality
- Background/foreground transitions
- Memory pressure handling
- Network interruption during sync

---

## 8. App Store Preparation

### 8.1 App Store Requirements

**App Information:**
- Name: TigerTest - DMV Practice
- Subtitle: Pass Your Driving Test
- Category: Education
- Age Rating: 4+ (no objectionable content)

**Screenshots Required (6.5" and 5.5"):**
1. Dashboard with progress
2. Practice test in action
3. Results with explanation
4. Training mode
5. Statistics dashboard
6. State selection

**App Preview Video (optional but recommended):**
- 15-30 second walkthrough
- Test taking experience focus

### 8.2 Privacy & Compliance

**Privacy Policy Must Cover:**
- Data collected (email, progress, analytics)
- Firebase/Google data processing
- Data retention policies
- User rights (deletion, export)

**App Tracking Transparency:**
- If using analytics, implement ATT prompt
- Respect user's tracking choice

**Required Disclosures:**
- Third-party SDKs (Firebase, Google Sign-In)
- Data sharing with third parties (none for core features)

### 8.3 In-App Purchases (Future)

**Potential Monetization:**
- Free tier: 1 practice test per state
- Premium: All 4 tests, unlimited training
- One-time purchase recommended over subscription

---

## 9. Performance Targets

| Metric | Target | Measurement |
|--------|--------|-------------|
| App Launch (cold) | < 2s | Time to Dashboard |
| Question Load | < 100ms | Time to display question |
| Answer Response | < 50ms | Haptic + visual feedback |
| Test Generation | < 200ms | Time to generate 50 questions |
| Memory Usage | < 150MB | Peak during test |
| Battery Impact | Low | < 5% per hour active use |
| Offline Sync | < 5s | When reconnected |

---

## 10. Development Timeline

### Week 1: Foundation
- [ ] Xcode project setup
- [ ] Firebase iOS SDK integration
- [ ] Data models implementation
- [ ] Question data bundling
- [ ] Basic navigation structure

### Week 2: Authentication
- [ ] Firebase Auth integration
- [ ] Guest mode implementation
- [ ] Email/password flow
- [ ] Sign in with Apple
- [ ] Account conflict handling

### Week 3: Core Features
- [ ] Test generation algorithm (port from TypeScript)
- [ ] Training mode UI
- [ ] Practice test UI
- [ ] Answer submission logic
- [ ] Local data persistence

### Week 4: Results & Progress
- [ ] Results screen with explanations
- [ ] Score calculation
- [ ] Progress tracking
- [ ] Basic statistics
- [ ] Firestore sync

### Week 5: Advanced Features
- [ ] Training sets (4 sets)
- [ ] Pass probability calculation
- [ ] Tiger face visualization
- [ ] Category breakdown
- [ ] Test history

### Week 6: Statistics & Settings
- [ ] Statistics dashboard
- [ ] Swift Charts integration
- [ ] Settings screen
- [ ] State switching
- [ ] Profile management

### Week 7: Polish
- [ ] Dark mode
- [ ] Accessibility (VoiceOver, Dynamic Type)
- [ ] Haptic feedback
- [ ] Animations and transitions
- [ ] Error handling improvements

### Week 8: Launch Prep
- [ ] App Store assets
- [ ] Privacy policy
- [ ] TestFlight beta
- [ ] Bug fixes from beta
- [ ] App Store submission

---

## 11. Technical Risks & Mitigations

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Firebase rate limits | High | Low | Implement local caching, batch writes |
| Question data size | Medium | Low | Compress JSON, lazy load state data |
| Offline sync conflicts | Medium | Medium | Last-write-wins with timestamp |
| App Store rejection | High | Low | Follow guidelines, proper privacy disclosure |
| iOS version compatibility | Medium | Low | Test on iOS 16 devices early |

---

## 12. Success Metrics

### Launch Goals (First 30 Days)
- 1,000+ downloads
- 4.5+ star rating
- < 1% crash rate
- < 2s average launch time

### Growth Goals (First Quarter)
- 10,000+ active users
- 50%+ training completion rate
- 30%+ test completion rate
- 20%+ user retention (Day 7)

---

## 13. Future Enhancements (Post-Launch)

1. **Apple Watch Companion**: Quick training on the go
2. **Siri Shortcuts**: "Start my DMV practice"
3. **Widgets**: Progress at a glance
4. **CarPlay**: Audio-based training (questions read aloud)
5. **iPad Optimization**: Multi-column layout
6. **Gamification**: Streaks, badges, leaderboards
7. **Social Features**: Challenge friends
8. **Premium Features**: Ad-free, additional practice modes

---

## Appendix A: Firebase Configuration

### Required Firebase Services
- Authentication (Email, Google, Apple)
- Firestore (user data sync)
- Cloud Storage (profile photos)
- Analytics
- Crashlytics

### Security Rules (Firestore)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    match /user-data/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
  }
}
```

---

## Appendix B: Test Generation Algorithm (Swift Port)

```swift
struct TestGenerator {
    static let UNIVERSAL_PER_TEST = 40
    static let STATE_PER_TEST = 10

    static func generateTest(
        testNumber: Int,
        state: String,
        universalQuestions: [Question],
        stateQuestions: [Question]
    ) -> [Question] {
        // Get deterministic slice of questions
        let universalStart = (testNumber - 1) * UNIVERSAL_PER_TEST
        let universalEnd = universalStart + UNIVERSAL_PER_TEST
        let selectedUniversal = Array(universalQuestions[universalStart..<universalEnd])

        let stateStart = (testNumber - 1) * STATE_PER_TEST
        let stateEnd = stateStart + STATE_PER_TEST
        let selectedState = Array(stateQuestions[stateStart..<stateEnd])

        // Combine and shuffle order (but questions are deterministic)
        var combined = selectedUniversal + selectedState
        combined.shuffle()

        // Shuffle options for each question
        return combined.map { shuffleOptions($0) }
    }

    static func shuffleOptions(_ question: Question) -> Question {
        // Shuffle options while tracking correct answer
        // ... implementation
    }
}
```

---

## Conclusion

This plan provides a comprehensive roadmap for building the TigerTest iPhone app. The native SwiftUI approach ensures optimal performance and user experience while leveraging the existing Firebase backend. The 8-week timeline is aggressive but achievable with focused development.

Key success factors:
1. **Parity with web**: Exact same test generation algorithm
2. **Offline-first**: Full functionality without internet
3. **Seamless sync**: Cross-device progress
4. **Native experience**: Leverage iOS platform capabilities

The modular architecture allows for iterative development and future enhancements while maintaining code quality and testability.
