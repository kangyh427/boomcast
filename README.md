# BoomCast

**AI 멀티 페르소나 스포츠 캐스팅 플랫폼**

스마트폰 하나로 프로급 스포츠 중계를 시작하세요. 2~3명의 AI 캐스터가 각자의 개성으로 실시간 엔터테인먼트 중계를 제공합니다.

## 핵심 기능

- **AI 멀티 페르소나 캐스팅**: 실황 캐스터, 해설위원, 엔터테이너 3인 AI 동시 해설
- **실시간 이벤트 감지**: YOLOv8 기반 Edge AI로 골/파울/코너킥 등 자동 인식
- **자연스러운 TTS**: 감정이 담긴 음성 합성으로 생동감 있는 중계
- **자동 숏폼 생성**: 하이라이트 장면 자동 편집으로 바이럴 콘텐츠 생성
- **Edge + Cloud 하이브리드**: 빠른 응답과 고품질 AI를 동시에 달성

## 기술 스택

- **Frontend**: Next.js 16, TypeScript, Tailwind CSS
- **AI 대본 생성**: Claude API / Gemini API (연동 준비 완료)
- **음성 합성**: Web Speech API (MVP) / ElevenLabs (확장 예정)
- **이벤트 감지**: YOLOv8-nano / TFLite (모바일 Edge AI)

## 시작하기

```bash
npm install
npm run dev
```

`http://localhost:3000`에서 앱을 확인할 수 있습니다.

## 프로젝트 구조

```
src/
├── app/
│   ├── page.tsx            # 랜딩 페이지
│   ├── demo/page.tsx       # AI 캐스팅 데모
│   └── api/generate/       # AI 대본 생성 API
├── components/
│   ├── landing/            # 랜딩 페이지 컴포넌트
│   ├── demo/               # 데모 페이지 컴포넌트
│   └── common/             # 공통 컴포넌트
├── hooks/
│   └── useCommentaryPlayer.ts  # 캐스팅 재생 Hook
└── lib/
    ├── types.ts            # TypeScript 타입
    ├── casters.ts          # AI 캐스터 페르소나
    └── demo-data.ts        # 데모 시나리오 데이터
```
