import React, { Component } from "react";
import axios from 'axios';

import validateEmail from '../../helpers/validateEmail';
import MailchimpSubscribe from "react-mailchimp-subscribe"

// a basic form
const CustomForm = ({ status, message, onValidated }) => {
    let email;
    const submit = () =>
        email &&
        email.value.indexOf("@") > -1 &&
        onValidated({
            EMAIL: email.value,
        });

    return (
        <div className={status === "success" ? 'success' : ''}>
            <h4 className="Title text blue">Only the best in your inbox weekly</h4>
            <input
                ref={node => (email = node)}
                type="email"
                placeholder="Type your email here…"
            />
            <button onClick={submit}>
                Subscribe
            </button>

            <aside className={'message ' + status}>
                {status === "sending" && <div className="sending">sending...</div>}
                {status === "error" && <div className="error">{message}</div>}
                {status === "success" && <div className="success">{message}</div>}
            </aside>
        </div>
    );
};

export default class Newsletter extends Component {
    
    render() {
        const url = `https://twitter.us12.list-manage.com/subscribe/post?u=ed452dff7fee25e6eb6be3821&amp;id=79387e61b0`;
        return (
            <section className="Newsletter cta light blue mt2">
                <section className="container content">
                    <MailchimpSubscribe
                        url={url}
                        render={({ subscribe, status, message }) => (
                            <CustomForm
                                status={status}
                                message={message}
                                onValidated={formData => subscribe(formData)}
                            />
                        )}
                    />
                </section>
            </section>
        );
    }
};