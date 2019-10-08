import React, { Component } from "react";
import styled from 'styled-components'
import {Box} from 'rebass/styled-components'

import SectionHeading from '../SectionHeading/SectionHeading'

import MoneyBagEmoji from '../../assets/img/emoji/money-bag.png';

const StyledList = styled.li`
    list-style:none;
    display:inline-block;
    border-width:0 1px 1px 0;
    border-style: solid;
    border-color: ${(props) => props.theme.colors.black};
    
    &:last-child {
        border-right:1px solid;
    }
    
  }
`

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
            <Box as={StyledList} width={[1/2,1/2,1/3]} p={3} className={skill.class}>
                {skill.name}
            </Box>
        ));

        return(
            <div className="container row Skills">
                <SectionHeading emoji="💽" heading="Technology and software I use" />
                <Box as="ul" sx={{padding:0, borderLeft:'1px solid black'}}>
                    { skillsList }
                </Box>
            </div>
        );
    }
}