# Social Support Application

A multi-step form application for social support applications with AI-powered writing assistance. Built with React, TypeScript, and Vite, featuring internationalization (English/Arabic) and OpenAI integration for form field suggestions.

## Features

- 📝 **Multi-step Form**: Three-step application process with progress tracking
- 🤖 **AI Writing Assistant**: OpenAI integration to help users write form descriptions
- 🌍 **Internationalization**: Support for English and Arabic languages with RTL layout
- 💾 **Auto-save**: Automatic form progress saving to localStorage
- 📱 **Responsive Design**: Modern UI built with Tailwind CSS
- ✅ **Form Validation**: Comprehensive validation using React Hook Form

## 📋 Prerequisites

- Node.js (version 16 or higher)
- Yarn package manager
- OpenAI API Key (for AI writing assistance feature)

## 🚀 How to Run the Project

### 1. Clone and Install Dependencies

```bash
# Navigate to the project directory
cd social-poc

# Install dependencies
yarn install
```

### 2. Set up Environment Variables

Create a `.env` file in the root directory:

```bash
# Create .env file
touch .env
```

Add your OpenAI API key to the `.env` file:

```env
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

### 3. Start Development Server

```bash
# Start the development server
yarn dev
```

The application will be available at `http://localhost:5173`

### 4. Build for Production

```bash
# Build the project
yarn build

# Preview the production build
yarn preview
```

## 🔑 How to Set up the OpenAI API Key

### Step 1: Get an OpenAI API Key

1. Visit [OpenAI's website](https://platform.openai.com/)
2. Sign up or log in to your account
3. Navigate to the API section
4. Go to "API Keys" in your dashboard
5. Click "Create new secret key"
6. Copy the generated API key

### Step 2: Configure the API Key

1. Create a `.env` file in the project root (if not already created)
2. Add your API key:
   ```env
   VITE_OPENAI_API_KEY=sk-your-actual-api-key-here
   ```
3. Restart the development server after adding the API key

### Step 3: Verify Setup

- The "Help Me Write" buttons should work without authentication errors
- Check the browser console for any API-related errors
- Test the AI writing assistance on Step 3 of the form

### Data Flow

1. **Form State Management**:

   - React Hook Form handles form validation and state
   - Form data is automatically saved to localStorage on each step
   - Data persists across browser sessions

2. **Step Navigation**:

   - Controlled by `step` state in App.tsx
   - Form validation prevents progression to next step
   - Previous steps remain accessible

3. **AI Writing Assistance**:

   - Triggered by "Help Me Write" buttons in Step 3
   - Sends field context to OpenAI GPT-3.5-turbo
   - Returns suggestions in a modal popup
   - Users can accept, edit, or discard suggestions

4. **Internationalization**:
   - i18next handles language switching
   - RTL layout support for Arabic
   - All text content is translatable

### Key Features Implementation

#### Multi-step Form

- Each step is a separate component with its own validation rules
- Progress is visually indicated with a progress bar
- Form state persists across steps using localStorage

#### AI Integration

- OpenAI API integration for writing assistance
- Error handling for API failures, rate limits, and authentication
- Timeout protection (10 seconds) for API calls

#### Internationalization

- English and Arabic language support
- Automatic RTL layout for Arabic
- Language preference persistence

## 🛠️ Available Scripts

```bash
yarn dev      # Start development server
yarn build    # Build for production
yarn preview  # Preview production build
yarn lint     # Run ESLint
```

## 🔧 Environment Variables

| Variable              | Description                              | Required |
| --------------------- | ---------------------------------------- | -------- |
| `VITE_OPENAI_API_KEY` | OpenAI API key for AI writing assistance | Yes      |

## 📦 Dependencies

### Core Dependencies

- **React 19.1.0**: UI library
- **TypeScript**: Type safety
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Styling framework

### Form & Validation

- **react-hook-form**: Form state management and validation

### Internationalization

- **i18next**: Internationalization framework
- **react-i18next**: React bindings for i18next

### API Integration

- **axios**: HTTP client for OpenAI API calls
