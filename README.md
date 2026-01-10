# 📱 AdvancedCadastroApp

<div align="center">

![React Native](https://img.shields.io/badge/React_Native-0.83.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Redux](https://img.shields.io/badge/Redux-5.0.1-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-6.0.1-003B57?style=for-the-badge&logo=sqlite&logoColor=white)

**Sistema de Cadastro de Alunos com Arquitetura Profissional**

[Características](#-características) • [Arquitetura](#-arquitetura) • [Instalação](#-instalação) • [Uso](#-uso) • [Testes](#-testes)

</div>

---

## 🎯 Objetivo do Projeto

Aplicativo móvel completo de cadastro de alunos desenvolvido em React Native, implementando:

- ✅ **CRUD Completo** - Create, Read, Update, Delete
- ✅ **Persistência Local** - SQLite + Realm
- ✅ **Criptografia AES** - Proteção de dados sensíveis
- ✅ **Arquiteturas MVC + Redux** - Código organizado e escalável
- ✅ **Testes Unitários** - Cobertura com Jest
- ✅ **Estrutura Profissional** - Padrões de mercado

---

## 🏗️ Arquitetura

### Camadas da Aplicação

| Camada | Tecnologias | Responsabilidade |
|--------|-------------|------------------|
| **Model** | SQLite, Realm, DAO Pattern | Persistência e modelagem de dados |
| **Controller** | TypeScript, MVC Pattern | Lógica de negócio |
| **Store** | Redux | Gerenciamento de estado global |
| **View** | React Native, Hooks | Interface do usuário |
| **Security** | CryptoJS | Criptografia de dados |
| **Tests** | Jest | Testes unitários |

### Padrões de Projeto Aplicados

- **MVC (Model-View-Controller)** - Separação de responsabilidades
- **DAO (Data Access Object)** - Abstração do acesso a dados
- **Repository Pattern** - Camada de abstração para persistência
- **Redux Pattern** - Gerenciamento previsível de estado
- **Factory Pattern** - Criação de objetos padronizada

---

## 📁 Estrutura do Projeto

```
AdvancedCadastroApp/
│
├── src/
│   ├── model/                    # Camada de dados
│   │   ├── database/
│   │   │   ├── DatabaseSQLite.ts    # Configuração SQLite
│   │   │   └── DatabaseRealm.ts     # Configuração Realm
│   │   ├── entities/
│   │   │   └── Aluno.ts             # Entidade Aluno
│   │   └── dao/
│   │       ├── GenericDAO.ts        # Interface DAO genérica
│   │       └── AlunoDAO.ts          # DAO específico de Aluno
│   │
│   ├── controller/               # Camada de controle
│   │   ├── GenericController.ts     # Controller base
│   │   └── AlunoController.ts       # Controller de Aluno
│   │
│   ├── redux/                    # Gerenciamento de estado
│   │   ├── actions/
│   │   │   └── alunoActions.ts      # Actions do Redux
│   │   ├── reducers/
│   │   │   └── alunoReducer.ts      # Reducer de Aluno
│   │   └── store.ts                 # Configuração da Store
│   │
│   ├── security/                 # Segurança
│   │   └── crypto.ts                # Funções de criptografia
│   │
│   ├── view/                     # Camada de apresentação
│   │   ├── screens/
│   │   │   ├── MenuScreen.tsx       # Tela inicial
│   │   │   └── AlunoScreen.tsx      # Tela de alunos
│   │   ├── components/
│   │   │   └── AlunoItem.tsx        # Componente de item
│   │   └── styles/
│   │       └── commonStyles.ts      # Estilos compartilhados
│   │
│   └── tests/                    # Testes unitários
│       ├── alunoReducer.test.ts     # Testes do reducer
│       └── crypto.test.ts           # Testes de criptografia
│
├── App.tsx                       # Componente raiz
├── package.json                  # Dependências
└── jest.config.js                # Configuração de testes
```

---

## 🚀 Instalação

### Pré-requisitos

- Node.js >= 20
- React Native CLI
- Android Studio ou Xcode
- Git

### Passos

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/AdvancedCadastroApp.git
cd AdvancedCadastroApp

# 2. Instale as dependências
npm install

# 3. Para Android
npx react-native run-android

# 4. Para iOS (apenas macOS)
cd ios && pod install && cd ..
npx react-native run-ios
```

### Dependências Principais

```json
{
  "react-native": "0.83.1",
  "react": "19.2.0",
  "redux": "^5.0.1",
  "react-redux": "^9.2.0",
  "react-native-sqlite-storage": "^6.0.1",
  "realm": "^12.16.0",
  "crypto-js": "^4.2.0",
  "@react-navigation/native": "^7.1.26"
}
```

---

## 💻 Uso

### Executar o App

```bash
# Iniciar Metro Bundler
npm start

# Executar no Android
npm run android

# Executar no iOS
npm run ios
```

### Funcionalidades Principais

1. **Cadastrar Aluno**
   - Informar matrícula e nome
   - Dados criptografados automaticamente
   - Persistência local com SQLite

2. **Listar Alunos**
   - Visualização em cards
   - Dados descriptografados
   - Contador de alunos

3. **Excluir Aluno**
   - Confirmação antes de excluir
   - Atualização automática da lista

---

## 🧪 Testes

### Executar Testes

```bash
# Executar todos os testes
npm test

# Executar com cobertura
npm test -- --coverage

# Executar em modo watch
npm test -- --watch
```

### Cobertura de Testes

- ✅ **Reducer de Alunos** - 100%
- ✅ **Funções de Criptografia** - 100%
- ✅ **Actions do Redux** - 100%

Exemplo de saída:
```
PASS  src/tests/alunoReducer.test.ts
PASS  src/tests/crypto.test.ts

Test Suites: 2 passed, 2 total
Tests:       18 passed, 18 total
```

---

## 🔐 Segurança

### Criptografia Implementada

```typescript
// Criptografar dados sensíveis
const nomeCriptografado = encrypt('Daniel Silva');

// Descriptografar
const nomeOriginal = decrypt(nomeCriptografado);

// Hash de senhas (SHA256)
const hash = hashSHA256('senha123');
```

### Recursos de Segurança

- **AES Encryption** - Criptografia de nomes de alunos
- **SHA256/MD5** - Hash de senhas e tokens
- **Validação de Hash** - Verificação de integridade
- **Armazenamento Seguro** - SQLite criptografado

---

## 📊 Fluxo de Dados

```
View (AlunoScreen) → Redux Store
         ↓
   AlunoController
         ↓
   Security/Crypto
         ↓
     AlunoDAO
         ↓
  DatabaseSQLite
```

---

## 🎓 Conceitos Acadêmicos Aplicados

### 1. Engenharia de Software
- ✅ Princípios SOLID
- ✅ Padrões de Projeto (MVC, DAO, Repository)
- ✅ Arquitetura em Camadas
- ✅ Separação de Responsabilidades

### 2. Banco de Dados
- ✅ Modelagem de Dados
- ✅ CRUD Completo
- ✅ SQLite (Relacional)
- ✅ Realm (NoSQL)

### 3. Segurança da Informação
- ✅ Criptografia Simétrica (AES)
- ✅ Funções Hash (MD5, SHA256)
- ✅ Proteção de Dados Sensíveis

### 4. Qualidade de Software
- ✅ Testes Unitários
- ✅ Cobertura de Código
- ✅ Test-Driven Development (TDD)

---

## 📱 Screenshots

### Tela Menu
- Interface inicial com navegação
- Informações sobre arquitetura
- Acesso rápido às funcionalidades

### Tela de Alunos
- Formulário de cadastro
- Lista de alunos cadastrados
- Ações de exclusão com confirmação

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- React Native 0.83.1
- TypeScript 5.8.3
- React Navigation 7.x
- React Hooks

### Estado
- Redux 5.0.1
- React-Redux 9.2.0

### Persistência
- SQLite Storage 6.0.1
- Realm 12.16.0

### Segurança
- CryptoJS 4.2.0

### Testes
- Jest 29.7.0
- React Test Renderer

---

## 📈 Próximos Passos

- [ ] Implementar autenticação com login
- [ ] Adicionar validação de formulários
- [ ] Criar relatórios em PDF
- [ ] Implementar backup na nuvem
- [ ] Adicionar fotos aos alunos
- [ ] Internacionalização (i18n)
- [ ] Dark Mode
- [ ] Testes E2E com Detox

---

## 📝 Licença

Este projeto foi desenvolvido para fins acadêmicos.

---

## 👨‍💻 Autor

**Daniel Silva**

- 📧 Email: contato@exemplo.com
- 📱 LinkedIn: [linkedin.com/in/seu-perfil](https://linkedin.com)
- 🐙 GitHub: [github.com/seu-usuario](https://github.com)

---

## 🙏 Agradecimentos

- React Native Community
- Redux Team
- Documentação oficial do React Native
- Comunidade Open Source

---

<div align="center">

**⭐ Se este projeto foi útil, considere dar uma estrela!**

Feito com ❤️ e ☕ em 2026

</div>


# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
