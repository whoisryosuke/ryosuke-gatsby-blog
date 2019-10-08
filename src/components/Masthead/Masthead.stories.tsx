import React from 'react';
import Masthead from "./Masthead"
import GreetingMasthead from "./GreetingMasthead"

export default { title: 'Masthead' };

export const basic = () => <Masthead />
export const greeting = () => <GreetingMasthead />