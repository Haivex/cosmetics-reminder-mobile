# Learning React Native Basics
About project...


## Tech Stack

**Client:** React Native, Redux, React Native Paper

**Server:** Firebase

## Screenshots

**Calendar and Time Input**

![Calendar Input](../readme-assets/screenshots/Screenshot_2022.02.02_17.20.34.505.png?raw=true)
![Time Input](../readme-assets/screenshots/Screenshot_2022.02.02_17.25.24.820.png?raw=true)

**Light and Dark Theme**
![Light Theme](../readme-assets/screenshots/Screenshot_2022.02.02_17.21.51.219.png?raw=true)
![Dark Theme](../readme-assets/screenshots/Screenshot_2022.02.02_17.27.05.136.png?raw=true)

## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

To run this project, you will need to add the following environment variables and files

`google-services.json` - Firebase Configuration

`strings.xml` - Facebook Credentials

`Android Manifest` - Facebook App ID

`GOOGLE_SIGN_IN_WEB_CLIENT_ID` - .env

Start Firebase Emulator
```bash
  npm run firebase:emulators:all
```

Prepare device or emulator and start the server

```bash
  npm run start
```
