import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const KpiChart = ({ data }) => {
  const theme = useTheme();
  return (
    <Box sx={{ p: 2, mt: 2 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 2 }}>
        Trend
      </Typography>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{ top: 2, right: 2, left: -30, bottom: 2 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip
            contentStyle={{
              backgroundColor: theme.palette.background.paper,
              border: "1px solid",
              borderRadius: "8px",
            }}
          />
          <Legend />
          <Bar
            dataKey="value"
            fill={theme.palette.roseShades.main}
            name="Value"
          />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default KpiChart;
