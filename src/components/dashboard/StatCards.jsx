import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Home, ClipboardList, MapPin, TrendingUp } from "lucide-react";

export default function StatCards({ statsData }) {
  const stats = [
    {
      title: "Total KK",
      value: `${statsData.totalKK} KK`,
      description: "Terdata di database RT",
      icon: Home,
    },
    {
      title: "Total Warga",
      value: `${statsData.totalWarga} Jiwa`,
      description: `${statsData.totalPria} Pria · ${statsData.totalWanita} Wanita`,
      icon: Users,
    },
    {
      title: "Program Kerja",
      value: `${statsData.totalProjek} Kegiatan`,
      description: "Program berjalan/direncana",
      icon: ClipboardList,
    },
    {
      title: "Wilayah",
      value: "RW 06",
      description: "Sukaleueur Dalam",
      icon: MapPin,
    },
  ];

  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="border-slate-200 hover:border-orange-200 bg-white shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">{stat.title}</CardTitle>
              <Icon className="h-4 w-4 text-slate-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900 tracking-tight">{stat.value}</div>
              <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-emerald-500 inline" />
                {stat.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}