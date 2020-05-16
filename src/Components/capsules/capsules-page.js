/* eslint-disable react/prop-types */
import React from 'react'
import { Link } from 'react-router-dom'
import IndividualCapsule from '../IndivdualCapsule/IndivdualCapsule'
import './capsules-page.css'

export default class CapsulesPage extends React.Component {
    static defaultProps = {
        capsules: [
            {
                key : "1",
                id : "1",
                
            }
        ]
      }
    render() {
        return (
            <section>
                <div className = 'addNewCenter' >
                    <Link to='/addcapsule'>
                        <button className='addNew'>Add new capsule</button>
                    </Link>
                </div>
                {this.props.capsules.map((capsule) =>
                    <IndividualCapsule
                        key={capsule.id}
                        id={capsule.id}
                        title={capsule.title}
                        dateCreated={capsule.burydate}
                        dateExpires={capsule.unlockdate}
                        note={this.props.note}
                        handleDelete={this.props.handleDelete}
                    />
                )}
            </section>
        )
    }
}