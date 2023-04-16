import { useEffect, useState } from 'react'
import './App.css'
import Box from './components/Box'
import Flex from './components/Flex'
import {
  VscListUnordered,
  VscArrowLeft,
  VscAdd,
  VscTrash,
  VscEdit,
  VscChromeClose,
  VscCheck,
} from 'react-icons/vsc'
import axios from 'axios'
import Data from './interface/Data'

axios.defaults.baseURL = 'http://localhost:8080'

function App() {
  const [page, setPage] = useState<'main' | 'edit'>('main')
  const [nowData, setNowData] = useState<null | Data>(null)
  const [dataList, setDataList] = useState<null | Data[]>(null)
  const [createMode, setCreateMode] = useState(false)
  const [error, setError] = useState('')
  const [createInput, setCreateInput] = useState<[string, string]>(['', ''])
  const [editInput, setEditInput] = useState<[string, string]>(['', ''])

  const [selectedData, setSelectedData] = useState<string | null>(null)

  useEffect(() => {
    if (page === 'main') {
      axios
        .get('http://localhost:8080/random')
        .then((res) => setNowData(res.data))
        .catch(() => setError('명언을 불러오지 못했습니다.'))
    }
    if (page === 'edit') {
      axios
        .get('http://localhost:8080')
        .then((res) => setDataList(res.data))
        .catch(() => setError('명언을 불러오지 못했습니다.'))
    }
  }, [page])

  if (page === 'main') {
    return (
      <>
        <Flex position={'fixed'} right={'64px'} top={'64px'}>
          <Flex
            width={'64px'}
            height={'64px'}
            borderRadius={'4px'}
            backgroundColor={'blue'}
            justifyContent={'center'}
            alignItems={'center'}
            onClick={() => setPage('edit')}
          >
            <VscListUnordered color={'white'} fontSize={'32px'} />
          </Flex>
        </Flex>
        <Flex
          height={'100vh'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          px={'16px'}
        >
          <Box fontSize={'24px'}>오늘의 명언</Box>
          <Flex
            style={{ whiteSpace: 'nowrap' }}
            overflowX={'scroll'}
            px={'16px'}
            mt={'64px'}
            mb={'16px'}
            justifyContent={'center'}
            alignItems={'center'}
            maxWidth={'1000px'}
            width={'100%'}
            height={'240px'}
            fontSize={'48px'}
            border={'1px solid grey'}
          >
            {error.length > 0 && error}
            <Box width={'100%'}>{nowData?.message}</Box>
          </Flex>
          <Box fontSize={'24px'}>{nowData?.author}</Box>
        </Flex>
      </>
    )
  } else
    return (
      <Flex
        pt={['8px', '64px', '64px']}
        pl={['8px', '64px', '64px']}
        flexDirection={'column'}
      >
        <Flex style={{ gap: '44px' }} pb={'64px'}>
          <Flex
            width={'64px'}
            height={'64px'}
            borderRadius={'4px'}
            backgroundColor={'blue'}
            justifyContent={'center'}
            alignItems={'center'}
            onClick={() => setPage('main')}
          >
            <VscArrowLeft color={'white'} fontSize={'32px'} />
          </Flex>
          <Flex
            width={'64px'}
            height={'64px'}
            borderRadius={'4px'}
            backgroundColor={'blue'}
            justifyContent={'center'}
            alignItems={'center'}
            onClick={() => setCreateMode((prev) => !prev)}
          >
            {createMode ? (
              <VscChromeClose color={'white'} fontSize={'32px'} />
            ) : (
              <VscAdd color={'white'} fontSize={'32px'} />
            )}
          </Flex>
        </Flex>

        {dataList?.map((data, idx) => (
          <Flex
            key={data.message}
            width={['90%', '416px', '416px']}
            height={'64px'}
            mb={'16px'}
          >
            <Flex
              border={'1px solid black'}
              overflowX={'scroll'}
              flex={1}
              style={{ whiteSpace: 'pre' }}
            >
              {data.message === selectedData ? (
                <>
                  <input
                    value={editInput[0]}
                    onChange={(e) =>
                      setEditInput((prev) => [e.target.value, prev[1]])
                    }
                  />
                  <input
                    value={editInput[1]}
                    onChange={(e) =>
                      setEditInput((prev) => [prev[0], e.target.value])
                    }
                  />
                </>
              ) : (
                <>
                  [{data.author}] : {data.message}
                </>
              )}
            </Flex>
            <Flex
              width={'64px'}
              height={'64px'}
              borderRadius={'4px'}
              backgroundColor={'blue'}
              justifyContent={'center'}
              alignItems={'center'}
              onClick={() => {
                if (data.message === selectedData) {
                  axios
                    .put(`/${idx}`, {
                      author: editInput[0],
                      message: editInput[1],
                    })
                    .then((res) => {
                      if (res.data) {
                        alert('수정 완료!')
                        setDataList([])
                        setEditInput(['', ''])
                        setSelectedData(null)
                        axios
                          .get('http://localhost:8080')
                          .then((res) => setDataList(res.data))
                          .catch(() => setError('명언을 불러오지 못했습니다.'))
                      } else {
                        alert('수정 실패')
                      }
                    })
                } else {
                  setSelectedData(data.message)
                  setEditInput([data.author, data.message])
                }
              }}
            >
              {data.message === selectedData ? (
                <VscCheck color={'white'} fontSize={'32px'} />
              ) : (
                <VscEdit color={'white'} fontSize={'32px'} />
              )}
            </Flex>
            <Flex
              width={'64px'}
              height={'64px'}
              borderRadius={'4px'}
              backgroundColor={'red'}
              justifyContent={'center'}
              alignItems={'center'}
              onClick={() => {
                if (window.confirm('해당 명언을 제거할꺼니? ')) {
                  axios.delete(`/${idx}`).then((res) => {
                    if (res.data) {
                      alert('제거 완료!')
                      axios
                        .get('http://localhost:8080')
                        .then((res) => setDataList(res.data))
                        .catch(() => setError('명언을 불러오지 못했습니다.'))
                    } else {
                      alert('제거 실패')
                    }
                  })
                } else {
                }
              }}
            >
              <VscTrash color={'white'} fontSize={'32px'} />
            </Flex>
          </Flex>
        ))}
        {createMode && (
          <Flex width={'416px'} height={'64px'} mb={'16px'}>
            <Flex
              border={'1px solid black'}
              overflowX={'scroll'}
              flex={1}
              style={{ whiteSpace: 'pre' }}
            >
              <input
                value={createInput[0]}
                onChange={(e) =>
                  setCreateInput((prev) => [e.target.value, prev[1]])
                }
              />
              <input
                value={createInput[1]}
                onChange={(e) =>
                  setCreateInput((prev) => [prev[0], e.target.value])
                }
              />
            </Flex>
            <Flex
              width={'64px'}
              height={'64px'}
              borderRadius={'4px'}
              backgroundColor={'blue'}
              justifyContent={'center'}
              alignItems={'center'}
              onClick={() => {
                if (
                  createInput[0].length === 0 ||
                  createInput[1].length === 0
                ) {
                  alert('정상 적인 값이 아닙니다.')
                  return
                }
                axios
                  .post('/', {
                    author: createInput[0],
                    message: createInput[1],
                  })
                  .then((res) => {
                    if (res.data) {
                      alert('생성 완료!')
                      setDataList([])
                      setCreateInput(['', ''])
                      setCreateMode(false)
                      axios
                        .get('http://localhost:8080')
                        .then((res) => setDataList(res.data))
                        .catch(() => setError('명언을 불러오지 못했습니다.'))
                    } else {
                      alert('제거 실패')
                    }
                  })
              }}
            >
              <VscCheck color={'white'} fontSize={'32px'} />
            </Flex>
          </Flex>
        )}
      </Flex>
    )
}

export default App
