# AI Event Feedback Studio

## 1. Project Overview

Build a premium, modern AI-powered web application called **AI Event Feedback Studio**.

The application takes an event description from an organizer and automatically:

1. Understands the event using AI.
2. Extracts the event purpose, audience, activities, technical topics, and expected outcomes.
3. Generates customized feedback questions.
4. Validates the generated questions for relevance and quality.
5. Allows the organizer to review and edit the questions.
6. Creates a real Google Form automatically.
7. Provides the generated Google Form URL.
8. Stores previously generated forms in a history section.

The application should feel like a **high-end AI SaaS product**, not a basic Google Apps Script interface.

---

# 2. Important Technology Constraint

The frontend MUST use:

* Vanilla HTML
* Vanilla CSS
* Vanilla JavaScript
* Google Apps Script HtmlService

Do NOT use:

* React
* Next.js
* Vue
* Angular
* Bootstrap
* Material UI

The application is served directly through **Google Apps Script HtmlService**.

The frontend should communicate with Apps Script using:

```javascript
google.script.run
```

---

# 3. Frontend Technology Stack

Use the following tools.

### Core

* HTML5
* CSS3
* Vanilla JavaScript ES6+

### Typography

Use:

**Outfit**

via Google Fonts.

### 3D

Use:

**Three.js**

Purpose:

* Hero 3D AI orb
* Particle systems
* Floating geometric elements
* Subtle background 3D effects
* Success-page visual

Do NOT make the whole UI 3D.

3D should enhance the interface without hurting usability or performance.

### Animation

Use:

**GSAP**

Use GSAP for:

* Page transitions
* Card entrance animations
* Button interactions
* Loading animations
* Question card animations
* Progress animations
* Modal animations
* Success animation

Use GSAP ScrollTrigger only where appropriate.

### Icons

Use:

**Lucide Icons**

Use icons consistently instead of random Unicode symbols.

### Charts

Use:

**Chart.js**

Only where useful, especially:

* AI quality score
* Question distribution
* Analytics/history dashboard

Do not add unnecessary charts.

---

# 4. Visual Design Direction

The visual identity should be:

**Premium AI SaaS + Glassmorphism + Futuristic + Minimal + Professional**

Avoid making it look like a generic "AI neon website."

The UI should feel polished enough for a hackathon final demo.

---

# 5. Color System

Use a dark futuristic base.

Primary background:

```css
#050816
```

Secondary surfaces:

```css
rgba(255,255,255,0.05)
```

Glass borders:

```css
rgba(255,255,255,0.10)
```

Accent colors can use gradients based around:

* Electric blue
* Violet
* Cyan
* Indigo

Example gradient:

```css
linear-gradient(
    135deg,
    #5B8CFF,
    #8B5CF6,
    #4DE8FF
)
```

Do not overuse gradients.

Gradients should primarily appear in:

* CTA buttons
* AI highlights
* Orb lighting
* Progress indicators
* Important headings
* Active states

---

# 6. Glassmorphism

Create a reusable glass component system.

Example:

```css
.glass {
    background: rgba(255,255,255,0.055);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255,255,255,0.10);
    box-shadow: 0 20px 60px rgba(0,0,0,0.25);
    border-radius: 24px;
}
```

Create variations:

```text
glass
glass-card
glass-panel
glass-input
glass-modal
glass-navbar
```

Use subtle hover states.

Do NOT make every element transparent.

---

# 7. Global UI Principles

The interface must have:

* Large whitespace
* Strong typography hierarchy
* Rounded cards
* Soft shadows
* Subtle borders
* Smooth transitions
* Responsive design
* Consistent spacing
* Consistent iconography
* Minimal visual clutter

Avoid:

* Excessive glowing text
* Excessive animations
* Huge gradients everywhere
* Random colors
* Generic dashboard templates
* Excessive rounded pills

---

# 8. Application Layout

Desktop layout:

```text
┌─────────────────────────────────────────────────────┐
│ Logo                  Navigation            Profile │
├─────────────────────────────────────────────────────┤
│                                                     │
│                  MAIN CONTENT                       │
│                                                     │
│                                                     │
└─────────────────────────────────────────────────────┘
```

