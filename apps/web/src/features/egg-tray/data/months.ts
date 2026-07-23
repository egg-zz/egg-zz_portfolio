import type { EggEntry, MonthData } from "../model/types";

/* ─── July 2026 ─── */

const julyEggs: EggEntry[] = [
  { day: 1,  date: "7월 1일",  type: "learning", title: "TanStack Query 심화 학습",
    problem: "비동기 상태 관리에서 서버 상태와 클라이언트 상태를 혼용하고 있었다.",
    decision: "서버 상태는 TanStack Query로 완전히 이관하고, UI 상태만 useState로 관리하도록 분리하기로 했다.",
    solution: "staleTime, gcTime 설정을 도메인별로 다르게 적용하고, optimistic update 패턴을 도입했다.",
    learned: "캐싱 전략이 UX에 직접 영향을 준다. invalidation 타이밍을 잘못 설정하면 사용자가 오래된 데이터를 보게 된다." },

  { day: 2,  date: "7월 2일",  type: "feature",  title: "Interview Exit Flow 수정",
    problem: "router.back()을 사용하니 피드백 질문 페이지에서 저장 후 성장 기록 에디터로 되돌아가는 문제가 발생했다.",
    decision: "브라우저 히스토리와 서비스의 논리적 이전 페이지가 항상 같지는 않다고 판단했다.",
    solution: "명시적인 경로 이동 방식으로 수정하고, 저장 성공 이후에만 이동하도록 처리했다.",
    learned: "페이지 이동은 단순 구현보다 사용자의 실제 흐름을 기준으로 설계해야 한다." },

  { day: 3,  date: "7월 3일",  type: "feature",  title: "녹음 STT 흐름 구현",
    problem: "면접 답변 녹음 중 사용자가 실수로 페이지를 이탈하면 녹음 데이터가 사라졌다.",
    decision: "beforeunload 이벤트로 경고를 표시하고, 세션 스토리지에 임시 저장하는 방식을 채택했다.",
    solution: "useBeforeUnload 커스텀 훅을 만들고, 녹음 상태일 때만 활성화되도록 구성했다.",
    learned: "사용자 실수를 방지하는 것이 기능 완성도만큼 중요하다." },

  { day: 4,  date: "7월 4일",  type: "bugfix",   title: "PDF 리포트 한글 폰트 깨짐 수정",
    problem: "한글 폰트가 포함된 PDF 생성 시 일부 글자가 깨지는 문제가 발생했다.",
    decision: "jsPDF의 기본 폰트는 한글을 지원하지 않으므로 Noto Sans KR을 base64로 임베딩하기로 결정했다.",
    solution: "폰트 파일을 base64로 인코딩하여 addFileToVFS로 등록하고, 폰트 크기별로 렌더링 테스트를 진행했다.",
    learned: "브라우저에서 잘 보이는 폰트가 PDF에서 깨질 수 있다. 라이브러리별 폰트 지원을 먼저 확인해야 한다." },

  { day: 5,  date: "7월 5일",  type: "learning", title: "CSS Container Query 탐구",
    problem: "컴포넌트가 부모 너비에 따라 레이아웃을 바꿔야 하는데, 미디어 쿼리만으로는 뷰포트 크기에만 반응했다.",
    decision: "Container Query를 사용하면 컴포넌트 자체의 크기를 기준으로 스타일을 적용할 수 있다고 판단했다.",
    solution: "Tailwind v4의 @container 유틸리티를 실험적으로 적용하고, 재사용 가능한 카드 컴포넌트에 테스트했다.",
    learned: "반응형 디자인은 뷰포트가 아닌 컴포넌트 맥락을 기준으로 생각해야 진정한 재사용성이 생긴다." },

  { day: 6,  date: "7월 6일",  type: "deployed", title: "면접 AI v1.2 배포",
    problem: "v1.1에서 사용자 피드백 기록이 면접 세션과 분리되어 추적이 어려웠다.",
    decision: "피드백을 세션 ID로 연결하고, 타임라인 뷰를 추가하여 한눈에 성장 과정을 확인할 수 있도록 했다.",
    solution: "Vercel 자동 배포 파이프라인을 통해 배포하고, Sentry로 에러 모니터링을 설정했다.",
    learned: "배포 후 첫 30분이 가장 중요하다. 실제 사용자 흐름을 모니터링하면서 미처 발견 못한 엣지케이스를 잡을 수 있다." },

  { day: 7,  date: "7월 7일",  type: "feature",  title: "공고 URL 자동 추출 기능",
    problem: "사용자가 채용 공고 URL을 붙여넣으면 직접 내용을 복사해야 했다.",
    decision: "서버에서 URL을 크롤링하여 주요 내용을 자동 추출하는 방식을 채택했다.",
    solution: "Cheerio를 이용한 서버사이드 스크래핑을 구현하고, 사이트별 선택자 매핑 테이블을 작성했다.",
    learned: "공고 사이트마다 HTML 구조가 달라 범용적인 파서를 만들기 어렵다. AI를 통한 구조화가 더 효율적이다." },

  { day: 8,  date: "7월 8일",  type: "bugfix",   title: "분석 진행률 동기화 버그",
    problem: "영상 분석 진행률이 서버 상태와 UI 상태가 어긋나 완료 후에도 로딩이 표시되는 문제가 있었다.",
    decision: "polling 방식이 아닌 WebSocket으로 전환하여 실시간 상태를 수신하도록 결정했다.",
    solution: "useWebSocket 훅을 구현하고, 연결 끊김 시 자동 재연결 로직과 메시지 큐를 추가했다.",
    learned: "서버 상태를 UI가 추측해서는 안 된다. 상태의 진실의 원천은 항상 서버여야 한다." },

  { day: 9,  date: "7월 9일",  type: "feature",  title: "다국어 지원 i18n 구현",
    problem: "딥페이크 탐지 서비스를 해외 사용자도 사용하게 되면서 영어 지원이 필요해졌다.",
    decision: "next-intl을 도입하고, 언어팩을 JSON으로 관리하는 방식을 채택했다.",
    solution: "한국어/영어 2개 언어를 지원하고, 브라우저 언어 설정에 따라 자동 감지하도록 구현했다.",
    learned: "번역 키 네이밍이 나중에 관리 비용을 결정한다. 초기에 도메인별 네임스페이스를 잘 설계해야 한다." },

  { day: 10, date: "7월 10일", type: "failure",  title: "Canvas API 이미지 렌더링 실패",
    problem: "분석 결과를 Canvas에 오버레이로 그리는 기능을 구현했는데, 크로스 오리진 이미지에서 CORS 에러가 발생했다.",
    decision: "이미지를 서버를 통해 프록시하는 방식과 img 태그 + CSS로 대체하는 방식을 비교했다.",
    solution: "단기적으로 CSS 기반 오버레이로 교체하고, 장기적으로 서버 프록시 방식을 별도 스프린트로 계획했다.",
    learned: "완벽한 구현보다 당장 동작하는 MVP가 우선이다. 기술적 부채를 인식하되 관리하는 것이 중요하다." },

  { day: 11, date: "7월 11일", type: "learning", title: "Zustand 슬라이스 패턴 적용",
    problem: "전역 상태가 하나의 스토어에 몰려 있어 불필요한 리렌더링이 발생하고 있었다.",
    decision: "도메인별로 스토어를 분리하고, zustand의 slice 패턴을 적용하기로 했다.",
    solution: "auth, interview, report 3개의 슬라이스로 분리하고, 각 슬라이스에 selector를 명시적으로 정의했다.",
    learned: "상태 구조는 데이터 모양이 아닌 변경 단위를 기준으로 설계해야 한다." },

  { day: 12, date: "7월 12일", type: "feature",  title: "면접 평가 리포트 시각화",
    problem: "텍스트 기반 피드백만으로는 사용자가 자신의 약점을 한눈에 파악하기 어려웠다.",
    decision: "레이더 차트로 6개 역량 영역을 시각화하고, 항목별 상세 피드백을 accordion으로 보여주기로 했다.",
    solution: "Recharts의 RadarChart를 커스터마이징하고, 애니메이션 진입 효과를 추가했다.",
    learned: "데이터 시각화는 정보를 보여주는 것이 아니라 인사이트를 전달하는 것이다." },

  { day: 13, date: "7월 13일", type: "feature",  title: "딥페이크 분석 중단 및 재시도",
    problem: "긴 영상 분석 중 오류 발생 시 처음부터 다시 업로드해야 하는 불편함이 있었다.",
    decision: "분석 작업을 서버에서 job으로 관리하고, job ID를 저장해 재시도가 가능하도록 설계했다.",
    solution: "Redis로 작업 큐를 구성하고, 실패 시 자동 3회 재시도 후 사용자에게 알림을 보내도록 했다.",
    learned: "사용자 관점에서 '다시 시도'는 기능이 아니라 신뢰다." },

  { day: 14, date: "7월 14일", type: "bugfix",   title: "모바일 터치 스크롤 충돌",
    problem: "드래그로 조정하는 오디오 타임라인이 모바일에서 페이지 스크롤과 충돌했다.",
    decision: "touch-action CSS 속성으로 터치 이벤트 전파를 제어하는 방식을 선택했다.",
    solution: "pointerEvents API로 마이그레이션하고, 수평/수직 드래그를 의도에 따라 구분했다.",
    learned: "모바일 인터랙션은 마우스 이벤트와 별개로 처음부터 설계해야 한다." },

  { day: 15, date: "7월 15일", type: "deployed", title: "딥페이크 서비스 v2.0 출시",
    problem: "이전 버전은 이미지만 분석 가능했고, 처리 속도가 느리다는 피드백이 있었다.",
    decision: "영상 지원을 추가하고, 분석 결과 리포트를 PDF로 내보낼 수 있게 하기로 했다.",
    solution: "청크 업로드, WebSocket 진행률, PDF 생성까지 전체 파이프라인을 리팩토링했다.",
    learned: "큰 기능 추가보다 기존 흐름의 신뢰성을 높이는 것이 사용자 만족도에 더 크게 기여했다." },

  { day: 16, date: "7월 16일", type: "feature",  title: "챗봇 API 연동",
    problem: "분석 결과에 대해 사용자가 추가 질문을 하고 싶어 했지만 정적인 FAQ만 있었다.",
    decision: "Claude API를 연동하고, 분석 리포트를 컨텍스트로 제공하여 맥락 있는 답변을 생성하기로 했다.",
    solution: "Streaming response를 구현하여 타이핑 효과를 주고, 대화 히스토리를 세션에 유지했다.",
    learned: "AI 응답에 컨텍스트를 잘 주입하면 범용 챗봇보다 훨씬 유용한 전문 도우미가 된다." },

  { day: 17, date: "7월 17일", type: "learning", title: "접근성 기초 점검",
    problem: "스크린 리더로 서비스를 테스트해보니 이미지 alt, 버튼 레이블, 포커스 순서 등이 엉망이었다.",
    decision: "WCAG 2.1 AA 기준을 최소 기준으로 설정하고, 체크리스트를 기반으로 점검하기로 했다.",
    solution: "axe-core 플러그인으로 자동 검사를 추가하고, 수동으로 키보드 내비게이션을 전체 흐름에서 테스트했다.",
    learned: "접근성은 나중에 추가하는 것이 아니라 처음부터 설계해야 한다. 리팩토링 비용이 훨씬 크다." },

  { day: 18, date: "7월 18일", type: "feature",  title: "성장 기록 타임라인 뷰",
    problem: "면접 세션이 쌓일수록 이전 기록을 찾기 어렵고, 성장 흐름을 파악하기 힘들었다.",
    decision: "날짜 기반 타임라인으로 모든 세션을 한눈에 볼 수 있는 뷰를 추가하기로 했다.",
    solution: "무한 스크롤과 날짜 필터를 구현하고, 세션별 핵심 통계를 카드로 요약했다.",
    learned: "기록은 쌓이는 것이고, UX는 그 기록을 탐색하기 쉽게 만드는 것이다." },

  { day: 19, date: "7월 19일", type: "bugfix",   title: "토큰 만료 자동 갱신 버그",
    problem: "Access token 만료 시 refresh가 실패하고 사용자가 갑자기 로그아웃되는 문제가 있었다.",
    decision: "Axios interceptor에서 refresh를 시도하되, 동시에 여러 요청이 만료될 때 중복 refresh를 방지해야 한다고 판단했다.",
    solution: "Promise queue 패턴을 구현하여 첫 번째 요청이 refresh하는 동안 나머지는 대기하도록 했다.",
    learned: "인증 로직은 단일 요청이 아닌 동시 요청 시나리오를 항상 고려해야 한다." },

  { day: 20, date: "7월 20일", type: "feature",  title: "비동기 코멘트 협업 기능",
    problem: "팀 면접 준비 시 멘토가 면접 답변을 실시간으로 피드백하고 싶어 했다.",
    decision: "WebRTC로 화면 공유와 채팅을 결합하는 방식을 검토했지만, 복잡도 대비 효과가 낮다고 판단했다.",
    solution: "비동기 코멘트 시스템을 구현하여 특정 답변 구간에 타임스탬프 기반 피드백을 남길 수 있게 했다.",
    learned: "실시간이 항상 최선이 아니다. 비동기 협업이 더 적합한 맥락이 있다." },

  { day: 21, date: "7월 21일", type: "failure",  title: "무한 리렌더링 디버깅",
    problem: "useEffect 의존성 배열에 객체를 넣었다가 매 렌더마다 새 참조가 생성되어 무한 루프가 발생했다.",
    decision: "useMemo와 useCallback으로 참조를 안정화하는 방식과 의존성 배열을 원시값으로 바꾸는 방식을 비교했다.",
    solution: "의존성을 원시값으로 변환하고, 불필요한 useEffect를 이벤트 핸들러로 교체했다.",
    learned: "useEffect는 마지막 수단이다. 대부분의 경우 이벤트 핸들러나 파생 상태로 해결 가능하다." },

  { day: 22, date: "7월 22일", type: "feature",  title: "키워드 하이라이팅 기능",
    problem: "채용 공고의 핵심 키워드와 내 답변의 연관성을 파악하기 어려웠다.",
    decision: "AI로 공고에서 키워드를 추출하고, 내 답변에서 같은 키워드를 하이라이팅하기로 했다.",
    solution: "mark 태그와 CSS custom highlight API를 조합하여 성능을 유지하면서 하이라이팅을 구현했다.",
    learned: "텍스트 처리는 단순해 보여도 유니코드, 공백, 대소문자 등 엣지케이스가 많다." },

  { day: 23, date: "7월 23일", type: "feature",  title: "Egg Tray 포트폴리오 설계",
    problem: "개인 포트폴리오가 일반적인 프로젝트 나열 형식이라 기억에 남지 않았다.",
    decision: "계란판 컨셉으로 30일간의 개발 기록을 시각화하고, 각 계란이 하루의 엔지니어링 사고를 담도록 설계했다.",
    solution: "React + Tailwind + Motion으로 인터랙티브한 포트폴리오를 구현했다.",
    learned: "포트폴리오는 작업 결과를 나열하는 것이 아니라 어떻게 생각하는 개발자인지 보여주는 것이다." },

  { day: 24, date: "7월 24일", type: "planned", title: "성능 최적화 — 이미지 레이지 로딩",
    problem: "", decision: "", solution: "", learned: "" },
  { day: 25, date: "7월 25일", type: "planned", title: "E2E 테스트 작성",
    problem: "", decision: "", solution: "", learned: "" },
  { day: 26, date: "7월 26일", type: "planned", title: "Storybook 컴포넌트 문서화",
    problem: "", decision: "", solution: "", learned: "" },
  { day: 27, date: "7월 27일", type: "planned", title: "CI/CD 파이프라인 개선",
    problem: "", decision: "", solution: "", learned: "" },
  { day: 28, date: "7월 28일", type: "planned", title: "API 에러 처리 통일",
    problem: "", decision: "", solution: "", learned: "" },
  { day: 29, date: "7월 29일", type: "planned", title: "다크 모드 지원",
    problem: "", decision: "", solution: "", learned: "" },
  { day: 30, date: "7월 30일", type: "planned", title: "최종 배포 및 회고",
    problem: "", decision: "", solution: "", learned: "" },
];

