import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";

const MetadataTable = ({ item }) => {
  if (!item) return null;

  const excludedAttributes = [
    "id",
    "title",
    "description",
    "url",
    "url_download",
  ];
  const displayAttributes = Object.keys(item).filter(
    (key) => !excludedAttributes.includes(key)
  );

  return (
    <TableContainer component={Paper} variant="outlined" sx={{ my: 2 }}>
      <Table size="small">
        <TableBody>
          {displayAttributes.map((key) => {
            const value = item[key];
            if (value) {
              return (
                <TableRow key={key}>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ fontWeight: "bold", width: "40%" }}
                  >
                    {key}
                  </TableCell>
                  <TableCell>{value || "N/A"}</TableCell>
                </TableRow>
              );
            }
            return null;
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MetadataTable;
