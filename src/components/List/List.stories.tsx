import React from 'react';
import List from "./List"
import ListItem from "./ListItem"

export default { title: 'List' };

const items = [
  'Tangie',
  'Skywalker OG',
  'Lemonade',
  'Orange Creamsicle',
  'Blueberry',
  'Jack Herer',
]

export const list = () => <List items={items} />
export const listItem = () => <ul>{items.map(item => <ListItem>{item}</ListItem>)}</ul>