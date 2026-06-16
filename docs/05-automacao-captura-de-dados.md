# 05 — Automação e Captura de Dados (o coração do app)

> Este é o documento mais importante. A promessa "automático ao máximo" vive ou morre aqui.
> **Conclusão geral: usar VÁRIAS fontes, tolerar falhas, permitir sempre correção manual. Nunca depender de uma só.**

## A matriz de fontes (resumo)

| Fonte | Android | iOS | Fiabilidade | Risco de política | Custo |
|-------|:-------:|:---:|-------------|-------------------|-------|
| **Notificações** (`NotificationListenerService`) | ✅ | ❌ impossível | Frágil (OEM mata serviços) | Médio-alto (Google) | Baixo |
| **SMS do banco** (`READ_SMS`) | ⚠️ exceção | ❌ impossível | Frágil | **Muito alto** (Google) | Baixo |
| **Open Banking / Open Finance** (aggregador) | ✅ | ✅ | Boa (regulado) | Baixo | **Por utilizador (€€)** |
| **E-mail** (Gmail API) | ✅ | ✅ | Média | Médio (CASA, ver `08`) | Auditoria anual cara |
| **Entrada rápida** (atalho/voz/partilha) | ✅ | ✅ | Alta (manual) | Nenhum | Baixo |

A automação real = **Open Banking (espinha dorsal) + Notificações (Android, extra) + E-mail (recibos) + Entrada rápida (rede de segurança)**, com **deduplicação** a juntar tudo.

---

## 1. Leitura de notificações (Android) — o pedido do chefe

### Como funciona
- `NotificationListenerService` (API 18+): a app recebe um callback para cada notificação postada por qualquer app. Lê-se `sbn.getPackageName()` (para filtrar só bancos) e o texto em `notification.extras` (`EXTRA_TITLE`, `EXTRA_TEXT`, `EXTRA_BIG_TEXT`).
- Permissão `BIND_NOTIFICATION_LISTENER_SERVICE` + o utilizador tem de **ativar manualmente** em Definições → Acesso a notificações (`ACTION_NOTIFICATION_LISTENER_SETTINGS`). **Não pode ser concedida programaticamente.**
- Parsing: regex sobre o texto (montante, débito/crédito, comerciante, últimos 4 dígitos). É a técnica das apps indianas (Walnut/axio) porque lá os bancos mandam SMS/notificação por cada transação.

### A realidade crua (fragilidade)
1. **Fabricantes matam serviços em segundo plano.** Xiaomi/MIUI, Huawei, Oppo, Vivo, Samsung, OnePlus — ~20–40% das falhas de notificações em segundo plano vêm daqui. Mitigar pedindo ao utilizador para ativar "Autostart" e desligar otimização de bateria — mas **não se pode forçar**. Referência: dontkillmyapp.com.
2. **Notificações podem ser dispensadas antes de lidas; bancos atualizam a mesma notificação in-place.**
3. **Parsers partem** quando o banco muda o texto. Cada banco/idioma é um template manual.
4. **Duplicados:** SMS + push da mesma transação → contar duas vezes.

### Viabilidade em Expo/React Native
- **Não funciona no Expo Go.** Precisa de: módulo nativo Android + config plugin (injeta o `<service>` no manifest no prebuild) + dev build / EAS.
- Biblioteca de referência: `react-native-android-notification-listener` (leandrosimoes) — entrega via **Headless JS task**. ⚠️ **Não atualizada desde dez. 2022 (v5.0.1)** — contar com fork/patch para Android atual.
- `expo-notifications` **NÃO** resolve isto (só gere as notificações da própria app).

### Veredicto
**Sim, dá para fazer no Android, como fonte EXTRA.** Mas é best-effort: vai falhar transações, duplicar, e exigir manutenção contínua de parsers. Tem de haver sempre correção manual e reconciliação com o Open Banking. **No iOS é impossível** — planear iOS à volta de Open Banking + e-mail.

---

## 2. SMS do banco (Android) — alto risco

- `READ_SMS`/`RECEIVE_SMS` estão entre as permissões **mais restritas** da Google Play. Regra: só o **handler de SMS por defeito** pode usá-las, OU obter exceção aprovada via "Permissions Declaration Form".
- **Boa notícia vs 2019:** existe agora a categoria de exceção **"SMS-based money management" ("apps that track and manage budget")**. No papel, um app de orçamento é **elegível**.
- **Má notícia:** elegível ≠ aprovado. A exceção exige que **não haja método alternativo**, e os revisores frequentemente respondem que **"introdução manual é a alternativa"** — o que reprova a maioria. Caso real 2025 (FinVantage) foi recusado exatamente assim e teve de lançar sem SMS.
- **Risco de conta:** uso não-declarado pode levar a **suspensão da app e/ou terminação da conta de developer**.

**Veredicto:** tratar SMS como funcionalidade que **provavelmente não será permitida no lançamento**. Não a tornar o destaque da listagem. Ter sempre um build sem SMS pronto. As **notificações** são o substituto de menor risco (não estão sob o regime de SMS).

---

## 3. Open Banking / Open Finance — a espinha dorsal fiável

> Caminho regulado, cross-platform (iOS+Android), mas com **custo por utilizador** e **fricção de re-consentimento**. **Usar sempre um aggregador licenciado — nunca tirar a própria licença.**

