import { useState, type FormEvent } from 'react';
import { ArrowRight, Mail, Lock, User, AlertCircle, Asterisk, ArrowUpRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Logo } from '@/components/ui/Logo';
import { Spinner } from '@/components/ui/Spinner';

type Mode = 'signin' | 'signup';

type Props = {
  mode: Mode;
  onToggle: () => void;
  onBack: () => void;
};

export function AuthScreen({ mode, onToggle, onBack }: Props) {
  const { signIn, signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  function switchMode() {
    if (busy) return;
    setError(null);
    onToggle();
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);

    if (mode === 'signup') {
      if (!fullName.trim()) {
        setError('Please enter your name.');
        setBusy(false);
        return;
      }
      const { error } = await signUp(email, password, fullName.trim());
      if (error) setError(error);
    } else {
      const { error } = await signIn(email, password);
      if (error) setError(error);
    }
    setBusy(false);
  }

  return (
    <div className="min-h-[100svh] flex items-center justify-center px-5 py-8 relative overflow-hidden grain sm:px-6 sm:py-12">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[15%] left-[10%] h-64 w-64 rounded-full bg-saffron-200/40 blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-[20%] right-[12%] h-72 w-72 rounded-full bg-terracotta-200/30 blur-3xl animate-pulse-soft" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-canvas-200 bg-canvas-50/80 shadow-2xl shadow-ink-900/10 lg:grid-cols-[0.9fr_1.1fr]">
        <aside className="relative hidden min-h-[38rem] overflow-hidden bg-ink-900 p-10 text-canvas-50 lg:flex lg:flex-col">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-saffron-300/40" />
          <div className="absolute bottom-16 left-10 h-44 w-44 rounded-full border border-canvas-300/20" />
          <div className="relative flex items-center justify-between">
            <Logo className="[&>span]:text-canvas-50" />
            <Asterisk className="h-5 w-5 text-saffron-300" />
          </div>
          <div className="relative my-auto">
            <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.28em] text-saffron-300">Your place in the archive</p>
            <p className="font-display text-5xl font-light leading-[0.95]">Make learning<br /><span className="italic text-canvas-300">a shared art.</span></p>
          </div>
          <div className="relative border-t border-canvas-50/20 pt-5">
            <p className="text-xs leading-relaxed text-canvas-300">Enter as a maker. Leave with a new way of seeing the world.</p>
            <div className="mt-5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-canvas-50"><span className="h-2 w-2 rounded-full bg-sage-300" />The doors are open</div>
          </div>
        </aside>

        <main className={`relative p-6 sm:p-10 lg:p-12 auth-mode-${mode}`}>
          <button
            onClick={onBack}
            className="mb-9 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-ink-500 transition-colors hover:text-ink-900"
          >
            <ArrowRight className="h-3.5 w-3.5 rotate-180" />
            Return to collection
          </button>

          <div className="mb-10 flex items-center justify-between lg:hidden"><Logo /><span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-400">Member entry</span></div>
          <div className="auth-mode-toggle mb-8 grid grid-cols-2 rounded-full border border-canvas-200 bg-canvas-100 p-1">
            <span className={`auth-mode-thumb ${mode === 'signup' ? 'translate-x-full bg-ink-900' : 'translate-x-0 bg-canvas-50 shadow-sm'}`} />
            <button onClick={() => mode === 'signup' && switchMode()} className={`relative z-10 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] transition-colors ${mode === 'signin' ? 'text-ink-900' : 'text-ink-400'}`}>Sign in</button>
            <button onClick={() => mode === 'signin' && switchMode()} className={`relative z-10 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] transition-colors ${mode === 'signup' ? 'text-canvas-50' : 'text-ink-400'}`}>Create account</button>
          </div>

          <div className="auth-copy-stage mb-8">
            <div className={`auth-copy ${mode === 'signin' ? 'auth-copy-active' : ''}`}><h1 className="font-display text-4xl font-light text-ink-900 sm:text-5xl">Welcome <span className="italic">back.</span></h1><p className="mt-2 text-sm leading-relaxed text-ink-500">Sign in to continue your craft.</p></div>
            <div className={`auth-copy ${mode === 'signup' ? 'auth-copy-active' : ''}`}><h1 className="font-display text-4xl font-light text-ink-900 sm:text-5xl">Begin a <span className="italic">practice.</span></h1><p className="mt-2 text-sm leading-relaxed text-ink-500">Create an account to start exchanging skills.</p></div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className={`auth-name-slot ${mode === 'signup' ? 'auth-name-slot-open' : ''}`}>
              <div className="auth-name-inner">
              <Field
                icon={User}
                type="text"
                placeholder="Your name"
                value={fullName}
                onChange={setFullName}
                autoComplete="name"
                disabled={mode !== 'signup'}
              />
              </div>
            </div>
            <Field
              icon={Mail}
              type="email"
              placeholder="Email address"
              value={email}
              onChange={setEmail}
              autoComplete="email"
              required
            />
            <Field
              icon={Lock}
              type="password"
              placeholder="Password"
              value={password}
              onChange={setPassword}
              autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
              required
              minLength={6}
            />

            {error && (
              <div className="flex items-start gap-2 rounded-xl bg-terracotta-50 border border-terracotta-200 px-4 py-3 animate-fade-in">
                <AlertCircle className="h-4 w-4 text-terracotta-500 mt-0.5 shrink-0" />
                <p className="text-sm text-terracotta-700">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={busy}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-ink-900 px-6 py-3.5 text-sm font-medium text-canvas-50 transition-all duration-300 hover:-translate-y-0.5 hover:bg-saffron-400 hover:text-ink-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {busy ? (
                <Spinner size="sm" className="py-0" />
              ) : (
                <>
                  {mode === 'signin' ? 'Sign in' : 'Create account'}
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-canvas-200 text-center">
            <p className="text-sm text-ink-500">
              {mode === 'signin' ? "Don't have an account? " : 'Already a member? '}
              <button
                onClick={switchMode}
                className="font-medium text-ink-900 ink-underline"
              >
                {mode === 'signin' ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
          <p className="mt-8 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-400"><ArrowUpRight className="h-3.5 w-3.5" />A private invitation to exchange</p>
        </main>
      </div>
    </div>
  );
}

type FieldProps = {
  icon: typeof Mail;
  type: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  autoComplete?: string;
  required?: boolean;
  minLength?: number;
  disabled?: boolean;
};

function Field({ icon: Icon, type, placeholder, value, onChange, autoComplete, required, minLength, disabled }: FieldProps) {
  return (
    <div className="relative group">
      <Icon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400 transition-colors group-focus-within:text-ink-700" />
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        autoComplete={autoComplete}
        required={required}
        minLength={minLength}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-canvas-200 bg-canvas-50/50 pl-11 pr-4 py-3 text-sm text-ink-800 placeholder:text-ink-400 transition-all duration-300 focus:outline-none focus:border-ink-400 focus:bg-canvas-50 focus:ring-4 focus:ring-ink-900/5"
      />
    </div>
  );
}
