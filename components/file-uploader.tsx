"use client"

import React, { useState, useRef, useEffect } from "react"
import { Upload, File, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"

type UploadedFile = {
  id: string
  name: string
  size: number
  type: string
  progress: number
  status: "uploading" | "complete" | "error"
}

export function FileUploader() {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [previewFile, setPreviewFile] = useState<string | null>(null) 

  useEffect(() => {
    fetchFiles()
  }, [])

  const fetchFiles = async () => {
    try {
      const response = await fetch("http://localhost:8000/files")
      const data = await response.json()

      if (!Array.isArray(data.files)) {
        throw new Error("Unexpected response format")
      }

      setFiles((prevFiles) => {
        const existingFileNames = new Set(prevFiles.map((f) => f.name))
        const newFiles = data.files
          .filter((file: string) => !existingFileNames.has(file))
          .map((file: string) => ({
            id: file,
            name: file,
            size: 0,
            type: "pdf",
            progress: 100,
            status: "complete",
          }))

        return [...prevFiles, ...newFiles]
      })
    } catch (error) {
      console.error("Error fetching files:", error)
    }
  }

  const uploadFile = async (file: File) => {
    const formData = new FormData()
    formData.append("file", file)

    const newFile: UploadedFile = {
      id: crypto.randomUUID(),
      name: file.name,
      size: file.size,
      type: file.type,
      progress: 0,
      status: "uploading",
    }

    setFiles((prevFiles) => [...prevFiles, newFile])

    try {
      const response = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) throw new Error("Upload failed")

      setFiles((prevFiles) =>
        prevFiles.map((f) =>
          f.id === newFile.id ? { ...f, progress: 100, status: "complete" } : f
        )
      )
    } catch (error) {
      console.error("Upload error:", error)
      setFiles((prevFiles) =>
        prevFiles.map((f) =>
          f.id === newFile.id ? { ...f, progress: 100, status: "error" } : f
        )
      )
    }
  }

  const processFiles = (fileList: FileList) => {
    Array.from(fileList).forEach((file) => uploadFile(file))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(e.target.files)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => setIsDragging(false)

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files) {
      processFiles(e.dataTransfer.files)
    }
  }

  const removeFile = async (fileName: string) => {
    try {
      const response = await fetch("http://localhost:8000/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename: fileName }),
      })

      if (!response.ok) {
        throw new Error("Failed to delete file")
      }

      setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName))
    } catch (error) {
      console.error("Error deleting file:", error)
    }
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Upload Medical Reports</CardTitle>
          <CardDescription>Upload your medical reports to track your health progress</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center ${
              isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/20"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">Drag and drop your files here</h3>
            <p className="text-sm text-muted-foreground mb-4">or click to browse from your computer</p>

            <Button onClick={() => fileInputRef.current?.click()}>Browse Files</Button>

            <input
              ref={fileInputRef}
              id="file-upload"
              type="file"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />

            <p className="text-xs text-muted-foreground mt-4">Supported formats: PDF</p>
          </div>

          {files.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Uploaded Files</h3>
              <div className="space-y-3">
                {files.map((file, index) => (
                  <div
                    key={`${file.name}-${index}`}
                    className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-100"
                    onClick={() => setPreviewFile(`http://localhost:8000/uploads/${file.name}`)} // Open preview
                  >
                    <File className="h-8 w-8 mr-3 text-primary" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{file.name}</p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <span>Uploaded</span>
                        <span className="mx-2">•</span>
                        <span>{file.status === "uploading" ? "Uploading..." : "Complete"}</span>
                      </div>
                      <Progress value={file.progress} className="h-1 mt-2" />
                    </div>
                    <Button variant="ghost" size="icon" className="ml-2" onClick={() => removeFile(file.name)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* File Preview Modal */}
      {previewFile && (
        <Dialog open={!!previewFile} onOpenChange={() => setPreviewFile(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>File Preview</DialogTitle>
              <DialogClose asChild>
                <Button variant="ghost" onClick={() => setPreviewFile(null)}>
                  Close
                </Button>
              </DialogClose>
            </DialogHeader>
            <iframe
              src={previewFile}
              className="w-full h-[500px]"
              title="File Preview"
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
