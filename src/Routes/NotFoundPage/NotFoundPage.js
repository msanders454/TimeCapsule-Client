import React, { Component } from 'react'
import { Section } from '../../Utils'

export default class NotFoundPage extends Component {

/*
* Error page.
*/ 
  render() {
    return (
      <Section className='NotFoundPage'>
        <h2>Error: Page does not Exist</h2>
        <p>Try going back to your previous page.</p>
      </Section>
    )
  }
}