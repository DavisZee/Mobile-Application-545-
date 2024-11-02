# Mobile-Application-545-
By Davis Zhong
HW Projects for CSS 545
1. I intend for the final project to be runnable on an Android device, but potentially also be runnable on an iOS device. Ideally my application would be functional on my personal iPhone but I've had trouble doing this in the past with my currently planned project structure so I will at least make it functional on virtual Android emulators and see if I can move it to my iPhone at a later time.
2. I intend to use TypeScript and React Native on VSCode to develop my application but may continue to do research on if there is a better framwork me to use. This is the structure that I have developed with before but I am actively looking for a different perhaps more robust or convenient way to achieve my goal.
3. I want to explore cross-platform development as I will be developing from a Windows computer for a iOS device but if I come across limitations I may decide to stick to virtual Android emulators to run my project until I find a better solution.



# HW2 - Storage Options

## Storage Options for React Native Expo Alarm App

### Storage Types and Solutions

| **Storage Type**           | **Option**                      | **Pros**                                                                                                      | **Cons**                                                                                                      |
|----------------------------|----------------------------------|---------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------|
| **User Information**        | AsyncStorage                    | Simple to implement, good for small, non-sensitive data like user preferences.                                  | Limited capacity (~6MB), no encryption, not secure for sensitive data.                                         |
|                            | SecureStore (expo-secure-store)  | Secure, encrypted storage for sensitive data like credentials.                                                 | Not suitable for large or complex data, slower due to encryption.                                              |
|                            | Firebase Firestore               | Scalable, real-time syncing across devices, good for user profiles.                                             | Requires user authentication management, can incur costs as usage scales.                                      |
|                            | SQLite (expo-sqlite)             | Ideal for structured, offline data storage with complex queries.                                                | Requires database management, adds complexity for schema and syncing.                                          |
| **Alarm History**           | AsyncStorage                    | Suitable for small alarm history, easy and quick to retrieve.                                                   | Limited capacity, not ideal for large or complex data storage.                                                 |
|                            | SQLite                           | Good for structured, historical data with complex queries, works offline.                                       | Requires schema management, setup more complex than key-value storage.                                         |
|                            | Firebase Firestore               | Real-time syncing, scalable for long-term alarm history records.                                                | Potential costs with large data storage, needs cloud connectivity.                                             |
| **Device Tokens / IDs**     | SecureStore                     | Secure storage for notification tokens, ensuring privacy.                                                       | Inefficient for handling many tokens, not for large-scale token management.                                    |
|                            | Firebase Firestore / Realtime DB | Scalable and secure, great for managing notification tokens, integrates with Firebase Cloud Messaging.           | Requires network connectivity, can increase costs with large-scale usage.                                      |
|                            | AsyncStorage                    | Simple for storing local device tokens.                                                                         | Not secure for sensitive tokens, suitable only for non-critical identifiers.                                   |
| **Audio Files**             | Expo FileSystem (expo-file-system)| Great for storing local media files, flexible and cross-platform.                                               | Manual file path management, no built-in encryption, requires cache management.                                |
|                            | Firebase Cloud Storage           | Scalable for uploading/storing alarm sounds, accessible across devices.                                         | Requires user permissions, can incur costs with large file storage, needs network connectivity.                 |
|                            | AWS S3                           | Highly scalable, cost-efficient, ideal for large-scale media storage.                                            | Complex setup for permissions and file encryption, more work to configure than Firebase.                       |
| **Custom Audio Uploads**    | Expo FileSystem                 | Suitable for local storage of custom user-uploaded audio.                                                       | No cloud backup or multi-device sync without additional setup, data loss risk on device switch.                 |
|                            | Firebase Cloud Storage           | Seamless across devices, scalable, ideal for large audio files.                                                 | Costs associated with large file uploads, requires network connectivity.                                       |
|                            | AWS S3                           | Secure and scalable for custom uploads, handles large-scale data well.                                          | More complex to set up access and permissions securely, more setup than Firebase.                              |
| **Temporary Cache**         | AsyncStorage                    | Easy solution for caching small temporary data, quick to implement.                                             | Limited size, not suited for caching large media or complex data.                                               |
|                            | Expo FileSystem                 | Excellent for larger media caching, provides manual cache management.                                           | Manual cache cleanup required, no automatic cache expiration.                                                  |
|                            | react-native-cache-manager       | Efficient for managing cached media with auto-expiration.                                                       | Requires integration with file system for handling large files.                                                |


# HW3 - State management
### Active state:
- App is currently open and in use
- Important because this is when the user is expecting the app to deliver promised functionalities
- In this state app should function as normal

### Inactive state:
- Brief state where app is temporarily not receiving user input such as when a user switches to another app or phone call
- Important to consider because transitions to and from this state can disrupt user experience if not handled properly
- In this state the app should pause all non-essential tasks like background animations or data fetching, save the current app state if its transitioned to the background, and temporarily stop receiving user input but prepare for resuming.

### Suspended State:
- The app is no longer running in memory and has been completely unloaded by the OS, which can occur if the OS needs resources or if the user doesn’t return to the app for a while.
- Suspended states mean the app is no longer in memory, so it needs to restore the user’s last known state to ensure a seamless user experience upon return.
-
Release any resources that were not saved during the background state.
Prepare mechanisms for restoring the user’s session or state to where they left off when the app is relaunched.
### Error States:
- These states occur when the app encounters unexpected issues (e.g., network failures, unhandled exceptions, or API response errors).
- Proper error handling improves user experience and prevents crashes, ensuring that users can continue using the app.
-
Display user-friendly error messages and recovery options, such as “Try Again” buttons.
Log errors to monitoring services like Sentry or Firebase Crashlytics for debugging and diagnostics.
Allow users to recover or reset the affected component without requiring a full app restart.
### Network Connectivity States:
- These states track changes in the app’s network connectivity, including online, offline, or limited connectivity.
- Connectivity fluctuations are common on mobile devices and can affect data-reliant features.
-
Provide offline mode capabilities by caching essential data locally, enabling some functionality without internet.
Gracefully handle connectivity changes, and resume any necessary data sync when the connection is restored.
Display network indicators when connectivity is critical to app functionality.
### Permission States:
- These states arise when the app requests user permissions (e.g., location, camera, or push notifications).
- Permissions are necessary for accessing specific features, and handling them appropriately maintains user trust.
- Handle permission denial gracefully by providing alternative paths or fallback options.
Provide users with context on why permissions are necessary for certain features.
Track permission status and adjust functionality based on the user’s permissions.
### Authentication States:
- States related to user login status, such as logged in, logged out, or session expired.
- Authentication impacts user access to personalized features and content within the app.
- Persist the user’s authentication status across sessions to ensure they remain logged in.
Redirect to the login screen if the session expires.
Attempt to refresh tokens or re-authenticate if possible to prevent interrupting the user experience.
### Loading States:
- States where data is being fetched, uploaded, or processed in the app.
- Proper handling of loading states improves the user experience, preventing the app from feeling unresponsive.
- Show loading indicators or skeleton screens while data is being processed or loaded.
Provide cancel or retry options for long-running operations.
Ensure good user feedback, so users know the app is processing data and remains responsive.
### Update States:
- States where the app undergoes updates, either self-updating (over-the-air updates) or through the app store.
- Keeping the app updated ensures users benefit from security fixes, new features, and stability improvements.
- Notify users about available updates and provide prompts for a restart if required.
For over-the-air (OTA) updates, ensure updates are smooth and don’t interrupt the user’s current session.
Handle any data migrations or updates to ensure continuity and prevent data loss after the update is applied.