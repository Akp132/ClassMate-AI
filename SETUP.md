# ClassMate AI - Setup Guide

This guide will help you set up the ClassMate AI application on your local development environment.

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (version 18.17 or later)
- **npm** (comes with Node.js) or **yarn**
- **Git** for version control
- A modern web browser (Chrome, Firefox, Safari, or Edge)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/Akp132/ClassMate-AI.git
cd ClassMate-AI
```

### 2. Navigate to Frontend Directory

```bash
cd frontend
```

### 3. Install Dependencies

```bash
npm install
```

Or if you prefer yarn:
```bash
yarn install
```

### 4. Environment Configuration

Create a `.env.local` file in the frontend directory:

```bash
cp .env.example .env.local  # If example exists
# OR create manually:
touch .env.local
```

Add the following environment variables to `.env.local`:

```env
# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-jwt-key-here

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000

# Google Authentication (Optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Application Settings
NEXT_PUBLIC_APP_NAME=ClassMate AI
NEXT_PUBLIC_APP_VERSION=1.0.0
```

### 5. Start Development Server

```bash
npm run dev
```

Or with yarn:
```bash
yarn dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## 🔧 Detailed Configuration

### Backend API Setup

**Note**: The frontend expects a backend API server. While you can run the frontend without it, some features will not work properly.

If you have a backend server:
1. Ensure it's running on `http://localhost:5000`
2. Update the `NEXT_PUBLIC_API_URL` in your `.env.local` if using a different URL

If you don't have a backend server:
- The app will show demo data and some API calls will fail (this is expected)
- You can still explore the UI and most functionality

### Google Classroom Integration

To enable Google Classroom integration:

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Classroom API
4. Create OAuth 2.0 credentials
5. Add your domain to authorized origins
6. Update the environment variables with your credentials

### Theme Configuration

The app supports light/dark themes. The theme preference is stored in localStorage and syncs across tabs.

## 📦 Build and Deployment

### Development Build

```bash
npm run build
```

This creates an optimized production build in the `.next` directory.

### Production Server

```bash
npm run start
```

Runs the production build on `http://localhost:3000`

### Static Export (Optional)

If you want to deploy as a static site:

1. Update `next.config.ts`:
```typescript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
```

2. Build and export:
```bash
npm run build
```

## 🛠️ Development Tools

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production version
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality
- `npm run type-check` - Run TypeScript type checking

### Recommended VS Code Extensions

```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-eslint",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

### Code Formatting

The project uses Prettier for code formatting. Create a `.prettierrc` file:

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false
}
```

## 🐛 Troubleshooting

### Common Issues

#### 1. Font Loading Issues
If you see font loading errors in build:
```bash
# This might happen due to network restrictions
# The app will still work with system fonts
```

Solution: Check your internet connection or configure font fallbacks.

#### 2. API Connection Errors
If you see `ERR_CONNECTION_REFUSED` errors:
- Ensure your backend server is running on the correct port
- Check your `NEXT_PUBLIC_API_URL` environment variable
- Verify firewall settings aren't blocking the connection

#### 3. Authentication Issues
If authentication doesn't work:
- Verify your `NEXTAUTH_SECRET` is set
- Check Google OAuth credentials if using Google login
- Ensure the `NEXTAUTH_URL` matches your development URL

#### 4. TypeScript Errors
If you encounter TypeScript errors:
```bash
# Check types
npm run type-check

# Clear Next.js cache
rm -rf .next
npm run dev
```

#### 5. Dependency Issues
If you have dependency conflicts:
```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Performance Issues

#### Slow Development Server
If the dev server is slow:
1. Enable Turbopack (already configured in package.json)
2. Add more memory to Node.js:
```bash
export NODE_OPTIONS="--max_old_space_size=4096"
npm run dev
```

#### Large Bundle Size
To analyze bundle size:
```bash
npm install --save-dev @next/bundle-analyzer
```

Update `next.config.ts`:
```typescript
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig)
```

Run analysis:
```bash
ANALYZE=true npm run build
```

## 🔒 Security Considerations

### Environment Variables
- Never commit `.env.local` to version control
- Use different secrets for different environments
- Rotate secrets regularly

### API Security
- Always validate API responses on the client
- Implement proper error handling
- Use HTTPS in production

### Authentication
- Use secure session storage
- Implement proper logout functionality
- Handle token expiration gracefully

## 📱 Mobile Development

The app is responsive and works well on mobile devices. For better mobile testing:

1. Use Chrome DevTools device simulation
2. Test on actual devices when possible
3. Consider PWA features for mobile app-like experience

## 🔄 Continuous Integration

### GitHub Actions Example

Create `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        cache-dependency-path: frontend/package-lock.json
    
    - name: Install dependencies
      run: |
        cd frontend
        npm ci
    
    - name: Run linter
      run: |
        cd frontend
        npm run lint
    
    - name: Type check
      run: |
        cd frontend
        npm run type-check
    
    - name: Build application
      run: |
        cd frontend
        npm run build
```

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Radix UI Documentation](https://www.radix-ui.com/docs)

## 🆘 Getting Help

If you encounter issues not covered in this guide:

1. Check the [GitHub Issues](https://github.com/Akp132/ClassMate-AI/issues)
2. Create a new issue with detailed information
3. Include your environment details and error messages
4. Check the browser console for additional error information

## 🎯 Next Steps

After successful setup:

1. Explore the dashboard and familiarize yourself with the UI
2. Check out the AI Assistant features
3. Try adding sample data to test functionality
4. Review the codebase to understand the architecture
5. Consider contributing new features or improvements

Happy coding! 🚀