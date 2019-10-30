import React from 'react'
import axios from 'axios'
import { EditableText, H1, Tooltip, NonIdealState } from "@blueprintjs/core";
import Gallery from 'react-grid-gallery'
import { defultLst } from '../res/randomDefaultLst'

class Hots extends React.Component {
    state = {
        photos: [],
        isSearch: false,
        keywords: (!this.props.match.params.key || this.props.match.params.key === '') ? defultLst[Math.floor(Math.random() * defultLst.length)] : this.props.match.params.key,
        placeholder: '',
        confirmOnEnterKey: true,
        intent: 'none',
        maxLength: 20,
        selectAllOnFocus: true,
    }



    componentDidMount() {
        // console.log(this.props.match.params.key)
        this.updateSearch()
    }

    updateSearch = () => {
        this.setState({ isSearch: true });
        //let url = 'http://localhost:8080/api/mode/Normal/tag/' + this.state.keywords + '/num/25'
        let url = '//vince-amazing.us-west-1.elasticbeanstalk.com/api/mode/Normal/tag/' + this.state.keywords + '/num/25'
        console.log(url)
        axios.get(url)
            .then(res => {
                const photos = res.data;
                this.setState({ photos });
                console.log(this.state.photos)
                this.setState({ isSearch: false });
            })
        let tempPlaceholder = this.state.keywords
        let placeholder = (tempPlaceholder.charAt(0).toUpperCase() + tempPlaceholder.slice(1))
        this.setState({ keywords: '', placeholder });
    }

    handleReportChange = (keywords) => {
        this.setState({ keywords });
    }

    handleResult = () => {
        if (this.state.isSearch === true) {
            return <div style={{ height: '450px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="bp3-progress-bar bp3-intent-primary" style={{width: '75%'}}>
                    <div className="bp3-progress-meter" style={{ width: '50%' }}></div>
                </div>
            </div>
        } else {
            if (this.state.photos.length == 0) {
                return <div style={{ height: '450px' }}><NonIdealState style={{ display: 'block' }}
                    icon="search"
                    title="No search results"
                    description="No result found, please try again!"
                /></div>
            } else {
                return <Gallery
                    images={this.state.photos}
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
export default Hots