/* eslint-disable react/prop-types */
import React from 'react'
import { withRouter } from 'react-router-dom'
import './addCapsule.css'

class AddCapsulePage extends React.Component {
    constructor() {
        super()
        this.state = {
            title: '',
            note: '',
            imagelink: '',
            time: 'One-minute',
        };
    }

    //Every time user changes the form input, update the state. State needs to change in order for user to see newly added capsule
    updateState = (category, value) => {
        this.setState({
            [category]: value
        })
    };

    //On press of submit, collect the info and send to API; also return to main capsules page.
    handleSubmit = (event, data) => {
        event.preventDefault()
        this.props.handleAddCapsule(event, data)
        this.props.history.push('/capsules')
    };

    //Disable button if input requirements are not met.
    handleDisabled = () => {
        if (this.state.title.length >= 3 && this.state.note.length >= 10) { return false }
        else { return true }
    };
    
    //When the user is not satisfied, they can go back to the main page.
    handleDiscard = () => {
        this.props.history.push('/capsules')
    };

    render() {
        const isDisabled = this.handleDisabled()
        return (
            <section className='add-Capsules'>
                <form onSubmit={e => this.handleSubmit(e, this.state)}>
                    <label htmlFor='title'>Title</label>
                    <input name='title' id='title' type='text' placeholder='What am I burying' onChange={e => this.updateState(e.target.id, e.target.value)} />
                    <label htmlFor='note'>Note</label>
                    <textarea name='note' id='note' type='text' placeholder='What note do I want to tell my future self.' rows='5' onChange={e => this.updateState(e.target.id, e.target.value)} />
                    <label htmlFor='imagelink'>Image URl (For fun, not required)</label>
                    <input name='imagelink' id='imagelink' type='url' placeholder='Url Image if you want.' onChange={e => this.updateState(e.target.id, e.target.value)} />
                    <label htmlFor='time'>Amount of Time</label>
                    <select id='time' onChange={e => this.updateState(e.target.id, e.target.value)}>
                        <option value='One-minute'>One minute (test)</option>
                        <option value='Ten-minutes'>Ten Minutes</option>
                        <option value='One-hour'>One Hour</option>
                        <option value='Two-hours'>Two Hours</option>
                        <option value='Twelve-hours'>Twelve Hours</option>
                        <option value='One-day'>One day</option>
                        <option value='Two-days'>Two days</option>
                        <option value='Five-days'>Five days</option>
                        <option value='One-week'>One week</option>
                        <option value='Four-weeks'>Four weeks</option>
                        <option value='One-month'>One month</option>
                        <option value='Six-months'>Half a year</option>
                        <option value='One-year'>One year</option>
                        <option value='Two-years'>Two years</option>
                        <option value='Five-years'>Five years</option>
                        <option value='Ten-years'>Ten years</option>
                    </select>
                    <p className='warning' hidden={!isDisabled}>Title must be at least three characters long. Body must be at least ten characters long.</p>
                    <button id='submit' disabled={isDisabled}>Submit</button>
                    <button id='discard' onClick={this.handleDiscard}>Discard</button>
                </form>
            </section>
        );
    }
}
export default withRouter(AddCapsulePage)