### 설치한 라이브러리

1. react-icons : 아이콘을 손쉽게 쓰기 위함
2. styled-system : 기존 스타일드 컴포넌트를 조금 더 고도화 할 수 있게 만들어준다.
   단점도 존재하는데, props에 스타일을 넘기면서 props가 엄청나게 많아질수 있다. props에 데이터만 넘기던 사람들은 경악을 금치 못할지도... 🥲 (코드가 더러워짐)
   장점은 반응형 작성이 편하다고 한다.

예시 코드 styled-system 선언

```tsx
import styled from 'styled-components'
import {
  layout,
  color,
  LayoutProps,
  ColorProps,
  display,
  DisplayProps,
} from 'styled-system'

const Box = styled.div<LayoutProps & ColorProps & DisplayProps>`
  ${layout}
  ${color}
  ${display}
`

export default Box
```

예시 코드 styled-system 사용

```tsx
import './App.css'
import Box from './components/Box'

function App() {
  return (
    <>
      <Box display={['none', 'initial', 'initial']}>PC 혹은 Tablet</Box>
      <Box display={['initial', 'none', 'none']}>모바일</Box>
    </>
  )
}

export default App
```

첨 보는 라이브러리이긴하다.
이렇게 작성시 반응형이 자동으로 적용된다.
