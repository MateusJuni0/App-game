# 08 — Segurança, Privacidade e Conformidade

> Em finanças + leitura de notificações/dados bancários, isto **não é opcional**. É também um filtro das lojas de apps e a base da confiança (que é o produto).

## 1. Proteção de dados (RGPD / LGPD)

- **Europa/Portugal:** RGPD. Mesmo usando um aggregador licenciado (que é a parte regulada para o acesso bancário), **nós mantemos responsabilidade RGPD** sobre os dados que guardamos.
- **Brasil:** LGPD (regras equivalentes; ANPD como autoridade). As reformas 2026 do Open Finance vão **apertar o uso de dados a jusante** (re-transferência fora do perímetro regulado).
- Princípios a implementar:
  - **Minimização:** guardar só o necessário; processar notificações no device sempre que possível.
  - **Consentimento claro e granular**, separado por finalidade.
  - **Direito a apagar/exportar** os dados.
  - **Nunca vender dados** nem usá-los para publicidade.

## 2. Open Banking / PSD2 (Europa)

- Ler saldos/transações = **AIS**. Usar **aggregador licenciado** (TrueLayer, Tink, GoCardless, Salt Edge, Plaid) — eles são o AISP; nós podemos ser cliente ou agente AIS.
- **SCA** (autenticação forte) é feita no banco (redirect).
- **Re-autenticação a cada 180 dias** — construir fluxo de re-consentimento.
- **Não tirar a própria licença AISP** (3–6 meses) a não ser que o negócio o justifique.

## 3. Open Finance Brasil

- Ecossistema do Banco Central; consentimento granular, máx. ~12 meses, renovável na app (Res. Conjunta 7/2023).
- Preferir **connectors regulados** (FAPI/OAuth) sobre screen-scraping (mais estável e a regulação aperta o scraping).

## 4. Políticas das lojas de apps (make-or-break)

### Google Play
- **Acesso a notificações (`NotificationListenerService`):** não tem formulário obrigatório dedicado, mas é tratado como **sensível**. Exige **divulgação proeminente + consentimento** no momento do acesso, âmbito restrito (só remetentes financeiros), dados no device ou divulgar transferência, e nunca para terceiros/anúncios. Risco real de remoção se a divulgação for fraca.
- **SMS (`READ_SMS`):** fortemente restrito (ver `05`). Exceção "SMS-based money management" existe mas é aprovada caso-a-caso e muitas vezes recusada. **Uso não-declarado pode terminar a conta de developer.**
- **Política de empréstimos pessoais:** se algum dia adicionarmos crédito, ela **proíbe** acesso a SMS/call log/localização/apps instaladas — anularia a exceção de orçamento. Não misturar.

### Apple App Store
- Leitura de notificações/SMS de outras apps é **impossível** por API. Sem problema de política — simplesmente não existe a capacidade.
- Câmara/fotos (OCR de recibos): declarar finalidade.

## 5. Gmail / e-mail (se usarmos)

- `gmail.readonly` é **scope restrito** → **verificação anual CASA** (avaliação de segurança OWASP ASVS). Taxa de laboratório ~500–4.500 USD/ano; custo real de 1.º ano (remediação+legal+seguro) pode chegar a **13k–108k USD**, recorrente.
- **Limited Use:** não treinar modelos com dados do Gmail; acesso humano restrito.
- **Recomendação:** evitar o scope restrito no início — usar **alias de reencaminhamento** (utilizador reenvia recibos) que não precisa de CASA.

## 6. Segurança técnica

- Cifra em repouso e em trânsito (TLS).
- Segredos (chaves de API, tokens) **fora do device**, em gestor de segredos no backend.
- Credenciais bancárias **nunca** tocam o nosso sistema (o aggregador trata).
- Dados de notificações: o mínimo, idealmente no device; se subirem ao backend, cifrados e com retenção curta.
- **Registo de auditoria** do que o bot diz/faz (também expectativa regulatória — FINRA).
- Autenticação forte do utilizador (biometria/2FA), bloqueio do app.

## 7. Conformidade do bot de IA (resumo; detalhe em `06`)

- Disclaimers: "informação, não aconselhamento financeiro/investimento/fiscal".
- Não cruzar para conselho de investimento regulado (Investment Advisers Act / equivalentes).
- Não exagerar capacidades de IA (risco "AI-washing" — SEC multou em 2024).
- Cada afirmação do bot é potencialmente vinculativa (Air Canada 2024) → fundamentar, citar, registar.
- Cancelamento de assinatura **fácil e em 1 toque** (lição da multa de 17M USD à Cleo).

## 8. Checklist de conformidade antes do lançamento

- [ ] Política de privacidade clara + consentimentos granulares por finalidade.
- [ ] Divulgação proeminente para acesso a notificações (Android).
- [ ] Build sem SMS pronto; só ativar SMS com exceção aprovada.
- [ ] Aggregador licenciado contratado para o mercado-alvo.
- [ ] Fluxo de re-consentimento (180 dias UE / ~12 meses BR) implementado.
- [ ] Cancelamento de assinatura em 1 toque.
- [ ] Disclaimers do bot + registo de auditoria.
- [ ] Cifra em repouso/trânsito; segredos no backend.
- [ ] DPA/avaliação RGPD/LGPD; processo de apagar/exportar dados.
- [ ] (Se Gmail) verificação CASA — ou usar alias de reencaminhamento.
