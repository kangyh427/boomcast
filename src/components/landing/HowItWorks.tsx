/*
 * ============================================================
 * 파일: src/components/landing/HowItWorks.tsx
 * 설명: BoomCast 이용 방법 섹션 - 화이트 테마
 * 경로: src/components/landing/HowItWorks.tsx
 * 최근 작업: 세션 4 - 화이트 리디자인 + 한/영 텍스트 하드코딩
 *           - 다크 테마 색상 완전 제거
 *           - 연결선: 그라데이션 화이트 버전
 *           - STEP 라벨: blue-600 (화이트 배경 대비)
 *           - 카드: 화이트 배경 + 소프트 섀도우
 *           - 한/영 전환 대비 (lang 변수, 세션 6에서 i18n 훅 교체)
 * 작성일: 2025-03-06
 * ============================================================
 */

/* ── 한/영 텍스트 ── */
const text = {
  ko: {
    sectionTitle: "이용 방법",
    sectionSubtitle: "4단계로 완성되는 동네 예능 스포츠 중계",
  },
  en: {
    sectionTitle: "How It Works",
    sectionSubtitle: "4 simple steps to pro-level entertainment broadcasting",
  },
};

/* ── 스텝 데이터 (한/영) ── */
const steps = {
  ko: [
    {
      step: "01",
      title: "세팅",
      description: "경기장 중앙에 스마트폰을 세워두세요. 삼각대 하나면 충분합니다.",
      icon: "📱",
      detail: "스마트폰 거치 + 녹화 시작",
    },
    {
      step: "02",
      title: "촬영",
      description: "경기를 촬영하면 AI가 자동으로 이벤트를 감지합니다.",
      icon: "🧠",
      detail: "AI 기반 실시간 이벤트 감지",
    },
    {
      step: "03",
      title: "캐스팅",
      description: "3명의 AI 캐스터가 각자의 개성으로 동네 축구를 중계합니다.",
      icon: "🎙️",
      detail: "멀티 AI 캐스터 실시간 해설",
    },
    {
      step: "04",
      title: "공유",
      description: "경기 영상과 AI 해설이 합쳐져 SNS에 바로 공유할 수 있습니다.",
      icon: "📡",
      detail: "하이라이트 자동 생성 + 공유",
    },
  ],
  en: [
    {
      step: "01",
      title: "Setup",
      description: "Place your smartphone at center field. A simple tripod is all you need.",
      icon: "📱",
      detail: "Mount phone + Start recording",
    },
    {
      step: "02",
      title: "Record",
      description: "Record the game and AI automatically detects key events.",
      icon: "🧠",
      detail: "AI-powered event detection",
    },
    {
      step: "03",
      title: "Cast",
      description: "3 AI casters bring their unique personalities to your game commentary.",
      icon: "🎙️",
      detail: "Multi AI caster commentary",
    },
    {
      step: "04",
      title: "Share",
      description: "Game footage and AI commentary merge into shareable content for social media.",
      icon: "📡",
      detail: "Auto highlights + Share",
    },
  ],
};

/* ── 스텝별 색상 테마 ── */
const stepColors = [
  { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-100" },
  { bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-100" },
  { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-100" },
  { bg: "bg-green-50", text: "text-green-600", border: "border-green-100" },
];

export default function HowItWorks() {
  /* TODO: 세션 6에서 i18n 훅으로 교체 */
  const lang: "ko" | "en" = "ko";
  const t = text[lang];
  const stepList = steps[lang];

  return (
    <section className="py-20 sm:py-24 px-4 bg-white">
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

        <div className="relative">
          {/* ── 데스크탑 연결선 (lg 이상) ── */}
          <div className="hidden lg:block absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 to-green-200 -translate-y-1/2" />

          {/* ── 스텝 카드 그리드 ── */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stepList.map((step, index) => {
              const color = stepColors[index];
              return (
                <div key={index} className="relative text-center group">
                  <div
                    className={`bg-white rounded-xl border ${color.border} p-6 
                                hover:shadow-lg hover:shadow-gray-100 
                                transition-all duration-300 card-hover`}
                  >
                    {/* 아이콘 */}
                    <div className="text-4xl mb-4">{step.icon}</div>

                    {/* STEP 번호 */}
                    <div className={`text-xs font-mono ${color.text} font-semibold mb-2 tracking-wider`}>
                      STEP {step.step}
                    </div>

                    {/* 제목 */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {step.title}
                    </h3>

                    {/* 설명 */}
                    <p className="text-gray-500 text-sm mb-3 leading-relaxed">
                      {step.description}
                    </p>

                    {/* 디테일 태그 */}
                    <div className={`inline-block text-xs ${color.text} ${color.bg} px-3 py-1 rounded-full font-medium`}>
                      {step.detail}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
