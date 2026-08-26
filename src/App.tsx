import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { Landing } from '@/components/landing/Landing';
import { AuthScreen } from '@/components/auth/AuthScreen';
import { AppNav, type AppView } from '@/components/app/AppNav';
import { Dashboard } from '@/components/app/Dashboard';
import { Discover } from '@/components/app/Discover';
import { Exchanges } from '@/components/app/Exchanges';
import { Profile } from '@/components/app/Profile';
import { Spinner } from '@/components/ui/Spinner';

type Screen = 'landing' | 'auth' | 'app';
type AuthMode = 'signin' | 'signup';

function Shell() {
  const { session, loading } = useAuth();
  const [screen, setScreen] = useState<Screen>('landing');
  const [authMode, setAuthMode] = useState<AuthMode>('signin');
  const [view, setView] = useState<AppView>('dashboard');

  useEffect(() => {
    if (loading) return;
    setScreen(session ? 'app' : 'landing');
  }, [session, loading]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-canvas-50">
        <Spinner>Preparing your studio…</Spinner>
      </div>
    );
  }

  if (screen === 'landing') {
    return (
      <Landing
        onEnter={() => {
          setAuthMode('signin');
          setScreen('auth');
        }}
      />
    );
  }

  if (screen === 'auth') {
    return (
      <AuthScreen
        mode={authMode}
        onToggle={() => setAuthMode((m) => (m === 'signin' ? 'signup' : 'signin'))}
        onBack={() => setScreen('landing')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-canvas-50">
      <AppNav view={view} onNavigate={setView} />
      {view === 'dashboard' && <Dashboard onNavigate={setView} />}
      {view === 'discover' && <Discover />}
      {view === 'exchanges' && <Exchanges />}
      {view === 'profile' && <Profile />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Shell />
    </AuthProvider>
  );
}

export default App;
