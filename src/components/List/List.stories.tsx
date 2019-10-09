import React from 'react';
import List from "./List"

export default { title: 'List' };

const items = [
  'This',
  'is',
  'a',
  'list',
]

export const basic = () => <List items={items} />
export const listItem = () => <ul><ListItem>Test item</ListItem></ul>