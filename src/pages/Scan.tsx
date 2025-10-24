import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode, Camera, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { scanLogApi } from "@/lib/api";

export default function Scan() {
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setScanning(true);
    setError("");

    try {
      // In production, this would use a QR code scanner library
      // For now, simulate scanning with a delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Simulate extracting equipment ID from QR code
      const equipmentId = "LAB-001"; // In production, this would come from actual QR scan

      // Get geolocation
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            try {
              // Log the scan to backend
              await scanLogApi.create({
                equipment_id: equipmentId,
                user_info: "Guest",
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              });

              toast.success("QR Code scanned successfully!");
              navigate(`/equipment/${equipmentId}`);
            } catch (error) {
              console.error("Error logging scan:", error);
              toast.warning("Scan successful but logging failed");
              navigate(`/equipment/${equipmentId}`);
            }
          },
          (err) => {
            console.error("Location error:", err);
            toast.warning("Location access denied, but scan was successful");
            navigate(`/equipment/${equipmentId}`);
          },
          { enableHighAccuracy: true }
        );
      } else {
        toast.warning("Geolocation not supported, but scan was successful");
        navigate(`/equipment/${equipmentId}`);
      }
    } catch (err) {
      setError("Failed to scan QR code. Please try again.");
      toast.error("Scan failed");
    } finally {
      setScanning(false);
    }
  };

  const handleCameraClick = () => {
    // Trigger file input (camera only) when button is clicked
    document.getElementById("qr-file-input")?.click();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl lg:text-4xl font-bold mb-2">Scan Equipment QR Code</h1>
            <p className="text-muted-foreground">
              Capture a QR code using your camera to view equipment details and log the scan
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Scanner Card */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <QrCode className="h-5 w-5" />
                  QR Code Scanner
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Scanner Area */}
                  <div className="relative aspect-square max-w-md mx-auto bg-secondary/30 rounded-2xl border-2 border-dashed border-border overflow-hidden">
                    {!scanning ? (
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                        <div className="w-24 h-24 rounded-2xl bg-gradient-primary flex items-center justify-center mb-4">
                          <Camera className="h-12 w-12 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Ready to Scan</h3>
                        <p className="text-sm text-muted-foreground mb-6">
                          Click the button below to capture a QR code using your camera
                        </p>
                        <input
                          type="file"
                          id="qr-file-input"
                          accept="image/*"
                          capture="environment"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                        <Button onClick={handleCameraClick} size="lg" className="w-full max-w-xs">
                          <Camera className="mr-2 h-5 w-5" />
                          Open Camera
                        </Button>
                      </div>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                          <p className="text-lg font-semibold">Scanning...</p>
                          <p className="text-sm text-muted-foreground mt-2">
                            Processing QR code and getting your location
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Error Alert */}
                  {error && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Info Cards */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">What Gets Logged?</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Equipment ID and details</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Your geolocation (if permitted)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Timestamp of the scan</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>User identity (if logged in)</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">How to Use</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="font-semibold text-foreground">1.</span>
                    <span>Click the button to open your camera</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold text-foreground">2.</span>
                    <span>Point at the equipment's QR code</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold text-foreground">3.</span>
                    <span>Allow location access when prompted</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold text-foreground">4.</span>
                    <span>View equipment details automatically</span>
                  </li>
                </ol>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
