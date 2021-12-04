# S-Camera as a Single Page Application
#### Vue 2 | VueX | Vue-Router | Docker Compose



- The user can login to the camera dashboard
- The authenticated user can see the cameras which are defined into user account
- The authenticated user can see camera details in different page

The SPA with 2 pages (routes):

- Login Page,
- Dashboard
- Camera Detail Page

This project was bootstrapped with [Vue CLI](https://cli.vuejs.org/guide/installation.html).

### Production Deployment

<img src="https://i.imgur.com/XURwEZT.jpeg" title="S Camera"/>


Note: The production deployment of the app can work properly if you have disabled the browser cors.

Online Deployment of this project is available at [S-Camera](https://scamera.salihsert.com/).

- [Docker Swarm](https://docs.docker.com/engine/swarm/) container orchestration tool is used for deployment of this project to the the VPS Cloud.

- Nginx is used for to serve the production build of the app.

- [Traefik](https://traefik.io/) is used as a reverse proxy.

### Getting Started

**Note**: Please insert your API KEY and API SECRET to the /env/API.env file before running the project

**Note**: The app can work properly only if you disable the browser cors otherwise you can get CORS error.

To get started you can simply clone the repo and install the dependencies in the root folder

`docker-compose -f development.yml up --build`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Directory Layout and Tree

```
├── App.vue
├── assets
│   ├── logo.png
│   ├── logo.svg
│   └── styles
│       └── main.scss
├── components
│   ├── auth
│   │   └── Login.vue
│   ├── camera
│   │   ├── CameraDetail.vue
│   │   ├── CameraGrid.vue
│   │   └── Camera.vue
│   └── layout
│       └── Base.vue
├── helpers
│   ├── api.js
│   └── camera-utils.js
├── main.js
├── plugins
│   └── vuetify.js
├── router
│   └── index.js
├── store
│   └── index.js
└── views
    ├── Camera.vue
    ├── Dashboard.vue
    └── Login.vue


```

# Application

#### Libraries/Frameworks

- vue 2.6: UI framework
- vuex 3.4: global state management
- vue-router 3.2
- vuetify: 2.4 UI component library
- axios: to make HTTP requests

##### Global State Flow

- auth: stores auth state
- cameras: stores camera state

```
    auth: {
      session: null,
      isAuthenticated: false,
      user: null,
      error: null,
    },
    cameras: {
      all: {},
      snapshots: {},
      ids: [],
      loaded: false,
    },

```

#### Api Calls [CAMERA MANAGER API ](https://developer.cameramanager.com/dp/rest-api/cameramanager-apis/)

##### NOTE: Debugging with Vue Devtools

For debugging the project in development mode, please install Vue Devtools extension for your browser.

### Author

- [salihsert.com](https://salihsert.com)
