const express = require('express')
const fs = require('fs')
const cors = require('cors')

// 서버가 켜지기 전에 가져온다.
const data = fs.readFileSync('data.json', 'utf-8')
// 텍스트를 JSON 형식으로 변경
const jsonData = JSON.parse(data)

// import express from express 와 동일

const app = express()
// json 파일을 요청받을 수 있게 해줌. 필터를 사용해서 raw 데이터를 받을 수 있게 된다.
app.use(express.json())
app.use(cors())

app.listen(8080, () => {
  console.log('start server')
})

app.get('/', (req, res) => {
  const { author, message } = req.query

  let _data = jsonData

  if (author) {
    _data = _data.filter((item) => item.author.includes(author))
  }

  if (message) {
    _data = _data.filter((item) => item.message.includes(message))
  }
  res.json(_data)
})

app.get('/random', (req, res) => {
  const random = Math.floor(Math.random() * jsonData.length)
  res.json(jsonData[random])
})
// random 보다 밑에 있어야 한다.
app.get('/:id', (req, res) => {
  const { id } = req.params

  // path parameter는 타입이 string임 => 숫자인지 아닌지 부터 확인

  if (isNaN(id)) {
    res.json({
      response: false,
      message: 'path parameter is not a number',
    })

    return
  }

  const num = Number(id)

  if (num >= jsonData.length || num < 0) {
    res.json({
      response: false,
      message: 'num is not valid',
    })

    return
  }

  res.json(jsonData[num])
})

app.post('/', (req, res) => {
  const { author, message } = req.body

  // 유효성 검증을 해줘야함.
  if (!(author && author.length > 0 && message && message.length > 0)) {
    res.json({
      response: false,
    })

    return
  }
  jsonData.push({
    author: req.body.author,
    message: req.body.message,
  })
  res.json({
    response: true,
  })
})

// 여기서 :id는 path paremeter라고 한다.
app.delete('/:id', (req, res) => {
  const { id } = req.params

  // path parameter는 타입이 string임 => 숫자인지 아닌지 부터 확인

  if (isNaN(id)) {
    res.json({
      response: false,
      message: 'path parameter is not a number',
    })

    return
  }

  const num = Number(id)

  if (num >= jsonData.length || num < 0) {
    res.json({
      response: false,
      message: 'num is not valid',
    })

    return
  }

  jsonData.splice(num, 1)

  res.json({
    response: true,
  })
})

app.put('/:id', (req, res) => {
  const { id } = req.params

  if (isNaN(id)) {
    res.json({
      response: false,
      message: 'path parameter is not a number',
    })

    return
  }

  const num = Number(id)

  if (num >= jsonData.length || num < 0) {
    res.json({
      response: false,
      message: 'num is not valid',
    })

    return
  }

  const { author, message } = req.body

  // 유효성 검증을 해줘야함.
  if (!(author && author.length > 0 && message && message.length > 0)) {
    res.json({
      response: false,
    })

    return
  }
  jsonData[num] = {
    author: req.body.author,
    message: req.body.message,
  }
  res.json({
    response: true,
  })
})

app.get('/test', (req, res) => {
  const request = req.query
  console.log(request)
})
