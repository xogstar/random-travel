// HTML 요소들을 가져옵니다.
const randomBtn = document.getElementById('random-btn');
const nextBtn = document.getElementById('next-btn');
const destinationTitle = document.getElementById('destination-title');
const gridContainer = document.getElementById('grid-container');

// 1. 랜덤으로 뽑을 세계 여행지 목록
const travelDestinations = [
  "도쿄, 일본", "오사카, 일본", "후쿠오카, 일본", "삿포로, 일본", "교토, 일본",
  "베이징, 중국", "상하이, 중국", "시안, 중국", "청두, 중국", "항저우, 중국",
  "타이베이, 대만", "가오슝, 대만", "홍콩, 중국", "마카오, 중국", 
  "방콕, 태국", "치앙마이, 태국", "푸껫, 태국", "파타야, 태국",
  "하노이, 베트남", "다낭, 베트남", "호찌민, 베트남", "나트랑, 베트남",
  "싱가포르", "쿠알라룸푸르, 말레이시아", "코타키나발루, 말레이시아",
  "마닐라, 필리핀", "세부, 필리핀", "보라카이, 필리핀",
  "발리, 인도네시아", "자카르타, 인도네시아",
  "뉴델리, 인도", "뭄바이, 인도", "두바이, 아랍에미리트", "울란바토르, 몽골",
  "타슈켄트, 우즈베키스탄", "알마티, 카자흐스탄", "파리, 프랑스", "니스, 프랑스", 
  "리옹, 프랑스", "마르세유, 프랑스", "런던, 영국", "에든버러, 영국", "맨체스터, 영국", 
  "리버풀, 영국", "로마, 이탈리아", "피렌체, 이탈리아", "베네치아, 이탈리아", "밀라노, 이탈리아", 
  "나폴리, 이탈리아", "바르셀로나, 스페인", "마드리드, 스페인", "세비야, 스페인", "그라나다, 스페인",
  "리스본, 포르투갈", "포르투, 포르투갈", "베를린, 독일", "뮌헨, 독일", "프랑크푸르트, 독일", 
  "함부르크, 독일", "취리히, 스위스", "인터라켄, 스위스", "제네바, 스위스", "루체른, 스위스",
  "암스테르담, 네덜란드", "로테르담, 네덜란드", "브뤼셀, 벨기에", "브뤼허, 벨기에",
  "프라하, 체코", "체스키크룸로프, 체코", "빈, 오스트리아", "잘츠부르크, 오스트리아", 
  "할슈타트, 오스트리아", "부다페스트, 헝가리", "아테네, 그리스", "산토리니, 그리스",
  "이스탄불, 튀르키예", "카파도키아, 튀르키예", "스톡홀름, 스웨덴", "코펜하겐, 덴마크", 
  "오슬로, 노르웨이", "헬싱키, 핀란드", "레이캬비크, 아이슬란드", "더블린, 아일랜드", 
  "바르샤바, 폴란드", "크라쿠프, 폴란드", "뉴욕, 미국", "로스앤젤레스, 미국", "시카고, 미국", 
  "샌프란시스코, 미국", "라스베이거스, 미국", "하와이, 미국", "마이애미, 미국", "보스턴, 미국", 
  "워싱턴 D.C., 미국", "시애틀, 미국", "밴쿠버, 캐나다", "토론토, 캐나다", "몬트리올, 캐나다", 
  "퀘벡 시티, 캐나다", "밴프, 캐나다", "멕시코시티, 멕시코", "칸쿤, 멕시코", "아바나, 쿠바", 
  "산호세, 코스타리카", "파나마시티, 파나마", "부에노스아이레스, 아르헨티나", "리우데자네이루, 브라질", 
  "상파울루, 브라질", "리마, 페루", "쿠스코, 페루", "산티아고, 칠레", "보고타, 콜롬비아", 
  "키토, 에콰도르", "카이로, 이집트", "마라케시, 모로코", "케이프타운, 남아프리카 공화국",
  "나이로비, 케냐", "잔지바르, 탄자니아", "텔아비브, 이스라엘", "예루살렘, 이스라엘",
  "시드니, 호주", "멜버른, 호주", "브리즈번, 호주", "케언스, 호주",
  "오클랜드, 뉴질랜드", "퀸스타운, 뉴질랜드", "크라이스트처치, 뉴질랜드", "난디, 피지"
];

