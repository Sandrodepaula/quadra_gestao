import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const pageContent = {// Define o conteúdo específico para cada rota de autenticação
  '/login': {
    eyebrow: 'BOM TER VOCÊ DE VOLTA',
    title: 'Entre na sua conta',
    description: 'Acesse sua gestão e deixe tudo pronto para o próximo jogo.',
    button: 'Entrar na plataforma',
    notice: 'O acesso ainda não está conectado ao servidor.',
  },
  '/cadastro': {
    eyebrow: 'VAMOS COMEÇAR',
    title: 'Crie sua conta',
    description: 'Organize sua quadra e simplifique a rotina do seu negócio.',
    button: 'Criar minha conta',
    notice: 'O cadastro ainda não está conectado ao servidor.',
  },
  '/recuperar-senha': {
    eyebrow: 'RECUPERAR ACESSO',
    title: 'Esqueceu sua senha?',
    description: 'Informe seu e-mail e mostraremos onde configurar a recuperação.',
    button: 'Enviar instruções',
    notice: 'A recuperação de senha ainda não está conectada ao servidor.',
  },
};

function FieldIcon({ type }) {
  if (type === 'email') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3.5" y="5" width="17" height="14" rx="3" />
        <path d="m5 7 7 5.5L19 7" />
      </svg>
    );
  }

  if (type === 'user') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 20c.7-3.2 3.2-5 7-5s6.3 1.8 7 5" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="4" y="10" width="16" height="11" rx="2.5" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3m-4 4v3" />
    </svg>
  );
}

function BrandMark() {
  return (
    <span className="auth-brand-mark" aria-hidden="true">
      <svg viewBox="0 0 40 40">
        <rect x="2" y="2" width="36" height="36" rx="12" />
        <path d="M10 26V14l10 8 10-8v12M20 22v8" />
      </svg>
    </span>
  );
}
// Componente principal da página de autenticação
function AuthPage() {
  const { pathname } = useLocation();
  const page = pageContent[pathname] || pageContent['/login'];
  const isLogin = pathname === '/login';
  const isRegister = pathname === '/cadastro';
  const isRecovery = pathname === '/recuperar-senha';
  const [showPassword, setShowPassword] = useState(false);
  const [notice, setNotice] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    setNotice(page.notice);
  }

  return (
    <main className="auth-page">
      <section className="auth-card" aria-labelledby="auth-title">
        <aside className="auth-aside">
          <Link className="auth-brand" to="/login" aria-label="Quadra Gestão — início">
            <BrandMark />
            <span>quadra<span className="auth-brand-light">gestão</span></span>
          </Link>

          <div className="auth-aside-content">
            <span className="auth-kicker">GESTÃO QUE JOGA JUNTO</span>
            <h2>Sua quadra,<br />em um novo ritmo.</h2>
            <p>Mais tempo para o jogo. Menos tempo com a operação.</p>
            <div className="auth-court" aria-hidden="true">
              <div className="auth-court-lines">
                <span className="auth-center-circle" />
                <span className="auth-goal auth-goal-left" />
                <span className="auth-goal auth-goal-right" />
              </div>
              <span className="auth-court-ball">⚽</span>
            </div>
          </div>

          <div className="auth-aside-footer">
            <span className="auth-status-dot" />
            <span>O jogo começa com uma boa gestão.</span>
          </div>
        </aside>

        <div className="auth-form-side">
          <div className="auth-form-wrap">
            <div className="auth-mobile-brand">
              <BrandMark />
              <span>quadra<span className="auth-brand-light">gestão</span></span>
            </div>

            <div className="auth-heading">
              <span className="auth-eyebrow">{page.eyebrow}</span>
              <h1 id="auth-title">{page.title}</h1>
              <p>{page.description}</p>
            </div>

            <form className="auth-form" onSubmit={handleSubmit}>
              {isRegister && (
                <label className="auth-field">
                  <span>Seu nome</span>
                  <span className="auth-input-wrap">
                    <FieldIcon type="user" />
                    <input
                      type="text"
                      name="name"
                      placeholder="Como podemos te chamar?"
                      autoComplete="name"
                      required
                    />
                  </span>
                </label>
              )}

              <label className="auth-field">
                <span>E-mail</span>
                <span className="auth-input-wrap">
                  <FieldIcon type="email" />
                  <input
                    type="email"
                    name="email"
                    placeholder="voce@exemplo.com"
                    autoComplete="email"
                    required
                  />
                </span>
              </label>

              {!isRecovery && (
                <label className="auth-field">
                  <span>Senha</span>
                  <span className="auth-input-wrap">
                    <FieldIcon type="password" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      placeholder={isRegister ? 'Crie uma senha' : 'Digite sua senha'}
                      autoComplete={isRegister ? 'new-password' : 'current-password'}
                      minLength={8}
                      required
                    />
                    <button
                      className="auth-password-toggle"
                      type="button"
                      onClick={() => setShowPassword((visible) => !visible)}
                      aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                    >
                      {showPassword ? 'Ocultar' : 'Mostrar'}
                    </button>
                  </span>
                  {isRegister && <small className="auth-field-hint">Use pelo menos 8 caracteres.</small>}
                </label>
              )}

              {isLogin && (
                <div className="auth-form-options">
                  <label className="auth-remember">
                    <input type="checkbox" name="remember" />
                    <span>Manter conectado</span>
                  </label>
                  <Link to="/recuperar-senha">Esqueci minha senha</Link>
                </div>
              )}

              {notice && <p className="auth-notice" role="status">{notice}</p>}

              <button className="auth-submit" type="submit">
                {page.button}
                <span aria-hidden="true">→</span>
              </button>
            </form>

            <p className="auth-switch">
              {isLogin ? (
                <>Ainda não tem uma conta? <Link to="/cadastro">Fazer cadastro</Link></>
              ) : (
                <>Já tem uma conta? <Link to="/login">Entrar</Link></>
              )}
            </p>

            {isRecovery && (
              <Link className="auth-back-link" to="/login">← Voltar para o login</Link>
            )}

            <p className="auth-terms">
              Ao continuar, você concorda com nossos <a href="#termos">Termos de uso</a> e <a href="#privacidade">Política de privacidade</a>.
            </p>
          </div>
        </div>
      </section>
      <footer className="auth-footer">© 2026 Quadra Gestão <span>•</span> Feito para quem vive o esporte</footer>
    </main>
  );
}

export default AuthPage;
