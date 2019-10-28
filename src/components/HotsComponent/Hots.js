import React from 'react'
import axios from 'axios'
import { Classes, EditableText, FormGroup, H1, H5, Intent, NumericInput, Switch, Hotkey, Hotkeys, HotkeysTarget } from "@blueprintjs/core";
import Gallery from 'react-grid-gallery'


class Hots extends React.Component {
    
    state = {
        photos: [],
        keywords: (!this.props.match.params.key || this.props.match.params.key === '') ? 'wind' : this.props.match.params.key,
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
        //let url = 'http://localhost:8080/api/mode/Normal/tag/' + this.state.keywords + '/num/25'
        let url = '//vince-amazing.us-west-1.elasticbeanstalk.com/api/mode/Normal/tag/' + this.state.keywords + '/num/25'
        axios.get(url)
            .then(res => {
                // console.log('url', url)
                // console.log('json-data', res.data)
                const photos = res.data;
                this.setState({ photos });
            })
        let tempPlaceholder = this.state.keywords
        this.setState({ keywords: '', placeholder: (tempPlaceholder.charAt(0).toUpperCase() + tempPlaceholder.slice(1)) });
    }

    handleReportChange = (keywords) => {
        this.setState({ keywords });
    }
    render() {
        //    return <Gallery images={this.IMAGES}/>
        return <div>
            <H1 style={{ margin: '30px' }}>
                <EditableText
                    intent={this.state.intent}
                    maxLength={this.state.maxLength}
                    placeholder={this.state.placeholder === '' ? 'Search Here' : this.state.placeholder}
                    selectAllOnFocus={this.state.selectAllOnFocus}
                    onChange={this.handleReportChange}
                    value={this.state.keywords.trim().toLowerCase().replace(' ', '')}
                    confirmOnEnterKey={this.state.confirmOnEnterKey}
                    onConfirm={() => this.updateSearch()}
                />
            </H1>
            <Gallery
                images={this.state.photos}
                backdropClosesModal={true}
                rowHeight={300}
            />
        </div>
    }
}
export default Hots