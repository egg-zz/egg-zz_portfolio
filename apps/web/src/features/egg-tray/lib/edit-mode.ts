// 이 값을 바꾼 뒤 "https://.../?edit=<값>" 으로 접속하면 편집 모드가 켜집니다.
// 진짜 인증이 아니라 일반 방문자가 우연히 입력하지 못하게 막는 수준입니다 — 빌드된 JS를 보면 이 값이 그대로 노출됩니다.
const EDIT_TOKEN = "ovaloval";

const STORAGE_KEY = "egg-tray:edit-mode";

export function isEditModeEnabled(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(STORAGE_KEY) === "true";
}

export function checkEditTokenFromUrl(): boolean {
  if (typeof window === "undefined") return false;
  const token = new URLSearchParams(window.location.search).get("edit");
  if (token && token === EDIT_TOKEN) {
    window.localStorage.setItem(STORAGE_KEY, "true");
    return true;
  }
  return false;
}
