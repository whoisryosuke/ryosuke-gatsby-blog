import React from 'react';
import Link from "./Link"
import {Button} from 'rebass/styled-components'
import ButtonOutline from "../Button/ButtonOutline"

export default { title: 'Link' };

export const basic = () => <Link to="/blog">Go to blog</Link>
export const styledText = () => <Link to="/blog"><Text variant="label">Go to blog</Text></Link>
export const button = () => <Link to="/blog"><Button variant="label">Go to blog</Button></Link>
export const buttonOutline = () => <Link to="/blog"><ButtonOutline>Go to blog</ButtonOutline></Link>