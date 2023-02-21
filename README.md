[![2303-RN-gym-github-cover.png](https://i.postimg.cc/C57cN5Jm/2303-RN-gym-github-cover.png)](https://postimg.cc/Mfc0ZWCQ)

<p align="left">
	<img alt="Node.js" 
    src="https://img.shields.io/badge/nodejs-green?labelColor=green&logo=node.js&logoColor=white"> 
	<img alt="ReactJS" src="https://img.shields.io/badge/reactJS-6cf?logo=react&logoColor=white&labelColor=007ACC">  
	<img alt="React Native" src="https://img.shields.io/badge/reactnative-6cf?logo=react&logoColor=white&labelColor=007ACC">  
	<img alt="Typescript" src="https://img.shields.io/badge/typescript-informational?labelColor=blue&logo=typescript&logoColor=white"> 
  <img alt="Git" 
    src="https://img.shields.io/badge/git-grey?labelColor=greu&logo=git&logoColor=white"> 
</p>

<p>
	<img alt="expo" 
	  src="https://img.shields.io/badge/expo-white?labelColor=grey&logo=expo&logoColor=white">
	<img alt="sqlite" 
	  src="https://img.shields.io/badge/sqlite-blue?labelColor=blue&logo=sqlite&logoColor=white">
	<a href="https://www.linkedin.com/in/camilacno" target="_blank"> 
  <img src="https://img.shields.io/badge/-camilacno-007ACC?logo=linkedin&logoColor=white&labelColor=007ACC" alt="Developer LinkedIn" />
</p>

## About the Application

**Ignite Gym** is an app designed to record and monitor physical exercises. In this application, Native Base was used as a component library and contexts were used to share information between components.
The connection with the API was made and the authentication with JWT and the Refresh Token strategy was implemented.
 
As an **user**, you can save and update your profile, register exercises as completed and see your exercises history by date.

###### *Go to <a href="#content">Content</a>*.

## Content

 -   <a href="#about-the-application">About the Application</a>
 -  <a href="#main-libs">Main libs</a>
 -  <a href="#features">Features</a>
 -  <a href="#project-layouts">Project layouts</a>
 -  <a href="#how-to-run">How to run</a>
  
## Main Libs

[React Navigation](https://reactnavigation.org/) |  [Axios](https://github.com/axios/axios) | [SQLite3](https://www.sqlite.org/index.html) | [Expo](https://docs.expo.dev/) 
[ESLint](https://eslint.org/) | [Prettier](https://prettier.io/)

Expo:
 - expo-file-system
 - expo-font
 - expo-image-picker
 - expo-status-bar
 
###### *Go to <a href="#content">Content</a>*.

## Features

- Sign in
- Sign up 
- Logout 
- Filter exercises by group 
- Mark an exercise as completed
- See the exercises history 
- Update profile

###### *Go to <a href="#content">Content</a>*.

## Project Layouts

- [Figma](https://www.figma.com/file/GT6e9B7TH86gCqfFuJwSvc/Gym-App?node-id=37%3A6&t=N7ohORulxvPDRhKp-0)
  
[![2303-RN-gym-github-layouts.png](https://i.postimg.cc/yYm5Dr7V/2303-RN-gym-github-layouts.png)](https://postimg.cc/fJb5FC3F)

###### *Go to <a href="#content">Content</a>*.

## How to run

### Requirements
- **[Node.js](https://nodejs.org/en/)**  
- **[Git](https://git-scm.com/)**  
- **[NPM](https://www.npmjs.com/)**  or  **[Yarn](https://yarnpkg.com/)**.
- **[Expo](https://expo.io/)**  
###### *Go to <a href="#content">Content</a>*.

### Cloning
```bash
$ git clone https://github.com/camilacno/2303RN-gym.git
```
 ##### Installing dependencies
   ```bash
$ npm install
```
  
 ##### Run API
  ```bash
$ cd api
$ npm run dev OR npm start
```

 ##### Run App
 ```bash
$ npx expo start
```
