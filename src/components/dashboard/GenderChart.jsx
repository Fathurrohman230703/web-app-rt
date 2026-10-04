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
  PieChart,
  Pie,
  Cell,
} from 'recharts';

import { Users } from 'lucide-react';

export default function GenderChart({ genderChartData, statsData }) {
  const chartConfig = {
    Pria: {
      label: 'Pria',
      color: '#f97316',
    },
    Wanita: {
      label: 'Wanita',
      color: '#06b6d4',
    },
  };

  const total = statsData?.totalWarga || 0;

  return (
    <Card className="border-slate-200/80 shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-100">
            <Users className="h-5 w-5 text-orange-500" />
          </div>

          <div>
            <CardTitle className="text-base sm:text-lg">
              Demografis Gender
            </CardTitle>

            <CardDescription className="text-xs sm:text-sm">
              Komposisi warga berdasarkan jenis kelamin
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4">

          {/* DONUT CHART */}
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square h-[190px] sm:h-[210px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />

              <Pie
                data={genderChartData}
                dataKey="total"
                nameKey="gender"
                innerRadius={55}
                outerRadius={78}
                strokeWidth={3}
              >
                {genderChartData.map((item, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={item.fill}
                  />
                ))}
              </Pie>

              {/* TOTAL DI TENGAH */}
              <text
                x="50%"
                y="47%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-slate-900 text-2xl font-bold"
              >
                {total}
              </text>

              <text
                x="50%"
                y="60%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-slate-400 text-[11px]"
              >
                Total Warga
              </text>
            </PieChart>
          </ChartContainer>

          {/* DETAIL GENDER */}
          <div className="space-y-4">

            {genderChartData.map((item) => {
              const percentage =
                total > 0
                  ? Math.round((item.total / total) * 100)
                  : 0;

              return (
                <div key={item.gender} className="space-y-2">

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">

                      <span
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: item.fill }}
                      />

                      <span className="text-sm font-medium text-slate-700">
                        {item.gender}
                      </span>

                    </div>

                    <span className="text-sm font-bold text-slate-900">
                      {item.total}
                    </span>
                  </div>

                  {/* PROGRESS BAR */}
                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: item.fill,
                      }}
                    />
                  </div>

                  <p className="text-[11px] text-slate-400">
                    {percentage}% dari total warga
                  </p>

                </div>
              );
            })}

          </div>

        </div>
      </CardContent>
    </Card>
  );
}
