import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { QrCode, Search, Shield, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  const features = [
    {
      icon: QrCode,
      title: "QR Code Scanning",
      description: "Instantly access equipment details by scanning QR codes with your device camera.",
    },
    {
      icon: Search,
      title: "Smart Search",
      description: "Quickly find equipment by name, ID, location, or category with powerful filters.",
    },
    {
      icon: Shield,
      title: "Secure Tracking",
      description: "Log every scan with geolocation and timestamp for complete audit trails.",
    },
    {
      icon: Zap,
      title: "Real-time Updates",
      description: "Get instant status updates and maintenance alerts for all lab equipment.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-20 lg:py-32">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="inline-block">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                <span className="text-sm text-white font-medium">Advanced Lab Equipment Tracking</span>
              </div>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
              Track Lab Equipment with
              <span className="block text-accent">QR Technology</span>
            </h1>
            
            <p className="text-lg lg:text-xl text-white/90 max-w-2xl mx-auto">
              Streamline your laboratory operations with our intelligent QR-based tracking system.
              Scan, track, and manage 50+ equipment items effortlessly.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/equipments">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-glow text-base px-8">
                  <Search className="mr-2 h-5 w-5" />
                  View Equipments
                </Button>
              </Link>
              <Link to="/scan">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 text-base px-8">
                  <QrCode className="mr-2 h-5 w-5" />
                  Scan QR Code
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-72 h-72 bg-primary-glow/20 rounded-full blur-3xl" />
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Powerful Features for Modern Labs
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to efficiently manage and track your laboratory equipment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-6 rounded-2xl border border-border bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mb-4 group-hover:shadow-glow transition-shadow">
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-white">
              Ready to Modernize Your Lab?
            </h2>
            <p className="text-lg text-white/90">
              Join modern laboratories using QR technology for efficient equipment management.
            </p>
            <Link to="/admin">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-glow">
                Access Admin Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
