const express = require('express')
const app = express()

app.use(express.static(__dirname + '/public'))
app.set('view engine', 'ejs')


app.listen(8080, () => {
    console.log('http://localhost:8080 에서 서버 실행중')
})

app.get('/', (요청, 응답) => {
    응답.sendFile(__dirname + '/index.html')  
})

app.get('/news', (요청, 응답) => {
    db.collection('post').insertOne({title : '어쩌구'})
    // 응답.send('오늘 비옴')
})

app.get('/about', (요청, 응답) => {
    응답.sendFile(__dirname + '/introduce.html')
})

app.get('/list', async (요청, 응답) => {
    let result = await db.collection('post').find().toArray()
    응답.render('list.ejs', { 글목록 : result})
})

app.get('/time', (요청,응답) => {
    var time = new Date()
    응답.send(time)
})

app.get('/write', (요청, 응답) => {
    응답.render('write.ejs')
})







const { MongoClient } = require('mongodb')

let db
const url = 'mongodb+srv://dncks08121:idkejs77@cluster0.ocnfxl7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
new MongoClient(url).connect().then((client)=>{
  console.log('DB연결성공')
  db = client.db('forum')
}).catch((err)=>{
  console.log(err)
})