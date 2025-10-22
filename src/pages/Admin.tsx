import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Plus, Edit, Trash2, Download, QrCode, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Mock equipment data
  const [equipments, setEquipments] = useState([
    {
      id: "1",
      equipment_id: "LAB-001",
      name: "Lathe Machine",
      category: "Machining",
      location: "Workshop A",
      status: "Operational",
    },
    {
      id: "2",
      equipment_id: "LAB-002",
      name: "Milling Machine",
      category: "Machining",
      location: "Workshop A",
      status: "Maintenance",
    },
  ]);

  // Mock scan logs
  const scanLogs = [
    {
      id: "1",
      equipment_id: "LAB-001",
      user: "john@example.com",
      lat: 11.0172,
      lon: 76.9558,
      scanned_at: "2025-10-22T10:30:00Z",
    },
    {
      id: "2",
      equipment_id: "LAB-002",
      user: "jane@example.com",
      lat: 11.0180,
      lon: 76.9565,
      scanned_at: "2025-10-22T11:15:00Z",
    },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple mock authentication
    if (email === "admin@lab.com" && password === "admin123") {
      setIsAuthenticated(true);
      toast.success("Login successful!");
    } else {
      toast.error("Invalid credentials. Try admin@lab.com / admin123");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setEmail("");
    setPassword("");
    toast.success("Logged out successfully");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1 flex items-center justify-center py-12 px-4">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-primary flex items-center justify-center">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl">Admin Login</CardTitle>
              <CardDescription>
                Enter your credentials to access the admin dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@lab.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" size="lg">
                  Sign In
                </Button>
                <p className="text-xs text-center text-muted-foreground mt-4">
                  Demo: admin@lab.com / admin123
                </p>
              </form>
            </CardContent>
          </Card>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-muted-foreground">
                Manage equipment, view logs, and generate QR codes
              </p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>

          <Tabs defaultValue="equipment" className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="equipment">Equipment</TabsTrigger>
              <TabsTrigger value="logs">Scan Logs</TabsTrigger>
            </TabsList>

            {/* Equipment Management Tab */}
            <TabsContent value="equipment" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Equipment Management</CardTitle>
                      <CardDescription>Add, edit, or delete equipment items</CardDescription>
                    </div>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Equipment
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {equipments.map((equipment) => (
                      <div
                        key={equipment.id}
                        className="flex items-center justify-between p-4 rounded-lg border bg-card hover:shadow-md transition-shadow"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-lg">{equipment.name}</h3>
                            <Badge
                              className={
                                equipment.status === "Operational"
                                  ? "bg-success"
                                  : "bg-warning"
                              }
                            >
                              {equipment.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>ID: {equipment.equipment_id}</span>
                            <span>•</span>
                            <span>{equipment.category}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {equipment.location}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <QrCode className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Scan Logs Tab */}
            <TabsContent value="logs" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Scan Logs</CardTitle>
                      <CardDescription>
                        Track when and where equipment was scanned
                      </CardDescription>
                    </div>
                    <Button variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Export CSV
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {scanLogs.map((log) => (
                      <div
                        key={log.id}
                        className="flex items-center justify-between p-4 rounded-lg border bg-card"
                      >
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-3">
                            <span className="font-semibold">{log.equipment_id}</span>
                            <span className="text-sm text-muted-foreground">
                              by {log.user}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>
                              {new Date(log.scanned_at).toLocaleString()}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {log.lat.toFixed(4)}, {log.lon.toFixed(4)}
                            </span>
                          </div>
                        </div>
                        <a
                          href={`https://www.google.com/maps?q=${log.lat},${log.lon}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button variant="outline" size="sm">
                            View on Map
                          </Button>
                        </a>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}
