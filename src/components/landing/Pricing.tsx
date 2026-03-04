import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const plans = [
  {
    name: "단건 구매",
    description: "1경기만 이용하고 싶을 때",
    price: "9,900",
    unit: "원 / 경기",
    features: [
      "2시간 이내 경기 1회",
      "AI 멀티 캐스터 3명",
      "실시간 이벤트 감지",
      "경기 하이라이트 영상",
    ],
    popular: false,
    cta: "단건 구매하기",
  },
  {
    name: "월간 구독",
    description: "매주 경기하는 동네 팀에 딱!",
    price: "35,000",
    unit: "원 / 월",
    features: [
      "월 4회 경기 이용",
      "AI 멀티 캐스터 3명",
      "실시간 이벤트 감지",
      "경기 하이라이트 영상",
      "팀 전용 페이지 제공",
      "경기당 8,750원",
    ],
    popular: true,
    cta: "월간 구독하기",
  },
  {
    name: "연간 구독",
    description: "리그를 운영하는 팀에 추천",
    price: "400,000",
    unit: "원 / 년",
    features: [
      "연 50회 경기 이용",
      "AI 멀티 캐스터 3명",
      "실시간 이벤트 감지",
      "경기 하이라이트 영상",
      "팀 전용 페이지 제공",
      "시즌 통계 리포트",
      "경기당 8,000원",
    ],
    popular: false,
    cta: "연간 구독하기",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="gradient-text">요금 안내</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            동네 축구도 프로처럼, 부담 없는 가격으로 시작하세요
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-start">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative transition-all duration-300 ${
                plan.popular
                  ? "border-blue-500/50 shadow-lg shadow-blue-500/10 scale-[1.02]"
                  : "hover:border-gray-700"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-blue-600 to-blue-500 border-0 text-white px-4 py-1">
                    BEST
                  </Badge>
                </div>
              )}
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="text-center pb-4">
                <div className="my-4">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400 text-sm ml-1">{plan.unit}</span>
                </div>
                <ul className="space-y-3 text-left">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                      <svg className="w-4 h-4 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="pt-0">
                <Button
                  variant={plan.popular ? "default" : "outline"}
                  className="w-full"
                  asChild
                >
                  <Link href="/demo">{plan.cta}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
