# Node.js 서버 및 리액트 / 서버 ↔️ 클라이언트 개발
```shell
express를 사용한 Node.js 서버를 만들고 API 개발까지 진행 해보자
```

## 목적 🤩
```shell
백엔드 코드를 짜보면서 백엔드 개발자와 소통을 유의미 하게 해보자!
매우 raw 한 레벨부터 서버를 만들 예정
```

<br>

## 1. Node.js 서버 🖥️
- node.js의 자바스크립트는 ES6문법이 적용되지 않는다.
- common.js을 이용한 방법으로 개발할 예정 ⇒ import 구문을 사용하지 않을 것이라는것
- `data.json`에 데이터를 저장해 놓고 DB 처럼 사용.
- `postman`을 사용하여 백엔드 API 문서화 적용

<br>

### 서버 열기
```javascript

// localhost:8080에 로컬 서버가 열림
app.listen(8080, ()=>{
  console.log('start server')
})

// 8080번 포트로 요청했을때 응답메시지 전송
app.get('/', (req, res)=>{
	res.send('hello 👋🏻')
})

// html도 보낼 수가 있음
app.get('/', (req, res)=>{
  res.send('<h1>hello 👋🏻</h1>')
})

```

### 파일 가져오기 `data.json`
- index.js에서 data.json에 있는 내용들을 가져와야함 ⇒ fs 모듈 사용 (fs : file system)
```javascript
// 서버가 켜지기 전에 가져온다.
const data = fs.readFileSync('data.json', 'utf-8')
// 텍스트를 JSON 형식으로 변경
const jsonData = JSON.parse(data)
console.log(jsonData)

app.get('/', (req, res) => {
  res.json(jsonData)
})
```

<br>

### Nodemon 설치
- index.js 코드를 수정후 서버에 최신 코드를 반영하기 위해 서버를 껐다 다시 켜야하는 번거로움
- npx를 사용하면 해당 프로젝트에 최신 버전을 설치 할 수 있다.

<br>

### CRUD API 중 몇가지 예시
#### 1. 특정 id로 조회 🔍
```javascript

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
  
```

#### 2. 게시글 생성 ✏️

```javascript
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
```

#### 3. 게시글 수정 🔫
```javascript
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
```

### 주의해야할 점🚨
- 클라이언트에 받아온 데이터는 검증이 안되기 때문에 유효성 검사를 한번 진행( 클라이언트에서도 같이 해야하는 부분 )
- Post 요청을 받을때는 **반드시 데이터가 다 들어있는지 확인을 하고** 처리를 해야한다.

<br>
<br>


## 2. React.js 클라이언트 🖥️

### 백엔드에게 데이터 전송하는 방법
1. GET 요청의 ```query parameter```
2. GET 요청의 ```path parameter```
3. POST 요청의 ```request body```

<br>

### fetch 라이브러리중 하나인 Axios 사용
- base URL을 설정해 줄수 았다.
```javascript
axios.defaults.baseURL = 'http://localhost:8080'

```

### 클라이언트 CRUD는 따로 정리 안함.
