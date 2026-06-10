import { Home, ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-6 py-24 text-center">
      <p className="font-heading text-7xl font-extrabold text-gradient-gold">404</p>
      <h1 className="font-heading text-3xl font-bold text-charcoal">
        Page not found
      </h1>
      <p className="max-w-md text-gray-medium">
        The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s
        get you back on track.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button href="/">
          <Home className="h-4 w-4" />
          Back to Home
        </Button>
        <Button href="/services" variant="secondary">
          <ArrowLeft className="h-4 w-4" />
          View Services
        </Button>
      </div>
    </Container>
  );
}
