# Modern React Native App with Expo

A modern React Native application built with Expo, featuring a beautiful animated splash screen and modern UI design.

## Features

- 🎨 Modern UI with dark purple theme
- ✨ Animated splash screen with smooth transitions
- 🔄 Dynamic navigation based on animation completion
- 📱 Responsive design that works on all screen sizes
- 🎯 Optimized performance with native animations
- 🌈 Beautiful blur effects and shadows

## Tech Stack

- [Expo](https://expo.dev) - React Native development platform
- [Expo Router](https://docs.expo.dev/router/introduction/) - File-based routing
- [Expo Blur](https://docs.expo.dev/versions/latest/sdk/blur-view/) - Beautiful blur effects
- [React Native Animated](https://reactnative.dev/docs/animated) - Smooth animations
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework

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

## Project Structure

```
my-app/
├── app/                    # Main application code
│   ├── components/         # Reusable components
│   │   └── SplashScreen.tsx # Animated splash screen
│   ├── (tabs)/            # Tab-based navigation
│   └── _layout.tsx        # Root layout configuration
├── assets/                 # Static assets
│   └── images/            # Image assets
└── global.css             # Global styles
```

## Splash Screen Features

The app includes a modern splash screen with:

- Smooth fade-in animation
- Scale-up effect with spring physics
- 360-degree rotation
- Dynamic navigation timing
- Beautiful blur effects
- Modern dark purple theme
- Responsive design

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
- All contributors who help improve this project
