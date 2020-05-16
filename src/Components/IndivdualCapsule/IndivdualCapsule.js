/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import React from 'react'
import ApiService from '../../apiServices/services'
import moment from 'moment-timezone'
import './IndivdualCapsule.css'

export default class IndividualCapsule extends React.Component {

    static defaultProps = {
        title: "hi"
      }
    constructor() {
        super()
        this.state = {
            disabled: true,
            status: ''
        }
    }

    //On mount, check if capsule is already open. If so, start with it open. If not, trigger a check every ten seconds.
    componentDidMount() {
        let currDate = moment.utc().format()
        let unlockDate = moment.utc(this.props.dateExpires).format()
        if (currDate >= unlockDate) {
            this.setState({
                disabled: false,
                status: 'OPEN'
            })

            let test = document.getElementById(this.props.title + '_button');
            if(test == null) {
                clearInterval(this.interval)
            }
            else{
                document.getElementById(this.props.title + '_button').classList.add('makeFlashing')
                clearInterval(this.interval)
            }
        } else {
            this.interval = setInterval(() =>
                this.checkDate(),
                10000
            )
        }
    }

    //Clear this interval when component unmounts.
    componentWillUnmount() {
        clearInterval(this.interval)
    }

    //Check date/time every ten seconds. If the date is after the unlock date, unlock the capsule; otherwise keep checking.
    checkDate() {
        let currDate = moment.utc().format()
        let unlockDate = moment.utc(this.props.dateExpires).format()
        if (currDate > unlockDate) {
            this.setState({
                disabled: false
            })
            document.getElementById(this.props.title + '_button').classList.add('makeFlashing')
            alert(`Time capsule '${this.props.title}' just unlocked!`)
            this.setState({ status: 'OPEN' })
            clearInterval(this.interval)
        }
    }

    //When user opens a capsule, set message to LOADING. If this is the first open, make an API call.
    //Otherwise, just call the function that handles displaying the text.

    handleOpen = (id) => {
        console.log(id)
        if (document.getElementById(`${this.props.title}_contents`).innerHTML === '') {
            this.setState({
                status: 'LOADING...'
            })
            ApiService.getCapsulesById(id)
                .then(res => this.handleNewCapsule(res))
                .catch(err => this.handleCapsuleError(err))
        } else { 
            this.handleAppearance() }
    }

    //Change the UI to indicate the capsule has loaded, and alter the (currently hidden) capsule contents depending on
    //whether it includes an image.
    handleNewCapsule = (newCapsule) => {
        document.getElementById(this.props.title + '_button').classList.remove('makeSteady')
        let image = document.createElement('img')
        if (newCapsule.imageurl !== '') {
            image.src = newCapsule.imageurl
            image.alt = this.props.title
        }
        document.getElementById(this.props.title + '_button').classList.add('makeFlashing')
        if (image.src) {
            document.getElementById(`${this.props.title}_image`).classList.add('imagecontainer')
            document.getElementById(`${this.props.title}_image`).append(image)
        }
        document.getElementById(`${this.props.title}_contents`).append(newCapsule.note)
        this.handleAppearance()
    }

    //Handle slide-open of the capsule to display its contents, or slide-close.
    handleAppearance = () => {
        let element = document.getElementById(this.props.title)
        let thisButton = document.getElementById(this.props.title + '_button')
        if (!element.classList.contains('show')) {
            this.setState({ status: 'CLOSE' })
            thisButton.classList.add('makeSteady')
            thisButton.classList.remove('makeFlashing')
            element.classList.add('show')
            element.style.height = 'auto';
            let height = element.clientHeight + 'px';
            element.style.height = '0px';
            setTimeout(function () {
                element.style.height = height;
            }, 0)
        } else {
            this.setState({ status: 'OPEN' })
            thisButton.classList.add('makeFlashing')
            thisButton.classList.remove('makeSteady')
            element.style.height = '0px';
            element.addEventListener('transitionend', function () {
                element.classList.remove('show')
            }, {
                once: true
            })
        }
    }

    //If there's an error, put an ALERT in the user's browser.
    handleCapsuleError = (err) => {
        console.log(err)
        alert('There was an error with your request. Please check your internet connection or log out and log back in')
        this.setState({ status: 'OPEN' })
        document.getElementById(this.props.title + '_button').classList.remove('makeSteady')
    }

    render() {

        //Get dates in correct format to display on capsule.
        let dateCreated = `${moment(this.props.dateCreated).tz('America/New_York').format('MMMM D, YYYY, h:mm a').toString()}`
        let dateExpires = `${moment(this.props.dateExpires).tz('America/New_York').format('MMMM D, YYYY, h:mm a').toString()}`
        return (
            <article>
                <div className='capsule'>

                    <div className='textContainer'>
                        <div className='capsuleInfo'>
                            <h3 className = 'capsuleTitle'>{this.props.title}</h3>
                            <button disabled={this.state.disabled} onClick={e => this.handleOpen(this.props.id)} className='opencapsule' id={this.props.title + '_button'}>{this.state.clock}
                        </button>
                        <p className='opentext '>{this.state.status}</p>
                        </div>
                    </div>

                    <div className='textContainer2'>
                    <p className='buriedData'>Buried on {dateCreated}</p><p className='buriedData'>Unlock on {dateExpires}</p>
                        <button name='delete' className='delete' onClick={e => this.props.handleDelete(this.props.id)}>Delete</button>
                    </div>

                </div>
                <div id={this.props.title} className='capsule-contents'>
                    <div className='contents-container'>
                        <div id={this.props.title + '_image'}></div>
                        <p id={this.props.title + '_contents'}></p>
                    </div>
                </div>
            </article>
        )
    }
}