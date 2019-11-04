import React from 'react';
import CodeBlock from "./CodeBlock"

export default { title: 'Code Block' };

export const basic = () => <CodeBlock className="language-php">{`<?php echo 'Hello World'`}</CodeBlock>
export const live = () => <CodeBlock className="language-js" live>{`<div style={{padding:'1em'}}><p>See live code by writing it!</p></div>`}</CodeBlock>