'use client';

import { useState, useCallback } from 'react';
import { parseLetterboxdZip } from '@/lib/parser';
import { LetterboxdData } from '@/types';

interface UploadFormProps {
  onDataLoaded: (data: LetterboxdData) => void;
}

export default function UploadForm({ onDataLoaded }: UploadFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFile = useCallback(async (file: File) => {
    if (!file.name.endsWith('.zip')) {
      setError('Please upload a ZIP file');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await parseLetterboxdZip(file);
      onDataLoaded(data);
    } catch (err) {
      setError(`Failed to parse ZIP: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  }, [onDataLoaded]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    
    if (e.dataTransfer.files?.[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, [handleFile]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      handleFile(e.target.files[0]);
    }
  }, [handleFile]);

  return (
    <div className="max-w-2xl mx-auto p-8">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold mb-4 text-gh-text">GitBoxd</h1>
        <p className="text-xl text-gh-text-secondary mb-2">
          Your Letterboxd profile, GitHub-style
        </p>
        <div className="inline-block bg-blue-900/30 border border-blue-700 rounded px-4 py-2 text-sm text-blue-300">
          🔒 Data stays on your device — nothing is uploaded
        </div>
      </div>

      <div
        className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
          dragActive 
            ? 'border-gh-green-3 bg-gh-green-1/20' 
            : 'border-gh-border hover:border-gh-text-secondary'
        }`}
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept=".zip"
          onChange={handleChange}
          className="hidden"
          id="file-upload"
          disabled={loading}
        />
        
        <label htmlFor="file-upload" className="cursor-pointer">
          <div className="text-6xl mb-4">📦</div>
          <div className="text-lg text-gh-text mb-2">
            {loading ? 'Processing...' : 'Drop your Letterboxd export ZIP here'}
          </div>
          <div className="text-sm text-gh-text-secondary mb-4">
            or click to browse
          </div>
          <button
            type="button"
            className="bg-gh-green-3 hover:bg-gh-green-4 text-black font-semibold px-6 py-2 rounded transition-colors"
            onClick={() => document.getElementById('file-upload')?.click()}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Select File'}
          </button>
        </label>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-900/30 border border-red-700 rounded text-red-300">
          {error}
        </div>
      )}

      <div className="mt-8 text-sm text-gh-text-secondary space-y-2">
        <p>
          <strong>How to get your export:</strong>
        </p>
        <ol className="list-decimal list-inside space-y-1 ml-4">
          <li>Go to Letterboxd Settings → Import & Export</li>
          <li>Click "Export Your Data"</li>
          <li>Download the ZIP file when ready</li>
          <li>Upload it here</li>
        </ol>
      </div>
    </div>
  );
}
