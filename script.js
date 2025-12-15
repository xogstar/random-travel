// HTML 요소들을 가져옵니다.
const randomBtn = document.getElementById('random-btn');
const nextBtn = document.getElementById('next-btn');
const destinationTitle = document.getElementById('destination-title');
const gridContainer = document.getElementById('grid-container');

// 중요: YOUR_CX_ID를 본인의 Google CSE ID로 교체하세요.
// 이 ID는 iframe 방식에서는 사용되지 않지만, 1번, 3번 칸을 위해 필요합니다.
const CSE_ID = "YOUR_CX_ID";

const travelDestinations = [
  "도쿄, 일본", "오사카, 일본", "후쿠오카, 일본", "삿포로, 일본", "교토, 일본",
  "베이징, 중국", "상하이, 중국", "시안, 중국", "청두, 중국", "항저우, 중국",
  "타이베이, 대만", "가오슝, 대만", "홍콩, 중국", "마카오, 중국", "방콕, 태국", 
  "치앙마이, 태국", "푸껫, 태국", "파타야, 태국", "하노이, 베트남", "다낭, 베트남", 
  "호찌민, 베트남", "나트랑, 베트남", "싱가포르", "쿠알라룸푸르, 말레이시아", "코타키나발루, 말레이시아",
  "마닐라, 필리핀", "세부, 필리핀", "보라카이, 필리핀", "발리, 인도네시아", "자카르타, 인도네시아",
  "뉴델리, 인도", "뭄바이, 인도", "두바이, 아랍에미리트", "울란바토르, 몽골",
  "타슈켄트, 우즈베키스탄", "알마티, 카자흐스탄", "파리, 프랑스", "니스, 프랑스", "리옹, 프랑스",
  "마르세유, 프랑스", "런던, 영국", "에든버러, 영국", "맨체스터, 영국", "리버풀, 영국",
  "로마, 이탈리아", "피렌체, 이탈리아", "베네치아, 이탈리아", "밀라노, 이탈리아", "나폴리, 이탈리아",
  "바르셀로나, 스페인", "마드리드, 스페인", "세비야, 스페인", "그라나다, 스페인",
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

randomBtn.addEventListener('click', () => {
    const randomIndex = Math.floor(Math.random() * travelDestinations.length);
    selectedDestination = travelDestinations[randomIndex];
    destinationTitle.innerText = `✨ ${selectedDestination} ✨`;
    destinationTitle.style.display = 'block';
    nextBtn.style.display = 'inline-block';
    gridContainer.style.display = 'none';
});

nextBtn.addEventListener('click', () => {
    gridContainer.style.display = 'grid';

    // 1번, 3번 칸은 기존 CSE 렌더링 방식 사용
    searchFlights(selectedDestination);
    searchBlogs(selectedDestination);
    
    // 2번, 4번 칸은 충돌을 피하기 위해 iframe 격리 방식 사용
    searchPhotosInIframe(selectedDestination);
    searchPlansInIframe(selectedDestination);
});

// 1번, 3번 칸을 위한 웹 검색 결과 렌더링 함수
function renderSearchResults(elementId, query) {
    if (!window.google || !google.search.cse || !google.search.cse.element) return;
    const targetElement = document.getElementById(elementId);
    if (!targetElement) return;
    targetElement.innerHTML = '';
    const gname = `gse-${elementId}`; 
    const options = { div: targetElement, tag: 'searchresults-only', gname: gname };
    google.search.cse.element.render(options);
    const cseElement = google.search.cse.element.getElement(gname);
    if (cseElement) cseElement.execute(query);
}

// 2번 칸을 위한 이미지 전용 iframe 생성 함수
function searchPhotosInIframe(destination) {
    const photosContent = document.getElementById('photos-content');
    if (!photosContent) return;
    const query = `${destination.split(',')[0]} 여행`;
    // &tbm=isch 파라미터가 '이미지 검색'을 강제합니다.
    const url = `https://www.google.com/search?q=${encodeURIComponent(query)}&tbm=isch&igu=1`;
    photosContent.innerHTML = `<iframe src="${url}" class="search-iframe"></iframe>`;
}

// 4번 칸을 위한 여행 계획 전용 iframe 생성 함수
function searchPlansInIframe(destination) {
    const planContent = document.getElementById('plan-content');
    if (!planContent) return;
    const query = `${destination} 3박 4일 추천 여행 코스`;
    const url = `https://www.google.com/search?q=${encodeURIComponent(query)}&igu=1`;
    planContent.innerHTML = `<iframe src="${url}" class="search-iframe"></iframe>`;
}

function searchFlights(destination) {
    const query = `인천에서 ${destination.split(',')[0]} 항공편`;
    renderSearchResults('flights-content', query);
}

function searchBlogs(destination) {
    const query = `${destination} 맛집 블로그`;
    renderSearchResults('blogs-content', query);
}
