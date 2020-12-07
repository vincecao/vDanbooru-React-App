const express = require('express');
const http = require('http');
const bp = require('body-parser');
const router = express.Router();
const app = express();
const cors = require('cors')

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions))
app.use(bp.urlencoded({
  extended: true
}));
app.use(bp.json());
app.use('/api', router)

// *********************************** router for vDanbooru

const Booru = require('booru')

router.get('/mode/:type', (req, res) => {

  if (req.params.type == 'Random') {
    res.redirect('/mode/Random/tag/scenery/num/1');
  } else {
    res.send('error type')
  }

})

router.get('/mode/:type/tag/:t/num/:n', (req, res) => {

  const TYPE = req.params.type;
  const TAG = req.params.t;
  const NUMBER = req.params.n;
  if (TYPE != 'Random' && TYPE != 'Full' && TYPE != 'Normal') {
    res.status(400).send({
      success: 'false'
    });
  }

  let temp = []
  Booru.search('safebooru', [TAG/*, 'score:>=1'*/], {
    limit: NUMBER,
    random: true
    //random: (req.params.type === 'Random') ? true : false
  })
    .then(posts => {
      if (TYPE == 'Full') {
        res.json([...posts])
        return
      }

      for (let post of posts) {
        console.log(post)
        // res.json(post)
        // return

        let newTags = []
        const shuffled = post.tags.sort(() => 0.5 - Math.random());
        shuffled.slice(0, 25).forEach(tag => {
          newTags.push({ value: tag, title: tag })
        })

        const src = '//safebooru.org//images/' + post.data.directory + '/' + post.data.image + '?' + post.data.id
        let thumbnail = src
        if (post.data.sample === true) {
          thumbnail = '//safebooru.org//samples/' + post.data.directory + '/sample_' + post.data.image.replace('.png', '.jpg').replace('.jpeg', '.jpg') + '?' + post.data.id
        }

        temp.push({
          src,
          thumbnail,
          thumbnailHeight: post.sampleHeight ? post.sampleHeight : post.height,
          thumbnailWidth: post.sampleWidth ? post.sampleWidth : post.width,
          caption: post.id,
          tags: newTags
        });
      }

      if (TYPE == 'Random') {
        res.json(temp[0].src)
        return
      }

      if (TYPE == 'Normal') {
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