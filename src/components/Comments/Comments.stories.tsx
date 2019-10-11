import React from 'react';
import Comments from "./Comments"

export default { title: 'Comments' };

const post = {
  frontmatter: {
    title: 'Test',
    tags: [
      'tag1',
      'tag2',
    ]
  },
    fields: {
    slug: 'test'
  }
}

export const basic = () => <Comments post={post} />