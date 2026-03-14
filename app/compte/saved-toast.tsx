'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CheckCircle } from 'lucide-react';

export function SavedToast() {
  const searchParams = useSearchParams();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (searchParams.get('saved') === '1') {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  if (!visible) return null;

  return (
    <div className="mb-4 flex items-center gap-2 rounded-[10px] border border-green-200 bg-green-50 p-3 text-sm text-green-700">
      <CheckCircle className="h-4 w-4" />
      Modifications enregistrees avec succes.
    </div>
  );
}
