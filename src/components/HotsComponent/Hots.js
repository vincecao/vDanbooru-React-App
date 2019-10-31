import React from 'react'
import axios from 'axios'
import { EditableText, H1, Tooltip, NonIdealState } from "@blueprintjs/core";
import Gallery from 'react-grid-gallery'
import { defultLst } from '../res/randomDefaultLst'
import { connect } from 'react-redux'

class Hots extends React.Component {
  state = {
    keywords: (!this.props.match.params.key || this.props.match.params.key === '') ? defultLst[Math.floor(Math.random() * defultLst.length)] : this.props.match.params.key,
    placeholder: '',
    confirmOnEnterKey: true,
    intent: 'none',
    maxLength: 20,
    selectAllOnFocus: true,
  }

  componentDidMount() {
    this.updateSearch()
  }

  updateSearch = () => {
    // this.props.updatePhotosLoad()
    this.props.updatePhotos(this.state.keywords)

    let tempPlaceholder = this.state.keywords
    let placeholder = (tempPlaceholder.charAt(0).toUpperCase() + tempPlaceholder.slice(1))
    this.setState({ keywords: '', placeholder });
  }

  handleReportChange = (keywords) => {
    this.setState({ keywords });
  }

  handleResult = () => {
    if (this.props.isLoad === true) {
      return <div style={{ height: '450px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="bp3-progress-bar bp3-intent-primary" style={{ width: '75%' }}>
          <div className="bp3-progress-meter" style={{ width: '50%' }}></div>
        </div>
      </div>
    } else {
      if (this.props.photos.length == 0) {
        return <div style={{ height: '450px' }}><NonIdealState style={{ display: 'block' }}
          icon="search"
          title="No search results"
          description="No result found, please try again!"
        /></div>
      } else {
        return <Gallery
          images={this.props.photos}
          backdropClosesModal={true}
          rowHeight={300}
        />
      }
    }

  }
  render() {
    return <div>
      <Tooltip className="bp3-minimal" content="vDanbooru search is here !" position="right">
        <H1 style={{ margin: '30px' }}>
          <EditableText
            intent={this.state.intent}
            maxLength={this.state.maxLength}
            placeholder={this.state.placeholder === '' ? 'Type something interested' : this.state.placeholder}
            selectAllOnFocus={this.state.selectAllOnFocus}
            onChange={this.handleReportChange}
            value={this.state.keywords.trim().toLowerCase().replace(' ', '')}
            confirmOnEnterKey={this.state.confirmOnEnterKey}
            onConfirm={() => this.updateSearch()}
          />
        </H1>
      </Tooltip>
      {this.handleResult()}

    </div>
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    photos: state.photos,
    isLoad: state.isLoad
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updatePhotos: (key) => {
      dispatch({ type: 'UPDATE_PHOTOS' })
      let url = '//vince-amazing.us-west-1.elasticbeanstalk.com/api/mode/Normal/tag/' + key + '/num/25'
      // console.log(url)
      axios.get(url)
        .then(
          res => {
            const photos = res.data;
            // console.log(photos)
            dispatch({ type: 'UPDATE_PHOTOS_SUCCESS', key, photos })
          }
        ).catch(err => {
          dispatch({ type: 'UPDATE_PHOTOS_SUCCESS', key, photos: [] })
        });
    },
    // updatePhotosLoad: () => { dispatch({ type: 'UPDATE_PHOTOS' }) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Hots)