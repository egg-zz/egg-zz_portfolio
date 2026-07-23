import type { LabItem } from "../model/types";

/* ─── Lab Items ─── */
export const labItems: LabItem[] = [
  {
    title: "GitHub 잔디 계란판 변환기",
    desc: "GitHub 기여 기록을 계란판 형식으로 시각화하는 작은 도구",
    intent: "GitHub API 데이터를 어떻게 다른 시각 언어로 재해석할 수 있는지 실험하고 싶었다.",
    aiUsed: "잔디 데이터를 계란 상태로 분류하는 매핑 로직 초안 생성",
    myJudgement: "AI가 제안한 분류 기준이 실제 개발 문맥과 달랐다. 커밋 수 기반이 아닌 커밋 메시지 분석 방식으로 수정했다.",
    tags: ["GitHub API", "SVG", "데이터 시각화"],
  },
  {
    title: "면접 답변 시간 분석기",
    desc: "녹음된 면접 답변의 길이와 침묵 구간을 분석하는 도구",
    intent: "사용자가 '너무 길게 말하는' 습관을 스스로 인식할 수 있는지 확인하고 싶었다.",
    aiUsed: "Web Audio API 파형 분석 로직의 초기 코드 생성",
    myJudgement: "AI가 생성한 침묵 감지 임계값이 환경 소음을 제대로 처리하지 못했다. 적응형 임계값으로 직접 수정했다.",
    tags: ["Web Audio API", "STT", "UX Research"],
  },
  {
    title: "프로젝트 회고 질문 생성기",
    desc: "프로젝트 설명을 입력하면 회고에 적합한 질문을 생성해주는 도구",
    intent: "AI가 단순 반복 질문이 아닌 맥락에 맞는 질문을 생성할 수 있는지 확인하고 싶었다.",
    aiUsed: "회고 질문 생성 프롬프트 설계 및 Claude API 연동",
    myJudgement: "AI 응답이 너무 일반적이었다. 프로젝트 규모, 팀 구성, 결과 유형을 명시적으로 주입하도록 프롬프트를 개선했다.",
    tags: ["Claude API", "프롬프트 엔지니어링"],
  },
  {
    title: "채용 공고 키워드 분석기",
    desc: "공고 URL을 입력하면 핵심 기술 스택과 역량 키워드를 추출하는 도구",
    intent: "내 경험과 공고의 요구사항 간 갭을 빠르게 파악할 수 있는지 확인하고 싶었다.",
    aiUsed: "HTML 파싱 후 키워드 추출 및 카테고리 분류",
    myJudgement: "AI 분류가 '커뮤니케이션'을 기술 역량으로 분류하는 등 범주 혼용이 있었다. 분류 기준을 명시적으로 재정의했다.",
    tags: ["크롤링", "NLP", "Claude API"],
  },
  {
    title: "개발 일지 템플릿 자동 생성기",
    desc: "오늘의 이슈를 입력하면 문제/판단/해결/배운점 구조의 일지 초안을 생성하는 도구",
    intent: "일지 작성 마찰을 줄여 기록 습관을 유지할 수 있는지 실험했다.",
    aiUsed: "입력된 이슈 설명을 4-블록 구조로 재구성",
    myJudgement: "AI 초안의 '배운 점'이 피상적이었다. 후속 질문으로 더 깊이 파고드는 chain 구조를 추가했다.",
    tags: ["Claude API", "생산성", "글쓰기"],
  },
];
