# SM Frontend Assignment
This is a simple React SPA done as a front-end assignment for SM.

https://smt-assignment.herokuapp.com

## 🎨 Features
#### Login page 
- Name input
- Email input
- Sign-in button
- User receives a token upon registration which is used in data-fetching requests

#### Posts page
- Fetch posts from API
- Senders list with sender name and post count ordered by name alphabetically.
- Post list where posts are ordered by creation time
- Clicking on a sender opens that sender's posts in the post list view
- Post order buttons to allow choosing most recent first and most recent last ordering for posts list
- Search box for senders. Any senders whose name do not contain the text entered are hidden
- Search box for posts. Any posts that do not contain the text entered are hidden
- Deep-linkable post list. This means that it is possible to enter a URL that directly selects the sender whose posts are shown
- Page picker
- Topbar with email of the current user and Logout button

## 🔧 Setup
```sh
$ git clone https://github.com/dreamistus/sm-assignment.git
$ npm install
$ npm build
$ npm start
```

## ⚙️ Tech-stack
- React
- TypeScript
- CSS modules
- Sass/SCSS
- redux-toolkit
- ESLint
- Stylelint
- React Testing Library