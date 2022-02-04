# Cosmetics Reminder Mobile - Learning React Native Basics

## Purpose of the project

In this repository I learned React Native Basices. I learned how React Native links JavaScript, how native modules work, basic Android and iOS file structure and operations. This was first try how to build mobile applications and how much it's different from a web development. The hardest things to learn were connect Firebase (and config), create notifications and repeating tasks (CRON job, Google Cloud).

## Description

This is a simple to-do app with minor improvements. When we create a scheduled task it creates a notification, we can also create repeating task with given interval ( notification is also repeating). We can change language: auto (based on device language), polish, english; theme and turn off notifications. We can also switch between accounts ( tasks are saved in database ).

## Tech Stack

**Client:** React Native, Redux (store and MMKV for persistence), React Native Paper (UI)

**Server:** Firebase (Database, Authentication), Google Cloud (CRON jobs for repeating tasks)

## Features & Screenshots

**Notifications and Repeating Tasks**

Task/Notification with given interval (days, hours and minutes)

**Relative Time Task**

Time for every task is printed relative e.g tomorrow, yesterday, last Sunday etc. 

**Calendar and Time Input**

Choose date and time with beautiful modals

![Calendar Input](../readme-assets/screenshots/Screenshot_2022.02.02_17.20.34.505.png?raw=true)
![Time Input](../readme-assets/screenshots/Screenshot_2022.02.02_17.25.24.820.png?raw=true)

**Light and Dark Theme**

Switch between light and dark theme

![Light Theme](../readme-assets/screenshots/Screenshot_2022.02.02_17.21.51.219.png?raw=true)
![Dark Theme](../readme-assets/screenshots/Screenshot_2022.02.02_17.27.05.136.png?raw=true)

**App Settings**

Customize your preferences

![Settings Menu](../readme-assets/screenshots/Screenshot_2022.02.02_17.22.03.420.png?raw=true)
![Language Settings](../readme-assets/screenshots/Screenshot_2022.02.02_17.22.15.437.png?raw=true)

**App Developer Settings**

Test application features inside custom developer settings

![Dev Settings](../readme-assets/screenshots/Screenshot_2022.02.02_17.24.15.553.png?raw=true)

**Swipe to complete/restore/delete task**

Swipe left/right and touch to make basic task actions

![Swipe Actions](../readme-assets/screenshots/Screenshot_2022.02.02_17.27.25.787.png?raw=true)

**Search Tasks**

Search by task title or date e.g test before: 2022-01-04 after: 2022-01-01 search for tasks including title 'test' with scheduled time between 1st and 4th January

![Search1](../readme-assets/screenshots/Screenshot_2022.02.02_17.28.01.554.png?raw=true)
![Search2](../readme-assets/screenshots/Screenshot_2022.02.02_17.28.15.186.png?raw=true)

**Translation**

Use app in your language

![PL](../readme-assets/screenshots/Screenshot_2022.02.02_17.21.51.219.png?raw=true)
![EN](../readme-assets/screenshots/Screenshot_2022.02.02_17.23.06.070.png?raw=true)

**Loading Indicator and No Task Message**

Show custom message when tasks are loading or there are no tasks

![Loading Task](../readme-assets/screenshots/Screenshot_2022.02.02_17.22.37.803.png?raw=true)
![No Task](../readme-assets/screenshots/Screenshot_2022.02.02_17.23.01.103.png?raw=true)

## Run Locally ( Work in progress )

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
