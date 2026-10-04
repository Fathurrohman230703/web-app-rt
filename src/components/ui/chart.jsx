import * as React from "react";
import { Tooltip, ResponsiveContainer } from "recharts";

const ChartContainer = React.forwardRef(({ config, children, className = "", ...props }, ref) => {
  // Generate CSS Variables dari chartConfig
  const styleVars = React.useMemo(() => {
    const vars = {};
    if (config) {
      Object.entries(config).forEach(([key, item]) => {
        if (item.color) {
          vars[`--color-${key}`] = item.color;
        }
      });
    }
    return vars;
  }, [config]);

  return (
    <div ref={ref} style={styleVars} className={`w-full ${className}`} {...props}>
      <ResponsiveContainer width="100%" height="100%">
        {children}
      </ResponsiveContainer>
    </div>
  );
});
ChartContainer.displayName = "ChartContainer";

const ChartTooltip = Tooltip;

const ChartTooltipContent = ({ active, payload, labelKey, nameKey, hideLabel = false }) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-2.5 shadow-md text-xs">
      {!hideLabel && payload[0]?.payload?.[labelKey] && (
        <p className="font-semibold text-slate-700 mb-1">{payload[0].payload[labelKey]}</p>
      )}
      <div className="space-y-1">
        {payload.map((item, index) => {
          const color = item.payload.fill || item.color;
          return (
            <div key={index} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-1.5">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <span className="text-slate-600 capitalize">
                  {item.payload[nameKey] || item.name}
                </span>
              </div>
              <span className="font-bold text-slate-900">{item.value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export { ChartContainer, ChartTooltip, ChartTooltipContent };