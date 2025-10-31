'use client';

import { useState } from 'react';
import { LetterboxdData } from '@/types';
import UploadForm from '@/components/UploadForm';
import ProfileView from '@/components/ProfileView';

export default function Home() {
  const [data, setData] = useState<LetterboxdData | null>(null);

  return (
    <div className="min-h-screen bg-gh-bg text-gh-text">
      {data ? (
        <ProfileView data={data} onReset={() => setData(null)} />
      ) : (
        <div className="flex items-center justify-center min-h-screen">
          <UploadForm onDataLoaded={setData} />
        </div>
      )}
    </div>
  );
}