Use a sidebar for the application dashboard.

Sidebar:

```text
AI Event Studio

Dashboard
Create Form
My Forms

────────────

How It Works
Settings
```

On mobile, replace sidebar with a mobile navigation.

---

# 9. Page 1 — Landing / Dashboard

Route/state:

```text
dashboard
```

Purpose:

Immediately communicate what the product does.

Hero heading:

```text
Turn any event into
an intelligent feedback form.
```

Supporting text:

```text
Describe your event and let AI design
a customized feedback experience based
on its purpose, activities and technical content.
```

Primary CTA:

```text
Create Feedback Form
```

Secondary CTA:

```text
View My Forms
```

---

## Hero 3D Element

Place a Three.js AI orb on the right side.

The orb should contain:

* Central glowing sphere
* 2–3 orbital rings
* Small particles
* Subtle rotation
* Mouse-responsive movement

The animation should be smooth and slow.

Avoid distracting movement.

---

## Dashboard statistics

Show:

```text
Forms Generated
Events Analyzed
Average AI Quality
```

Example:

```text
127
Forms Generated

38
Events Analyzed

94%
Average Quality
```

These can initially use demo values and later be connected to stored data.

---

## Recent Forms

Display the latest generated forms.

Example:

```text
Recent Forms

AI & Robotics Workshop
12 questions
Generated 2 minutes ago

Web Development Bootcamp
10 questions
Generated yesterday
```

Each card has:

```text
Open Form
```

---

# 10. Page 2 — Create Event

Purpose:

Collect event information.

Page heading:

```text
Create your feedback form
```

Form fields:

### Event Name

Input:

```text
AI & Robotics Workshop
```

### Event Description

Large textarea.

Placeholder:

```text
Describe the event, its purpose,
activities, technical topics,
audience and expected outcomes...
```

### Event Type

Dropdown:

```text
Workshop
Hackathon
Conference
Seminar
Webinar
Technical Training
Competition
Meetup
Other
```

### Audience

Dropdown/input:

```text
Engineering Students
Developers
Researchers
Professionals
General Audience
```

### Duration

Optional:

```text
2 hours
1 day
2 days
1 week
```

---

## Dynamic UI

When the user enters information, show a live summary card:

```text
EVENT PREVIEW

AI & Robotics Workshop

Workshop
Engineering Students
1 Day
```

CTA:

```text
Analyze Event →
```

---

# 11. Page 3 — AI Analysis

This page should demonstrate that the AI actually understands the event.

Do NOT immediately jump to question generation.

Display an animated AI processing interface.

Example:

```text
Analyzing your event

✓ Understanding event purpose
✓ Identifying target audience
✓ Detecting activities
✓ Extracting technical topics
✓ Identifying feedback objectives
```

Animate each step sequentially.

---

## Analysis Result

Show:

### Event Purpose

```text
Provide practical AI and robotics
experience through hands-on learning.
```

### Audience

```text
Engineering Students
```

### Technical Topics

Cards:

```text
Machine Learning
OpenCV
Python
Arduino
Ultrasonic Sensors
```

### Activities

Cards:

```text
Object Detection
Arduino Robotics
Team Project
Hands-on Exercises
```

### Feedback Focus

```text
Technical understanding
Hands-on usefulness
Activity quality
Workshop organization
Learning outcomes
```

---

## Continue CTA

```text
Generate Questions →
```

---

# 12. Page 4 — Question Studio

This is one of the most important pages.

It should feel like an AI-powered question editor.

Header:

```text
Question Studio
```

Subheading:

```text
Review and customize the questions generated for your event.
```

---

## Top statistics

Display:

```text
12 Questions

8 Quantitative
4 Qualitative

AI Quality
94/100
```

---

# 13. Question Cards

Each question should be represented as an animated glass card.

Example:

```text
┌──────────────────────────────────────────────┐
│ 01                              Scale        │
│                                              │
│ How useful was the OpenCV session?           │
│                                              │
│ 1     2     3     4     5                    │
│                                              │
│ Required ✓                                   │
│                                              │
│                         Edit     Delete      │
└──────────────────────────────────────────────┘
```