/* ─── June 2026 ─── */

const juneEggs: EggEntry[] = [
  { day: 1,  date: "6월 1일",  type: "learning", title: "Next.js App Router 전환 학습",
    problem: "Pages Router 기반 프로젝트를 App Router로 마이그레이션해야 했는데 레이아웃 구조가 완전히 달랐다.",
    decision: "전체 마이그레이션보다 신규 기능부터 App Router로 작성하고 점진적으로 교체하는 방식을 선택했다.",
    solution: "공식 문서의 마이그레이션 가이드를 따라 라우트 그룹과 병렬 라우트를 실험적으로 적용했다.",
    learned: "마이그레이션은 전체를 한 번에 바꾸려 할 때 실패 확률이 높다. 점진적 전환이 안전하다." },

  { day: 2,  date: "6월 2일",  type: "feature",  title: "드래그 앤 드롭 파일 업로드",
    problem: "파일 업로드 UI가 버튼 클릭만 지원하여 UX가 불편하다는 피드백을 받았다.",
    decision: "HTML5 드래그 이벤트를 직접 구현하는 방식과 react-dropzone 라이브러리를 비교했다.",
    solution: "react-dropzone을 도입하고 드래그 중 시각적 피드백(테두리 강조, 오버레이)을 추가했다.",
    learned: "라이브러리를 쓰더라도 내부 동작을 이해해야 커스터마이징할 수 있다." },

  { day: 3,  date: "6월 3일",  type: "bugfix",   title: "Safari 오디오 자동재생 이슈",
    problem: "Chrome에서는 정상 동작하던 면접 안내 오디오가 Safari에서 재생되지 않았다.",
    decision: "Safari는 사용자 인터랙션 없이 자동재생을 차단한다는 정책을 확인하고 대응 방향을 잡았다.",
    solution: "사용자가 '시작' 버튼을 클릭할 때 AudioContext를 resume하는 방식으로 변경했다.",
    learned: "브라우저별 정책 차이는 주요 기능에서 반드시 크로스브라우저 테스트가 필요하다." },

  { day: 4,  date: "6월 4일",  type: "feature",  title: "실시간 타이머 컴포넌트",
    problem: "면접 중 남은 시간을 표시하는 타이머가 탭 전환 시 멈추는 문제가 있었다.",
    decision: "setInterval 대신 Date.now()를 기준으로 실제 경과 시간을 계산하는 방식을 채택했다.",
    solution: "requestAnimationFrame과 startTime 참조로 탭 비활성화에도 정확한 시간을 유지했다.",
    learned: "브라우저 타이머는 신뢰할 수 없다. 시간은 항상 벽시계(wall clock) 기준으로 계산해야 한다." },

  { day: 5,  date: "6월 5일",  type: "learning", title: "Vitest + Testing Library 도입",
    problem: "테스트가 전혀 없는 상태에서 리팩토링을 하려니 불안감이 컸다.",
    decision: "Jest 대신 Vitest를 선택하고, 유닛 테스트보다 사용자 행동 중심의 통합 테스트에 집중하기로 했다.",
    solution: "주요 인터랙션 경로(로그인 → 면접 시작 → 종료)를 Testing Library로 테스트 작성했다.",
    learned: "테스트는 구현이 아닌 행동을 검증해야 한다. 내부 상태보다 사용자가 보는 결과를 테스트하자." },

  { day: 6,  date: "6월 6일",  type: "failure",  title: "WebRTC 화상 면접 기능 시도",
    problem: "실시간 화상 면접 기능을 추가하려고 WebRTC를 직접 구현하려 했다.",
    decision: "STUN/TURN 서버 설정, NAT traversal, 연결 상태 관리가 예상보다 훨씬 복잡했다.",
    solution: "자체 구현을 포기하고 Daily.co SDK로 전환했다. 기능 완성까지 시간이 단축됐다.",
    learned: "모든 것을 직접 만들려는 욕심이 오히려 완성도를 낮춘다. 좋은 추상화를 활용하는 것도 역량이다." },

  { day: 7,  date: "6월 7일",  type: "feature",  title: "이메일 인증 플로우",
    problem: "가입 직후 이메일 미인증 사용자가 서비스를 사용하다 막히는 혼란 상황이 발생했다.",
    decision: "가입 즉시 인증 페이지로 리다이렉트하고, 인증 전까지 핵심 기능을 soft-lock하기로 결정했다.",
    solution: "미들웨어에서 인증 상태를 체크하고, 토스트 메시지로 이유를 안내하는 방식을 구현했다.",
    learned: "보안 장벽을 추가할 때는 사용자에게 이유를 명확하게 설명해야 이탈을 줄일 수 있다." },

  { day: 8,  date: "6월 8일",  type: "learning", title: "Tailwind v4 새 기능 탐구",
    problem: "CSS 변수 기반 테마 시스템을 기존 Tailwind config로 관리하기가 번거로웠다.",
    decision: "Tailwind v4의 @theme 디렉티브와 CSS-first 설정 방식을 실험적으로 도입해보기로 했다.",
    solution: "theme.css에 @theme inline으로 토큰을 정의하고 JavaScript config를 제거했다.",
    learned: "도구를 업그레이드하기 전에 팀의 학습 비용과 이점을 함께 고려해야 한다." },

  { day: 9,  date: "6월 9일",  type: "bugfix",   title: "무한 스크롤 중복 요청",
    problem: "빠르게 스크롤할 때 같은 페이지 번호로 API 요청이 중복 발생했다.",
    decision: "IntersectionObserver 트리거와 요청 상태를 동기화하는 방식으로 해결하기로 했다.",
    solution: "isFetching 상태를 관찰자 콜백에서 확인하여 중복 요청을 방어했다.",
    learned: "비동기 이벤트와 상태는 항상 경쟁 조건(race condition)을 고려해야 한다." },

  { day: 10, date: "6월 10일", type: "feature",  title: "사용자 온보딩 투어",
    problem: "신규 사용자가 주요 기능을 파악하는 데 너무 오래 걸린다는 피드백이 있었다.",
    decision: "전체 기능 설명보다 핵심 3단계만 안내하는 가벼운 투어를 도입하기로 했다.",
    solution: "driver.js로 단계별 하이라이트 투어를 구현하고, 처음 로그인 시에만 자동으로 시작하도록 했다.",
    learned: "온보딩은 기능을 가르치는 것이 아니라 사용자가 첫 성공 경험을 빠르게 얻도록 돕는 것이다." },

  { day: 11, date: "6월 11일", type: "feature",  title: "답변 히스토리 검색",
    problem: "저장된 면접 답변이 많아질수록 원하는 답변을 찾기 어려웠다.",
    decision: "서버사이드 검색 대신 클라이언트에서 Fuse.js로 퍼지 검색을 구현하기로 했다.",
    solution: "키워드, 날짜, 질문 유형으로 필터링하는 복합 검색 UI를 구현했다.",
    learned: "검색 기능은 데이터 양이 적을 때 미리 설계하면 나중에 서버 이관이 수월하다." },

  { day: 12, date: "6월 12일", type: "deployed", title: "딥페이크 서비스 v1.5 배포",
    problem: "v1.4에서 다중 파일 업로드가 지원되지 않아 사용자 불편이 있었다.",
    decision: "배치 업로드 + 진행률 표시를 추가하고 UI를 전반적으로 개선했다.",
    solution: "Promise.allSettled로 병렬 업로드를 구현하고, 각 파일별 상태를 독립적으로 표시했다.",
    learned: "배치 처리는 성공과 실패를 독립적으로 처리해야 한다. 하나 실패가 전체를 막으면 안 된다." },

  { day: 13, date: "6월 13일", type: "learning", title: "React Compiler 실험",
    problem: "useMemo와 useCallback을 수동으로 최적화하는 작업이 반복적이고 실수가 잦았다.",
    decision: "React Compiler(Forget)의 베타 버전을 실험적으로 도입하여 자동 메모이제이션을 테스트했다.",
    solution: "컴파일러가 자동으로 최적화한 코드와 수동 최적화 코드의 렌더링 횟수를 비교했다.",
    learned: "도구가 자동화해주더라도 원리를 이해하지 않으면 예외 케이스를 디버깅할 수 없다." },

  { day: 14, date: "6월 14일", type: "bugfix",   title: "PDF 다운로드 중 메모리 누수",
    problem: "대용량 PDF 생성 시 브라우저 메모리가 급격히 증가하고 탭이 크래시되는 문제가 발생했다.",
    decision: "PDF 생성 후 object URL을 revoke하지 않아 메모리가 해제되지 않는 것이 원인이었다.",
    solution: "URL.revokeObjectURL을 다운로드 트리거 후 setTimeout으로 지연 호출하도록 수정했다.",
    learned: "브라우저 리소스는 명시적으로 해제해야 한다. 가비지 컬렉터를 믿지 말자." },

  { day: 15, date: "6월 15일", type: "feature",  title: "알림 센터 구현",
    problem: "면접 세션 완료, 피드백 도착 등의 이벤트를 사용자가 놓치는 경우가 많았다.",
    decision: "실시간 WebSocket 알림과 인앱 알림 센터를 결합하는 방식을 채택했다.",
    solution: "Notification API로 브라우저 알림을 보내고, 인앱에서는 뱃지와 알림 패널을 구현했다.",
    learned: "알림은 너무 많으면 무시된다. 중요도 기반 필터링이 사용자 경험의 핵심이다." },

  { day: 16, date: "6월 16일", type: "failure",  title: "서버사이드 렌더링 하이드레이션 오류",
    problem: "SSR로 렌더링된 마크업과 클라이언트 하이드레이션 결과가 달라 콘솔 오류가 발생했다.",
    decision: "서버/클라이언트 환경에서 다르게 동작하는 Date.now() 호출이 원인이었다.",
    solution: "useEffect 안으로 날짜 초기화를 이동하고, 서버 렌더링 시 안정적인 초기값을 사용했다.",
    learned: "SSR 환경에서는 서버와 클라이언트의 초기 렌더링 결과가 같아야 한다는 제약을 항상 염두에 두어야 한다." },

  { day: 17, date: "6월 17일", type: "learning", title: "OpenTelemetry 프론트엔드 트레이싱",
    problem: "사용자 행동 로그가 없어 에러 재현이 어렵고 성능 병목을 찾기 힘들었다.",
    decision: "분산 트레이싱 표준인 OpenTelemetry를 프론트엔드에 도입하여 관찰 가능성을 높이기로 했다.",
    solution: "@opentelemetry/sdk-web을 설정하고 핵심 사용자 여정에 span을 추가했다.",
    learned: "관찰 가능성은 버그가 생긴 후가 아니라 서비스가 작을 때 미리 심어야 한다." },

  { day: 18, date: "6월 18일", type: "feature",  title: "답변 음성 파형 시각화",
    problem: "녹음 중인지 아닌지 사용자가 시각적으로 확인하기 어려웠다.",
    decision: "Web Audio API의 AnalyserNode로 실시간 파형을 그려 녹음 상태를 직관적으로 표현하기로 했다.",
    solution: "requestAnimationFrame으로 Canvas에 파형을 연속 렌더링하고, 무음 구간에는 점선을 표시했다.",
    learned: "상태를 색상 하나로 표현하는 것보다 움직임과 형태를 함께 활용하면 사용자 인지가 빠르다." },

  { day: 19, date: "6월 19일", type: "bugfix",   title: "공유 링크 OG 태그 누락",
    problem: "카카오톡에서 면접 리포트 공유 링크를 보내면 미리보기가 뜨지 않았다.",
    decision: "OG 태그 생성이 서버에서 되지 않고 클라이언트 렌더링에 의존하고 있었다.",
    solution: "공유용 URL에 대해 서버에서 메타 태그를 동적으로 생성하도록 API 라우트를 추가했다.",
    learned: "크롤러는 JavaScript를 실행하지 않는다. 메타 태그는 반드시 서버에서 렌더링해야 한다." },

  { day: 20, date: "6월 20일", type: "deployed", title: "면접 AI v1.0 첫 배포",
    problem: "처음으로 외부 사용자에게 오픈하는 배포라 안정성이 최우선이었다.",
    decision: "기능 완성보다 핵심 플로우의 안정성을 검증하고 모니터링 체계를 갖추는 것에 집중했다.",
    solution: "Vercel + Sentry + Uptime Robot을 연결하고, 30분 간격으로 헬스체크를 설정했다.",
    learned: "첫 배포는 기능이 아니라 신뢰를 쌓는 과정이다." },

  { day: 21, date: "6월 21일", type: "planned", title: "사용자 인터뷰 준비",
    problem: "", decision: "", solution: "", learned: "" },
  { day: 22, date: "6월 22일", type: "planned", title: "성능 프로파일링",
    problem: "", decision: "", solution: "", learned: "" },
  { day: 23, date: "6월 23일", type: "planned", title: "컴포넌트 리팩토링",
    problem: "", decision: "", solution: "", learned: "" },
  { day: 24, date: "6월 24일", type: "planned", title: "API 문서화",
    problem: "", decision: "", solution: "", learned: "" },
  { day: 25, date: "6월 25일", type: "planned", title: "에러 바운더리 추가",
    problem: "", decision: "", solution: "", learned: "" },
  { day: 26, date: "6월 26일", type: "planned", title: "테스트 커버리지 확대",
    problem: "", decision: "", solution: "", learned: "" },
  { day: 27, date: "6월 27일", type: "planned", title: "디자인 시스템 정리",
    problem: "", decision: "", solution: "", learned: "" },
  { day: 28, date: "6월 28일", type: "planned", title: "보안 취약점 점검",
    problem: "", decision: "", solution: "", learned: "" },
  { day: 29, date: "6월 29일", type: "planned", title: "최종 QA",
    problem: "", decision: "", solution: "", learned: "" },
  { day: 30, date: "6월 30일", type: "planned", title: "스프린트 회고",
    problem: "", decision: "", solution: "", learned: "" },
];

