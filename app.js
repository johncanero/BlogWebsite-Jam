//jshint esversion:6

// installation essentials
const express = require("express");
const bodyParser = require("body-parser"); 
const ejs = require("ejs");
const _ = require("lodash");

// contents
const homeStartingContent = "Welcome to my Daily Journal! I am John Cañero. 👋 I am an aspiring web developer, programmer, architectural designer and visual artist. I created this journal guided by Angela Yu while studying her Web Development BootCamp Course. This would be a great journey for me to document my life and adventures especially in the world of technology.When I was learning this type of technology, it helped me to start building something on the Internet.🎨 Let's go and build something that is valuable and helpful for the world!";

const aboutContent = "Hey!👋 You can call me Jam, it is my nickname! ";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

// essential: express
const app = express();

// essential: app.set and app.use
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


// Global Variable (use "let" as safer version than "var")
let posts = [];


// GET METHOD
// app.get = the home route (root)
// home route (/), function (req, res) = callback function, render, {key: value} 
app.get("/", function(req, res){
      res.render("home", {
        startingContent: homeStartingContent,
        // app.post
        posts: posts
      });
});


// app.get = about
app.get("/about", function(req, res){
      res.render("about", {aboutContent: aboutContent});
});


// app.get = contact
app.get("/contact", function(req, res){
      res.render("contact", {contactContent: contactContent});
});


// app.get compose
app.get("/compose", function(req, res){
      res.render("compose");
});

// POST METHOD
// posting title and content in /compoase page, bodyParser
app.post("/compose", function(req, res){
      // console.log(req.body.postTitle)
      // console.log(req.body.postBody)

      // Javascript Object
      const post = {
          title: req.body.postTitle,
          content: req.body.postBody
      };

      // Push the Post
      posts.push(post);
      // Redirect to Home Page
      res.redirect("/");
});


//clicking on readmore on the home screen bring up the post with the id on the url (https://expressjs.com/en/guide/routing.html)
app.get("/posts/:postName", function(req, res){
  // apply npm lodash = lowercase
  const requestedTitle = _.lowerCase(req.params.postName);
  // console.log(req.params.postName); = route parameters

  // For Each (Javascript) Array
  posts.forEach(function(post) {
    const storedTitle = _.lowerCase(post.title);

    // stric equality
    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
  });

});


// essentials: running server
app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running on port 3000");
  });
  
  
  