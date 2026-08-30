import { Button } from "@/components/ui/button";
import { Shield, CheckCircle, Phone } from "lucide-react";

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-[#fcfbf8] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col items-start text-left">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-1.5 text-sm font-semibold text-orange-700">
              <Shield className="h-4 w-4" />
              <span>Certified Fire Safety Experts</span>
            </div>

            <h1 className="max-w-2xl text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              <span className="block text-orange-600">
                Protect Your Facility With a
              </span>
              <span className="block text-black">
                FREE FIRE SAFTEY HEALTH CHECK UP
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Our certified technicians will visit your facility to perform a
              thorough, complimentary inspection of your fire protection systems
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                size="lg"
                className="bg-orange-600 px-8 text-base font-semibold text-white hover:bg-orange-700"
              >
                Claim free inspection
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-foreground/20 px-6 text-base font-medium text-foreground hover:bg-foreground/5"
              >
                <Phone className="mr-2 h-4 w-4" />
                Call our team
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-orange-600" />
                <span>No obligation</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-orange-600" />
                <span>Same-week visits</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-orange-600" />
                <span>Full report included</span>
              </div>
            </div>
          </div>

          <div className="relative flex items-center justify-center lg:justify-end">
            <div className="relative aspect-[4/3] w-full max-w-lg overflow-hidden rounded-2xl bg-gradient-to-br from-orange-100 to-orange-50 shadow-xl">
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <div className="rounded-full bg-orange-600/10 p-6">
                  <Shield className="h-20 w-20 text-orange-600" />
                </div>
                <p className="mt-6 text-lg font-semibold text-foreground">
                  Fire Safety Health Check
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Comprehensive on-site inspection by certified professionals
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
