import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar } from "lucide-react";

interface Equipment {
  id?: string;
  equipment_id: string;
  name: string;
  category?: string;
  location?: string;
  status?: string;
  maintenance_due?: string;
}

interface EquipmentCardProps {
  equipment: Equipment;
}

export default function EquipmentCard({ equipment }: EquipmentCardProps) {
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

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
              {equipment.name}
            </h3>
            <p className="text-sm text-muted-foreground">{equipment.equipment_id}</p>
          </div>
          {equipment.status && (
            <Badge className={getStatusColor(equipment.status)}>
              {equipment.status}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="pb-3 space-y-2">
        {equipment.location && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{equipment.location}</span>
          </div>
        )}
        
        {equipment.maintenance_due && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Next Maintenance: {new Date(equipment.maintenance_due).toLocaleDateString()}</span>
          </div>
        )}

        {equipment.category && (
          <div className="pt-2">
            <Badge variant="outline">{equipment.category}</Badge>
          </div>
        )}
      </CardContent>

      <CardFooter>
        <Link to={`/equipment/${equipment.equipment_id}`} className="w-full">
          <Button className="w-full" variant="outline">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