Question types supported:

```text
scale
multiple_choice
checkbox
short_answer
paragraph
```

---

# 14. Question Editing

Clicking Edit should open a glass modal.

Allow editing:

* Question text
* Question type
* Options
* Required/optional
* Scale bounds

Example:

```text
Edit Question

Question
[ How useful was the OpenCV session? ]

Type
[ Scale ▼ ]

Required
[ ON ]

                    Cancel    Save
```

Changes should update the frontend state immediately.

---

# 15. AI Quality Panel

Place a right-side panel on desktop.

Title:

```text
AI Quality Check
```

Display:

```text
94 / 100
Excellent
```

Breakdown:

```text
✓ Event relevance
✓ Activity coverage
✓ Technical coverage
✓ Question diversity
✓ No duplicates
✓ Balanced feedback
✓ Neutral wording
```

Use an animated circular score indicator.

---

# 16. Question Generation Rules

The AI-generated questions MUST NOT be generic.

For an event such as:

```text
AI & Robotics Workshop
```

questions should specifically reference:

```text
OpenCV
Arduino
Machine Learning
Object Detection
Robotics
Hands-on Activities
```

Avoid generic questions such as only:

```text
Did you enjoy the event?
How was the event?
Would you attend again?
```

Generic questions may be included, but event-specific questions must dominate.

---

# 17. Page 5 — Google Form Generation

When the user clicks:

```text
Create Google Form
```

show a full-screen generation experience.

Example:

```text
Creating your Google Form

✓ Event analyzed
✓ Questions generated
✓ Questions validated
✓ Form structure prepared
◉ Creating Google Form
○ Adding questions
○ Finalizing
```

Animate progress using GSAP.

---

# 18. Backend Integration

The frontend must communicate with Google Apps Script using:

```javascript
google.script.run
```

Example:

```javascript
google.script.run
    .withSuccessHandler(handleSuccess)
    .withFailureHandler(handleError)
    .generateForm(eventData);
```

Do NOT use hardcoded fake responses once backend integration is implemented.

---

# 19. Backend Responsibilities

Google Apps Script should handle:

```text
Frontend
   ↓
Apps Script
   ↓
Gemini API
   ↓
Structured JSON
   ↓
Validation
   ↓
Google FormApp
   ↓
Google Form
```

The frontend should NOT call Gemini directly.

The Gemini API key must never be exposed to the browser.

---

# 20. API Key Security

Store Gemini API key using:

```text
PropertiesService
```

Example:

```javascript
const GEMINI_API_KEY =
    PropertiesService
        .getScriptProperties()
        .getProperty("GEMINI_API_KEY");
```

Never place the API key inside:

```text
HTML
CSS
client-side JavaScript
```

---

# 21. Backend Data Contract

The frontend should send:

```json
{
    "eventName": "AI & Robotics Workshop",
    "description": "A one-day workshop...",
    "eventType": "Workshop",
    "audience": "Engineering Students",
    "duration": "1 Day"
}
```

Backend should return structured data.

Example:

```json
{
    "success": true,
    "analysis": {
        "purpose": "...",
        "audience": "...",
        "topics": [
            "Machine Learning",
            "OpenCV",
            "Arduino"
        ],
        "activities": [
            "Object Detection",
            "Arduino Robotics"
        ],
        "feedbackFocus": [
            "Technical understanding",
            "Hands-on usefulness"
        ]
    },
    "questions": [
        {
            "id": "q1",
            "type": "scale",
            "title": "How useful was the OpenCV session?",
            "required": true,
            "min": 1,
            "max": 5
        }
    ]
}
```

---

# 22. Form Generation Contract

After the user approves the questions, send:

```json
{
    "title": "AI & Robotics Workshop Feedback",
    "description": "Help us improve future workshops.",
    "questions": [
        {
            "type": "scale",
            "title": "How useful was the OpenCV session?",
            "required": true,
            "min": 1,
            "max": 5
        },
        {
            "type": "multiple_choice",
            "title": "Which activity was most useful?",
            "required": true,
            "options": [
                "Machine Learning",
                "OpenCV",
                "Arduino Robotics",
                "Team Project"
            ]
        }
    ]
}
```

