// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  // production: false,
  // api: "https://nginsta.herokuapp.com/",
  // postImageApi: "https://nginsta.herokuapp.com/posts/image/",
  // profileImageApi: "https://nginsta.herokuapp.com/user/image/",
  production: false,
  api: "http://192.168.0.12:3002/",
  postImageApi: "http://192.168.0.25:3002/posts/image/",
  profileImageApi: "http://192.168.0.25:3002/user/image/",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
