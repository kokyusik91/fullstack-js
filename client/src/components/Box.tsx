import styled from 'styled-components'
import {
  layout,
  color,
  LayoutProps,
  ColorProps,
  display,
  DisplayProps,
  FlexboxProps,
  flexbox,
  TypographyProps,
  typography,
  border,
  BorderProps,
  SpaceProps,
  space,
  position,
  PositionProps,
} from 'styled-system'

export type BoxProps = LayoutProps &
  ColorProps &
  DisplayProps &
  FlexboxProps &
  BorderProps &
  TypographyProps &
  SpaceProps &
  PositionProps

const Box = styled.div<BoxProps>`
  ${layout}
  ${border}
  ${color}
  ${display}
  ${flexbox}
  ${typography}
  ${space}
  ${position}
`

export default Box
