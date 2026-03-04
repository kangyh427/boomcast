const steps = [
  {
    step: "01",
    title: "촬영",
    description: "스마트폰으로 경기를 촬영하세요. 앱이 자동으로 최적화된 화면을 캡처합니다.",
    icon: "📱",
    detail: "YOLOv8 기반 실시간 객체 감지",
  },
  {
    step: "02",
    title: "분석",
    description: "AI가 경기 이벤트를 실시간으로 감지하고 분류합니다.",
    icon: "🧠",
    detail: "Edge AI로 즉각 이벤트 트리거링",
  },
  {
    step: "03",
    title: "캐스팅",
    description: "멀티 페르소나 AI가 개성 있는 해설 대본을 동시에 생성합니다.",
    icon: "🎙️",
    detail: "LLM 기반 실시간 대본 생성",
  },
  {
    step: "04",
    title: "방송",
    description: "자연스러운 TTS 음성과 영상이 합쳐져 완성된 중계가 됩니다.",
    icon: "📡",
    detail: "TTS + 오디오 덕킹 + 라이브 믹싱",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="gradient-text">어떻게 작동하나요?</span>
          </h2>
          <p className="text-gray-400 text-lg">
            4단계로 완성되는 AI 중계 파이프라인
          </p>
        </div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-amber-500/20 -translate-y-1/2" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative text-center group">
                <div className="glass rounded-xl p-6 hover:border-blue-500/30 transition-all duration-300">
                  <div className="text-4xl mb-4">{step.icon}</div>
                  <div className="text-xs font-mono text-blue-400 mb-2">
                    STEP {step.step}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-3">
                    {step.description}
                  </p>
                  <div className="text-xs text-blue-400/60 font-mono">
                    {step.detail}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
