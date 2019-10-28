import React from 'react'
import SearchInput from './SearchInput'
import axios from 'axios'
import { hidden } from 'ansi-colors'

const contentStyle = {
  flex: 1,
  position: 'relative',
  width: '100%',
  overflow: 'hidden'
}

const fg = {
  position: 'absolute',
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  top: '0',
  left: '0'
}

const fgImage = {
  width: 'auto',
  height: '100%'
}

const searchLayer = {
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  top: '0',
  left: '0'
}

const searchH1 = {
  fontFamily: '"Oswald", "sans-serif"',
  fontWeight: 'bold',
  fontSize: '2.7em',
  color: 'white',
  textAlign: 'center',
  textShadow: '0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 6px 1px rgba(0, 0, 0, .6), 0 0 5px rgba(0, 0, 0, .6)',
}

const cssbg = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: '0',
  left: '0',
  backgroundImage: 'none',
  backgroundPosition: 'top',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  overflow: 'hidden',
  filter: 'blur(8px)'
  
}

class Search extends React.Component {

  state = {
    backImageSrc: '',
    bg: cssbg
  }

  componentDidMount() {
    this.updateRandom()
  }

  updateRandom = () => {
    //let url = 'http://localhost:8080/api/mode/Random/tag/scenery/num/1'
    let url = '//vince-amazing.us-west-1.elasticbeanstalk.com/api/mode/Random/tag/scenery/num/1'
    axios.get(url)
      .then(res => {
        // console.log('url', url)
        // console.log('json-data', res.data)
        const backImageSrc = res.data
        let newcssbg = Object.assign({}, this.state.bg)
        newcssbg.backgroundImage = 'linear-gradient(to bottom, rgba(247, 247, 247, 0.52), rgba(62, 57, 61, 0.73)), url(' + backImageSrc + ')'
        this.setState({ backImageSrc, bg: newcssbg })
        console.log(backImageSrc)
      })
    let tempPlaceholder = this.state.keywords
    if (tempPlaceholder)
      this.setState({ keywords: '', placeholder: (tempPlaceholder.charAt(0).toUpperCase() + tempPlaceholder.slice(1)) })
  }

  render() {
    return (
      <div style={contentStyle}>
        <div style={this.state.bg}>
        </div>
        <div style={fg}>
          <img src={this.state.backImageSrc} style={fgImage} alt="" />
        </div>
        <div style={searchLayer}>
          <h1 style={searchH1}>vDanbooru Search</h1>
          <SearchInput />
        </div>
      </div>
    )

  }
}

export default Search