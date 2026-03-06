/*
 * ============================================================
 * 파일: src/components/landing/Architecture.tsx
 * 설명: BoomCast 기술 구조 섹션 - 화이트 테마
 * 경로: src/components/landing/Architecture.tsx
 * 최근 작업: 세션 4 - 화이트 리디자인 + 한/영 텍스트 하드코딩
 *           - 다크 테마 색상 완전 제거
 *           - pre 블록: bg-gray-50 + text-gray-700
 *           - 통계 카드: 화이트 + 블루 포인트
 *           - 한/영 전환 대비 (lang 변수, 세션 6에서 i18n 훅 교체)
 * 작성일: 2025-03-06
 * ============================================================
 */

/* ── 한/영 텍스트 ── */
const text = {
  ko: {
    sectionTitle: "기술 구조",
    sectionSubtitle: "스마트폰 + AI 클라우드 하이브리드",
    stat1Value: "< 100ms",
    stat1Label: "이벤트 감지 속도",
    stat2Value: "< 2s",
    stat2Label: "AI 해설 생성 속도",
    stat3Value: "3명",
    stat3Label: "동시 AI 캐스터",
  },
  en: {
    sectionTitle: "Architecture",
    sectionSubtitle: "Smartphone + AI Cloud Hybrid",
    stat1Value: "< 100ms",
    stat1Label: "Event Detection",
    stat2Value: "< 2s",
    stat2Label: "AI Commentary Gen",
    stat3Value: "3",
    stat3Label: "Simultaneous AI Casters",
  },
};

/* ── 아키텍처 다이어그램 (한/영) ── */
const diagram = {
  ko: `
  ┌─────────────────────────────────────────────────────────┐
  │              📱 경기장 중앙 스마트폰                       │
  │                                                         │
  │  ┌──────────┐    ┌──────────────┐    ┌───────────────┐  │
  │  │ 카메라    │───▶│ AI 이벤트    │───▶│ 이벤트 전송   │  │
  │  │ 녹화     │    │ 자동 감지     │    │ (골/파울/...)  │  │
  │  └──────────┘    └──────────────┘    └───────┬───────┘  │
  └──────────────────────────────────────────────┼──────────┘
                                                 │
                      ▼ Event JSON (< 1KB)       │
                                                 │
  ┌──────────────────────────────────────────────┼──────────┐
  │              ☁️  AI 클라우드                   │          │
  │                                              │          │
  │  ┌──────────────┐    ┌──────────────┐    ┌───▼───────┐  │
  │  │ AI 음성 합성  │◀───│ 멀티 캐스터   │◀───│  이벤트   │  │
  │  │ (TTS)        │    │ AI 대본 생성  │    │  수신기   │  │
  │  └──────┬───────┘    └──────────────┘    └───────────┘  │
  └─────────┼───────────────────────────────────────────────┘
            │
            ▼ 완성된 중계 콘텐츠

  ┌─────────────────────────────────────────────────────────┐
  │              📺 시청 & 공유                               │
  │                                                         │
  │  ┌──────────┐    ┌──────────────┐    ┌───────────────┐  │
  │  │ 영상+음성 │───▶│ 하이라이트    │───▶│ SNS 공유      │  │
  │  │ 합성     │    │ 자동 편집     │    │ YouTube/Insta │  │
  │  └──────────┘    └──────────────┘    └───────────────┘  │
  └─────────────────────────────────────────────────────────┘`,
  en: `
  ┌─────────────────────────────────────────────────────────┐
  │              📱 Smartphone at Field Center               │
  │                                                         │
  │  ┌──────────┐    ┌──────────────┐    ┌───────────────┐  │
  │  │ Camera   │───▶│ AI Event     │───▶│ Event Send    │  │
  │  │ Record   │    │ Detection    │    │ (Goal/Foul..) │  │
  │  └──────────┘    └──────────────┘    └───────┬───────┘  │
  └──────────────────────────────────────────────┼──────────┘
                                                 │
                      ▼ Event JSON (< 1KB)       │
                                                 │
  ┌──────────────────────────────────────────────┼──────────┐
  │              ☁️  AI Cloud                     │          │
  │                                              │          │
  │  ┌──────────────┐    ┌──────────────┐    ┌───▼───────┐  │
  │  │ AI Voice     │◀───│ Multi-Caster │◀───│  Event    │  │
  │  │ Synthesis    │    │ Script Gen   │    │  Receiver │  │
  │  └──────┬───────┘    └──────────────┘    └───────────┘  │
  └─────────┼───────────────────────────────────────────────┘
            │
            ▼ Complete Broadcast Content

  ┌─────────────────────────────────────────────────────────┐
  │              📺 Watch & Share                             │
  │                                                         │
  │  ┌──────────┐    ┌──────────────┐    ┌───────────────┐  │
  │  │ Video +  │───▶│ Highlight    │───▶│ SNS Share     │  │
  │  │ Audio    │    │ Auto-Edit    │    │ YouTube/Insta │  │
  │  └──────────┘    └──────────────┘    └───────────────┘  │
  └─────────────────────────────────────────────────────────┘`,
};

export default function Architecture() {
  /* TODO: 세션 6에서 i18n 훅으로 교체 */
  const lang: "ko" | "en" = "ko";
  const t = text[lang];

  return (
    <section className="py-20 sm:py-24 px-4 bg-gray-50/50">
      <div className="max-w-5xl mx-auto">

        {/* ── 섹션 헤더 ── */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">
            <span className="gradient-text">{t.sectionTitle}</span>
          </h2>
          <p className="text-gray-500 text-lg">
            {t.sectionSubtitle}
          </p>
        </div>

        {/* ── 아키텍처 다이어그램 ── */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 sm:p-8 overflow-x-auto">
          <pre className="text-xs sm:text-sm font-mono text-gray-600 leading-relaxed whitespace-pre">
            {diagram[lang]}
          </pre>
        </div>

        {/* ── 통계 카드 ── */}
        <div className="grid sm:grid-cols-3 gap-4 mt-8">
          {[
            { value: t.stat1Value, label: t.stat1Label },
            { value: t.stat2Value, label: t.stat2Label },
            { value: t.stat3Value, label: t.stat3Label },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-200 text-center p-5 
                         hover:shadow-md transition-shadow duration-300"
            >
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
