"use client";
import { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import { Button } from "@/components/ui/button";
import * as XLSX from "xlsx";
import { uploadStaffData } from "@/api/adminApi";
import { toast } from '@/hooks/use-toast'
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "@tanstack/react-router";

export function UploadExcelPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [jsonData, setJsonData] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [uploadKey, setUploadKey] = useState(Date.now()); // Unique key for re-render

  const navigate = useNavigate();

  const handleFileUpload = (uploadedFiles: File[]) => {
    setFiles(uploadedFiles);
  };

  const previewData = () => {
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target?.result;
        if (data) {
          const workbook = XLSX.read(data, { type: "binary" });
          const sheetName = workbook.SheetNames[0];
          const workSheet = workbook.Sheets[sheetName];
          const json = XLSX.utils.sheet_to_json(workSheet);
          setJsonData(JSON.stringify(json, null, 2));
        }
      };
      reader.readAsBinaryString(file);
    }
  };

  const pushToDatabase = async () => {
    if (files.length === 0) {
      toast({
        title: "Error",
        description: "Upload a file before pushing!",
      }); 
      return;
    }

    setLoading(true);
    const file = files[0];
    const reader = new FileReader();

    reader.onload = async (e) => {
      const data = e.target?.result;
      if (data) {
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const workSheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(workSheet);

        try {
          await uploadStaffData(json);
          toast({
            title: "Success",
            description: "Data Uploaded Successfully!",
          });          
          
          // Reset file input and preview
          setFiles([]);
          setJsonData("");
          setUploadKey(Date.now()); // Force re-render of FileUpload

          navigate({ to: "/upload-excel" }); 
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(error);
          toast({
            title: "Error",
            description: "Error Uploading Data!",
          }); 
        } finally {
          setLoading(false);
        }
      }
    };

    reader.readAsBinaryString(file);
  };

  return (
    <>
      <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-background border-neutral-200 dark:border-neutral-800 rounded-lg">
        {/* Add key prop to force re-render */}
        <FileUpload key={uploadKey} onChange={handleFileUpload} />
      </div>
      <div className="flex gap-10 justify-center mt-10">
        <Button
          variant="outline"
          className="space-x-1 text-black dark:text-[whitesmoke]"
          onClick={previewData}
        >
          <span>Preview File</span>
        </Button>
        <Button
          className="space-x-1 text-white dark:text-[whitesmoke]"
          onClick={pushToDatabase}
          disabled={loading}
        >
          <span>{loading ? "Pushing..." : "Push to Database"}</span>
        </Button>
      </div>
      {jsonData && (
        <pre className="mt-5 p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
          {jsonData}
        </pre>
      )}
    </>
  );
}
