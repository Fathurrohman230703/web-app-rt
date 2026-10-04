import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';

import { UsersRound } from 'lucide-react';

export default function UsiaChart({ usiaChartData }) {

  const chartConfig = {
    jumlah: {
      label: 'Jumlah Warga',
    },
  };

  return (
    <Card className="border-slate-200/80 shadow-sm">

      <CardHeader className="pb-2">

        <div className="flex items-center gap-2">

          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-100">
            <UsersRound className="h-5 w-5 text-cyan-600" />
          </div>

          <div>
            <CardTitle className="text-base sm:text-lg">
              Kelompok Usia Warga
            </CardTitle>

            <CardDescription className="text-xs sm:text-sm">
              Distribusi warga berdasarkan kelompok usia
            </CardDescription>
          </div>

        </div>

      </CardHeader>

      <CardContent>

        <ChartContainer
          config={chartConfig}
          className="h-[250px] w-full"
        >

          <BarChart
            data={usiaChartData}
            layout="vertical"
            margin={{
              top: 5,
              right: 10,
              left: 10,
              bottom: 5,
            }}
          >

            <CartesianGrid
              horizontal={false}
              strokeDasharray="3 3"
            />

            <XAxis
              type="number"
              allowDecimals={false}
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              type="category"
              dataKey="kategori"
              tickLine={false}
              axisLine={false}
              width={75}
              tick={{
                fontSize: 11,
              }}
            />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
            />

            <Bar
              dataKey="jumlah"
              radius={[0, 6, 6, 0]}
              barSize={28}
              fill="#f97316"
            />

          </BarChart>

        </ChartContainer>

      </CardContent>
    </Card>
  );
}