Apps Script should use:

```javascript
FormApp.create()
```

and appropriate:

```javascript
addScaleItem()
addMultipleChoiceItem()
addCheckboxItem()
addTextItem()
addParagraphTextItem()
```

---

# 23. Page 6 — Success Page

After successful form creation:

Display a large animated success state.

```text
✓

Your Google Form is ready

AI & Robotics Workshop
Feedback Form

12 questions generated

[ Open Google Form ]

[ View Details ]

[ Create Another Form ]
```

---

## Success Animation

Use GSAP:

1. Fade background
2. Scale success icon
3. Draw/check animation
4. Reveal title
5. Reveal buttons

Optional subtle Three.js particles in background.

---

# 24. Page 7 — My Forms / History

Display all generated forms.

Each item:

```text
AI & Robotics Workshop

Workshop
12 questions
Generated Oct 8, 2026

[ Open Form ]
```

Additional metadata:

```text
AI Quality: 94
```

Allow:

```text
Search
Filter
Sort
```

Filters:

```text
All
Workshops
Hackathons
Conferences
Training
```

---

# 25. Optional Form Details Modal

When clicking a history item:

Show:

```text
Form Details

AI & Robotics Workshop

Questions: 12
AI Quality: 94/100
Created: Today

Technical Topics
OpenCV
Arduino
Machine Learning

[ Open Google Form ]
```

---

# 26. Responsive Design

The application MUST work on:

* Desktop
* Laptop
* Tablet
* Mobile

Desktop:

```text
Sidebar + Main Content
```

Mobile:

```text
Top Navbar
Main Content
Bottom/mobile navigation if required
```

Question cards should become single-column.

Do not allow horizontal overflow.

---

# 27. Animation Guidelines

Use animations intentionally.

### Page entrance

```text
opacity: 0 → 1
translateY: 20px → 0
```

### Cards

Stagger cards by approximately:

```text
0.05–0.1 seconds
```

### Buttons

On hover:

* slight upward movement
* subtle glow
* gradient movement

### Modals

Use:

```text
opacity + scale
```

### Loading

Use animated progress rather than a generic spinner.

---

# 28. Three.js Performance

Three.js should NOT continuously consume excessive resources.

Requirements:

* Limit particle count
* Use low-poly geometry
* Pause or reduce animation when tab is hidden
* Resize renderer correctly
* Avoid unnecessary post-processing
* Respect mobile devices

The application must remain responsive.

---

# 29. Background Effects

Create subtle background effects:

* radial gradients
* blurred gradient blobs
* particles
* grid texture
* noise texture if lightweight

Example visual:

```text
          ✦
     ·         ·

   ╭───────────────╮
   │               │
   │     CONTENT   │
   │               │
   ╰───────────────╯

       ·       ·
          ✦
```

Keep effects behind content.

---

# 30. Reusable Components

Even though this is Vanilla JS, create reusable UI functions.

Examples:

```javascript
createQuestionCard(question)
createGlassCard(content)
showModal(content)
showToast(message, type)
showLoadingState()
renderAnalysis(data)
renderQuestions(questions)
renderHistory(forms)
navigate(page)
```

Do not duplicate large HTML blocks everywhere.

---

# 31. Application State

Maintain a centralized frontend state object.

Example:

```javascript
const appState = {
    currentPage: "dashboard",

    event: {
        name: "",
        description: "",
        type: "",
        audience: "",
        duration: ""
    },

    analysis: null,

    questions: [],

    generatedForm: null
};
```

Pages should render from this state.

---

# 32. Navigation

Do not reload the whole page for every section.

Use a simple SPA-like navigation system with Vanilla JS.

Example:

```text
dashboard
create
analysis
questions
generating
success
history
```

Navigation should feel instant and use GSAP transitions.

---

# 33. Error Handling

Every backend operation must have:

```javascript
.withSuccessHandler(...)
.withFailureHandler(...)
```

Display friendly errors.

Example:

```text
Something went wrong

We couldn't generate your feedback form.

Please try again.

[ Try Again ]
```

Do NOT expose raw API errors to the user.

