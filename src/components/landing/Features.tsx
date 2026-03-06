/*
 * ============================================================
 * 파일: src/components/landing/Features.tsx
 * 설명: BoomCast 핵심 기능 섹션 - 화이트 테마
 * 경로: src/components/landing/Features.tsx
 * 최근 작업: 세션 4 - 화이트 리디자인 + 한/영 텍스트 하드코딩
 *           - 다크 테마 색상 완전 제거 (text-white → text-gray-900 등)
 *           - 카드: 화이트 배경 + 그라데이션 아이콘 배경
 *           - 컬러풀 아이콘 배경 유지 (시각적 포인트)
 *           - 한/영 전환 대비 (lang 변수, 세션 6에서 i18n 훅 교체)
 * 작성일: 2025-03-06
 * ============================================================
 */

/* ── 한/영 텍스트 ── */
const text = {
  ko: {
    sectionTitle: "핵심 기능",
    sectionSubtitle: "동네 축구도 BoomCast와 함께하면 프로 예능 스포츠가 됩니다",
  },
  en: {
    sectionTitle: "Key Features",
    sectionSubtitle: "Turn your local soccer into pro entertainment with BoomCast",
  },
};

/* ── 기능 카드 데이터 (한/영) ── */
const features = {
  ko: [
    {
      icon: "🎙️",
      title: "AI 멀티 캐스터",
      description:
        "실황 캐스터, 해설위원, 엔터테이너까지. 3명의 AI가 동네 축구를 프로 예능처럼 중계합니다.",
      gradient: "from-blue-500 to-cyan-400",
      bgLight: "bg-blue-50",
    },
    {
      icon: "📱",
      title: "스마트폰 하나로",
      description:
        "경기장 중앙에 스마트폰만 세워두세요. 별도 장비 없이 프로급 중계가 시작됩니다.",
      gradient: "from-purple-500 to-pink-400",
      bgLight: "bg-purple-50",
    },
    {
      icon: "⚡",
      title: "실시간 이벤트 감지",
      description:
        "골, 파울, 코너킥 등 경기 이벤트를 자동으로 인식하여 즉각적인 해설을 생성합니다.",
      gradient: "from-amber-500 to-orange-400",
      bgLight: "bg-amber-50",
    },
    {
      icon: "🎬",
      title: "자동 하이라이트",
      description:
        "주요 장면을 자동으로 편집하여 SNS에 바로 올릴 수 있는 숏폼 영상을 생성합니다.",
      gradient: "from-green-500 to-emerald-400",
      bgLight: "bg-green-50",
    },
    {
      icon: "🔊",
      title: "자연스러운 AI 음성",
      description:
        "감정이 살아있는 자연스러운 캐스팅 음성으로 경기 몰입감을 높입니다.",
      gradient: "from-red-500 to-rose-400",
      bgLight: "bg-red-50",
    },
    {
      icon: "🏘️",
      title: "동네 예능 콘텐츠",
      description:
        "일반인들의 경기도 프로 못지않은 예능 콘텐츠로 만들어 드립니다.",
      gradient: "from-indigo-500 to-blue-400",
      bgLight: "bg-indigo-50",
    },
  ],
  en: [
    {
      icon: "🎙️",
      title: "AI Multi-Casters",
      description:
        "Play-by-play, color commentator, and entertainer. 3 AI personas cast your game like a pro show.",
      gradient: "from-blue-500 to-cyan-400",
      bgLight: "bg-blue-50",
    },
    {
      icon: "📱",
      title: "Just Your Phone",
      description:
        "Set up a smartphone at the field. No extra equipment needed for pro-level coverage.",
      gradient: "from-purple-500 to-pink-400",
      bgLight: "bg-purple-50",
    },
    {
      icon: "⚡",
      title: "Real-Time Detection",
      description:
        "Automatically detects goals, fouls, corner kicks and generates instant commentary.",
      gradient: "from-amber-500 to-orange-400",
      bgLight: "bg-amber-50",
    },
    {
      icon: "🎬",
      title: "Auto Highlights",
      description:
        "Key moments are auto-edited into short-form clips ready for social media sharing.",
      gradient: "from-green-500 to-emerald-400",
      bgLight: "bg-green-50",
    },
    {
      icon: "🔊",
      title: "Natural AI Voice",
      description:
        "Emotionally rich, natural casting voices that heighten the excitement of every play.",
      gradient: "from-red-500 to-rose-400",
      bgLight: "bg-red-50",
    },
    {
      icon: "🏘️",
      title: "Local to Legendary",
      description:
        "Transform any amateur game into entertainment content that rivals professional broadcasts.",
      gradient: "from-indigo-500 to-blue-400",
      bgLight: "bg-indigo-50",
    },
  ],
};

export default function Features() {
  /* TODO: 세션 6에서 i18n 훅으로 교체 */
  const lang: "ko" | "en" = "ko";
  const t = text[lang];
  const featureList = features[lang];

  return (
    <section id="features" className="py-20 sm:py-24 px-4 bg-gray-50/50">
      <div className="max-w-6xl mx-auto">

        {/* ── 섹션 헤더 ── */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">
            <span className="gradient-text">{t.sectionTitle}</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            {t.sectionSubtitle}
          </p>
        </div>

        {/* ── 기능 카드 그리드 ── */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureList.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl border border-gray-200 p-6 
                         hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50 
                         transition-all duration-300 card-hover"
            >
              {/* 아이콘 */}
              <div
                className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.gradient} 
                            flex items-center justify-center text-2xl mb-4 
                            group-hover:scale-110 transition-transform duration-300`}
              >
                {feature.icon}
              </div>

              {/* 제목 */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>

              {/* 설명 */}
              <p className="text-gray-500 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