/* ─── August 2026 ─── */

const augustEggs: EggEntry[] = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  date: `8월 ${i + 1}일`,
  type: "planned" as const,
  title: [
    "포트폴리오 SEO 최적화", "스켈레톤 로딩 UI", "다크 모드 완성", "에러 페이지 개선",
    "Lighthouse 100점 도전", "CI 빌드 속도 개선", "컴포넌트 스토리북", "E2E 테스트 강화",
    "번들 사이즈 최적화", "이미지 최적화 파이프라인", "API 레이어 타입 정의", "소셜 로그인 추가",
    "대시보드 차트 개선", "알림 설정 기능", "결제 연동", "사용자 설정 페이지",
    "데이터 내보내기", "CSV 가져오기", "멘토 매칭 기능", "그룹 면접 모드",
    "AI 질문 추천", "답변 탬플릿", "배지 시스템", "레퍼럴 프로그램",
    "프리미엄 플랜", "팀 계정", "관리자 대시보드", "사용량 분석", "약관 업데이트", "v2.0 출시",
  ][i],
  problem: "", decision: "", solution: "", learned: "",
}));

/* ─── Months ─── */

export const MONTHS: MonthData[] = [
  { key: "june2026",   label: "June 2026",   korean: "2026년 6월", sprint: "5번째 계란판",  eggs: juneEggs },
  { key: "july2026",   label: "July 2026",   korean: "2026년 7월", sprint: "6번째 계란판",  eggs: julyEggs },
  { key: "august2026", label: "August 2026", korean: "2026년 8월", sprint: "7번째 계란판",  eggs: augustEggs },
];

export const CURRENT_MONTH_INDEX = 1; // July 2026
