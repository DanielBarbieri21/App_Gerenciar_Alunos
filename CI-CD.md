# 🔄 CI/CD Configuration Guide

## ✅ Configuração Completa de CI/CD para AdvancedCadastroApp

Este projeto inclui pipelines automatizadas para **GitHub Actions** e **GitLab CI**.

---

## 📊 Coverage Atual

```
File              | % Stmts | % Branch | % Funcs | % Lines
All files         |  85.41% |  84.21%  | 100%    | 83.33%
```

---

## 🟦 GitHub Actions

### Arquivos de Configuração

```
.github/workflows/
├── tests.yml              # Jest tests + codecov
├── lint.yml               # ESLint + Prettier + TypeScript
├── build-android.yml      # Build APK Android
└── sonarqube.yml          # SonarQube quality analysis
```

### Como Usar

1. **Push para main/develop** → Executa automaticamente:
   - ✅ Testes (Jest)
   - ✅ Lint (ESLint)
   - ✅ Build APK
   - ✅ SonarQube

2. **Pull Request** → Executa:
   - ✅ Testes
   - ✅ Lint
   - ✅ Coverage report na PR

### Secrets Necessários (GitHub)

```bash
# Settings → Secrets and variables → Actions

SONAR_HOST_URL      # Ex: https://sonarqube.example.com
SONAR_TOKEN         # Token do SonarQube
CODECOV_TOKEN       # Token do Codecov (opcional)
```

### Status Badge (README.md)

```markdown
[![Tests](https://github.com/seu-usuario/AdvancedCadastroApp/workflows/Tests/badge.svg)](https://github.com/seu-usuario/AdvancedCadastroApp/actions)
[![Lint](https://github.com/seu-usuario/AdvancedCadastroApp/workflows/Lint%20%26%20Format/badge.svg)](https://github.com/seu-usuario/AdvancedCadastroApp/actions)
[![Build](https://github.com/seu-usuario/AdvancedCadastroApp/workflows/Build%20Android%20APK/badge.svg)](https://github.com/seu-usuario/AdvancedCadastroApp/actions)
[![Quality](https://github.com/seu-usuario/AdvancedCadastroApp/workflows/SonarQube%20Code%20Quality/badge.svg)](https://github.com/seu-usuario/AdvancedCadastroApp/actions)
```

---

## 🟥 GitLab CI

### Arquivo de Configuração

```
.gitlab-ci.yml        # Pipeline completa com 5 stages
sonar-project.properties  # Configuração SonarQube
```

### Stages da Pipeline

#### 1️⃣ **Test** (Testes Unitários)
- `test:jest` - Jest com cobertura
- `test:unit` - Testes unitários

#### 2️⃣ **Lint** (Qualidade de Código)
- `lint:eslint` - ESLint
- `lint:prettier` - Formatting
- `lint:typescript` - Type checking

#### 3️⃣ **Build** (Compilação)
- `build:android:debug` - APK Debug (main, develop)
- `build:android:release` - APK Release (tags apenas)

#### 4️⃣ **Quality** (Análise)
- `quality:sonarqube` - SonarQube analysis
- `quality:codecov` - Codecov coverage

#### 5️⃣ **Deploy** (Deployment)
- `deploy:staging` - Manual (develop)
- `deploy:production` - Manual (tags)
- `pages` - GitLab Pages com coverage report

### Como Usar

1. **Push** → Executa automaticamente test + lint
2. **Merge Request** → Executa test + lint + build
3. **Tag** → Compila release APK
4. **Main branch** → Publica coverage report em GitLab Pages

### Secrets Necessários (GitLab)

```bash
# Settings → CI/CD → Variables

SONAR_HOST_URL      # Ex: https://sonarqube.example.com
SONAR_TOKEN         # Token do SonarQube
CODECOV_TOKEN       # Token do Codecov
```

### Artifacts (Artifacts Storage)

| Build | Path | Retention |
|-------|------|-----------|
| Debug APK | `android/app/build/outputs/apk/debug/app-debug.apk` | 30 dias |
| Release APK | `android/app/build/outputs/apk/release/app-release-unsigned.apk` | 90 dias |
| Coverage | `coverage/` | 30 dias |

---

## 📋 Configuração SonarQube

### Para GitHub Actions

```yaml
env:
  SONAR_HOST_URL: ${{ secrets.SONAR_HOST_URL }}
  SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
```

### Para GitLab CI

```yaml
-Dsonar.host.url=$SONAR_HOST_URL
-Dsonar.login=$SONAR_TOKEN
```

### Obtendo tokens SonarQube

1. Acesse `https://seu-sonarqube.com`
2. User Profile → Security → Generate Tokens
3. Configure nos secrets do GitHub/GitLab

---

## 🚀 Fluxo Recomendado

### 1. Local Development
```bash
npm test              # Testa localmente
npm run lint          # Lint
npm run android       # Build local
```

### 2. Push para develop
```bash
git push origin develop
# GitHub Actions inicia automaticamente
# ✅ Tests
# ✅ Lint
# ✅ Build APK Debug
# ✅ SonarQube
```

### 3. Pull Request
```bash
git push origin feature-branch
# GitHub Actions inicia
# Comentário automático com coverage
# Merge se tudo passar
```

### 4. Release (Tag)
```bash
git tag v1.0.0
git push origin v1.0.0
# GitHub Actions inicia
# Build APK Release
# Upload para artifacts
```

---

## 📊 Métricas & Relatórios

### GitHub Actions
- Coverage report em Codecov
- Build status em Actions tab

### GitLab CI
- Coverage report em GitLab Pages: `https://seu-projeto.gitlab.io/AdvancedCadastroApp`
- Pipeline status em Deployments
- Artifacts baixáveis

---

## 🔧 Troubleshooting

### Erro: "SONAR_TOKEN not set"
```bash
# GitHub: Settings → Secrets → Add SONAR_TOKEN
# GitLab: Settings → CI/CD → Variables → Add SONAR_TOKEN
```

### Erro: "Android SDK not found"
```bash
# GitHub: uses android-actions/setup-android@v2
# GitLab: image: cirrusci/android-sdk:latest
```

### Erro: "APK build failed"
```bash
# Local:
cd android
./gradlew clean
./gradlew assembleDebug
```

---

## ✅ Checklist de Configuração

- [ ] GitHub ou GitLab repositório criado
- [ ] `.github/workflows/` ou `.gitlab-ci.yml` verificados
- [ ] Secrets (`SONAR_TOKEN`, `SONAR_HOST_URL`) configurados
- [ ] Testes passando: `npm test`
- [ ] Build funciona: `npm run android`
- [ ] Pipeline iniciada após push
- [ ] Coverage report visível
- [ ] Badge status atualizado no README

---

## 📈 Próximas Melhorias

- [ ] Slack notifications
- [ ] Email notifications
- [ ] Automated versioning (semver)
- [ ] Release notes automáticas
- [ ] Play Store deployment (beta)
- [ ] Firebase App Distribution

---

## 📚 Referências

- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [GitLab CI/CD Docs](https://docs.gitlab.com/ee/ci/)
- [SonarQube](https://www.sonarqube.org/)
- [Codecov](https://codecov.io/)

