import React from 'react';
import CodeBlock from "./CodeBlock"

export default { title: 'Code Block' };

export const basic = () => <CodeBlock className="language-php">{`<?php echo 'Hello World'`}</CodeBlock>
export const live = () => <CodeBlock className="language-js" live>{`const element = true`}</CodeBlock>