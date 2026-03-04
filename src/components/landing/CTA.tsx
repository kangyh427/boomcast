import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <Card className="p-10 sm:p-12 relative overflow-hidden">
          {/* Background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />

          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              지금 바로 <span className="gradient-text">체험</span>해보세요
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-lg mx-auto">
              동네 축구가 어떻게 예능 콘텐츠로 변하는지,
              데모를 통해 직접 경험해보세요.
            </p>
            <Button size="lg" asChild>
              <Link href="/demo" className="gap-2">
                데모 시작하기
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
}