let selectedDestination = ""; 

// "랜덤한 여행지 뽑기" 버튼 클릭 이벤트
randomBtn.addEventListener('click', () => {
    const randomIndex = Math.floor(Math.random() * travelDestinations.length);
    selectedDestination = travelDestinations[randomIndex];
    
    destinationTitle.innerText = `✨ ${selectedDestination} ✨`;
    destinationTitle.style.display = 'block';
    
    nextBtn.style.display = 'inline-block';
    gridContainer.style.display = 'none'; // 다음 버튼 누르기 전까지 결과 숨김
});

// "자세한 정보 보기" 버튼 클릭 이벤트
nextBtn.addEventListener('click', () => {
    // Google 검색 엔진이 로드되었는지 최종 확인
    if (window.google && google.search.cse && google.search.cse.element) {
        // 4분할 화면을 보여줌
        gridContainer.style.display = 'grid';

        // 각 섹션에 맞는 검색을 자동으로 실행
        searchFlights(selectedDestination);
        searchPhotos(selectedDestination);
        searchBlogs(selectedDestination);
        searchPlansAsImages(selectedDestination);
    } else {
        // 로드가 안됐을 경우 사용자에게 알림
        alert("검색 엔진을 불러오는 중입니다. 1-2초 후 다시 시도해주세요.");
    }
});

/**
 * 특정 div 영역에 지정된 검색어와 타입으로 Google 검색 결과를 렌더링하는 핵심 함수
 * @param {string} elementId - 결과가 표시될 div의 ID
 * @param {string} query - 검색할 키워드
 * @param {boolean} isImageSearch - 이미지 검색을 할지 여부 (true/false)
 */
function renderSearchResults(elementId, query, isImageSearch = false) {
    const targetElement = document.getElementById(elementId);
    if (!targetElement) return;

    // 각 검색 인스턴스를 구별하기 위한 고유한 이름 생성
    const gname = `gse-` + elementId; 
    
    // 검색 결과 표시를 위한 옵션 설정
    const options = {
        div: targetElement,
        tag: 'searchresults-only',
        gname: gname,
    };
    
    // 이미지 검색일 경우, 이미지 검색을 기본으로 설정
    if (isImageSearch) {
        options.defaultToImageSearch = true;
    }
    
    // 1. 지정된 div에 검색 결과 표시 영역을 렌더링
    google.search.cse.element.render(options);

    // 2. 렌더링된 영역을 찾아, 지정된 검색어로 검색을 즉시 실행
    const cseElement = google.search.cse.element.getElement(gname);
    if(cseElement) {
        cseElement.execute(query);
    }
}

// 1. 항공편 검색 실행 함수
function searchFlights(destination) {
    // "현재 위치"는 사용자마다 다르므로, 출발지를 '인천'으로 고정
    const query = `인천에서 ${destination.split(',')[0]} 항공편`;
    renderSearchResults('flights-content', query, false); // 일반 웹 검색
}

// 2. 여행지 사진 검색 실행 함수
function searchPhotos(destination) {
    const query = `${destination.split(',')[0]} 여행`;
    renderSearchResults('photos-content', query, true); // 이미지 검색
}

// 3. 맛집 블로그 검색 실행 함수
function searchBlogs(destination) {
    const query = `${destination} 맛집 블로그`;
    renderSearchResults('blogs-content', query, false); // 일반 웹 검색
}

// 4. 여행 계획 (이미지) 검색 실행 함수
function searchPlansAsImages(destination) {
    const query = `${destination} 3박 4일 여행 코스`;
    renderSearchResults('plan-content', query, true); // 이미지 검색
}
