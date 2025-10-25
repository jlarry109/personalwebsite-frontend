# Personal Portfolio Website

A modern, responsive portfolio website showcasing my professional journey, skills, and projects. Built with Vue.js and deployed on GitHub Pages with a custom domain.

🌐 **Live Site**: [www.portfolio.joneslarry.com](https://www.portfolio.joneslarry.com)

## ✨ Features

### 🎨 Modern UI/UX
- **Glassmorphism design** with backdrop blur effects
- **Dark mode toggle** with system preference detection
- **Responsive design** optimized for all devices
- **Smooth animations** and hover effects
- **Progress bar skills** with gradient styling

### 📱 Interactive Components
- **Dynamic tabbed navigation** with smooth transitions
- **Search and filter functionality** for skills
- **Timeline view** for experience and education
- **Tag-based filtering** for blog posts
- **PDF resume export** functionality

### 📝 Content Sections
- **About Me** - Personal introduction and philosophy
- **Personal Information** - Contact details and social links
- **Education** - Academic background
- **Experience** - Professional work history
- **Skills** - Technical proficiencies with visual progress indicators
- **Certifications** - Professional certifications and achievements
- **Projects** - Portfolio of development work
- **Testimonials** - Professional recommendations
- **Thoughts** - Personal blog with tag filtering

### 🛠 Technical Features
- **PWA support** with offline capabilities
- **Custom domain** configuration
- **SEO optimized** with proper meta tags
- **Performance optimized** with lazy loading
- **Accessibility compliant** with ARIA labels

## 🏗 Architecture

### Frontend Stack
- **Vue.js 3** - Progressive JavaScript framework
- **Vite** - Fast build tool and dev server
- **Vue Router** - Client-side routing
- **CSS3** - Modern styling with gradients and animations
- **Font Awesome** - Icon library

### Deployment
- **GitHub Pages** - Static site hosting
- **Custom Domain** - www.portfolio.joneslarry.com
- **GitHub Actions** - Automated CI/CD pipeline
- **SSL Certificate** - Free HTTPS via GitHub

### Data Management
- **JSON files** - Static data storage in `/public/data/`
- **Dynamic loading** - Fetch API for data retrieval
- **Error handling** - Graceful fallbacks and loading states

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🔧 Development

### Tech Stack
- Vue.js 3 with Composition API
- Vite for build tooling
- ESLint for code quality
- CSS3 with custom properties
- Progressive Web App features

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/jlarry109/personalwebsite-frontend.git
cd personalwebsite-frontend

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Deployment

The site automatically deploys to GitHub Pages when changes are pushed to the main branch.

```bash
# Deploy to GitHub Pages
git push origin main
```

## 📁 Project Structure

```
src/
├── components/          # Reusable Vue components
│   ├── user/           # User-facing components
│   ├── admin/          # Admin components
│   └── icons/          # Icon components
├── views/              # Page components
├── router/             # Vue Router configuration
├── assets/             # Static assets
├── composables/        # Vue composables
├── directives/         # Custom directives
└── utils/              # Utility functions

public/
├── data/               # JSON data files
├── favicon/            # Favicon assets
└── CNAME              # Custom domain configuration
```

## 🎨 Design System

### Color Palette
- Primary: `#6366f1` (Indigo)
- Secondary: `#8b5cf6` (Purple)
- Success: `#10b981` (Emerald)
- Warning: `#f59e0b` (Amber)
- Error: `#ef4444` (Red)

### Typography
- Font Family: Inter, system fonts
- Headings: 700 weight, tight letter spacing
- Body: 400-500 weight, optimized line height

## 🤝 Contributing

This is a personal portfolio project, but feel free to:
- Report bugs or issues
- Suggest improvements
- Use as inspiration for your own portfolio

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Vue.js team for the amazing framework
- GitHub for free hosting and CI/CD
- Font Awesome for icons
- All the open source contributors

---

**Built with ❤️**  
[Portfolio](https://www.portfolio.joneslarry.com) • [LinkedIn](https://linkedin.com/in/joxlaar) • [GitHub](https://github.com/joxlaar)

