'use client';

import { getProviders, signIn } from 'next-auth/react';
import { useEffect, useState } from 'react';

interface Provider {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
  siginUrlParams?: Record<string, string> | null;
}

type Providers = Record<string, Provider>;

export default function AuthProviders() {
  const [providers, setProviders] = useState<Providers | null>(null);

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();

      setProviders(res);
    };
    fetchProviders();
  }, []);

  if (providers) {
    return (
      <div>
        {Object.values(providers).map((provider) => (
          <button key={provider.id} onClick={() => signIn(provider.id)}>
            {provider.id}
          </button>
        ))}
      </div>
    );
  }
}
