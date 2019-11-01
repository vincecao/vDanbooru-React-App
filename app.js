const express = require('express');
const http = require('http');

const request = require('request');
const bp = require('body-parser');
const router = express.Router();

const app = express();

const cors = require('cors')

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

app.use("/search-product", express.static(__dirname + '/search-product'));
app.get("/search-product-php", (req, res) => res.redirect('http://vince-amazing-php.us-west-1.elasticbeanstalk.com/'));
app.use("/vdanbooru-web", express.static(__dirname + '/vdanbooru-web'));

app.use(bp.urlencoded({
  extended: true
}));
app.use(bp.json());
app.use('/api', router);

app.get('/*', (req, res) => res.redirect('//vince-amazing.com'));



// *********************************** router for vDanbooru

const Danbooru = require('danbooru')
//const booru = new Danbooru()
//const booru = new Danbooru(`https://${login}:${key}@danbooru.donmai.us`)
const Booru = require('booru')

router.get('/mode/:type', (req, res) => {
  // booru.posts({ tags: 'rating:safe scenery' }).then(posts => {
  //     // Select a random post from posts array
  //     const index = Math.floor(Math.random() * posts.length)
  //     const post = posts[index]

  //     // Get post's url and create a filetype for it
  //     const url = booru.url(post.file_url)
  //     const type = `${post.md5}.${post.file_ext}`
  //     console.log('ramdon url', url.href)
  //     res.json(url.href)
  // })
  if (req.params.type == 'Random') {
    res.redirect('/api/mode/Random/tag/scenery/num/1');
  } else {
    res.send('error type')
  }

})

router.get('/mode/:type/tag/:t/num/:n', (req, res) => {

  const TYPE = req.params.type;
  if (TYPE != 'Random' && TYPE != 'Full' && TYPE != 'Normal') {
    res.status(400).send({
      success: 'false'
    });
  }

  let temp = []
  Booru.search('safebooru', [req.params.t], {
    limit: req.params.n,
    random: (req.params.type === 'Random') ? true : false
  })
    .then(posts => {
      if (req.params.type == 'Full') {
        res.json([...posts])
        return
      }

      for (let post of posts) {
        // console.log(post.fileUrl, post.postView)
        // temp.push({
        //     src: post.fileUrl, 
        //     width: post.width, 
        //     height: post.height
        // });
        console.log(post)
        temp.push({
          src: post.fileUrl,
          thumbnail: post.sampleUrl ? post.sampleUrl : post.fileUrl,
          thumbnailHeight: post.sampleHeight ? post.sampleHeight : post.height,
          thumbnailWidth: post.sampleWidth ? post.sampleWidth : post.width,
          caption: post.id,
          // tags: 
        });
      }

      if (req.params.type == 'Random') {
        res.json(temp[0].src)
        return
      }

      if (req.params.type == 'Normal') {
        res.json(temp)
        return
      }
    })

})

// router.get('/mode/safebooru/tag/:t/page/:p/limit/:l/', (req, res) =>{
//     axios.get('https://safebooru.org/index.php?page=dapi&s=post&q=index')
// })

// ********************************* For Flickr Fetch Image

const server = http.createServer(app);

server.listen((process.env.PORT || 8080), () => console.log(`running port: ${process.env.PORT || 8080}`));