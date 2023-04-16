import styled from 'styled-components'
import Box, { BoxProps } from './Box'
import { display } from 'styled-system'

const Flex = styled(Box)<BoxProps>`
  display: flex;
  ${display}
`

export default Flex
