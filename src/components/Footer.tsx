import { Link } from "react-router-dom";
import { Github, Mail, Shield } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="font-semibold text-lg mb-3">LabTrack System</h3>
            <p className="text-sm text-muted-foreground">
              QR-based equipment tracking solution for modern laboratories.
              Track, manage, and monitor your lab equipment efficiently.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Quick Links</h3>
            <div className="flex flex-col gap-2 text-sm">
              <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                Home
              </Link>
              <Link to="/equipments" className="text-muted-foreground hover:text-foreground transition-colors">
                Equipment List
              </Link>
              <Link to="/scan" className="text-muted-foreground hover:text-foreground transition-colors">
                Scan QR Code
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Support</h3>
            <div className="flex flex-col gap-2 text-sm">
              <a href="mailto:support@labtrack.com" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="h-4 w-4" />
                support@labtrack.com
              </a>
              <a href="#" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <Shield className="h-4 w-4" />
                Privacy Policy
              </a>
              <a href="#" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border text-center text-sm text-muted-foreground">
          <p>© 2025 LabTrack System. Developed with ❤️ for modern laboratories.</p>
        </div>
      </div>
    </footer>
  );
}
