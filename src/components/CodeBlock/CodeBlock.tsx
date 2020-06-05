import React, { useState } from 'react'
import styled from 'styled-components'
import Highlight, { defaultProps } from 'prism-react-renderer'
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'
import { useThemeValue } from '../../context/ThemeContext'
import { UIComponents, THEME_OPTIONS } from '@layouts/Theme'
import LightTheme from 'prism-react-renderer/themes/nightOwlLight'
import DarkTheme from 'prism-react-renderer/themes/nightOwl'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Box, Button, Flex, Heading } from 'rebass/styled-components'
import ButtonOutline from '@components/Button/ButtonOutline'

const CodeBlockBox = styled(Box)`
  border: 1px solid ${(props) => props.theme.colors.black};
  font-size: ${(props) => props.theme.fontSizes[1]}px;
  line-height: ${(props) => props.theme.lineHeights.body}em;

  & pre {
    margin: 0;
    padding: 3em;
    overflow-x: auto;
  }
`

interface Props {}

export const CodeBlock: React.FC<Props> = ({ children, className, live }) => {
  const [copyStatus, setCopyStatus] = useState(false)
  const [codeVisibility, setCodeVisibility] = useState(false)
  const [{ theme, selectedTheme }, dispatch] = useThemeValue()

  const codeTheme = {
    [THEME_OPTIONS.LIGHT]: LightTheme,
    [THEME_OPTIONS.DARK]: DarkTheme,
  }
  const copyCode = () => {
    setCopyStatus(true)
    setTimeout(() => setCopyStatus(false), 3000)
  }
  const showCode = () => {
    setCodeVisibility(!codeVisibility)
  }
  const language = className && className.replace(/language-/, '')
  if (live) {
    return (
      <CodeBlockBox mb={3}>
        <LiveProvider
          code={children}
          scope={UIComponents}
          theme={codeTheme[selectedTheme]}
        >
          <Box>
            <Flex justifyContent="space-between">
              <Heading
                width={[3 / 4]}
                variant="label"
                bg="muted"
                p={3}
                sx={{ borderBottom: '1px solid black' }}
              >
                Example
              </Heading>
              <ButtonOutline
                width={[1 / 4]}
                type="button"
                onClick={showCode}
                title={`${codeVisibility ? 'Hide' : 'Show'} code`}
                sx={{ borderTop: 0, borderRight: 0, fontSize: 0 }}
              >
                Copy Code
              </ButtonOutline>
              {/* <CopyToClipboard text={children} onCopy={copyCode}>
                <i
                  data-content="Copy code"
                  aria-label="Copy code"
                  class="clipboard icon"
                ></i>
              </CopyToClipboard> */}
            </Flex>
            <LivePreview />
          </Box>
          <Box
            p={[3, 3, 4]}
            visible={codeVisibility}
            animation="fade"
            duration={500}
            sx={{
              borderTop: '1px solid black',
              backgroundColor: 'rgb(251, 251, 251)',
            }}
          >
            <LiveEditor />
          </Box>
          <LiveError />
        </LiveProvider>
      </CodeBlockBox>
    )
  }
  return (
    <CodeBlockBox mb={3}>
      <Highlight
        {...defaultProps}
        code={children}
        language={language}
        theme={codeTheme[selectedTheme]}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={{ ...style, padding: '20px' }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </CodeBlockBox>
  )
}

export default CodeBlock
