const features = [
  {
    icon: "🤖",
    title: "AI 멀티 페르소나",
    description:
      "실황 캐스터, 전문 해설위원, 엔터테이너까지. 2~3명의 AI가 각자의 개성으로 경기를 중계합니다.",
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    icon: "⚡",
    title: "실시간 이벤트 감지",
    description:
      "골, 파울, 코너킥 등 경기 이벤트를 자동으로 인식하여 즉각적인 해설을 생성합니다.",
    gradient: "from-amber-500 to-orange-400",
  },
  {
    icon: "📱",
    title: "스마트폰 하나로",
    description:
      "별도의 장비 없이 스마트폰 카메라만으로 프로급 중계를 시작할 수 있습니다.",
    gradient: "from-purple-500 to-pink-400",
  },
  {
    icon: "🎬",
    title: "자동 숏폼 생성",
    description:
      "하이라이트 장면을 자동으로 편집하여 바이럴 숏폼 영상을 생성합니다.",
    gradient: "from-green-500 to-emerald-400",
  },
  {
    icon: "🔊",
    title: "자연스러운 TTS",
    description:
      "최신 음성 합성 기술로 감정이 살아있는 자연스러운 캐스팅 음성을 제공합니다.",
    gradient: "from-red-500 to-rose-400",
  },
  {
    icon: "☁️",
    title: "Edge + Cloud 하이브리드",
    description:
      "로컬 처리와 클라우드의 장점을 결합하여 빠르고 안정적인 서비스를 제공합니다.",
    gradient: "from-indigo-500 to-blue-400",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="gradient-text">핵심 기능</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            BoomCast의 기술력으로 누구나 프로 캐스터 수준의 중계를 할 수 있습니다
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group glass rounded-xl p-6 hover:border-blue-500/30 transition-all duration-300"
            >
              <div
                className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}
              >
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
