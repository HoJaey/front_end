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

export const forex = [
  { id: 1, name: '달러/원', ticker: 'USD/KRW', sector: '주요통화', score: 42, news: 18, change: 0.3 },
  { id: 2, name: '엔/원', ticker: 'JPY/KRW', sector: '주요통화', score: -15, news: 9, change: -0.2 },
  { id: 3, name: '유로/원', ticker: 'EUR/KRW', sector: '주요통화', score: 28, news: 11, change: 0.4 },
  { id: 4, name: '위안/원', ticker: 'CNY/KRW', sector: '주요통화', score: -33, news: 14, change: -0.6 },
  { id: 5, name: '파운드/원', ticker: 'GBP/KRW', sector: '주요통화', score: 19, news: 7, change: 0.2 },
  { id: 6, name: '호주달러/원', ticker: 'AUD/KRW', sector: '기타통화', score: -8, news: 5, change: -0.1 },
]

export const indices = [
  { id: 1, name: 'S&P 500', ticker: 'SPX', sector: '미국', score: 55, news: 34, change: 1.2 },
  { id: 2, name: 'NASDAQ', ticker: 'NDX', sector: '미국', score: 67, news: 41, change: 1.8 },
  { id: 3, name: 'DOW Jones', ticker: 'DJI', sector: '미국', score: 38, news: 28, change: 0.7 },
  { id: 4, name: '닛케이 225', ticker: 'N225', sector: '일본', score: -12, news: 16, change: -0.4 },
  { id: 5, name: '항셍지수', ticker: 'HSI', sector: '홍콩', score: -41, news: 22, change: -1.9 },
  { id: 6, name: '상하이종합', ticker: 'SHCOMP', sector: '중국', score: -28, news: 19, change: -0.8 },
  { id: 7, name: 'DAX', ticker: 'DAX', sector: '유럽', score: 22, news: 13, change: 0.5 },
  { id: 8, name: 'FTSE 100', ticker: 'UKX', sector: '유럽', score: 14, news: 10, change: 0.3 },
]

export const bullTop = stocks.filter(s => s.score > 0).sort((a, b) => b.score - a.score)
export const bearTop = stocks.filter(s => s.score < 0).sort((a, b) => a.score - b.score)

export const chatMessages = [
  { role: 'assistant', content: '안녕하세요! 저는 호재이 AI예요. 종목, 환율, 해외지수의 뉴스 감성이나 투자 신호에 대해 궁금한 점을 물어보세요.' },
]

export function getDataByTab(tab) {
  if (tab === '환율') return forex
  if (tab === '해외지수') return indices
  return stocks
}
