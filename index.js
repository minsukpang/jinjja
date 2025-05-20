// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');

// 환경 변수 설정
dotenv.config();

// Express 앱 생성
const app = express();

// 미들웨어 설정
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB 연결
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB Atlas 연결 성공'))
.catch(err => console.error('MongoDB Atlas 연결 실패:', err));

// 마커 스키마 정의
const markerSchema = new mongoose.Schema({
    type: { type: String, required: true, enum: ['danger', 'shelter'] },
    name: { type: String, required: true },
    position: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
    },
    // 위험 지역 필드
    dangerType: { type: String, enum: ['natural', 'war', 'other'] },
    radius: { type: Number },
    // 대피소 필드
    capacity: { type: Number },
    facilities: { type: String },
    // 공통 필드
    comment: { type: String },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

// 마커 모델 생성
const Marker = mongoose.model('Marker', markerSchema);

// API 엔드포인트

// 모든 마커 가져오기
app.get('/api/markers', async (req, res) => {
    try {
        // 비밀번호 필드 제외하고 가져오기
        const markers = await Marker.find({}, { password: 0 });
        res.json(markers);
    } catch (error) {
        console.error('마커 조회 오류:', error);
        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
});

// 마커 추가
app.post('/api/markers', async (req, res) => {
    try {
        const newMarker = new Marker(req.body);
        const savedMarker = await newMarker.save();
        
        // 비밀번호 제외하고 응답
        const response = savedMarker.toObject();
        delete response.password;
        
        res.status(201).json(response);
    } catch (error) {
        console.error('마커 추가 오류:', error);
        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
});

// 마커 삭제
app.delete('/api/markers/:id', async (req, res) => {
    try {
        const markerId = req.params.id;
        const { password } = req.body;
        
        // 마커 찾기
        const marker = await Marker.findById(markerId);
        
        if (!marker) {
            return res.status(404).json({ message: '마커를 찾을 수 없습니다.' });
        }
        
        // 비밀번호 확인
        if (marker.password !== password) {
            return res.status(403).json({ message: '잘못된 비밀번호입니다.' });
        }
        
        // 마커 삭제
        await Marker.findByIdAndDelete(markerId);
        
        res.json({ message: '마커가 성공적으로 삭제되었습니다.' });
    } catch (error) {
        console.error('마커 삭제 오류:', error);
        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
});

// 메인 HTML 파일 제공 (SPA)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 서버 시작
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});