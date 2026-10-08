'use client';

import { useState, useEffect } from 'react';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function UpdateProfilePage() {
  const { data: session } = authClient.useSession();
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

 
  useEffect(() => {
    if (session?.user?.name) {
      setName(session.user.name);
    }
  }, [session]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await authClient.updateUser({
        name: name,
      });

      if (error) {
        toast.error(error.message || 'আপডেট করতে সমস্যা হয়েছে!');
      } else {
        toast.success('প্রোফাইল সফলভাবে আপডেট হয়েছে!');
        router.push('/profile'); 
        router.refresh();
      }
    } catch (err: any) {
      toast.error('সার্ভারে সমস্যা হয়েছে!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-2xl border shadow-sm my-10 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">তথ্য আপডেট করুন</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">নাম</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-emerald-600"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-600 text-white font-medium py-2.5 rounded-lg hover:bg-emerald-700 transition disabled:opacity-50"
        >
          {loading ? "আপডেট হচ্ছে..." : "আপডেট ইনফরমেশন"}
        </button>
      </form>
    </div>
  );
}