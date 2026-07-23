import type { Project } from "../model/types";

/* ─── Projects ─── */
export const projects: Project[] = [
  {
    id: "deepfake",
    title: "Deepfake Detection",
    subtitle: "AI 모델을 사람이 쓰는 서비스로",
    period: "2024.09 — 2025.02",
    role: "팀장 · 프론트엔드 전체",
    tags: ["Next.js", "TypeScript", "WebSocket", "Recharts", "Claude API"],
    problem: "딥페이크 판별 모델은 존재했지만 일반 사용자가 이미지와 영상을 업로드하고 결과를 이해할 수 있는 인터페이스가 없었다.",
    challenge: "긴 영상 분석 중 사용자 이탈 방지, 서버 작업 상태와 UI 상태 실시간 동기화, 모델별로 다른 결과 형식 통일, PDF/HWP 리포트 자동 생성.",
    solution: "청크 업로드 → WebSocket 진행률 → 결과 시각화 → PDF 리포트 → 챗봇까지 전체 사용자 흐름을 설계하고 구현했다. 분석 상태는 UI가 추측하지 않고 서버가 단일 진실의 원천으로 작동하도록 구성했다.",
    result: "5개 AI 모델 지원 · 12가지 파일 형식 · 6개 언어 · 팀원 5명 · 담당 화면 18개",
    imageId: "photo-1518770660439-4636190af475",
  },
  {
    id: "interview",
    title: "Interview AI",
    subtitle: "흩어진 AI 기능을 하나의 제품 흐름으로",
    period: "2024.03 — 2024.08",
    role: "프론트엔드 리드 · API 설계 협업",
    tags: ["React", "Zustand", "TanStack Query", "Web Speech API", "Axios"],
    problem: "AI로 면접 질문을 생성하고 답변을 분석하는 기능들이 각각 존재했지만, 하나의 끊김 없는 경험으로 이어지지 않았다.",
    challenge: "공고 추출 → 질문 생성 → 녹음/STT → 답변 저장 → 평가 리포트까지 단계별 상태 관리, 실패 복구 시나리오 설계, 여러 팀원과의 API 구조 조율.",
    solution: "전체 면접 플로우를 상태 머신으로 설계하고, 각 단계의 실패 복구 시나리오를 명시적으로 구현했다. 서버 상태는 TanStack Query, 플로우 상태는 Zustand 슬라이스로 완전히 분리했다.",
    result: "면접 완료율 34% 향상 · 평균 세션 시간 22분 · 재방문율 61% · 담당 화면 15개",
    imageId: "photo-1551434678-e076c223a692",
  },
  {
    id: "proseed",
    title: "Proseed",
    subtitle: "정보 비대칭을 제거하는 투자 연결 플랫폼",
    period: "2023.09 — 2024.02",
    role: "프론트엔드 · 제품 정책 설계",
    tags: ["React", "TypeScript", "Recoil", "Styled Components"],
    problem: "초기 창업자가 투자자에게 접근하기 어렵고, 투자자는 옥석을 가리기 힘든 정보 비대칭 문제가 있었다.",
    challenge: "복잡한 프로젝트 등록 폼, 투자자 매칭 로직 시각화, 기밀 정보 접근 권한 계층 관리, 다단계 검증 프로세스 UX.",
    solution: "폼을 단계별 wizard로 분리하고, 권한 레이어를 명시적으로 설계하여 민감 정보가 승인된 투자자에게만 공개되도록 구현했다. 각 권한 상태를 UI에서 명확하게 표현했다.",
    result: "등록 완료율 78% · 매칭 성사 43건 · 팀원 4명 · 담당 화면 14개",
    imageId: "photo-1497366216548-37526070297c",
  },
];
