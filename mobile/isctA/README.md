# ISCTa

This is a mobile app that aims to enable students to check-in to classes via QRCode stickers on the classroom desks.

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo


## Relevant folders and application files
+ app
  
  This folder holds the primary screens and layouts of the app.
   + (tabs)
     
      This folder holds the tabs used in tab navigation
     + _layout.tsx
       
        Layout file for the tabbed navigation, usually setting up common elements like the tab bar and layout structure.
     + about.tsx
       
        A screen file for the 'About' tab
     + attendance.tsx
       
        A screen file that uses the phone camera to scan QRCodes
     + index.tsx
       
       The main screen or home screen, if you like it, within the tab structure. This is the default screen.
     + +not-found.tsx
       
       A custom 'not found' screen that is shown if a user tries to navigate to an invalid route.
     + checkin.tsx
       
       A screen where the student can check the class details after scanning the QRCode and confirm the check-in.
+ components
  
  Reusable components for the app, promoting modularity and reducing duplication.
+ constants
  
  Holds constant values or settings that are used throughout the app.

## Important reading

[useEffect Hook](https://react.dev/reference/react/useEffect)
[Tab Navigation](https://docs.expo.dev/router/advanced/tabs/)