---

# 34. Loading States

Every asynchronous operation must have a meaningful loading state.

Examples:

```text
Analyzing Event...
Generating Questions...
Checking Question Quality...
Creating Google Form...
```

Avoid:

```text
Loading...
```

for everything.

---

# 35. Toast Notifications

Create reusable toast notifications.

Examples:

```text
✓ Question updated

✓ Form created successfully

✓ Event analysis complete

⚠ Could not connect to Google Forms
```

---

# 36. Accessibility

Implement:

* Keyboard navigation
* Visible focus states
* Proper labels
* ARIA labels where required
* Sufficient text contrast
* Reduced-motion support

Respect:

```css
prefers-reduced-motion
```

If the user prefers reduced motion, significantly reduce GSAP and Three.js animations.

---

# 37. Folder / File Structure

Use this structure:

```text
AI-Event-Feedback-Studio/

├── Code.gs
├── Gemini.gs
├── FormGenerator.gs
├── Database.gs
│
├── Index.html
├── Styles.html
├── JavaScript.html
│
├── components/
│   ├── Navbar.html
│   ├── Sidebar.html
│   ├── QuestionCard.html
│   ├── GlassCard.html
│   └── Modal.html
│
└── README.md
```

If Apps Script makes separate component files inconvenient, use HTML partial includes.

---

# 38. Google Apps Script HTML Structure

Use:

```javascript
function doGet() {
    return HtmlService
        .createTemplateFromFile("Index")
        .evaluate()
        .setTitle("AI Event Feedback Studio")
        .setXFrameOptionsMode(
            HtmlService.XFrameOptionsMode.ALLOWALL
        );
}
```

Create an include helper:

```javascript
function include(filename) {
    return HtmlService
        .createHtmlOutputFromFile(filename)
        .getContent();
}
```

Then:

```html
<?!= include('Styles'); ?>
<?!= include('JavaScript'); ?>
```

---

# 39. Google Apps Script Backend Functions

Create clear functions.

```text
doGet()

analyzeEvent(eventData)

generateQuestions(eventData)

validateQuestions(questions)

generateForm(formData)

getFormHistory()

saveFormMetadata(data)
```

Keep AI logic separate from Google Form creation logic.

---

# 40. AI Architecture

The AI should conceptually follow:

```text
Event Description
       ↓
Event Analyzer
       ↓
Question Planner
       ↓
Question Generator
       ↓
Quality Checker
       ↓
Structured Form JSON
       ↓
Google Form Generator
```

The AI should produce structured JSON, NOT arbitrary prose.

---

# 41. AI Quality Requirements

The generated questions should be checked for:

### Relevance

Does the question relate to the event?

### Coverage

Are the important activities/topics represented?

### Diversity

Avoid having every question be a 1–5 scale.

### Duplicates

Avoid semantically duplicate questions.

### Bias

Avoid leading questions.

Bad:

```text
How amazing was our workshop?
```

Better:

```text
How would you rate the overall quality of the workshop?
```

### Length

Avoid generating 30 unnecessary questions.

Default target:

```text
8–15 questions
```

---

# 42. Recommended Question Mix

For a typical workshop:

```text
3–5 scale questions
2–3 multiple choice questions
1–2 short/paragraph questions
```

Adjust dynamically according to the event.

---

# 43. Demo Data

The application should include demo mode.

Use:

```text
AI & Robotics Workshop
```

with:

```text
Machine Learning
OpenCV
Arduino
Object Detection
Obstacle Avoiding Robot
Teamwork
```

This allows the complete application to be demonstrated even if AI/API configuration is temporarily unavailable.

Clearly label demo data as:

```text
Demo
```

Do not fake successful Google Form creation when the backend actually failed.

---

# 44. Empty States

History page with no forms:

```text
No forms yet

Create your first AI-powered feedback form.

[ Create Form ]
```

Question generation failure:

```text
No questions generated

Try providing more details about the event.

[ Edit Event ]
```

---

# 45. Final UX Flow

The complete experience should be:

