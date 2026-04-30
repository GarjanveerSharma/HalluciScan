'use client';

import { useState, useRef } from 'react';

interface UploadPDFProps {
  onFileSelect?: (file: File) => void;
}

export default function UploadPDF({ onFileSelect }: UploadPDFProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileSelect = (file: File) => {
    if (file.type === 'application/pdf') {
      setSelectedFile(file);
      if (onFileSelect) {
        onFileSelect(file);
      }
    } else {
      alert('Please select a valid PDF file.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="upload-section">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`upload-section ${isDragOver ? 'dragover' : ''}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          onChange={handleInputChange}
          className="upload-input"
        />
        <div onClick={openFileDialog}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📄</div>
          <p style={{ margin: '0 0 0.5rem 0', fontWeight: '500' }}>
            Drop your PDF here or{' '}
            <span className="upload-label">browse files</span>
          </p>
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#718096' }}>
            Supports PDF files up to 10MB
          </p>
        </div>
      </div>
    </div>
  );
}