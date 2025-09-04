# E-commerce Marketplace - Frontend

A modern, responsive e-commerce marketplace frontend built with React and Vite, featuring a sleek user interface and seamless shopping experience.

🌐 **Live Demo**: [https://e-commerce-frontend-two-psi.vercel.app](https://e-commerce-frontend-two-psi.vercel.app)

## ✨ Features

- **Modern UI/UX**: Clean and intuitive design with Tailwind CSS
- **Responsive Design**: Mobile-first approach, works on all devices
- **Product Catalog**: Browse products with search, filters, and categories
- **Shopping Cart**: Add/remove items with real-time updates
- **User Authentication**: Login/register with secure authentication
- **User Dashboard**: Profile management and order history
- **Checkout Process**: Smooth checkout with multiple payment options
- **Admin Panel**: Product and order management for administrators
- **Fast Performance**: Built with Vite for lightning-fast development and builds
- **SEO Optimized**: Meta tags and structured data for better search visibility

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Context API / Redux Toolkit
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Form Handling**: React Hook Form
- **Icons**: React Icons / Heroicons
- **Notifications**: React Hot Toast
- **Image Handling**: React Image Gallery
- **Deployment**: Vercel

## 📋 Prerequisites

- Node.js (v16.0.0 or higher)
- npm or yarn
- Backend API running (see backend repository)

## ⚡ Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/nayaksuryanshu/E-commerce-frontend.git
cd E-commerce-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:5000/api
# For production:
# VITE_API_BASE_URL=https://your-backend-api.com/api

# Payment Configuration (if using Stripe)
VITE_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key

# Other configurations
VITE_APP_NAME=E-commerce Marketplace
VITE_APP_VERSION=1.0.0
```

### 4. Run the application

```bash
# Development mode
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The application will be available at `http://localhost:5173`

## 📁 Project Structure

```
E-commerce-frontend/
├── public/                 # Static files
│   ├── images/
│   ├── icons/
│   └── favicon.ico
├── src/
│   ├── components/         # Reusable components
│   │   ├── common/         # Common UI components
│   │   ├── layout/         # Layout components
│   │   ├── product/        # Product-related components
│   │   └── cart/           # Shopping cart components
│   ├── pages/              # Page components
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── Profile.jsx
│   │   └── Admin/
│   ├── hooks/              # Custom React hooks
│   │   ├── useAuth.js
│   │   ├── useCart.js
│   │   └── useLocalStorage.js
│   ├── context/            # React Context
│   │   ├── AuthContext.jsx
│   │   ├── CartContext.jsx
│   │   └── ThemeContext.jsx
│   ├── services/           # API services
│   │   ├── api.js
│   │   ├── authService.js
│   │   ├── productService.js
│   │   └── orderService.js
│   ├── utils/              # Utility functions
│   │   ├── helpers.js
│   │   ├── constants.js
│   │   └── formatters.js
│   ├── styles/             # Global styles
│   │   └── index.css
│   ├── App.jsx             # Main App component
│   └── main.jsx            # Application entry point
├── .env                    # Environment variables
├── .gitignore
├── package.json
├── tailwind.config.js      # Tailwind CSS configuration
├── vite.config.js          # Vite configuration
└── README.md
```

## 🎨 Key Components

### Navigation & Layout
- **Header**: Navigation with logo, search, cart, and user menu
- **Footer**: Links, social media, and company information
- **Sidebar**: Category filters and additional navigation

### Product Components
- **ProductCard**: Display product with image, title, price, and actions
- **ProductGrid**: Responsive grid layout for product listings
- **ProductDetail**: Detailed product view with images, description, and reviews
- **ProductFilters**: Search, category, price, and rating filters

### Shopping Cart
- **CartItem**: Individual cart item with quantity controls
- **CartSummary**: Order total and checkout button
- **MiniCart**: Dropdown cart preview in header

### User Interface
- **LoginForm**: User authentication form
- **RegisterForm**: User registration form
- **UserProfile**: Profile management and order history
- **Dashboard**: User/Admin dashboard with analytics

## 🔧 Configuration

### Tailwind CSS

The project uses Tailwind CSS for styling. Configuration in `tailwind.config.js`:

```javascript
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        secondary: '#64748b',
        accent: '#f59e0b',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

### API Integration

All API calls are centralized in the `services` directory:

```javascript
// services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

## 📱 Responsive Design

The application is fully responsive with breakpoints:

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on git push

### Netlify

1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Set up environment variables
4. Configure redirects for SPA routing

### Manual Deployment

```bash
# Build for production
npm run build

# The dist folder contains the built application
# Upload the contents to your web server
```

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run end-to-end tests
npm run test:e2e
```

## 🔍 SEO & Performance

- **Meta Tags**: Dynamic meta tags for each page
- **Open Graph**: Social media sharing optimization
- **Lazy Loading**: Images and components loaded on demand
- **Code Splitting**: Route-based code splitting for faster loads
- **PWA Ready**: Service worker for offline functionality

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🐛 Bug Reports

If you find a bug, please create an issue with:

- Clear description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Browser and device information

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Suryanshu Nayak**
- GitHub: [@nayaksuryanshu](https://github.com/nayaksuryanshu)
- LinkedIn: [Connect with me](https://linkedin.com/in/yourprofile)

## 🤝 Support

Give a ⭐️ if this project helped you!

For support, email your-email@example.com or create an issue in this repository.

---

**Happy Shopping! 🛒**