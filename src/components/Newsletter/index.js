import React, { Component } from "react";
import { Box, Button, Flex, Heading } from 'rebass/styled-components'
import { Input } from '@rebass/forms'

import validateEmail from '../../helpers/validateEmail';
import MailchimpSubscribe from "react-mailchimp-subscribe"

const CustomForm = ({ status, message, onValidated }) => {
    let email;
    const submit = () =>
        email &&
        email.value.indexOf("@") > -1 &&
        onValidated({
            EMAIL: email.value,
        });

    return (
        <Box px={3} py={5} sx={{borderBottom:"1px solid black"}} className={status === "success" ? 'success' : ''}>
            <Heading fontSize={[2,3]} mb={3}>📬 Subscribe for weekly blog digests</Heading>
            <Flex>
            <Input
                ref={node => (email = node)}
                type="email"
                placeholder="your.email@website.com"
                required
            />
            <Button variant="outline" onClick={submit}>
                Subscribe
            </Button>
            </Flex>
            <aside className={'message ' + status}>
                {status === "sending" && <div className="sending">sending...</div>}
                {status === "error" && <div className="error">{message}</div>}
                {status === "success" && <div className="success">{message}</div>}
            </aside>
        </Box>
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