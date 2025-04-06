# Movie Lookup App

A modern React Native application built with Expo for searching and discovering movies. Features a beautiful animated splash screen, modern UI design, and tab-based navigation with blur effects.

## Features

- 🎬 Comprehensive movie search and discovery
- 🎨 Modern UI with dark theme support
- ✨ Animated splash screen with smooth transitions
- 📱 Tab-based navigation with blur effects
- 🔍 Advanced search functionality
- 🎯 Animated tab bar with custom icons
- 🌓 Dark/Light mode support
- 🔄 Dynamic animations using Moti
- 🎭 Beautiful blur effects using Expo Blur
- 📱 Responsive design with safe area handling

## Tech Stack

- [Expo](https://expo.dev) - React Native development platform
- [Expo Router](https://docs.expo.dev/router/introduction/) - File-based routing
- [Expo Blur](https://docs.expo.dev/versions/latest/sdk/blur-view/) - Beautiful blur effects
- [Moti](https://moti.fyi/) - Animation library
- [NativeWind](https://www.nativewind.dev/) - TailwindCSS for React Native
- [React Navigation](https://reactnavigation.org/) - Navigation library
- [TypeScript](https://www.typescriptlang.org/) - Type safety

## Project Structure

```
my-app/
├── app/                    # Main application code
│   ├── components/         # Reusable components
│   │   └── SplashScreen.tsx # Animated splash screen
│   ├── (tabs)/            # Tab-based navigation
│   │   ├── _layout.tsx    # Tab navigation layout
│   │   ├── index.tsx      # Home screen with featured movies
│   │   ├── search.tsx     # Movie search screen
│   │   └── profile.tsx    # User profile screen
│   ├── showdetails/       # Movie details screens
│   ├── _layout.tsx        # Root layout configuration
│   └── index.tsx          # Entry point with splash screen
├── assets/                 # Static assets
│   └── images/            # Image assets including app logo
└── global.css             # Global styles
```

## Getting Started

1. Clone the repository

   ```bash
   git clone <your-repo-url>
   cd my-app
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Start the development server

   ```bash
   npx expo start
   ```

4. Run on your preferred platform:
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app for physical device

## Key Features

### Movie Search & Discovery

- Advanced movie search functionality
- Featured movies on home screen
- Detailed movie information
- Movie details view with rich content

### Tab Navigation

- Custom animated tab bar with blur effects
- Smooth icon animations using Moti
- Dark/Light mode support
- Safe area handling for different devices

### Splash Screen

- Smooth fade-in animation
- Scale-up effect with spring physics
- 360-degree rotation
- Dynamic navigation timing
- Beautiful blur effects
- Modern dark theme

### UI Components

- Custom tab icons with animations
- Blur effects for depth
- Responsive layouts
- Safe area handling
- Dark/Light mode support

## Dependencies

### Core

- expo: ~52.0.40
- react: 18.3.1
- react-native: 0.76.7
- expo-router: ~4.0.19

### UI & Animation

- expo-blur: ~14.0.3
- moti: ^0.30.0
- nativewind: ^4.1.23
- react-native-reanimated: ^3.16.2

### Navigation

- @react-navigation/bottom-tabs: ^7.2.0
- @react-navigation/native: ^7.0.14
- @react-navigation/stack: ^7.2.3

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Expo team for the amazing development platform
- React Native community for the robust ecosystem
- Moti team for the excellent animation library
- NativeWind team for bringing TailwindCSS to React Native
