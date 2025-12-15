// API 키를 입력하세요. (실제 키로 교체해야 합니다)
// 중요: 이 키들은 예시이며, 실제로는 각 사이트에서 발급받은 본인의 키를 사용해야 합니다.
// 이 키들을 외부에 노출하지 않도록 주의하세요.
const GOOGLE_API_KEY = "YOUR_GOOGLE_API_KEY"; // Google API 키
const GOOGLE_CX_ID = "YOUR_GOOGLE_CX_ID";   // Google Programmable Search Engine ID
const UNSPLASH_ACCESS_KEY = "YOUR_UNSPLASH_ACCESS_KEY"; // Unsplash API 키

// HTML 요소들을 가져옵니다.
const randomBtn = document.getElementById('random-btn');
const nextBtn = document.getElementById('next-btn');
const destinationTitle = document.getElementById('destination-title');
const gridContainer = document.getElementById('grid-container');

// 각 콘텐츠 영역
const flightsContent = document.getElementById('flights-content');
const photosContent = document.getElementById('photos-content');
const blogsContent = document.getElementById('blogs-content');
const geminiContent = document.getElementById('gemini-content');

// 1. 랜덤으로 뽑을 세계 여행지 목록 (원하는 만큼 추가/수정 가능)
const travelDestinations = [
    "파리, 프랑스", "교토, 일본", "로마, 이탈리아", "뉴욕, 미국", "시드니, 호주",
    "방콕, 태국", "런던, 영국", "두바이, 아랍에미리트", "바르셀로나, 스페인",
    "싱가포르", "홍콩", "서울, 대한민국", "이스탄불, 튀르키예", "프라하, 체코",
    "빈, 오스트리아", "다낭, 베트남", "발리, 인도네시아", "취리히, 스위스"
];

let selectedDestination = ""; // 선택된 여행지를 저장할 변수

// "랜덤한 여행지 뽑기" 버튼 클릭 이벤트
randomBtn.addEventListener('click', () => {
    // 1-1. 여행지 목록에서 무작위로 하나를 선택
    const randomIndex = Math.floor(Math.random() * travelDestinations.length);
    selectedDestination = travelDestinations[randomIndex];
    
    // 1-2. 선택된 여행지 이름을 화면에 표시
    destinationTitle.innerText = `✨ ${selectedDestination} ✨`;
    destinationTitle.style.display = 'block';
    
    // 1-3. '자세한 정보 보기' 버튼을 표시
    nextBtn.style.display = 'inline-block';

    // 1-4. 이전에 표시되었을 수 있는 결과 그리드는 숨김
    gridContainer.style.display = 'none';
});

// "자세한 정보 보기" 버튼 클릭 이벤트
nextBtn.addEventListener('click', () => {
    // 2. 4분할 그리드를 화면에 표시
    gridContainer.style.display = 'grid';

    // 3. 각 그리드에 맞는 정보를 API를 통해 가져와서 채웁니다.
    getFlightsInfo(selectedDestination);
    getTravelPhotos(selectedDestination);
    getRestaurantBlogs(selectedDestination);
    getGeminiPlan(selectedDestination);
});


// --- API 호출 함수들 ---

// 3-1. 항공편 정보 가져오기 (Google Flights 링크 생성)
function getFlightsInfo(destination) {
    // 사용자의 현재 위치부터 목적지까지의 Google Flights 검색 URL을 동적으로 생성
    // API를 사용하지 않고, 가장 간단하게 구현하는 방법입니다.
    const origin = "ICN"; // 예시: 인천국제공항 코드.
    const url = `https://www.google.com/flights?q=${origin}+to+${destination.split(',')[0]}`;
    flightsContent.innerHTML = `<p>아래 링크에서 ${destination}행 항공편을 검색해보세요!</p><a href="${url}" target="_blank">Google Flights에서 검색하기</a>`;
}

// 3-2. 여행지 사진 4개 가져오기 (Unsplash API 사용)
async function getTravelPhotos(destination) {
    photosContent.innerHTML = '<p>사진을 불러오는 중...</p>';
    const url = `https://api.unsplash.com/search/photos?query=${destination}&per_page=4&client_id=${UNSPLASH_ACCESS_KEY}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        photosContent.innerHTML = ''; // 기존 내용 삭제
        
        if (data.results && data.results.length > 0) {
            data.results.forEach(photo => {
                const img = document.createElement('img');
                img.src = photo.urls.small;
                img.alt = photo.alt_description;
                photosContent.appendChild(img);
            });
        } else {
            photosContent.innerText = '해당 여행지의 사진을 찾을 수 없습니다.';
        }
    } catch (error) {
        console.error('Error fetching photos:', error);
        photosContent.innerText = '사진을 불러오는 데 실패했습니다.';
    }
}

// 3-3. 주변 맛집 블로그 링크 3개 가져오기 (Google Custom Search API 사용)
async function getRestaurantBlogs(destination) {
    blogsContent.innerHTML = '<p>맛집 정보를 불러오는 중...</p>';
    const query = `${destination} 맛집 블로그`;
    const url = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${GOOGLE_CX_ID}&q=${encodeURIComponent(query)}&num=3`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        blogsContent.innerHTML = ''; // 기존 내용 삭제

        if (data.items && data.items.length > 0) {
            data.items.forEach(item => {
                const link = document.createElement('a');
                link.href = item.link;
                link.innerText = item.title;
                link.target = '_blank'; // 새 탭에서 열기
                blogsContent.appendChild(link);
            });
        } else {
            blogsContent.innerText = '관련 맛집 블로그를 찾을 수 없습니다.';
        }
    } catch (error) {
        console.error('Error fetching blogs:', error);
        blogsContent.innerText = '맛집 정보를 불러오는 데 실패했습니다.';
    }
}

// 3-4. Gemini 추천 여행 계획 가져오기 (Google AI - Gemini API 사용)
async function getGeminiPlan(destination) {
    geminiContent.innerText = '여행 계획을 불러오는 중...';
    // Gemini API는 Google AI Studio에서 API 키를 받아야 합니다.
    const GEMINI_API_KEY = GOOGLE_API_KEY; // Google API 키를 사용합니다.
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;
    
    // Gemini에게 보낼 질문(프롬프트)
    const prompt = `'${destination}' 여행을 위한 3박 4일 효율적인 여행 계획을 짜줘. 매일 오전, 오후, 저녁으로 나누어서 구체적인 활동과 장소를 추천해줘.`;

    const requestBody = {
        contents: [{
            parts: [{
                text: prompt
            }]
        }]
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        const data = await response.json();
        
        // Gemini의 답변 텍스트를 추출
        const geminiResponseText = data.candidates[0].content.parts[0].text;
        geminiContent.innerText = geminiResponseText;

    } catch (error) {
        console.error('Error fetching Gemini plan:', error);
        geminiContent.innerText = 'Gemini 여행 계획을 불러오는 데 실패했습니다. API 키를 확인해주세요.';
    }
}
