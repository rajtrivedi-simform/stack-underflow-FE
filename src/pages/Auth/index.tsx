import { Link, useSearchParams } from 'react-router-dom';
import { LoginForm } from '../../features/auth/ui/LoginForm';
import { RegisterForm } from '../../features/auth/ui/RegisterForm';

export default function AuthPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const mode = searchParams.get('mode') === 'register' ? 'register' : 'login';

  return (
    <main className="min-h-screen bg-mesh font-body-md text-on-background">
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute left-20 top-20 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-20 right-20 h-125 w-125 rounded-full bg-secondary/5 blur-3xl" />
        <div className="absolute right-1/4 top-1/4 h-32 w-64 rotate-12 rounded-xl border border-outline-variant/20 opacity-40" />
        <div className="absolute bottom-1/3 left-10 h-48 w-48 rounded-full border border-outline-variant/10 opacity-30" />
      </div>

      <section className="flex min-h-screen items-center justify-center p-md">
        <article className="z-10 w-full max-w-110 rounded-4xl border border-outline-variant/30 bg-surface-container-lowest p-xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] md:max-w-120">
          <header className="mb-lg flex flex-col items-center text-center">
            <div className="mb-md">
              <img alt="VyaparSetu Logo" className="h-10 w-auto" src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=200&q=80" />
            </div>
            <h1 className="mb-xs text-headline-lg font-semibold tracking-tight text-on-surface">
              {mode === 'login' ? 'Welcome Back' : 'Get Started'}
            </h1>
            <p className="max-w-70 text-body-md text-on-surface-variant">
              {mode === 'login' ? 'Sign in to manage your business growth.' : 'Join VyaparSetu to unlock your business potential.'}
            </p>
          </header>

          <div className="mb-6 flex rounded-full bg-surface-container-low p-1 shadow-inner">
            <button type="button" onClick={() => setSearchParams({ mode: 'login' })} className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition ${mode === 'login' ? 'bg-primary text-on-primary shadow-md shadow-primary/20' : 'text-on-surface-variant hover:text-primary'}`}>Login</button>
            <button type="button" onClick={() => setSearchParams({ mode: 'register' })} className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition ${mode === 'register' ? 'bg-primary text-on-primary shadow-md shadow-primary/20' : 'text-on-surface-variant hover:text-primary'}`}>Register</button>
          </div>

          {mode === 'login' ? <LoginForm /> : <RegisterForm />}

          <footer className="mt-lg text-center">
            <p className="text-body-md text-on-surface-variant">
              {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
              <Link className="font-bold text-primary underline decoration-2 underline-offset-4 transition-all hover:text-primary-container" to={mode === 'login' ? '/auth?mode=register' : '/auth?mode=login'}>
                {mode === 'login' ? 'Sign Up' : 'Sign In'}
              </Link>
            </p>
          </footer>

          <div className="mt-md flex justify-center gap-lg opacity-60">
            <div className="flex items-center gap-xs"><span className="material-symbols-outlined text-[16px]">verified_user</span><span className="font-label-sm text-label-sm">Secure Login</span></div>
            <div className="flex items-center gap-xs"><span className="material-symbols-outlined text-[16px]">lock</span><span className="font-label-sm text-label-sm">Privacy Protected</span></div>
          </div>
        </article>
      </section>
    </main>
  );
}
