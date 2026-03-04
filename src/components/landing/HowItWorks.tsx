import { Card, CardContent } from "@/components/ui/card";

const steps = [
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
];

export default function HowItWorks() {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="gradient-text">이용 방법</span>
          </h2>
          <p className="text-gray-400 text-lg">
            4단계로 완성되는 동네 예능 스포츠 중계
          </p>
        </div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-amber-500/20 -translate-y-1/2" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative text-center group">
                <Card className="hover:border-blue-500/30 transition-all duration-300">
                  <CardContent className="p-6">
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
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
