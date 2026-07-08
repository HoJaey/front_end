export const stocks = [
  { id: 1, name: '삼성전자', ticker: 'samsung', sector: '반도체', score: 62, news: 24, change: 1.8 },
  { id: 2, name: 'SK하이닉스', ticker: 'sk_hynix', sector: '반도체', score: 78, news: 31, change: 3.4 },
  { id: 3, name: 'NAVER', ticker: 'naver', sector: '인터넷', score: -18, news: 12, change: -0.9 },
  { id: 4, name: '카카오', ticker: 'kakao', sector: '인터넷', score: -45, news: 19, change: -2.7 },
  { id: 5, name: 'LG에너지솔루션', ticker: 'lgensol', sector: '배터리', score: 15, news: 9, change: 0.5 },
  { id: 6, name: '현대차', ticker: 'hyundai', sector: '자동차', score: 34, news: 14, change: 2.1 },
  { id: 7, name: '삼성바이오로직스', ticker: 'samsungbio', sector: '바이오', score: -22, news: 8, change: -1.2 },
  { id: 8, name: 'POSCO홀딩스', ticker: 'posco', sector: '철강', score: 55, news: 17, change: 4.6 },
  { id: 9, name: '셀트리온', ticker: 'celltrion', sector: '바이오', score: -58, news: 21, change: -3.5 },
  { id: 10, name: '에코프로', ticker: 'ecopro', sector: '2차전지', score: -71, news: 27, change: -5.8 },
]

export const bullTop = stocks.filter(s => s.score > 0).sort((a, b) => b.score - a.score)
export const bearTop = stocks.filter(s => s.score < 0).sort((a, b) => a.score - b.score)

export const chatMessages = [
  { role: 'assistant', content: '안녕하세요! 저는 호재이 AI예요. 종목, 환율, 해외지수의 뉴스 감성이나 투자 신호에 대해 궁금한 점을 물어보세요.' },
]
