"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useState, useEffect } from "react"
import { fetchStaffData } from '@/api/userApi'

const initialColumns = ["staffId", "name", "totalContribution", "topUpDeposit", "balanceForTheYear", "actions"]

interface StaffData {
  staffId: string;
  name: string;
  totalContribution: number;
  topUpDeposit: number;
  balanceForTheYear: number;
}

export function UsersActionDialog({ open, currentRow }: { open: boolean, onOpenChange: (open: boolean) => void, currentRow: StaffData | null }) {
  if (!open || !currentRow) return null;

  return (
    <Card className="mx-auto my-6 w-full max-w-6xl">
      <CardHeader>
        <CardTitle>Staff Details - {currentRow.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p><strong>Staff ID:</strong> {currentRow.staffId}</p>
        <p><strong>Total Contribution:</strong> {currentRow.totalContribution}</p>
        <p><strong>Top-Up Deposit:</strong> {currentRow.topUpDeposit}</p>
        <p><strong>Balance for the Year:</strong> {currentRow.balanceForTheYear}</p>
      </CardContent>
    </Card>
  );
}

export default function StaffTable() {
  const [staffData, setStaffData] = useState<Array<{ staffId: string, name: string, totalContribution: number, topUpDeposit: number, balanceForTheYear: number }>>([]);
  const [loading, setLoading] = useState(true);
  const [selectedColumns] = useState(initialColumns);
  const [selectedRow, setSelectedRow] = useState<StaffData | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchStaffData();
        setStaffData(data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error fetching staff data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  interface StaffData {
    staffId: string;
    name: string;
    totalContribution: number;
    topUpDeposit: number;
    balanceForTheYear: number;
  }

  

  const handleRowClick = (row: StaffData): void => {
    setSelectedRow(row);
    setDialogOpen(true);
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            {selectedColumns.map((column) => (
              <TableHead key={column}>{column.replace(/([A-Z])/g, ' $1').trim()}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow><TableCell colSpan={selectedColumns.length}>Loading...</TableCell></TableRow>
          ) : (
            staffData.map((staff) => (
              <TableRow key={staff.staffId} onClick={() => handleRowClick(staff)}>
                {selectedColumns.map((column) => (
                  <TableCell key={column}>{staff[column as keyof StaffData]}</TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <UsersActionDialog open={dialogOpen} onOpenChange={setDialogOpen} currentRow={selectedRow} />
    </div>
  );
}
