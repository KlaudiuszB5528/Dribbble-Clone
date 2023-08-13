'use client';

import { getProviders, signIn } from 'next-auth/react';
import { useEffect, useState } from 'react';

import Button from './Button';

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
          <Button
            title="Sign In"
            key={provider.id}
            handleClick={() => signIn(provider.id)}
          />
        ))}
      </div>
    );
  }
}
