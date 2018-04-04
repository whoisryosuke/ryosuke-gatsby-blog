import React, { Component } from "react";

import MoneyBagEmoji from '../../assets/img/emoji/money-bag.png';

export default class Skills extends Component {
    constructor(props) {
        super(props);

        this.state = {
            more: false
        }

        this.more = this.more.bind(this);
    }

    more() {
        this.setState({
            more: !this.state.more
        });
    }

    render() {
        let { more } = this.state;

        let seeMore = more ? 'show' : 'hide';

        const skills = [
            { class: 'html5', name: 'HTML5' },
            { class: 'css3', name: 'CSS3' },
            { class: 'sass', name: 'SASS' },
            { class: 'grunt', name: 'Grunt' },
            { class: 'gulp', name: 'Gulp' },
            { class: 'js', name: 'JavaScript' },
            { class: 'jquery', name: 'jQuery' },
            { class: 'node', name: 'NodeJS' },
            { class: 'npm', name: 'NPM' },
            { class: 'react', name: 'ReactJS' },
            { class: 'es6', name: 'ES6' },
            { class: 'babel', name: 'Babel' },
            { class: 'webpack', name: 'Webpack' },
            { class: 'docker', name: 'Docker' },
            { class: 'mysql', name: 'mySQL' },
            { class: 'redis', name: 'Redis' },
            { class: 'memcached', name: 'Memcached' },
            { class: 'php', name: 'PHP' },
            { class: 'laravel', name: 'Laravel' },
            { class: 'wordpress', name: 'Wordpress' },
            { class: 'shopify', name: 'Shopify' },
            { class: 'api', name: 'APIs' },
            { class: 'cms', name: 'CMS' },
            { class: 'ecommerce', name: 'E-Commerce' },
            { class: 'git', name: 'Git' },
            { class: 'sketch', name: 'Sketch' },
            { class: 'principle', name: 'Principle' },
            { class: 'photoshop', name: 'Adobe Photoshop' },
            { class: 'illustrator', name: 'Adobe Illustrator' },
            { class: 'premiere', name: 'Adobe Premiere' },
            { class: 'aftereffects', name: 'Adobe After Effects' },
            { class: 'indesign', name: 'Adobe InDesign' },
        ];

        let skillsList = skills.map((skill) => (
            <li className={skill.class}>
                {skill.name}
            </li>
        ));

        return(
            <div className="container row Skills">
                <p>I've got the <strong>skills</strong> to the pay the <strong>bills</strong> <img src={MoneyBagEmoji} alt="Money bag emoji" height="36" /></p>
                <section className={'TagCloud skills ' + seeMore}>
                    <ul>
                        { skillsList }
                    </ul>
                </section>
                <button className="btn more" onClick={ this.more }>See more</button>
            </div>
        );
    }
}