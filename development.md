# BestzDeal Development Documentation

## Tech Stack

### Frontend
- **Framework**: Next.js (React)
- **Styling**: Tailwind CSS
- **Animation Libraries**:
  - GSAP (GreenSock Animation Platform)
  - Framer Motion
  - Three.js (3D effects)
  - Lottie (vector animations)

### Data Management
- **State Management**: React Context API
- **Local Storage**: Browser localStorage for persistent data
- **Dummy Data**: JSON files for simulating backend responses

### Visual Effects
- **UI Effects**:
  - Glassmorphism
  - Particle animations
  - Parallax scrolling
  - Aurora light effects
  - Liquid mesh animations

### Deployment
- **Hosting**: GitHub Pages
- **Build Process**: Next.js static export

## Project Structure

```
/
├── src/
│   ├── app/                  # Next.js app router
│   ├── components/           # Reusable UI components
│   │   ├── ui/               # Basic UI elements
│   │   ├── layout/           # Layout components
│   │   ├── animations/       # Animation components
│   │   └── sections/         # Page sections
│   ├── hooks/                # Custom React hooks
│   ├── context/              # React context providers
│   ├── lib/                  # Utility functions
│   └── data/                 # Dummy data JSON files
├── public/                   # Static assets
│   ├── images/               # Image assets
│   ├── animations/           # Lottie files
│   ├── models/               # 3D models
│   └── fonts/                # Custom fonts
├── research.md               # Market research
├── development.md            # This file
├── readme.md                 # Project overview
└── todoList.md               # Development progress
```

## Development Roadmap

### Phase 1: MVP Setup (Current)
- Initialize Next.js project
- Set up basic project structure
- Create documentation files
- Implement core UI components

### Phase 2: Home Page Development
- Design and implement hero section
- Create 3-step process animation
- Develop feature highlights section
- Implement interactive demo preview
- Add comparison section

### Phase 3: Demo Page Development
- Create interactive request form
- Implement seller response simulation
- Develop AI matching visualization
- Add deal comparison interface

### Phase 4: Additional Pages
- Pitch Deck page
- Why Us page
- Landing page variations
- Showcase page
- Roadmap page

### Phase 5: Refinement & Optimization
- Mobile responsiveness
- Performance optimization
- Animation fine-tuning
- Browser compatibility testing

## Component Architecture

### Core Components
- **Navbar**: Site navigation with animated transitions
- **Hero**: Interactive showcase of the platform concept
- **ProcessSteps**: Animated 3-step explanation
- **RequestForm**: Interactive form for posting buyer needs
- **SellerResponse**: Simulated seller bid cards
- **AIMatchVisual**: Visual representation of the matching process
- **ComparisonSlider**: Before/after slider showing value proposition
- **Footer**: Site footer with animated elements

### Animation Components
- **ParticleField**: Background particle animation
- **AuroraEffect**: Gradient light animation
- **GlassmorphicCard**: Frosted glass card component
- **LiquidBackground**: Organic flowing background
- **ScrollParallax**: Multi-layer parallax effect
- **TypewriterText**: Animated text typing effect

## Usage Guide

### Local Development
1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Access the site at: `http://localhost:3000`

### Adding New Pages
1. Create a new directory in `src/app/`
2. Add a `page.js` file with the page component
3. Update navigation links in the Navbar component

### Working with Animations
- GSAP animations are initialized in useEffect hooks
- Framer Motion animations use the motion components
- Three.js scenes are wrapped in their own components
- Lottie animations are loaded from the public directory

### Simulating Backend Functionality
- Use the dummy data in `src/data/`
- Implement artificial delays with setTimeout
- Store user inputs in localStorage
- Simulate API responses with predefined JSON

## Performance Considerations
- Lazy load heavy components and animations
- Optimize images and assets
- Use proper code splitting
- Implement progressive enhancement
- Consider reduced motion preferences
