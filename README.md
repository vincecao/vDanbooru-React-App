# vDanbooru React App

A React & BlueprintJS implement of vDanbooru, using for searching Image from safe danbooru lib.

[vDanbooru React Portal](http://vince-amazing.us-west-1.elasticbeanstalk.com/vdanbooru-react)

![](screenshots/index.png)
![](screenshots/search.png)
![](screenshots/lightbox.png)
![](screenshots/favorites.png)
![](screenshots/signup_login.png)
![](screenshots/tags.png)

### Update Logs

_11/02/2019_
- Clean some of code in lightbox and popover effects
- Modularized Tag, download and share components across different parts
- Add indicator in Search page (can directly search in the head area of result page)
- Add switch background button
- Fix serval bugs

_10/31/2019_
- Add Redux Data Store
- Add favorite tab features for easy bookmark
- Support new user to signup and login
- Add a connection to [Firebase](https://firebase.google.com/) authentication and Firestore database
- Now favorite images will be linked to your account
- Support tags search, and list tags in the results
- Fix bugs on both mobile and desktop

_10/30/2019_
- Add progress bar and non-ideal state
- Optimized for mobile devices
- Add share to social features, with [react-share](https://www.npmjs.com/package/react-share)

_10/27/2019_
- Init project with React & [BlueprintJS](https://blueprintjs.com/), ~~deployed with [ZEIT Now](zeit.co) and zero configuration~~
- Connect with api with backend Express with [booru](https://www.npmjs.com/package/booru), ~~[danbooru-node](https://www.npmjs.com/package/danbooru)~~
- Implement index, hot search page, with [react-grid-gallery](https://www.npmjs.com/package/react-grid-gallery)

### TODO
- ~~Add search features with tags~~
- ~~Add Favorite & share~~ 
- ~~Add login&signup Page~~ 
- Add favorite in search lightbox
- Pagination from Server side
- Multi-tag search support
- Chat / comment board
- ...