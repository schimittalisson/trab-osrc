# Autenticação OpenID Connect com Google IdP

Implementação completa do protocolo de autenticação OpenID Connect (OIDC) usando Google como Identity Provider (IdP), desenvolvida com Next.js e Firebase.

**Disciplina:** Segurança de Redes  
**Instituição:** Universidade do Estado de Santa Catarina/Centro de Ciências Tecnológicas – UDESC/CCT  
**Departamento:** DCC - Departamento de Ciência da Computação  
**Curso:** BCC – Bacharelado em Ciência da Computação

**Equipe:**
- Alisson Schimitt
- Guilherme Diel
- Lucas Thomas de Oliveira
- Nicole Carolina Mendes

**Professor:** Charles Christian Miers

---

## 📋 Índice

- [Visão Geral](#visão-geral)
- [O que é OpenID Connect?](#o-que-é-openid-connect)
- [Arquitetura](#arquitetura)
- [Funcionalidades](#funcionalidades)
- [Pré-requisitos](#pré-requisitos)
- [Início Rápido](#início-rápido)
- [Guia de Configuração do Firebase](#guia-de-configuração-do-firebase)
- [Configuração](#configuração)
- [Executando a Aplicação](#executando-a-aplicação)
- [Fluxo de Autenticação Explicado](#fluxo-de-autenticação-explicado)
- [Como Funciona](#como-funciona)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Considerações de Segurança](#considerações-de-segurança)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Solução de Problemas](#solução-de-problemas)
- [Recursos Adicionais](#recursos-adicionais)

---

## 🎯 Visão Geral

Este projeto demonstra como implementar autenticação segura de usuários para uma aplicação web usando o protocolo OpenID Connect (OIDC) com Google como Identity Provider (IdP). Em vez de gerenciar senhas e dados de usuários diretamente, a aplicação delega a autenticação à infraestrutura confiável do Google, reduzindo riscos de segurança e complexidade de implementação.

### Principais Benefícios:

- ✅ **Sem Gerenciamento de Senhas** - Senhas gerenciadas pelo Google
- ✅ **Segurança Aprimorada** - Protocolos padrão da indústria
- ✅ **Melhor UX** - Login único com contas Google existentes
- ✅ **Complexidade Reduzida** - Firebase gerencia o fluxo OAuth
- ✅ **Pronto para Produção** - Implementação completa e testada

---

## 🔐 O que é OpenID Connect?

**OpenID Connect (OIDC)** é uma camada de identidade construída sobre o protocolo OAuth 2.0. Permite que clientes verifiquem a identidade de usuários finais com base na autenticação realizada por um servidor de autorização (Identity Provider), além de obter informações básicas de perfil do usuário.

### Conceitos-Chave:

- **Identity Provider (IdP):** Serviço confiável que autentica usuários (neste caso, Google)
- **Relying Party (RP):** Aplicação que depende do IdP para autenticação (esta aplicação)
- **Token ID:** JSON Web Token (JWT) que contém informações de identidade do usuário
- **OAuth 2.0:** Framework de autorização subjacente
- **Claims:** Informações sobre o usuário (email, nome, etc.)

### OIDC vs OAuth 2.0:

- **OAuth 2.0:** Protocolo de autorização (o que você pode acessar)
- **OpenID Connect:** Protocolo de autenticação (quem você é) construído sobre OAuth 2.0

---

## 🏗️ Arquitetura

```
┌─────────────┐         ┌──────────────┐         ┌─────────────┐
│             │         │              │         │             │
│  Navegador  │◄───────►│  App Next.js │◄───────►│   Firebase  │
│  (Usuário)  │         │  (Relying    │         │    Auth     │
│             │         │   Party)     │         │             │
└─────────────┘         └──────────────┘         └─────────────┘
       │                                                 │
       │                                                 │
       │                 ┌──────────────┐               │
       └────────────────►│    Google    │◄──────────────┘
                         │     IdP      │
                         │  (Identity   │
                         │   Provider)  │
                         └──────────────┘
```

### Componentes:

1. **Navegador (Usuário)** - Navegador web do usuário final
2. **App Next.js (Relying Party)** - Sua aplicação
3. **Firebase Auth** - Serviço middleware de autenticação
4. **Google IdP** - Identity Provider (servidor OAuth do Google)

---

## ✨ Funcionalidades

- ✅ **Autenticação Segura:** Usa implementação OAuth 2.0 e OIDC do Google
- ✅ **Sem Armazenamento de Senhas:** Autenticação delegada ao Google
- ✅ **Gerenciamento de Sessão:** Sessões persistentes de usuário com Firebase
- ✅ **Rotas Protegidas:** Proteção de rotas apenas para usuários autenticados
- ✅ **Exibição de Perfil:** Mostra informações do usuário a partir de claims do token ID
- ✅ **Design Responsivo:** UI moderna com TailwindCSS
- ✅ **TypeScript:** Segurança de tipos completa
- ✅ **Estado de Auth em Tempo Real:** Context API do React para gerenciamento de estado
- ✅ **Scripts Automatizados:** Inicialização com um comando para desenvolvimento

---

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (v18.0.0 ou superior) - [Download](https://nodejs.org/)
- **npm** ou **yarn** gerenciador de pacotes (vem com Node.js)
- **Conta Google** (para configuração Firebase e OAuth)
- **Git** (opcional, para controle de versão)

### Verifique Sua Instalação:

```bash
node --version  # Deve mostrar v18.0.0 ou superior
npm --version   # Deve mostrar 9.0.0 ou superior
```

---

## 🚀 Início Rápido

### Configuração Automatizada (Recomendado)

A maneira mais rápida de começar é usando nossos scripts de inicialização automatizados:

**Linux/Mac:**
```bash
./start.sh
```

**Windows:**
```batch
start.bat
```

Ou simplesmente **dê duplo clique** em `start.bat` no Windows.

### O que os Scripts Fazem:

1. ✅ Verificam instalação do Node.js
2. ⚠️ Verificam se `.env.local` existe (avisa se ausente)
3. 📦 Instalam dependências automaticamente (apenas na primeira vez)
4. 🚀 Iniciam servidor de desenvolvimento
5. 🌐 Abrem em http://localhost:3000

### Configuração Manual

Se preferir controle manual:

```bash
# 1. Instalar dependências
npm install

# 2. Configurar ambiente (veja seção Configuração)
cp .env.local.example .env.local
# Edite .env.local com suas credenciais Firebase

# 3. Iniciar servidor de desenvolvimento
npm run dev
```

---

## 🔥 Guia de Configuração do Firebase

Siga estes passos cuidadosamente para configurar o Firebase para sua aplicação.

### Passo 1: Criar um Projeto Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Faça login com sua conta Google
3. Clique em **"Adicionar projeto"** ou **"Criar um projeto"**
4. Digite um nome para o projeto (ex: "openid-connect-demo" ou "osrc-project")
5. Clique em **"Continuar"**
6. (Opcional) Ative ou desative Google Analytics
7. Clique em **"Criar projeto"**
8. Aguarde a criação do projeto (leva alguns segundos)
9. Clique em **"Continuar"** quando estiver pronto

### Passo 2: Registrar Seu App Web

**Na página de Visão Geral do Projeto, você verá:**
- Nome do seu projeto no topo
- Uma mensagem de boas-vindas: "Olá, [Seu Nome]"
- Um botão **"+ Adicionar app"** abaixo do nome do projeto

**Passos:**

1. **Clique no botão "+ Adicionar app"**
   - Localização: Abaixo do nome do projeto, próximo ao indicador "Plano Spark"

2. **Selecione Plataforma Web**
   - Um modal aparecerá com opções de plataforma
   - Clique no **ícone Web** (símbolo `</>`)

3. **Registre Seu App**
   - Digite um **Apelido do app**: "OpenID Connect Web App" (ou qualquer nome que preferir)
   - **NÃO marque** "Também configurar Firebase Hosting" (a menos que planeje fazer deploy)
   - Clique em **"Registrar app"**

4. **Copie a Configuração do Firebase**
   - Você verá um trecho de código com sua configuração Firebase
   - Será algo assim:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIza...",
     authDomain: "seu-projeto.firebaseapp.com",
     projectId: "seu-projeto-id",
     storageBucket: "seu-projeto.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123456789:web:abc123"
   };
   ```
   - **Copie estes valores** - você precisará deles para `.env.local`
   - Clique em **"Continuar para o console"**

### Passo 3: Ativar Autenticação Google

1. **Navegue até Authentication**
   - Olhe na barra lateral esquerda
   - Encontre e clique em **"Authentication"** (tem um ícone de chave 🔑)
   - Se não vir, clique em **"Build"** primeiro para expandir o menu

2. **Começar (se for primeira vez)**
   - Se for sua primeira vez, clique no botão **"Começar"**
   - Isso inicializa o serviço de Authentication

3. **Vá para a Aba Método de Login**
   - Você verá abas: "Usuários", "Método de login", "Modelos", "Uso", "Configurações"
   - Clique na aba **"Método de login"**

4. **Ativar Provedor Google**
   - Você verá uma lista de provedores de autenticação
   - Encontre **"Google"** na lista (geralmente perto do topo)
   - Clique na linha **"Google"**

5. **Configurar Login do Google**
   - Alterne o switch **"Ativar"** para LIGADO (ficará azul)
   - Selecione um **"E-mail de suporte do projeto"** no dropdown (geralmente seu email)
   - O **"Nome público do projeto"** é preenchido automaticamente (você pode alterar se quiser)
   - Clique em **"Salvar"**

6. **Verificar Configuração**
   - Google deve agora aparecer como "Ativado" na lista de provedores
   - O indicador de status deve estar verde/ativado

### Passo 4: Configurar Domínios Autorizados

1. **Vá para Configurações**
   - Ainda na seção Authentication
   - Clique na aba **"Configurações"** (no topo)

2. **Encontre Domínios Autorizados**
   - Role para baixo até encontrar a seção **"Domínios autorizados"**
   - Você deve ver `localhost` já listado
   - Se não, clique em **"Adicionar domínio"** e adicione `localhost`

### Passo 5: Obter Seus Valores de Configuração

**Onde encontrar sua config:**

1. **Vá para Configurações do Projeto**
   - Clique no **ícone de engrenagem** ⚙️ próximo a "Visão geral do projeto" na barra lateral esquerda
   - Selecione **"Configurações do projeto"**

2. **Role até Seus Apps**
   - Role para baixo até a seção "Seus apps"
   - Você verá seu app web listado

3. **Ver Config**
   - Clique no nome do seu app
   - Role para baixo para ver **"Configuração do SDK"**
   - Selecione o botão de opção **"Config"** (não npm)
   - Copie os valores

**Sua configuração deve parecer com:**
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "seu-projeto-id.firebaseapp.com",
  projectId: "seu-projeto-id",
  storageBucket: "seu-projeto-id.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};
```

---

## ⚙️ Configuração

### Criar Arquivo de Ambiente

1. **Copie o arquivo de exemplo:**

```bash
# Linux/Mac
cp .env.local.example .env.local

# Windows
copy .env.local.example .env.local
```

2. **Edite `.env.local` com sua configuração Firebase:**

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=seu-projeto-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=seu-projeto-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=seu-projeto-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
```

3. **Salve o arquivo**

**⚠️ Importante:** 
- Nunca faça commit de `.env.local` no controle de versão
- Já está incluído no `.gitignore`
- Não inclua aspas ao redor dos valores
- Certifique-se de que não há espaços extras

---

## 🏃 Executando a Aplicação

### Início Rápido com Scripts (Recomendado)

**Linux/Mac:**
```bash
./start.sh
```

**Windows:**
```batch
start.bat
```

Os scripts irão:
- Verificar instalação do Node.js
- Verificar configuração do ambiente
- Instalar dependências (se necessário)
- Iniciar o servidor de desenvolvimento

### Comandos Manuais

**Modo Desenvolvimento:**

```bash
# Instalar dependências (primeira vez)
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

A aplicação iniciará em [http://localhost:3000](http://localhost:3000)

**Build de Produção:**

```bash
# Fazer build da aplicação
npm run build

# Iniciar servidor de produção
npm start
```

### Parando o Servidor

Pressione `Ctrl + C` no terminal para parar o servidor de desenvolvimento.

---

## 🔄 Fluxo de Autenticação Explicado

### Diagrama de Fluxo Completo

```
1. USUÁRIO INICIA LOGIN
   ┌──────────┐
   │ Usuário  │  Clica em "Entrar com Google"
   │(Navegador)│
   └────┬─────┘
        │
        ▼
   ┌──────────────┐
   │  App Next.js │  Chama signInWithGoogle()
   │  (Frontend)  │
   └────┬─────────┘
        │
        │ Cria GoogleAuthProvider
        │ Abre janela popup
        │
        ▼

2. REDIRECIONAMENTO PARA GOOGLE
   ┌──────────────┐
   │   Firebase   │  Redireciona para endpoint OAuth do Google
   │     Auth     │  com client_id, redirect_uri, scope, state
   └────┬─────────┘
        │
        ▼
   ┌──────────────┐
   │    Google    │  Mostra página de login do Google
   │     IdP      │
   └────┬─────────┘
        │
        │ Usuário insere credenciais
        │ Usuário concede permissões
        │
        ▼

3. GOOGLE AUTENTICA USUÁRIO
   ┌──────────────┐
   │    Google    │  Valida credenciais
   │     IdP      │  Cria código de autorização
   └────┬─────────┘
        │
        │ Redireciona de volta com código de autorização
        │
        ▼

4. TROCA DE TOKEN
   ┌──────────────┐
   │   Firebase   │  Troca código de autorização
   │     Auth     │  por token ID e token de acesso
   └────┬─────────┘
        │
        │ Requisição POST para endpoint de token do Google
        │
        ▼
   ┌──────────────┐
   │    Google    │  Retorna tokens:
   │     IdP      │  - Token ID (JWT com info do usuário)
   └────┬─────────┘  - Token de Acesso (para chamadas API)
        │            - Token de Refresh (opcional)
        │
        ▼

5. VALIDAÇÃO DO TOKEN
   ┌──────────────┐
   │   Firebase   │  Valida token ID:
   │     Auth     │  - Verificação de assinatura
   └────┬─────────┘  - Verificação de expiração
        │            - Verificação de emissor
        │            - Verificação de audiência
        │
        ▼

6. CRIAÇÃO DE SESSÃO
   ┌──────────────┐
   │   Firebase   │  Cria sessão de usuário
   │     Auth     │  Armazena dados do usuário
   └────┬─────────┘
        │
        │ onAuthStateChanged dispara
        │
        ▼
   ┌──────────────┐
   │  App Next.js │  Atualiza AuthContext
   │  (Frontend)  │  Define estado do usuário
   └────┬─────────┘
        │
        │ Redireciona para dashboard
        │
        ▼

7. ACESSO CONCEDIDO
   ┌──────────┐
   │ Usuário  │  Vê dashboard com informações do perfil
   │(Navegador)│
   └──────────┘
```

### Explicação Passo a Passo

#### Passo 1: Usuário Inicia Login
- Usuário clica no botão "Entrar com Google"
- Aplicação chama função `signInWithGoogle()`
- Estado de carregamento é definido para mostrar spinner

#### Passo 2: Criação do Provedor OAuth
- Cria uma instância de `GoogleAuthProvider`
- Solicita escopos `profile` e `email`
- Força tela de seleção de conta
- Prepara parâmetros OAuth

#### Passo 3: Popup de Login
- Firebase abre uma janela popup
- Popup navega para endpoint OAuth do Google
- URL inclui:
  - `client_id`: ID do seu projeto Firebase
  - `redirect_uri`: URL de callback do Firebase
  - `scope`: openid profile email
  - `response_type`: code
  - `state`: Token de proteção CSRF

#### Passo 4: Autenticação do Usuário no Google
- Usuário vê página de login do Google
- Usuário insere email e senha
- Google valida credenciais
- Usuário vê tela de consentimento de permissões
- Usuário concede permissões solicitadas
- Google cria código de autorização

#### Passo 5: Retorno do Código de Autorização
- Google redireciona de volta para URL de callback do Firebase
- URL inclui código de autorização
- Firebase recebe o código

#### Passo 6: Troca de Token
Firebase faz uma requisição POST para endpoint de token do Google com:
- Código de autorização
- Client ID e secret
- Redirect URI
- Tipo de concessão

Google responde com:
- **Token de Acesso** - Para chamadas API
- **Token ID** - JWT com identidade do usuário
- **Token de Refresh** - Para renovação de token
- **Expira Em** - Tempo de vida do token

#### Passo 7: Validação do Token ID
Firebase valida o token ID (JWT):
1. **Verificação de Assinatura** - Verifica assinatura JWT usando chaves públicas do Google
2. **Validação de Claims**:
   - `iss` (emissor): Deve ser accounts.google.com
   - `aud` (audiência): Deve corresponder ao seu client ID
   - `exp` (expiração): Não deve estar expirado
   - `iat` (emitido em): Deve estar no passado

**Estrutura do Token ID:**
```json
{
  "header": {
    "alg": "RS256",
    "kid": "1234567890",
    "typ": "JWT"
  },
  "payload": {
    "iss": "https://accounts.google.com",
    "azp": "SEU_CLIENT_ID",
    "aud": "SEU_CLIENT_ID",
    "sub": "1234567890",
    "email": "usuario@example.com",
    "email_verified": true,
    "name": "João Silva",
    "picture": "https://lh3.googleusercontent.com/...",
    "given_name": "João",
    "family_name": "Silva",
    "locale": "pt-BR",
    "iat": 1234567890,
    "exp": 1234571490
  }
}
```

#### Passo 8: Criação do Objeto de Usuário
- Firebase cria um objeto User
- Listener `onAuthStateChanged` dispara
- AuthContext atualiza com dados do usuário
- Estado da aplicação muda para autenticado

#### Passo 9: Proteção de Rota
- Rotas protegidas verificam estado de autenticação
- Usuários não autenticados são redirecionados para home
- Usuários autenticados podem acessar conteúdo protegido

#### Passo 10: Exibir Informações do Usuário
- Dashboard exibe informações do usuário
- Dados vêm de claims do token ID
- Usuário pode fazer logout

---

## 🔍 Como Funciona

### 1. Configuração do Firebase (`lib/firebase.ts`)

Inicializa Firebase com suas credenciais de projeto:

```typescript
import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Inicializa Firebase apenas se ainda não foi inicializado
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

export const auth = getAuth(app);
export default app;
```

### 2. Funções de Autenticação (`lib/auth.ts`)

#### Entrar com Google

```typescript
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from './firebase';

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  
  // Solicitar escopos OAuth adicionais
  provider.addScope('profile');
  provider.addScope('email');
  
  // Forçar seleção de conta
  provider.setCustomParameters({
    prompt: 'select_account'
  });

  try {
    const result = await signInWithPopup(auth, provider);
    
    // Obter token de acesso OAuth e token ID
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    const idToken = credential?.idToken;
    
    console.log('Autenticação bem-sucedida');
    console.log('Token de Acesso:', token ? 'Presente' : 'Não disponível');
    console.log('Token ID (OIDC):', idToken ? 'Presente' : 'Não disponível');
    
    return result;
  } catch (error) {
    console.error('Erro durante login com Google:', error);
    throw error;
  }
};
```

**O que acontece:**
- Cria um provedor OAuth do Google
- Solicita escopos `profile` e `email`
- Abre popup de login do Google
- Retorna credenciais do usuário com token ID (JWT)

#### Sair

```typescript
import { signOut as firebaseSignOut } from 'firebase/auth';

export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
    console.log('Usuário desconectado com sucesso');
  } catch (error) {
    console.error('Erro durante logout:', error);
    throw error;
  }
};
```

### 3. Context de Autenticação (`contexts/AuthContext.tsx`)

Fornece estado de autenticação em toda a aplicação:

```typescript
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Inscrever-se em mudanças de estado de autenticação
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      
      if (user) {
        console.log('Usuário autenticado:', user.email);
      } else {
        console.log('Nenhum usuário autenticado');
      }
    });

    // Limpar inscrição ao desmontar
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
```

**Funcionalidades:**
- Escuta mudanças de estado de autenticação
- Fornece estados `user` e `loading` para todos os componentes
- Atualiza automaticamente quando usuário faz login/logout

### 4. Rotas Protegidas (`components/ProtectedRoute.tsx`)

Garante que apenas usuários autenticados possam acessar certas páginas:

```typescript
'use client';

import React, { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
};
```

### 5. Componentes de Interface

#### Botão de Login (`components/LoginButton.tsx`)
- Dispara fluxo de login do Google
- Gerencia estados de carregamento e erro
- Redireciona para dashboard em caso de sucesso
- Mostra mensagens de erro se autenticação falhar

#### Perfil do Usuário (`components/UserProfile.tsx`)
- Exibe informações do usuário a partir de claims do token ID
- Mostra email, nome, foto e metadados de autenticação
- Fornece funcionalidade de logout
- Exibe informações do provedor

### 6. Páginas

#### Página Inicial (`app/page.tsx`)
- Página de destino com botão de login
- Explica o fluxo de autenticação
- Redireciona usuários autenticados para dashboard
- Mostra como OpenID Connect funciona

#### Dashboard (`app/dashboard/page.tsx`)
- Rota protegida (requer autenticação)
- Exibe informações de perfil do usuário
- Mostra dados de claims do token ID
- Permite que usuário faça logout

---

## 📁 Estrutura do Projeto

```
trab-osrc/
├── app/                      # Diretório app do Next.js
│   ├── dashboard/           # Página de dashboard protegida
│   │   └── page.tsx
│   ├── layout.tsx           # Layout raiz com AuthProvider
│   ├── page.tsx             # Página inicial/login
│   └── globals.css          # Estilos globais
├── components/              # Componentes React
│   ├── LoginButton.tsx      # Botão de login Google
│   ├── ProtectedRoute.tsx   # Wrapper de proteção de rota
│   └── UserProfile.tsx      # Exibição de informações do usuário
├── contexts/                # Contexts React
│   └── AuthContext.tsx      # Gerenciamento de estado de autenticação
├── lib/                     # Bibliotecas utilitárias
│   ├── auth.ts             # Funções de autenticação
│   └── firebase.ts         # Configuração Firebase
├── .env.local.example       # Template de variáveis de ambiente
├── .gitignore              # Regras de ignore do Git
├── next.config.js          # Configuração Next.js
├── package.json            # Dependências do projeto
├── postcss.config.js       # Configuração PostCSS
├── README.md               # Versão em inglês
├── LEIA-ME.md              # Este arquivo
├── start.sh                # Script de inicialização Linux/Mac
├── start.bat               # Script de inicialização Windows
├── tailwind.config.js      # Configuração TailwindCSS
└── tsconfig.json           # Configuração TypeScript
```

---

## 🔒 Considerações de Segurança

### O que Torna Esta Implementação Segura?

#### 1. Sem Armazenamento de Senhas
- Senhas nunca são armazenadas na aplicação
- Autenticação é delegada à infraestrutura segura do Google
- Reduz significativamente a superfície de ataque

#### 2. Validação de Token ID
- Firebase valida automaticamente tokens ID
- Tokens são assinados pelo Google e verificados criptograficamente
- Verificação de assinatura usando chaves públicas do Google
- Validação de claims (emissor, audiência, expiração)

#### 3. HTTPS Obrigatório
- OAuth 2.0 e OIDC exigem HTTPS em produção
- Previne ataques man-in-the-middle
- Protege dados sensíveis em trânsito

#### 4. Expiração de Token
- Tokens ID têm tempo de vida limitado (tipicamente 1 hora)
- Renovação automática de token gerenciada pelo Firebase
- Previne ataques de replay
- Reduz impacto de roubo de token

#### 5. Limitação de Escopo
- Solicita apenas escopos necessários (`profile`, `email`)
- Segue princípio do menor privilégio
- Usuário pode ver exatamente o que é solicitado
- Minimiza exposição de dados

#### 6. Proteção CSRF
- Parâmetro state no fluxo OAuth
- Previne falsificação de requisição entre sites
- Integrado à especificação OAuth 2.0
- Automaticamente gerenciado pelo Firebase

#### 7. Armazenamento Seguro de Token
- Tokens armazenados de forma segura pelo Firebase
- Usa mecanismos de armazenamento seguro do navegador
- Criptografia automática
- Protegido contra ataques XSS

### Melhores Práticas Implementadas

- ✅ Variáveis de ambiente para configuração sensível
- ✅ Proteção de rota no lado do cliente
- ✅ Armazenamento seguro de token (gerenciado pelo Firebase)
- ✅ Proteção CSRF (integrada ao fluxo OAuth 2.0)
- ✅ Validação de parâmetro state (gerenciada pelo Firebase)
- ✅ Expiração e renovação de token
- ✅ Limitação de escopo
- ✅ Tratamento de erros e feedback ao usuário

### Recomendações de Segurança

1. **Nunca faça commit de `.env.local`** no controle de versão
   - Contém chaves API sensíveis
   - Já incluído no `.gitignore`
   - Use variáveis de ambiente em produção

2. **Use HTTPS** em ambientes de produção
   - Exigido por OAuth 2.0 e OIDC
   - Protege dados em trânsito
   - Previne ataques man-in-the-middle

3. **Implemente verificação no lado do servidor** para operações sensíveis
   - Não confie apenas em autenticação do lado do cliente
   - Verifique tokens no servidor
   - Use Firebase Admin SDK no lado do servidor

4. **Monitore logs de Authentication do Firebase** para atividade suspeita
   - Verifique padrões de login incomuns
   - Monitore tentativas de autenticação falhadas
   - Configure alertas para anomalias

5. **Mantenha dependências atualizadas** para corrigir vulnerabilidades de segurança
   - Execute regularmente `npm audit`
   - Atualize pacotes prontamente
   - Revise avisos de segurança

6. **Implemente limitação de taxa** para endpoints de autenticação
   - Previne ataques de força bruta
   - Limita tentativas de login falhadas
   - Use regras de segurança do Firebase

7. **Use Regras de Segurança do Firebase** para acesso a banco de dados/armazenamento
   - Implemente controle de acesso adequado
   - Valide dados no servidor
   - Não confie apenas em validação do lado do cliente

---

## 🛠️ Tecnologias Utilizadas

### Framework Frontend
- **Next.js 14** - Framework React com App Router
- **React 18** - Biblioteca UI
- **TypeScript** - JavaScript com segurança de tipos

### Autenticação
- **Firebase Authentication** - Serviço de autenticação
- **Google OAuth 2.0** - Provedor de identidade
- **OpenID Connect** - Protocolo de autenticação

### Estilização
- **TailwindCSS** - Framework CSS utility-first
- **Lucide React** - Biblioteca de ícones

### Ferramentas de Desenvolvimento
- **ESLint** - Linting de código
- **PostCSS** - Processamento CSS
- **Autoprefixer** - Prefixação de vendor CSS

---

## 🐛 Solução de Problemas

### Problemas Comuns e Soluções

#### 1. "Firebase: Error (auth/popup-blocked)"
**Problema:** Navegador bloqueou o popup de login

**Solução:** 
- Permita popups para localhost nas configurações do navegador
- Chrome: Clique no ícone de popup na barra de endereços
- Firefox: Clique em "Opções" → "Permitir popups para localhost"
- Safari: Preferências → Sites → Janelas Pop-up

#### 2. "Firebase: Error (auth/unauthorized-domain)"
**Problema:** Domínio não autorizado no Firebase

**Solução:** 
- Vá para Firebase Console
- Navegue até Authentication → Configurações → Domínios autorizados
- Adicione `localhost` para desenvolvimento
- Adicione seu domínio de produção ao fazer deploy

#### 3. Variáveis de ambiente não carregam
**Problema:** `.env.local` não está sendo lido

**Solução:** 
- Certifique-se de que `.env.local` existe na raiz do projeto
- Reinicie o servidor de desenvolvimento após alterar variáveis de ambiente
- Verifique se nomes de variáveis começam com `NEXT_PUBLIC_`
- Verifique erros de digitação nos nomes das variáveis
- Não use aspas ao redor dos valores

#### 4. Erros "Cannot find module"
**Problema:** Dependências não instaladas

**Solução:** 
- Execute `npm install` ou `yarn install`
- Delete `node_modules` e `package-lock.json`, depois reinstale
- Verifique versão do Node.js (deve ser v18+)

#### 5. Erros TypeScript
**Problema:** Erros de tipo no código

**Solução:** 
- Certifique-se de que todas as dependências estão instaladas
- Execute `npm run build` para verificar erros
- Verifique se `tsconfig.json` está configurado corretamente
- Reinicie seu IDE/editor

#### 6. "Port 3000 already in use"
**Problema:** Outra aplicação está usando a porta 3000

**Solução:**
- Pare a outra aplicação
- Ou altere a porta em `package.json`:
  ```json
  "dev": "next dev -p 3001"
  ```

#### 7. Popup fecha imediatamente
**Problema:** Popup de login fecha sem completar

**Solução:**
- Verifique console do navegador para erros
- Verifique se configuração do Firebase está correta
- Certifique-se de que autenticação Google está ativada no Firebase
- Verifique conexão com internet

#### 8. "Network Error" durante login
**Problema:** Não consegue conectar ao Firebase/Google

**Solução:**
- Verifique conexão com internet
- Verifique se projeto Firebase está ativo
- Verifique se firewall está bloqueando conexões
- Tente desabilitar VPN se estiver usando

### Obtendo Ajuda

Se encontrar problemas não cobertos aqui:

1. Verifique console do navegador para mensagens de erro
2. Revise Firebase Console para logs de autenticação
3. Verifique se todos os passos de configuração foram completados
4. Verifique se todas as variáveis de ambiente estão definidas corretamente
5. Tente o processo de configuração manual em vez dos scripts

---

## 📚 Recursos Adicionais

### OpenID Connect
- [Especificação OpenID Connect](https://openid.net/connect/)
- [OAuth 2.0 RFC 6749](https://tools.ietf.org/html/rfc6749)
- [Entendendo Tokens ID](https://auth0.com/docs/secure/tokens/id-tokens)
- [JWT.io - Depurador JWT](https://jwt.io/)

### Firebase
- [Documentação Firebase Authentication](https://firebase.google.com/docs/auth)
- [Login com Google para Web](https://firebase.google.com/docs/auth/web/google-signin)
- [Melhores Práticas de Segurança Firebase](https://firebase.google.com/docs/rules/basics)
- [Firebase Console](https://console.firebase.google.com/)

### Next.js
- [Documentação Next.js](https://nextjs.org/docs)
- [Padrões de Autenticação Next.js](https://nextjs.org/docs/authentication)
- [Next.js App Router](https://nextjs.org/docs/app)

### Segurança
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- [Melhores Práticas de Segurança OAuth 2.0](https://tools.ietf.org/html/draft-ietf-oauth-security-topics)

---

## 📝 Licença

Este projeto foi criado para fins educacionais como parte da disciplina de Segurança de Redes na UDESC/CCT.

---

## 🎓 Contexto Educacional

Esta implementação serve como demonstração prática de:

- Protocolo de autenticação **OpenID Connect (OIDC)**
- Framework de autorização **OAuth 2.0**
- Integração de **Identity Provider (IdP)**
- Melhores práticas de **autenticação segura**
- **Desenvolvimento web moderno** com React e Next.js
- **Firebase** como Backend-as-a-Service (BaaS)
- Desenvolvimento com **TypeScript** para segurança de tipos
- **Design responsivo** com TailwindCSS

### Resultados de Aprendizagem

Estudantes e desenvolvedores aprenderão:

1. Como OpenID Connect funciona na prática
2. Fluxo de autorização OAuth 2.0
3. Estrutura e validação de token JWT
4. Padrões modernos de autenticação web
5. Integração e configuração do Firebase
6. Gerenciamento de estado React com Context API
7. Melhores práticas de desenvolvimento TypeScript
8. Considerações de segurança para aplicações web
9. Implementação de rota protegida
10. Gerenciamento de sessão de usuário

### Casos de Uso

Esta implementação pode ser usada para:

- **Aplicações Web** que requerem autenticação de usuário
- **Projetos Educacionais** demonstrando OIDC
- **Protótipos** que precisam de configuração rápida de auth
- **Aplicações Enterprise** com Google Workspace
- **Plataformas SaaS** com login social
- **Projetos de Portfólio** mostrando auth moderna

---

## 🎯 Objetivos do Projeto

### Objetivo Principal

Implementar autenticação de usuário para uma aplicação web usando o protocolo OpenID Connect (OIDC) com Google como Identity Provider (IdP), permitindo que usuários façam login de forma segura com suas contas Google existentes em vez de criar novas credenciais.

### Objetivos Secundários

1. Demonstrar protocolos de autenticação padrão da indústria
2. Mostrar implementação de autenticação segura
3. Fornecer recurso educacional para aprender OIDC
4. Criar exemplo de código pronto para produção
5. Documentar melhores práticas e considerações de segurança

---

## 🏆 Conclusão

Este projeto demonstra com sucesso uma implementação completa, segura e pronta para produção de autenticação OpenID Connect usando Google como Identity Provider. Combina tecnologias web modernas com protocolos de segurança padrão da indústria para criar um exemplo prático de padrões de autenticação contemporâneos.

A implementação está totalmente documentada, fácil de entender e serve como excelente recurso educacional para aprender sobre OpenID Connect, OAuth 2.0 e autenticação web segura.

### Principais Conquistas

✅ Implementação completa de OIDC com Google IdP  
✅ Código seguro e pronto para produção  
✅ Documentação abrangente  
✅ Scripts de configuração automatizados  
✅ UI moderna com design responsivo  
✅ Suporte completo a TypeScript  
✅ Valor educacional para estudantes  

---

**Para dúvidas ou problemas, entre em contato com os autores do projeto ou instrutor do curso.**

**Última Atualização:** Novembro 2024
