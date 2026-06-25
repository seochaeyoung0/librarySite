import React, { useState } from 'react';
import './App.css';

const MOCK_RESULTS = [
  { id: 1, type: 'book', title: '인간 실격', author: '다자이 오사무', status: '대출가능' },
  { id: 2, type: 'book', title: '데미안', author: '헤르만 헤세', status: '예약중' },
  { id: 3, type: 'book', title: '참을 수 없는 존재의 가벼움', author: '밀란 쿤데라', status: '대출가능' },
  { id: 4, type: 'book', title: '1984', author: '조지 오웰', status: '대출가능' },
];

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearched, setIsSearched] = useState(false);
  const [currentBookIdx, setCurrentBookIdx] = useState(0);
  const [currentSchematicIdx, setCurrentSchematicIdx] = useState(0);
  const [currentNewsIdx, setCurrentNewsIdx] = useState(0);
  const [recStartIdx, setRecStartIdx] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showLectureDetail, setShowLectureDetail] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showMySpace, setShowMySpace] = useState(false);
  const [expandedFooterMenu, setExpandedFooterMenu] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [lectureTab, setLectureTab] = useState('전체');
  const [currentLectureIdx, setCurrentLectureIdx] = useState(0);
  const [bookTab, setBookTab] = useState('추천도서');

  const books = [
    { title: "불편한 편의점", author: "김호연 저 | 나무옆의자", img: `${import.meta.env.BASE_URL}book_cover.png` },
    { title: "이상하고 자유로운 할머니가 되고 싶어", author: "무루 지음 | 오후의소묘", img: `${import.meta.env.BASE_URL}book_rec1.png` },
    { title: "절창 : 구병모 장편소설", author: "구병모 지음", img: `${import.meta.env.BASE_URL}book_rec2.png` },
    { title: "이상한 무인오락실", author: "이선희 지음", img: `${import.meta.env.BASE_URL}book_rec3.png` },
    { title: "균형 잡힌 뇌: 인공지능 시대의 뇌건강", author: "이경민 지음", img: `${import.meta.env.BASE_URL}book_rec4.png` },
    { title: "(모두를 위한) 한국미술사", author: "김인희 지음", img: `${import.meta.env.BASE_URL}book_rec5.png` },
    { title: "작별인사", author: "김영하 지음 | 복복서가", img: `${import.meta.env.BASE_URL}book_rec1.png` },
    { title: "파친코", author: "이민진 지음 | 인플루엔셜", img: `${import.meta.env.BASE_URL}book_rec2.png` },
    { title: "달러구트 꿈 백화점", author: "이미예 지음 | 팩토리나인", img: `${import.meta.env.BASE_URL}book_rec3.png` },
    { title: "아몬드", author: "손원평 지음 | 창비", img: `${import.meta.env.BASE_URL}book_rec4.png` },
    { title: "하얼빈", author: "김훈 지음 | 문학동네", img: `${import.meta.env.BASE_URL}book_rec5.png` },
  ];

  const getFilteredBooks = () => {
    if (bookTab === '신착도서') return [...books].reverse();
    if (bookTab === '인기도서') return [...books.slice(5), ...books.slice(0, 5)];
    return books;
  };
  const displayBooks = getFilteredBooks();

  const handleBookTab = (tab) => {
    setBookTab(tab);
    setCurrentBookIdx(0);
  };

  const toggleFooterMenu = (title) => {
    setExpandedFooterMenu(prev => prev === title ? null : title);
  };

  const schematicImages = [
    { id: 1, img: `${import.meta.env.BASE_URL}schematic1.png`, title: "스마트 열람실 안내" },
    { id: 2, img: `${import.meta.env.BASE_URL}schematic2.png`, title: "공간 활용 가이드" },
    { id: 3, img: `${import.meta.env.BASE_URL}schematic3.png`, title: "디지털 지식 흐름" },
  ];

  const newsImages = [
    { id: 1, img: `${import.meta.env.BASE_URL}news.png`, title: "서울도서관 하계 휴관 안내" },
    { id: 2, img: `${import.meta.env.BASE_URL}news2.png`, title: "6월 저자 초청 강연회" },
    { id: 3, img: `${import.meta.env.BASE_URL}news3.png`, title: "어린이 그림책 읽기 교실" },
    { id: 4, img: `${import.meta.env.BASE_URL}news4.png`, title: "디지털 리터러시 교육" },
  ];

  const lectures = [
    { id: 1, library: "꿈꾸레도서관", title: "[성인] 보드게임 속 수학여행", date: "2026.04.15 ~ 2026.07.08", target: "만 19세 이상", status: "폐강" },
    { id: 2, library: "서울도서관", title: "[어린이] 창의력 쑥쑥 종이접기", date: "2026.05.20 ~ 2026.06.15", target: "만 7세 ~ 만 12세", status: "접수중", location: "어린이실", instructor: "김종이 작가", fee: "무료" },
    { id: 3, library: "강남구립도서관", title: "[성인] 힐링 캘리그라피 기초", date: "2026.06.01 ~ 2026.08.31", target: "만 19세 이상", status: "접수중", location: "문화교실 1", instructor: "이글씨 강사", fee: "10,000원" },
    { id: 4, library: "동작상도국어절도서관", title: "[가족] 주말 그림책 구연 동화", date: "2026.05.10 ~ 2026.05.31", target: "제한없음", status: "접수중", location: "다목적실", instructor: "박동화 성우", fee: "무료" },
    { id: 5, library: "마포평생학습관", title: "[청소년] 코딩으로 배우는 인공지능", date: "2026.07.01 ~ 2026.07.31", target: "중고등학생", status: "접수예정", location: "디지털실", instructor: "박코딩", fee: "무료" },
    { id: 6, library: "서대문이진아도서관", title: "[성인] 인문학 산책: 서양미술사", date: "2026.07.10 ~ 2026.08.10", target: "만 19세 이상", status: "접수예정", location: "다목적실", instructor: "최미술", fee: "5,000원" },
    { id: 7, library: "송파글마루도서관", title: "[어린이] 여름방학 독서캠프", date: "2026.08.01 ~ 2026.08.05", target: "초등학생", status: "접수예정", location: "강당", instructor: "이독서", fee: "무료" },
    { id: 8, library: "은평구립도서관", title: "[성인] 스마트폰 영상 제작 교실", date: "2026.05.15 ~ 2026.06.15", target: "만 19세 이상", status: "접수중", location: "멀티미디어실", instructor: "김영상", fee: "15,000원" },
  ];

  const filteredLectures = lectures.filter(l => lectureTab === '전체' || l.status === lectureTab);
  const visibleLectures = [];
  if (filteredLectures.length > 0) {
    for (let i = 0; i < Math.min(4, filteredLectures.length); i++) {
      visibleLectures.push(filteredLectures[(currentLectureIdx + i) % filteredLectures.length]);
    }
  }

  const handleLectureTab = (tab) => {
    setLectureTab(tab);
    setCurrentLectureIdx(0);
  };

  const nextLecture = () => {
    if (filteredLectures.length > 0) {
      setCurrentLectureIdx((prev) => (prev + 1) % filteredLectures.length);
    }
  };
  const prevLecture = () => {
    if (filteredLectures.length > 0) {
      setCurrentLectureIdx((prev) => (prev - 1 + filteredLectures.length) % filteredLectures.length);
    }
  };

  const nextBook = () => setCurrentBookIdx((prev) => (prev + 1) % displayBooks.length);
  const prevBook = () => setCurrentBookIdx((prev) => (prev - 1 + displayBooks.length) % displayBooks.length);

  const nextSchematic = () => setCurrentSchematicIdx((prev) => (prev + 1) % schematicImages.length);
  const prevSchematic = () => setCurrentSchematicIdx((prev) => (prev - 1 + schematicImages.length) % schematicImages.length);

  const nextNews = () => setCurrentNewsIdx((prev) => (prev + 1) % newsImages.length);
  const prevNews = () => setCurrentNewsIdx((prev) => (prev - 1 + newsImages.length) % newsImages.length);

  const handleSearch = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (searchTerm.trim()) {
      setIsSearched(true);
    }
  };

  const openReservation = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const confirmReservation = () => {
    alert(`${selectedItem.title} 예약이 완료되었습니다.`);
    setShowModal(false);
    setSelectedItem(null);
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo-group" aria-label="서울도서관 로고" onClick={() => setIsSearched(false)} style={{ cursor: 'pointer' }}>
            <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '12px' }}>
              <circle cx="20" cy="20" r="18" stroke="#1A2B48" stroke-width="2" />
              <circle cx="20" cy="20" r="16" stroke="#C4A47C" stroke-width="1" />
              <path d="M12 28H28V26H12V28Z" fill="#1A2B48" />
              <path d="M14 26V18H15V26H14Z" fill="#1A2B48" />
              <path d="M18 26V18H19V26H18Z" fill="#1A2B48" />
              <path d="M21 26V18H22V26H21Z" fill="#1A2B48" />
              <path d="M25 26V18H26V26H25Z" fill="#1A2B48" />
              <path d="M12 18L20 13L28 18H12Z" fill="#1A2B48" />
              <rect x="16" y="20" width="8" height="1.5" fill="#C4A47C" />
              <rect x="16" y="23" width="8" height="1.5" fill="#C4A47C" />
            </svg>
            <span className="logo-text">SEOUL LIBRARY</span>
          </div>
          <nav className="nav-links">
            <button className="nav-item" title="나의 공간" aria-label="나의 공간 바로가기" onClick={() => setShowMySpace(true)}>
              <div className="icon-placeholder">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2" />
                  <circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="2" />
                  <path d="M7 18C7 16.5 8.5 15 12 15C15.5 15 17 16.5 17 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                </svg>
              </div>
              <span>나의공간</span>
            </button>
            <button className="nav-item" title="로그인" aria-label="로그인 페이지로 이동" onClick={() => setShowLogin(true)}>
              <div className="icon-placeholder">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M10 17L15 12L10 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M15 12H3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
              <span>로그인</span>
            </button>
            <button className="nav-item" title="전체 메뉴" aria-label="전체 메뉴 보기" onClick={() => setShowMenu(true)}>
              <div className="icon-placeholder">☰</div>
              <span>메뉴</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="hero container">
        {!isSearched ? (
          <>
            <h1 style={{ display: 'none' }}>서울도서관 통합 검색</h1>

            {/* Central Search Input Container */}
            <div className="search-container">
              <form
                className="search-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSearch(e);
                }}
              >
                <div className="main-search-icon-wrapper">
                  <svg className="search-icon-svg" width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
                    <path d="M15.5 15.5L20 20" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
                  </svg>
                </div>
                <input
                  type="text"
                  className="main-search-input"
                  placeholder="어떤 책을 찾으시나요?"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  aria-label="도서 검색어 입력"
                />
                <button type="submit" className="main-search-submit-btn" aria-label="검색 실행">
                  검색
                </button>
              </form>
            </div>

            {/* Hero Quick Links Grid */}
            <div className="hero-grid" role="navigation" aria-label="주요 서비스 바로가기">
              <button className="hero-card card-ebook" aria-label="전자책 및 오디오북 서비스">
                <div className="card-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="4" width="18" height="12" rx="2" stroke="currentColor" stroke-width="2" />
                    <path d="M9 20H15M12 16V20" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                    <path d="M8.5 10L11 12.5L16 7.5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </div>
                <span>전자책 / 오디오북</span>
              </button>
              <button className="hero-card card-loan" aria-label="대출 내역 조회 및 연장 서비스">
                <div className="card-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 19V5M12 5C10.5 5 7 5 3 7V21C7 19 10.5 19 12 19M12 5C13.5 5 17 5 21 7V21C17 19 13.5 19 12 19" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </div>
                <span>대출조회 / 연장</span>
              </button>
              <button className="hero-card card-location" aria-label="도서관 이용시간 및 위치 안내">
                <div className="card-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <circle cx="12" cy="9" r="3" stroke="currentColor" stroke-width="1.5" />
                    <path d="M12 7.5V9H13.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </div>
                <span>이용시간 / 위치</span>
              </button>
              <button className="hero-card card-facility" aria-label="도서관 시설 이용 예약">
                <div className="card-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="4" y="4" width="14" height="16" rx="2" stroke="currentColor" stroke-width="2" />
                    <path d="M8 4V2H19C20.1046 2 21 2.89543 21 4V16H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                    <path d="M4 16H18" stroke="currentColor" stroke-width="2" />
                  </svg>
                </div>
                <span>시설이용</span>
              </button>
              <button className="hero-card card-disabled" aria-label="장애인 전용 서비스">
                <div className="card-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="7" r="3" stroke="currentColor" stroke-width="2" />
                    <path d="M6 21V19C6 16.7909 7.79086 15 10 15H14C16.2091 15 18 16.7909 18 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                    <circle cx="17" cy="9" r="2.5" stroke="currentColor" stroke-width="2" />
                    <path d="M22 21V20C22 18.3431 20.6569 17 19 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                    <circle cx="7" cy="9" r="2.5" stroke="currentColor" stroke-width="2" />
                    <path d="M2 21V20C2 18.3431 3.34315 17 5 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                  </svg>
                </div>
                <span>장애인 서비스</span>
              </button>
              <button className="hero-card card-smart" aria-label="스마트 도서관 위치 및 정보">
                <div className="card-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C9.5 2 7.5 4 7.5 6.5C7.5 10 12 15 12 15C12 15 16.5 10 16.5 6.5C16.5 4 14.5 2 12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <circle cx="12" cy="6.5" r="1.5" stroke="currentColor" stroke-width="1.2" />
                    <path d="M4 18L12 21L20 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M4 15L12 18L20 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M4 15V18M20 15V18" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                  </svg>
                </div>
                <span>스마트 도서관</span>
              </button>
            </div>

            {/* Library Schematic Carousel */}
            <section className="schematic-section">
              <div className="section-header">
                <h3>도서관 이용 도식</h3>
              </div>
              <div className="schematic-container">
                <div className="schematic-slider" style={{ transform: `translateX(-${currentSchematicIdx * 100}%)` }}>
                  {schematicImages.map((item) => (
                    <div key={item.id} className="schematic-slide">
                      <img src={item.img} alt={item.title} className="schematic-img" />
                      <div className="schematic-info">
                        <h4>{item.title}</h4>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="schematic-nav prev" onClick={prevSchematic} aria-label="이전 도식">‹</button>
                <button className="schematic-nav next" onClick={nextSchematic} aria-label="다음 도식">›</button>

                <div className="schematic-dots">
                  {schematicImages.map((_, idx) => (
                    <button
                      key={idx}
                      className={`dot ${idx === currentSchematicIdx ? 'active' : ''}`}
                      onClick={() => setCurrentSchematicIdx(idx)}
                      aria-label={`${idx + 1}번 페이지로 이동`}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* Library News Carousel */}
            <section className="news-section">
              <div className="news-header">
                <h3>도서관 소식</h3>
              </div>
              <div className="news-content">
                <div className="news-slider" style={{ transform: `translateX(-${currentNewsIdx * 100}%)` }}>
                  {newsImages.map((item) => (
                    <div key={item.id} className="news-slide">
                      <img src={item.img} alt={item.title} className="news-image" />
                    </div>
                  ))}
                </div>
                <div className="news-overlay">
                  <div className="carousel-controls">
                    <span className="pagination">{currentNewsIdx + 1} / {newsImages.length}</span>
                    <button className="control-btn" aria-label="일시정지">⏸</button>
                    <div className="nav-group">
                      <button className="control-btn" aria-label="이전 소식" onClick={prevNews}>◀</button>
                      <button className="control-btn" aria-label="다음 소식" onClick={nextNews}>▶</button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Cultural Lectures Section */}
            <section className="lectures-section">
              <div className="section-header">
                <h3>도서관 문화강좌</h3>
                <button className="section-more-btn" aria-label="문화강좌 더보기">
                  <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="17" cy="17" r="15" fill="#B0B0B0" />
                    <path d="M15 12L20 17L15 22" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </button>
              </div>

              <div className="filter-row">
                <div className="library-dropdown">
                  <span>전체도서관</span>
                  <span className="dropdown-arrow">▼</span>
                </div>
              </div>

              <div className="tabs-container">
                <button className={`tab ${lectureTab === '전체' ? 'active' : ''}`} onClick={() => handleLectureTab('전체')}>전체</button>
                <button className={`tab ${lectureTab === '접수중' ? 'active' : ''}`} onClick={() => handleLectureTab('접수중')}>접수중</button>
                <button className={`tab ${lectureTab === '접수예정' ? 'active' : ''}`} onClick={() => handleLectureTab('접수예정')}>접수예정</button>
              </div>

              <div className="lectures-grid">
                {visibleLectures.map((lecture, index) => (
                  <div
                    key={`${lecture.id}-${index}`}
                    className={`lecture-card ${lecture.status === '접수중' ? 'clickable' : ''}`}
                    onClick={() => {
                      if (lecture.status === '접수중') {
                        setSelectedLecture(lecture);
                        setShowLectureDetail(true);
                      }
                    }}
                  >
                    <div className="lecture-library">{lecture.library}</div>
                    <h4 className="lecture-title">{lecture.title}</h4>
                    <div className="lecture-info">
                      <div className="info-item">
                        <span className="info-icon">
                          <svg width="16" height="16" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="3" y="4" width="14" height="13" rx="1.5" stroke="currentColor" stroke-width="1.5" />
                            <path d="M3 8H17" stroke="currentColor" stroke-width="1.5" />
                            <path d="M6 3V5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                            <path d="M14 3V5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                          </svg>
                        </span>
                        <span>{lecture.date}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-icon">
                          <svg width="16" height="16" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="7" cy="6" r="3" stroke="currentColor" stroke-width="1.5" />
                            <path d="M2 14C2 12.3431 3.34315 11 5 11H9C10.6569 11 12 12.3431 12 14" stroke="currentColor" stroke-width="1.5" />
                            <path d="M13 11H15C16.6569 11 18 12.3431 18 14" stroke="currentColor" stroke-width="1.5" />
                            <circle cx="13" cy="6" r="2.5" stroke="currentColor" stroke-width="1.5" />
                          </svg>
                        </span>
                        <span>{lecture.target}</span>
                      </div>
                    </div>
                    <div className={`lecture-status ${lecture.status === '접수중' ? 'badge-active' : 'badge-closed'}`}>
                      {lecture.status}
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination/Play Controls for Lectures */}
              <div className="lectures-controls">
                <div className="control-bar">
                  <button className="arrow-btn" onClick={prevLecture} aria-label="이전 강좌">◀</button>
                  <button className="pause-btn" aria-label="일시정지">⏸</button>
                  <button className="arrow-btn" onClick={nextLecture} aria-label="다음 강좌">▶</button>
                </div>
              </div>
            </section>

            {/* Now, This Book Section */}
            <section className="now-book-section">
              <div className="section-header">
                <h3>지금, 이 책</h3>
              </div>

              <div className="book-tabs">
                <button className={`tab ${bookTab === '추천도서' ? 'active' : ''}`} onClick={() => handleBookTab('추천도서')}>추천도서</button>
                <button className={`tab ${bookTab === '신착도서' ? 'active' : ''}`} onClick={() => handleBookTab('신착도서')}>신착도서</button>
                <button className={`tab ${bookTab === '인기도서' ? 'active' : ''}`} onClick={() => handleBookTab('인기도서')}>인기도서</button>
              </div>

              <div className="book-display">
                <div className="book-cover-container" key={`${bookTab}-${currentBookIdx}`}>
                  <img src={displayBooks[currentBookIdx].img} alt={`${displayBooks[currentBookIdx].title} 책 표지`} className="book-cover-img fade-in" />
                  <div className="book-meta">
                    <h4 className="book-title">{displayBooks[currentBookIdx].title}</h4>
                    <p className="book-author">{displayBooks[currentBookIdx].author}</p>
                  </div>
                </div>
              </div>

              <div className="recommendations-container">
                <div className="recommendations-grid">
                  {[0, 1, 2].map((offset) => {
                    const book = displayBooks[(currentBookIdx + offset) % displayBooks.length];
                    return (
                      <div key={`${book.title}-${offset}`} className="rec-card fade-in">
                        <img src={book.img} alt={book.title} className="rec-img" />
                        <div className="rec-info">
                          <p className="rec-title">{book.title}</p>
                          <p className="rec-author">{book.author.split(' | ')[0]}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="book-controls">
                <div className="control-bar">
                  <button className="arrow-btn" onClick={prevBook}>◀</button>
                  <button className="pause-btn">⏸</button>
                  <button className="arrow-btn" onClick={nextBook}>▶</button>
                </div>
              </div>
            </section>

            {/* Site Footer */}
            <footer className="site-footer">
              <div className="footer-links">
                <div className="footer-link-group">
                  <button className={`footer-link-item ${expandedFooterMenu === '도서관 소개' ? 'expanded' : ''}`} onClick={() => toggleFooterMenu('도서관 소개')}>
                    <span>도서관 소개</span>
                    <span className="arrow">{expandedFooterMenu === '도서관 소개' ? '˅' : '›'}</span>
                  </button>
                  {expandedFooterMenu === '도서관 소개' && (
                    <ul className="footer-sub-links fade-in">
                      <li>인사말</li>
                      <li>연혁</li>
                      <li>조직/직원</li>
                      <li>시설안내</li>
                    </ul>
                  )}
                </div>

                <div className="footer-link-group">
                  <button className={`footer-link-item ${expandedFooterMenu === '도서관 정책' ? 'expanded' : ''}`} onClick={() => toggleFooterMenu('도서관 정책')}>
                    <span>도서관 정책</span>
                    <span className="arrow">{expandedFooterMenu === '도서관 정책' ? '˅' : '›'}</span>
                  </button>
                  {expandedFooterMenu === '도서관 정책' && (
                    <ul className="footer-sub-links fade-in">
                      <li>장서 개발 정책</li>
                      <li>정보서비스 정책</li>
                      <li>개인정보 처리방침</li>
                    </ul>
                  )}
                </div>

                <div className="footer-link-group">
                  <button className={`footer-link-item ${expandedFooterMenu === '운영규정 / 이용정책' ? 'expanded' : ''}`} onClick={() => toggleFooterMenu('운영규정 / 이용정책')}>
                    <span>운영규정 / 이용정책</span>
                    <span className="arrow">{expandedFooterMenu === '운영규정 / 이용정책' ? '˅' : '›'}</span>
                  </button>
                  {expandedFooterMenu === '운영규정 / 이용정책' && (
                    <ul className="footer-sub-links fade-in">
                      <li>도서관 운영규정</li>
                      <li>자료실 이용안내</li>
                      <li>저작권 정책</li>
                    </ul>
                  )}
                </div>

                <div className="footer-link-group">
                  <button className={`footer-link-item ${expandedFooterMenu === '도서관 네트워크 / 협력' ? 'expanded' : ''}`} onClick={() => toggleFooterMenu('도서관 네트워크 / 협력')}>
                    <span>도서관 네트워크 / 협력</span>
                    <span className="arrow">{expandedFooterMenu === '도서관 네트워크 / 협력' ? '˅' : '›'}</span>
                  </button>
                  {expandedFooterMenu === '도서관 네트워크 / 협력' && (
                    <ul className="footer-sub-links fade-in">
                      <li>협력기관 안내</li>
                      <li>상호대차 서비스</li>
                      <li>지역서점 네트워크</li>
                    </ul>
                  )}
                </div>

                <div className="footer-link-group">
                  <button className={`footer-link-item ${expandedFooterMenu === '공공도서관 정보' ? 'expanded' : ''}`} onClick={() => toggleFooterMenu('공공도서관 정보')}>
                    <span>공공도서관 정보</span>
                    <span className="arrow">{expandedFooterMenu === '공공도서관 정보' ? '˅' : '›'}</span>
                  </button>
                  {expandedFooterMenu === '공공도서관 정보' && (
                    <ul className="footer-sub-links fade-in">
                      <li>관내 도서관 현황</li>
                      <li>휴관일 안내</li>
                      <li>도서관 통계</li>
                    </ul>
                  )}
                </div>
              </div>

              <div className="footer-social">
                <button className="social-icon facebook" title="페이스북">f</button>
                <button className="social-icon youtube" title="유튜브">▶</button>
                <button className="social-icon instagram" title="인스타그램" aria-label="서울도서관 인스타그램 바로가기">
                  <svg width="24" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="16" height="16" rx="4" fill="url(#footer_insta_grad)" />
                    <rect x="3" y="3" width="10" height="10" rx="2.5" stroke="white" stroke-width="1.2" />
                    <circle cx="8" cy="8" r="2.5" stroke="white" stroke-width="1.2" />
                    <circle cx="11.5" cy="4.5" r="0.8" fill="white" />
                    <defs>
                      <linearGradient id="footer_insta_grad" x1="0" y1="16" x2="16" y2="0" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#FFD600" />
                        <stop offset="0.5" stop-color="#FF0069" />
                        <stop offset="1" stop-color="#7638FF" />
                      </linearGradient>
                    </defs>
                  </svg>
                </button>
              </div>

              <div className="footer-contact">
                <p className="contact-title">서울도서관</p>
                <address>서울특별시 중구 세종대로 110</address>
                <p>전화번호 : 02-120, 02-2133-0300, 02-2133-0301</p>
                <p>이용시간 : 화~금 09:00~21:00 / 토, 일 09:00~18:00 / 월요일, 공휴일 휴관</p>
              </div>
            </footer>
          </>
        ) : (
          <div className="results-view">
            <div className="results-header">
              <button className="back-button" onClick={() => setIsSearched(false)} aria-label="메인 페이지로 돌아가기">
                <span className="back-icon">‹</span>
              </button>
              <form className="results-search-bar" onSubmit={handleSearch}>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="도서명, 저자명 검색"
                />
                <button type="submit" className="results-search-btn" aria-label="검색">
                  <svg className="search-icon-svg" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" />
                    <path d="M15.5 15.5L20 20" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" />
                  </svg>
                </button>
              </form>
            </div>

            <div className="results-layout">
              {/* Sidebar Navigation */}
              <aside className="results-sidebar">
                <h2 className="sidebar-title">도서검색</h2>
                <nav className="sidebar-nav">
                  <button className="nav-link active">간략검색</button>
                  <button className="nav-link">상세검색</button>
                  <button className="nav-link">신착도서</button>
                  <button className="nav-link">추천도서</button>
                  <button className="nav-link">인기도서</button>
                </nav>
              </aside>

              {/* Main Content Area */}
              <div className="results-main">
                <div className="results-filters">
                  <button className="filter-tab active">전체 (4)</button>
                  <button className="filter-tab">일반도서 (2)</button>
                  <button className="filter-tab">아동도서 (1)</button>
                  <button className="filter-tab">참고도서 (1)</button>
                </div>

                <div className="results-stats">
                  <span><strong>'간략검색'</strong> 결과 총 <strong>4</strong>건</span>
                  <div className="sort-dropdown">
                    <span>정확도순</span>
                    <span className="arrow">▼</span>
                  </div>
                </div>

                <div className="results-list">
                  {MOCK_RESULTS.map((item) => (
                    <div key={item.id} className="result-item-card">
                      <div className="item-thumbnail">
                        {item.type === 'book' ? (
                          <img src={`${import.meta.env.BASE_URL}book_rec${item.id}.png`} alt={item.title} onError={(e) => e.target.src = `${import.meta.env.BASE_URL}book_cover.png`} />
                        ) : (
                          <div className="type-icon-placeholder">{item.type === 'program' ? '📅' : '📢'}</div>
                        )}
                      </div>
                      <div className="item-details">
                        <div className="item-meta">
                          <span className={`type-badge ${item.type}`}>
                            {item.type === 'book' ? '도서' : item.type === 'program' ? '프로그램' : '공지'}
                          </span>
                          {item.status && <span className={`status-badge ${item.status === '대출가능' ? 'available' : 'reserved'}`}>{item.status}</span>}
                        </div>
                        <h3 className="item-title">{item.title}</h3>
                        {item.author && <p className="item-author">{item.author}</p>}
                        {item.date && <p className="item-date">일시: {item.date}</p>}

                        <div className="item-actions">
                          {item.type === 'book' ? (
                            <>
                              <button className="btn-action primary" onClick={() => openReservation(item)} disabled={item.status !== '대출가능'}>
                                {item.status === '대출가능' ? '대출예약' : '예약중'}
                              </button>
                              <button className="btn-action secondary">상세보기</button>
                            </>
                          ) : (
                            <button className="btn-action primary">신청하기</button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Full Menu Overlay */}
      {showMenu && (
        <div className="menu-overlay">
          <div className="menu-content">
            <div className="menu-header">
              <div className="menu-logo">
                <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '8px' }}>
                  <circle cx="20" cy="20" r="18" stroke="#1A2B48" stroke-width="2" />
                  <circle cx="20" cy="20" r="16" stroke="#C4A47C" stroke-width="1" />
                  <path d="M12 28H28V26H12V28Z" fill="#1A2B48" />
                  <path d="M14 26V18H15V26H14Z" fill="#1A2B48" />
                  <path d="M18 26V18H19V26H18Z" fill="#1A2B48" />
                  <path d="M21 26V18H22V26H21Z" fill="#1A2B48" />
                  <path d="M25 26V18H26V26H25Z" fill="#1A2B48" />
                  <path d="M12 18L20 13L28 18H12Z" fill="#1A2B48" />
                  <rect x="16" y="20" width="8" height="1.5" fill="#C4A47C" />
                  <rect x="16" y="23" width="8" height="1.5" fill="#C4A47C" />
                </svg>
                SEOUL LIBRARY
              </div>
              <button className="menu-close-btn" onClick={() => setShowMenu(false)}>✕</button>
            </div>

            <div className="menu-grid">
              <div className="menu-category">
                <h3>도서검색</h3>
                <ul>
                  <li><button onClick={() => { setIsSearched(true); setShowMenu(false); }}>간략검색</button></li>
                  <li>상세검색</li>
                  <li>신착도서</li>
                  <li>추천도서</li>
                </ul>
              </div>
              <div className="menu-category">
                <h3>이용자마당</h3>
                <ul>
                  <li>공지사항</li>
                  <li>자주하는 질문</li>
                  <li>Q&A</li>
                  <li>시민의 소리</li>
                </ul>
              </div>
              <div className="menu-category">
                <h3>문화행사</h3>
                <ul>
                  <li>문화강좌 신청</li>
                  <li>강좌 일지</li>
                  <li>행사 안내</li>
                  <li>전시 안내</li>
                </ul>
              </div>
              <div className="menu-category">
                <h3>도서관소개</h3>
                <ul>
                  <li>인사말</li>
                  <li>연혁</li>
                  <li>조직/직원</li>
                  <li>시설안내</li>
                </ul>
              </div>
            </div>

            <div className="menu-footer">
              <div className="menu-user-links">
                <button>로그인</button>
                <button>회원가입</button>
                <button>나의공간</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lecture Detail Overlay */}
      {showLectureDetail && selectedLecture && (
        <div className="lecture-overlay">
          <div className="lecture-detail-content">
            <div className="detail-header">
              <button className="detail-back-btn" onClick={() => setShowLectureDetail(false)}>←</button>
              <h2>문화강좌 상세</h2>
            </div>

            <div className="detail-banner">
              <img src={`${import.meta.env.BASE_URL}lecture_banner.png`} alt="강좌 배너" />
              <div className="detail-status-badge">{selectedLecture.status}</div>
            </div>

            <div className="detail-body">
              <div className="detail-title-section">
                <span className="detail-library">{selectedLecture.library}</span>
                <h3 className="detail-title">{selectedLecture.title}</h3>
              </div>

              <div className="detail-info-grid">
                <div className="detail-info-item">
                  <span className="label">강사명</span>
                  <span className="value">{selectedLecture.instructor}</span>
                </div>
                <div className="detail-info-item">
                  <span className="label">교육장소</span>
                  <span className="value">{selectedLecture.location}</span>
                </div>
                <div className="detail-info-item">
                  <span className="label">교육기간</span>
                  <span className="value">{selectedLecture.date}</span>
                </div>
                <div className="detail-info-item">
                  <span className="label">참가비</span>
                  <span className="value">{selectedLecture.fee}</span>
                </div>
                <div className="detail-info-item">
                  <span className="label">참가대상</span>
                  <span className="value">{selectedLecture.target}</span>
                </div>
              </div>

              <div className="detail-description">
                <h4>강좌소개</h4>
                <p>본 강좌는 시민 여러분의 문화 소양 함양을 위해 서울도서관에서 기획한 특별 프로그램입니다. 각 분야 전문가와 함께하는 깊이 있는 학습 기회를 놓치지 마세요.</p>
              </div>
            </div>

            <div className="detail-footer">
              <button className="apply-btn" onClick={() => alert('수강 신청이 완료되었습니다.')}>수강 신청하기</button>
            </div>
          </div>
        </div>
      )}

      {/* Login Overlay */}
      {showLogin && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ textAlign: 'center', padding: '40px 20px', maxWidth: '400px' }}>
            <h2 style={{ marginBottom: '15px', color: '#1A2B48' }}>로그인</h2>
            <p style={{ marginBottom: '25px', color: '#666', fontSize: '14px' }}>서울도서관 서비스 이용을 위해 로그인해 주세요.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', margin: '0 auto 20px' }}>
              <input type="text" placeholder="아이디" style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px', width: '100%', boxSizing: 'border-box' }} />
              <input type="password" placeholder="비밀번호" style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px', width: '100%', boxSizing: 'border-box' }} />
              <button className="btn-primary" style={{ padding: '12px', width: '100%', marginTop: '10px' }} onClick={() => setShowLogin(false)}>로그인</button>
            </div>
            <div style={{ textAlign: 'center' }}>
              <button className="btn-secondary" onClick={() => setShowLogin(false)}>닫기</button>
            </div>
          </div>
        </div>
      )}

      {/* My Space Overlay */}
      {showMySpace && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ width: '90%', maxWidth: '500px', padding: '30px' }}>
            <h2 style={{ marginBottom: '20px', color: '#1A2B48', textAlign: 'center' }}>나의 공간</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '25px' }}>
              <div style={{ padding: '20px 10px', border: '1px solid #eee', borderRadius: '8px', textAlign: 'center', backgroundColor: '#fafafa' }}>
                <h3 style={{ marginBottom: '10px', fontSize: '14px', color: '#555' }}>대출 중인 도서</h3>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#1A2B48', margin: 0 }}>2<span style={{ fontSize: '14px', fontWeight: 'normal' }}>권</span></p>
              </div>
              <div style={{ padding: '20px 10px', border: '1px solid #eee', borderRadius: '8px', textAlign: 'center', backgroundColor: '#fafafa' }}>
                <h3 style={{ marginBottom: '10px', fontSize: '14px', color: '#555' }}>예약 중인 도서</h3>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#1A2B48', margin: 0 }}>1<span style={{ fontSize: '14px', fontWeight: 'normal' }}>권</span></p>
              </div>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 25px 0' }}>
              <li style={{ padding: '12px 10px', borderBottom: '1px solid #eee', cursor: 'pointer', color: '#333' }}>• 관심 도서 목록</li>
              <li style={{ padding: '12px 10px', borderBottom: '1px solid #eee', cursor: 'pointer', color: '#333' }}>• 문화강좌 신청 내역</li>
              <li style={{ padding: '12px 10px', borderBottom: '1px solid #eee', cursor: 'pointer', color: '#333' }}>• 개인정보 수정</li>
            </ul>
            <div style={{ textAlign: 'center' }}>
              <button className="btn-secondary" onClick={() => setShowMySpace(false)}>닫기</button>
            </div>
          </div>
        </div>
      )}

      {/* Reservation Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>도서 예약 확인</h3>
            <p><strong>{selectedItem?.title}</strong> 도서를 예약하시겠습니까?</p>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setShowModal(false)}>취소</button>
              <button className="btn-primary" onClick={confirmReservation}>확인</button>
            </div>
          </div>
        </div>
      )}

      <footer className="footer">
        <div className="container">
          <p>© 2026 Seoul Library. All Rights Reserved. Designed for better accessibility.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
