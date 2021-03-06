import React from 'react';
import './style.css'
import 'bulma/css/bulma.css'
import SignupForm from  '../../components/SignupForm'

function RegistrationsPage() {
    return(
        <div>
            <div className="container pl-3 pr-3 pt-3 pb-3 has-text-centered">
                <h1 className="title is-1 mt-2 pt-3 color-primary">Registrations</h1>
                <img src="https://iconicto.com/img/banner.gif" alt="registrations"></img>
            </div>
            <div className="columns">
                <div className="column is-3"></div>
                <div className="column is-6">
                    <SignupForm />
                </div>
                <div className="column is-3"></div>
            </div>
        </div>
    )
}
export default RegistrationsPage;