### Europa / Portugal (PSD2)
- Ler saldos/transações = serviço **AIS**; o aggregador é a parte regulada. Nós mantemos responsabilidade **RGPD** sobre os dados guardados.
- **Re-autenticação a cada 180 dias** (regra confirmada para 2026): o utilizador tem de re-login no banco ~de 6 em 6 meses, do lado do banco. É a maior fricção. PSD3/PSR (~2027) deve aliviar — mas não antes disso.
- Bancos-alvo (CGD, Millennium BCP, Santander Totta, Novo Banco) acessíveis via SIBS/Berlin Group.
- **Aggregadores:**
  - **GoCardless (ex-Nordigen):** **única opção de produção genuinamente grátis** (~50 contas/30 dias, 24 meses de histórico). ⚠️ **Parou de aceitar novos registos ~jul. 2025 — verificar antes de depender disto.**
  - **Tink** (Visa, forte na CGD), **TrueLayer**, **Salt Edge**, **Plaid (Europa)** — todos por orçamento/sales, sem tier grátis de produção.
- **MB Way:** não há feed dedicado; uma transferência MB Way aparece como linha normal da conta no feed PSD2 (com descritor SIBS/MB WAY), sem metadados ricos. A "API MB WAY" da SIBS é para **aceitar pagamentos**, não histórico.

### Brasil (Open Finance Brasil + Pix)
- Ecossistema **mandatado e detido pelo Banco Central** → cobertura profunda. Fase 2 partilha contas, cartões (incl. faturas) e crédito.
- **Pix:** transações Pix aparecem nos dados da Fase 2 (leitura). Iniciar pagamentos (escrever) é atividade licenciada à parte. **Pix Automático** (recorrente) lançou jun. 2025.
- **Consentimento:** máx. ~12 meses, renovável dentro da app desde a Resolução Conjunta 7/2023; reformas 2026 vão apertar uso de dados a jusante.
- **Aggregadores:**
  - **Pluggy:** ~90% das contas; **R$2.500/mês** (Basic) após trial de 14 dias (20 contas). Faz connectors regulados + diretos.
  - **Belvo:** >90% das contas; sandbox grátis, produção por orçamento.
  - **Klavi:** focado em crédito/dados; enterprise.
- Sem tier de produção grátis — há um custo-base real.

### EUA
- Sem open banking mandatado em vigor (regra CFPB 1033 **suspensa** por injunção; **bancos podem começar a cobrar** pelo acesso — maior risco de custo).
- **Plaid:** único realista para bootstrap (Pay-as-you-go, sem mínimo, sandbox grátis). 12.000+ instituições. MX/Finicity/Akoya são enterprise/sales.

### Verdades universais (Open Banking)
1. Usar aggregador licenciado, não a própria licença.
2. **Não há token permanente** em lado nenhum — orçamentar engenharia para fluxos de re-consentimento/relink.
3. Só GoCardless (UE) tem produção grátis (em risco); Plaid (EUA) é o único self-serve sem mínimo. **No Brasil há custo-base (~R$2.500/mês).**

---

## 4. E-mail (recibos/faturas) — útil mas caro de conformidade

- Gmail API (`gmail.readonly`) é **scope restrito** → exige **verificação anual CASA** (avaliação de segurança). Custo da auditoria ~500–4.500 USD/ano (taxa do laboratório), mas o **custo real de 1.º ano (remediação+legal+seguro) pode chegar a 13k–108k USD**, e recorre anualmente.
- **Limited Use:** não se pode usar dados do Gmail para treinar modelos; acesso humano restrito.
- **Alternativas que evitam o scope restrito:** **alias de reencaminhamento** (modelo Expensify: utilizador reenvia recibos para `recibos@app.com`), partilha/atalhos, OCR. Recomenda-se começar por aqui.
- Apple Mail/iCloud: **sem API** para ler a caixa no iOS.

---

## 5. Entrada rápida — a rede de segurança universal

Funciona em iOS e Android, sem risco de política. Reduz drasticamente a fricção:
- **Share Sheet** (partilhar foto/PDF/URL de recibo para a app).
- **Atalhos / App Intents / Siri** ("regista 12€ café").
- **Widget** de ecrã inicial (1 toque).

É a base que garante que o app é útil mesmo quando a automação falha.

---

## 6. Deduplicação e reconciliação (cola que junta tudo)

Como a captura é multi-fonte, **duplicados são inevitáveis** (push + SMS + open banking da mesma compra). Estratégia:
- Chave de deduplicação: montante + data/hora aproximada + comerciante normalizado + conta/últimos 4 dígitos.
- Open Banking é a **fonte de verdade** (saldo real); notificações/SMS são captura **imediata** (mais rápida, menos fiável) que se reconcilia depois com o feed bancário.
- Apresentar transações capturadas como **provisórias** até reconciliadas; nunca como definitivas.

## 7. Recomendação final de arquitetura de captura

1. **MVP:** Open Banking (1 aggregador do mercado escolhido) + Entrada rápida. Funciona iOS+Android, fiável.
2. **+ Android:** leitura de notificações como extra (dev build, módulo nativo, parsers dos bancos-alvo), com correção fácil e reconciliação.
3. **+ E-mail:** começar por alias de reencaminhamento; Gmail API só quando justificar o custo CASA.
4. **SMS:** só se obtivermos exceção aprovada; nunca como destaque; build sem SMS sempre pronto.
5. **Sempre:** deduplicação, dados provisórios, correção manual, e a mensagem honesta de que é "best-effort".