```text
                DASHBOARD
                    │
                    ▼
              CREATE EVENT
                    │
                    ▼
              AI ANALYSIS
                    │
                    ▼
            QUESTION STUDIO
                    │
                    ▼
            QUALITY CHECK
                    │
                    ▼
           CREATE GOOGLE FORM
                    │
                    ▼
                SUCCESS
                    │
                    ▼
                HISTORY
```

---

# 46. Most Important Hackathon Principle

The application must make the AI automation obvious.

The judge should immediately understand:

```text
I provide an event description
            ↓
AI understands the event
            ↓
AI identifies activities/topics
            ↓
AI designs relevant questions
            ↓
I review them
            ↓
The system creates an actual Google Form
```

Do NOT make the UI look like merely a chatbot.

This is an **AI automation platform**, not an AI chat application.

---

# 47. Final Visual Quality Requirements

The final interface should feel:

* Premium
* Modern
* Futuristic
* Fast
* Smooth
* Professional
* Cohesive
* Hackathon-demo ready

Use:

```text
Outfit
+
Glassmorphism
+
Three.js
+
GSAP
+
Lucide
+
Gradient system
+
Dark AI SaaS aesthetic
```

The UI should resemble a polished modern startup product.

---

# 48. What NOT To Do

Do NOT:

* Use React
* Use Bootstrap
* Use huge libraries unnecessarily
* Put API keys in frontend code
* Make every component glow
* Overuse 3D
* Use generic questions
* Use fake backend success
* Make the UI dependent on animations
* Use random gradients
* Create unnecessary pages
* Make the application look like a generic admin dashboard

---

# 49. Implementation Priority

Build in this order:

### Phase 1 — Design system

Build:

```text
Colors
Typography
Glass cards
Buttons
Inputs
Navbar
Sidebar
Modal
Toast
```

### Phase 2 — Dashboard

Build:

```text
Hero
3D Orb
Statistics
Recent Forms
```

### Phase 3 — Event Creation

Build:

```text
Event form
Validation
Preview
```

### Phase 4 — AI Analysis

Build:

```text
Loading animation
Analysis cards
Topics
Activities
Feedback focus
```

### Phase 5 — Question Studio

Build:

```text
Question cards
Editing
Deleting
Adding
Quality score
```

### Phase 6 — Backend

Connect:

```text
google.script.run
```

to:

```text
Gemini
```

and:

```text
FormApp
```

### Phase 7 — Generation

Build:

```text
Generation animation
Success page
Google Form link
```

### Phase 8 — History

Connect Google Sheets/database storage.

### Phase 9 — Polish

Add:

```text
3D
GSAP
micro-interactions
responsive design
accessibility
error handling
performance optimization
```

---

# 50. Definition of Done

The frontend is complete only when:

* [ ] Dashboard works
* [ ] Create Event works
* [ ] AI Analysis page works
* [ ] Question Studio works
* [ ] Questions can be edited
* [ ] Questions can be deleted
* [ ] Questions can be added
* [ ] AI quality score is displayed
* [ ] Google Form generation works
* [ ] Real Google Form URL is returned
* [ ] Success page works
* [ ] History works
* [ ] Gemini key is server-side only
* [ ] `google.script.run` integration works
* [ ] Three.js hero animation works
* [ ] GSAP animations work
* [ ] Mobile layout works
* [ ] Error states work
* [ ] Loading states work
* [ ] No horizontal overflow
* [ ] No console errors
* [ ] UI feels cohesive and premium

---

# 51. Final Instruction to the AI Coding Agent

Build the application as a **complete working product**, not as a collection of static mockups.

Prioritize functionality first and visual polish second.

Every page must be connected to the application's central state.

Use realistic demo data where backend functionality is not yet connected.

When backend functionality is connected, replace demo responses with real `google.script.run` calls.

Keep Gemini API keys and other secrets entirely server-side.

The final application should allow this complete flow:

```text
User enters event
        ↓
AI analyzes event
        ↓
AI generates customized questions
        ↓
User reviews/edit questions
        ↓
AI quality validation
        ↓
Google Apps Script creates actual Google Form
        ↓
User receives Google Form URL
```

The final result should look and behave like a **premium AI SaaS product suitable for a national-level hackathon demonstration**.
