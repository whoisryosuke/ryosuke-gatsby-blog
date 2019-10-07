import React from 'react';
import Featured from "./Featured"
import Card from '../Card/BasicCard'

export default { title: 'Featured' };

export const basic = () => <Featured><Card width={[1, 3/4, 1/2, 1/3]} subheader="Getting started" title="Getting started developing Shopify themes" description="Shopify has exploded over the past few years, becoming a near de-facto decision for any small to mid scale e-commerce project. It's become more important than ever to sharpen Shopify skills and get a handle on Liquid." /></Featured>