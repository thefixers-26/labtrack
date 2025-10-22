import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Calendar, Package, Wrench, User, FileText, Download } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";

// Mock data - will be replaced with Supabase
const mockEquipment = {
  id: "1",
  equipment_id: "LAB-001",
  name: "Lathe Machine",
  category: "Machining",
  manufacturer: "HMT",
  serial_no: "HMT-2024-X1234",
  purchase_date: "2024-01-15",
  location: "Workshop A",
  status: "Operational",
  specifications: "Max turning diameter: 400mm, Max turning length: 1000mm, Spindle speed: 50-2000 RPM",
  maintenance_due: "2025-12-15",
  assigned_user: "Dr. John Smith",
  notes: "Regular maintenance scheduled. Handle with care.",
};

export default function EquipmentDetails() {
  const { id } = useParams();
  const [equipment, setEquipment] = useState(mockEquipment);
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  useEffect(() => {
    // Generate QR code URL for this equipment
    // In production, this will be stored in the database
    const qrData = `${window.location.origin}/equipment/${id}`;
    // For now, use a placeholder
    setQrCodeUrl(`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qrData)}`);
  }, [id]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'operational':
        return 'bg-success text-success-foreground';
      case 'maintenance':
        return 'bg-warning text-warning-foreground';
      case 'out of service':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  const infoItems = [
    { icon: Package, label: "Equipment ID", value: equipment.equipment_id },
    { icon: MapPin, label: "Location", value: equipment.location },
    { icon: Wrench, label: "Manufacturer", value: equipment.manufacturer },
    { icon: FileText, label: "Serial Number", value: equipment.serial_no },
    { icon: Calendar, label: "Purchase Date", value: new Date(equipment.purchase_date).toLocaleDateString() },
    { icon: Calendar, label: "Maintenance Due", value: new Date(equipment.maintenance_due).toLocaleDateString() },
    { icon: User, label: "Assigned To", value: equipment.assigned_user },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Back Button */}
          <Link to="/equipments">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Equipments
            </Button>
          </Link>

          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold mb-2">{equipment.name}</h1>
                <div className="flex flex-wrap items-center gap-3">
                  <Badge className={getStatusColor(equipment.status)}>
                    {equipment.status}
                  </Badge>
                  <Badge variant="outline" className="text-sm px-3 py-1">
                    {equipment.category}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Details Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Equipment Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {infoItems.map((item, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <item.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
                          <p className="font-medium">{item.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Specifications Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Specifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{equipment.specifications}</p>
                </CardContent>
              </Card>

              {/* Notes Card */}
              {equipment.notes && (
                <Card>
                  <CardHeader>
                    <CardTitle>Notes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{equipment.notes}</p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* QR Code Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>QR Code</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-4">
                  <div className="p-4 bg-white rounded-lg border-2 border-border">
                    <img 
                      src={qrCodeUrl} 
                      alt="Equipment QR Code"
                      className="w-full h-auto"
                    />
                  </div>
                  <p className="text-sm text-center text-muted-foreground">
                    Scan this QR code to quickly access equipment details
                  </p>
                  <Button className="w-full" variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Download QR Code
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 rounded-lg bg-secondary/30">
                    <p className="text-sm text-muted-foreground mb-1">Days Until Maintenance</p>
                    <p className="text-2xl font-bold">
                      {Math.ceil((new Date(equipment.maintenance_due).getTime() - Date.now()) / (1000 * 60 * 60 * 24))}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/30">
                    <p className="text-sm text-muted-foreground mb-1">Years in Service</p>
                    <p className="text-2xl font-bold">
                      {Math.floor((Date.now() - new Date(equipment.purchase_date).getTime()) / (1000 * 60 * 60 * 24 * 365))}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
