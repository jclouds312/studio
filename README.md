# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Installing as a Mobile App (PWA)

This application is a Progressive Web App (PWA), which means you can install it on your mobile device directly from the browser, just like a native app. No app store is needed!

### How to Install:

1.  **Open the App in Your Browser:** Navigate to the application's URL on your smartphone (e.g., Chrome on Android or Safari on iOS).
2.  **Add to Home Screen:**
    *   **On Android (Chrome):** Look for a pop-up prompt at the bottom of the screen asking to "Add to Home Screen" or tap the three-dot menu icon and select "Install app" or "Add to Home screen".
    *   **On iOS (Safari):** Tap the "Share" icon (a square with an arrow pointing up) in the navigation bar, then scroll down and select "Add to Home Screen".
3.  **Launch from Home Screen:** Once installed, you will find the app's icon on your home screen. You can launch it from there for an experience that feels just like a native application.

## Generating an APK from Android (Using Termux)

For advanced users who wish to compile a native APK package directly from an Android device, you can use Termux. This process uses a command-line tool to wrap the Progressive Web App (PWA) into an installable APK.

**Prerequisites:**
*   An Android smartphone.
*   The Termux app installed (it's recommended to get it from F-Droid as the Google Play Store version is outdated).
*   A stable internet connection.

### Step-by-Step Instructions:

1.  **Set up Termux:**
    Open Termux and update its packages:
    ```bash
    pkg update && pkg upgrade
    ```

2.  **Install Dependencies:**
    You will need `git` and `nodejs-lts`:
    ```bash
    pkg install git nodejs-lts
    ```

3.  **Clone the Project:**
    Clone your application's repository from GitHub into Termux:
    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```
    (Replace `your-username/your-repo-name` with your actual repository URL).

4.  **Install Project Dependencies:**
    Install the `npm` packages required by the project:
    ```bash
    npm install
    ```

5.  **Build the PWA:**
    Before creating the APK, you need a production build of your PWA. This generates the static files in the `out` directory.
    ```bash
    npm run build
    ```

6.  **Install PWA-to-APK Tool:**
    Install a tool that can convert PWA to APK. We'll use `pwa-to-apk`.
    ```bash
    npm install -g pwa-to-apk
    ```

7.  **Generate the APK:**
    Run the tool, pointing it to your application's public manifest file. The tool will ask you for some information to build the `AndroidManifest.xml` and then generate a signed APK.
    ```bash
    pwa-to-apk --manifest public/manifest.json
    ```
    The tool will guide you through a few questions (like app name, version, etc.) and then start the build process.

8.  **Locate and Install the APK:**
    Once finished, the tool will inform you where the APK file has been saved. You can then navigate to that directory and tap on the file to install it on your device (you may need to allow installations from unknown sources in your Android settings).
