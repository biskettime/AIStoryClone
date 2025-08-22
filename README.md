# AIStory Clone - React Native App

A React Native recreation of the AIStory app UI, featuring AI character interactions and chat experiences.

## 🎨 Features

- **Dark Theme UI**: Modern dark interface matching the original app
- **Character Cards**: Interactive character cards with images and descriptions  
- **Category Filtering**: Browse characters by categories (For you, Male, Female, Dynamic, Anime)
- **Bottom Navigation**: 5-tab navigation (Home, Chats, Create, Hunt, My)
- **Search Functionality**: Search bar for finding specific characters

## 📱 Screenshots

Based on the original AIStory app design with:
- Grid layout for character cards
- Dynamic badges for special categories
- Gradient overlays on character images
- Clean, modern interface

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- React Native development environment set up
- Xcode (for iOS) or Android Studio (for Android)

### Installation

1. Clone the repository:
```bash
cd /Users/taeyangchoi/Desktop/AIStoryClone
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Install iOS pods (iOS only):
```bash
cd ios && pod install && cd ..
```

4. Run the app:

For iOS:
```bash
npx react-native run-ios
```

For Android:
```bash
npx react-native run-android
```

## 📁 Project Structure

```
AIStoryClone/
├── src/
│   ├── screens/
│   │   ├── HomeScreen.js
│   │   ├── ChatsScreen.js
│   │   ├── CreateScreen.js
│   │   ├── HuntScreen.js
│   │   └── ProfileScreen.js
│   ├── components/
│   │   ├── SearchBar.js
│   │   ├── CategoryTabs.js
│   │   └── CharacterCard.js
│   ├── styles/
│   │   ├── colors.js
│   │   └── globalStyles.js
│   └── data/
│       └── charactersData.js
├── App.js
└── package.json
```

## 🎨 Color Theme

The app uses a dark theme with the following primary colors:
- Background: `#0D0D14`
- Surface: `#1A1A2E`
- Primary (Purple): `#BA86FC`
- Secondary (Teal): `#03DAC6`
- Text: `#FFFFFF`
- Text Secondary: `#B0B0B0`

## 📦 Dependencies

- React Native 0.73.0
- React Navigation (Bottom Tabs)
- React Native Vector Icons
- React Native Linear Gradient
- React Native Safe Area Context

## 🔄 Future Enhancements

- [ ] Add actual character images
- [ ] Implement chat functionality
- [ ] Add character creation flow
- [ ] Integrate with backend API
- [ ] Add animations and transitions
- [ ] Implement user authentication
- [ ] Add profile management features

## 📝 Notes

This is a UI recreation based on the original AIStory app. The character data is currently using placeholder images and mock data. To fully replicate the app experience, you would need to:

1. Replace placeholder images with actual character artwork
2. Connect to a backend service for dynamic content
3. Implement the chat and interaction features
4. Add user authentication and profile management

## 📄 License

This project is for educational purposes only.