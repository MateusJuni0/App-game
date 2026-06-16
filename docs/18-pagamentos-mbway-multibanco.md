# 18 — Pagar Contas a partir da App (MB Way / Multibanco / PSD2)

> Pedido do chefe: estudar **minuciosamente** se e como o app pode **pagar contas** (MB Way, Multibanco), "para não ficarmos duas horas depois a pensar como implementar uma coisa pensada por cima". Aqui está o estudo a fundo, com o **veredicto honesto** e um plano faseado realista. Pesquisa de 2026 (SIBS, Banco de Portugal, PSD2/EBA, aggregadores).

## TL;DR — o veredicto honesto (lê isto)

1. **Ler a conta ≠ pagar a conta.** Ler (AIS) é o que já planeámos. **Pagar (PIS — iniciar pagamentos)** é um **nível regulatório muito mais alto**.
2. **Não existe API de consumidor nem deep-link do MB Way.** A única "MB Way API" da SIBS é **para comerciantes RECEBEREM** dinheiro (pede ao número de telemóvel, o utilizador aceita na app oficial). **Não há forma programática de a nossa app enviar dinheiro ou pagar por MB Way**, nem de abrir a app MB Way pré-preenchida.
3. **Pagar uma conta Multibanco (entidade + referência + valor) por API existe** — mas está **reservado a PISP licenciado** (licença PSD2 + certificado eIDAS). Um app privado não lhe toca.
4. **Iniciar pagamentos em produção (via qualquer aggregador: TrueLayer, Tink, Yapily, Volt…) exige empresa registada + KYB + licença PSD2 ou contrato de "agente" do aggregador + custo mensal.** É um **bloqueio duro** para um projeto privado/familiar sem empresa.
5. **O que dá MESMO para um projeto privado, de graça e sem licença:** **preparar o pagamento e entregar ao utilizador para ele confirmar no banco dele** — via **código QR SEPA (EPC069-12)** ou link de transferência pré-preenchida. O dinheiro **nunca passa por nós**.
6. ⚠️ **Caveat português:** o suporte dos apps de banco PT ao QR EPC é **irregular** — tem de ser testado banco a banco antes de confiarmos nisto.

**Recomendação:** **não prometer "pagar contas automaticamente".** Construir **lembretes + ler/scan da conta + handoff assistido (QR / link / mostrar entidade-referência-valor)**. A automação total fica para "se um dia abrirmos empresa e quisermos mesmo" (ver secção 7).

---

## 1. Os dois mundos: AIS (ler) vs PIS (pagar)

| | AIS — Account Information | PIS — Payment Initiation |
|---|---|---|
| O que é | Ler saldos e transações | **Mover dinheiro** / iniciar um pagamento |
| Licença | AISP (já é exigente) | **PISP** (muito mais exigente) |
| Risco | Dados | **Dinheiro** → KYC/AML, responsabilidade, seguro |
| O nosso plano | Via aggregador licenciado (ver `05`/`16`) | **Bloqueado sem empresa/licença** (este doc) |

Tudo o que **mexe no dinheiro em nome do utilizador** cai em PIS. É aí que tudo aperta.

## 2. MB Way — a realidade (operado pela SIBS)

- **O que é:** carteira móvel ligada ao **número de telemóvel** — transferências P2P, pagamentos em lojas, "pedidos" de dinheiro, cartões virtuais (MB NET), divisão de contas. Tudo dentro da **app MB Way oficial** (ou do app do banco), com PIN/biometria.
- **Há API para terceiros?** Sim, mas é **de comerciante/aquiring — para RECEBER**: a app comerciante "pede" dinheiro a um número e o utilizador aceita na app dele. **Não há endpoint de "enviar dinheiro" / "pagar conta".**
- **A nossa app pode despoletar um pagamento MB Way pelo utilizador?** **Não.** Não há API de consumidor, **não há deep-link/URL scheme público** (`mbway://…`) para abrir a app MB Way pré-preenchida, e o "Payments App & SDK" da SIBS é para instituições/comerciantes com contrato.
- **Conclusão MB Way:** a única integração honesta é o **utilizador abrir a app MB Way e fazer ele**. Nada programático do nosso lado.

## 3. Multibanco "Pagamento de Serviços" — a forma clássica portuguesa

- **Como se paga:** **Entidade** (5 dígitos) + **Referência** (9 dígitos) + **Valor**. Em ATM, homebanking, app do banco ou MB Way.
- **Dá para pagar por API?** Sim — a SIBS tem uma **API Multibanco Payments** com operação de **"service payment"** que **paga** a conta (entidade+referência+valor), incluindo setor público, segurança social, periódicos e em lote. **MAS** está no chapéu **PSD2 Payment Initiation → só para PISP licenciado** (licença + certificado TPP/eIDAS). **Fechado a um app privado.**
- **Ler a conta é livre:** podemos fazer OCR/parse da fatura ou da referência MB (entidade/referência/valor) sem qualquer licença. **Pagar** é que exige o trilho licenciado — ou o **handoff manual**.

## 4. PSD2 Payment Initiation (o trilho europeu) — a realidade

- **O que é tecnicamente:** uma **transferência SEPA (SCT / SCT Inst) por IBAN**, do utilizador para um IBAN de destino, **confirmada pelo utilizador no banco dele (SCA)**. É um "empurrão" (push), não um débito.
- **SCA por pagamento é a norma:** o utilizador autentica-se no banco a cada pagamento (redirect para a app do banco). As isenções são decisão do **banco**, não nossa.
- **Pagamentos recorrentes variáveis (VRP) — sem confirmar sempre:** **é coisa do Reino Unido** (esquema comercial UKPI, 2026). **Na UE/Portugal NÃO existe equivalente vivo** — há o DRP/SPAA (esquema comercial opcional do EPC), mas não está em rollout. O PSD3/PSR (2026–2027) **não obriga** VRP. → Recorrentes na UE fazem-se por **ordens permanentes** (valor fixo) ou **débito direto SEPA** (outro esquema, não PIS).
- **Pagamentos instantâneos + Verificação do Beneficiário:** o Regulamento (UE) 2024/886 tornou as **transferências instantâneas em euros (10s, 24/7)** e a **Verificação do Beneficiário (VoP — confere o nome do IBAN)** praticamente obrigatórias na zona euro em 2025. Bom para A2A — confirmação em segundos, menos fraude.
- **Sem chargeback:** PIS é push; não há disputa de rede tipo cartão. Reembolsos são **novos pagamentos** para trás.
- **PIS genérico paga por IBAN, não por referência Multibanco.** Pagar a conta de água "à portuguesa" (entidade+referência) precisa da **API doméstica da SIBS** (PISP). Muitas faturas aceitam transferência IBAN; muitas utilities **só** aceitam referência Multibanco — por isso o PIS pan-europeu nem sempre serve cá.

## 5. O bloqueio duro: empresa, KYB e licença (o que mata para um projeto privado)

Confirmado por todos os estudos — **o problema não é técnico, é legal/comercial:**

- **Sandbox de todos os aggregadores (TrueLayer, Yapily, Tink, GoCardless, Wise) é grátis e instantâneo** — ótimo para protótipo/demo. **Produção é que é o muro.**
- **Para iniciar pagamentos em produção** via aggregador é preciso: **entidade registada (empresa) + KYB (verificação do negócio) + ser PISP licenciado OU operar como "agente" sob a licença do aggregador** (com políticas, controlos, fit-and-proper dos diretores, e **seguro de responsabilidade/cibersegurança**) + **contrato comercial com custo mensal**.
- **Revolut Business API:** exige **empresa incorporada** + plano pago (~30–40 £/mês); freelancers (Revolut Pro) **não têm API**.
- **Stripe:** os termos **proíbem** P2P/"bill pay"; é para empresas cobrarem.
- **Wise (token pessoal):** dá para automatizar a **tua própria conta Wise** — não para mover dinheiro de outros nem pagar contas alheias.
- **MB Way / Multibanco merchant:** precisa de **acquirer + contrato de comerciante** (e é a direção errada — recebe, não paga).

### O muro técnico que mata até o "é só para uso próprio" (importante)

Há quem pense: "mas é para uso pessoal, não é um negócio, logo a lei não me apanha." Parte disto é verdade — o PSD2 só regula quem presta serviços de pagamento **como atividade/negócio a terceiros**; um programa que só tu usas, **só nas tuas próprias contas**, para pagar as **tuas** contas, está conceptualmente **fora** do que a lei regula (não és um PISP ilegal). **MAS:**

- **A barreira é técnica, não só legal: o certificado eIDAS.** Para ligar às APIs PSD2 dos bancos é preciso um **certificado eIDAS PSD2 (QWAC/QSEAL)**, emitido por uma autoridade de confiança **só a entidades com número de autorização PSP do regulador**. Um particular **não consegue obter o certificado**. → "O sonho de fazer o meu próprio PISP para a família morre no portão do eIDAS", não numa proibição.
- **Dinheiro da família é zona cinzenta.** Mexer no dinheiro do **cônjuge ou dos filhos** (nas contas **deles**) já é atuar **por terceiros** — afasta-se do caso limpo "só as minhas contas". Como **isto é um app de família**, não há sequer o conforto do "uso estritamente próprio".
- **Em Portugal não havia TPPs registados localmente** (final de 2024) → na prática depender-se-ia sempre de um aggregador passaportado da UE.
- **"Usar a licença deles" (Yapily Connect, Token.io):** estes aggregadores deixam-te usar a **licença PISP deles** (não precisas da tua) — mas **continuam a exigir entidade registada + KYB + contrato**. Não há via self-serve para um particular chegar a produção.

**Veredicto:** **um app privado de família, sem empresa, NÃO consegue pagar contas automaticamente em produção** — quer pela barreira do eIDAS, quer pelo KYB dos aggregadores. O caminho seria: abrir empresa → passar KYB → usar a licença de um aggregador (Yapily/Token.io) ou tirar a nossa → pagar mensalidade + uso. **Isso é montar um negócio, não um app de família.**

## 6. O que dá MESMO (plano faseado, sem licença)

Ordenado do mais fácil/realista ao mais difícil:

**Nível 1 — Lembretes + mostrar os dados (100% viável, fazer já).**
A app guarda as contas, datas e **entidade/referência/valor**, lembra o utilizador e mostra os números exatos. Ele paga no app do banco / MB Way / ATM. Zero licença, zero SIBS, zero empresa. **É o núcleo realista para a família.**

**Nível 2 — Ler/scan + handoff assistido (viável, é o nosso "wow" possível).**
- **OCR/parse** da fatura ou da referência MB (e QR) → preenche entidade/referência/valor sozinho.
- **Entregar para confirmar** (sem mexer no dinheiro). Ordenado pelo que é mesmo fiável:
  - **(Principal) Mostrar os dados em grande + copiar campo a campo** (entidade, referência, valor — ou IBAN, nome, valor, referência) com 1 toque (clipboard). É o mecanismo **mais robusto** e funciona com qualquer banco/MB Way.
  - **Botão "Abrir o meu banco / Abrir MB Way":** só **abre** a app (traz para a frente) — **NÃO pré-preenche** nada. (No iOS precisa de declarar os schemes em `LSApplicationQueriesSchemes`.)
  - **Código QR SEPA (EPC069-12 / "Girocode"):** geramos um QR com IBAN+nome+valor+referência. ⚠️ **Em Portugal o suporte é praticamente inexistente** (PT não aparece nas listas de adoção) — oferecer só como bónus "se o teu banco suportar scan-to-pay", nunca como caminho principal.
  - ❌ **NÃO é possível** pré-preencher uma transferência ou um pagamento MB Way dentro da app do utilizador por deep-link — não há esquema público para construir isso (o `mbway://` é da SIBS, atrás de contrato de comerciante). Não prometer isto.
- O bot pode **preparar tudo** e dizer "está pronto, é só confirmares no teu banco" — nunca "já paguei".

**Nível 3 — Reconciliação automática (viável só via aggregador AIS licenciado).**
Para **confirmar que a conta foi paga** (ler a conta), usamos um aggregador de Open Banking (read-only). Marca a conta como "paga ✓" automaticamente quando vê o movimento. **Não paga**, mas fecha o ciclo.
⚠️ **Atenção:** o tier **grátis** de leitura da **GoCardless (ex-Nordigen) fechou a novos registos em jul. 2025** (confirmado) — por isso, mesmo a **leitura** ficou mais difícil para um projeto novo. Caminhos realistas: outro aggregador (Tink/Salt Edge, com custo/contrato), ou começar **sem** ligação bancária (só lembretes + entrada manual + handoff). Isto afeta também o pressuposto de custos em `09` — ver lá.

**Nível 4 — Pagamento automático dentro da app (NÃO viável para app privado).**
A capacidade técnica existe (PIS / Multibanco service payment), mas exige **empresa + licença/agente + custo**. **Bloqueado** enquanto formos um projeto familiar.

## 7. Se um dia quisermos mesmo a automação total

Caminho honesto (não é para já, mas fica documentado):
1. **Abrir uma entidade legal** (empresa; em PT até um empresário em nome individual pode chegar para o KYB).
2. **Usar a licença de um aggregador** (Yapily Connect / Token.io / Volt) — eles são o PISP, nós integramos. (Ou, no extremo, tirar a **nossa** licença PISP no Banco de Portugal: **€50.000 de capital inicial**, seguro de responsabilidade profissional, governação/idoneidade, 3 a ~12 meses — desproporcionado.)
3. **Custo:** mensalidade + por-uso (tudo sales-led, sem preços públicos; semanas de onboarding + KYB).
4. Mesmo assim: **SCA por pagamento** (sem VRP na UE), e para pagar "à portuguesa" (referência Multibanco) é preciso o trilho doméstico da SIBS.

> Resumo da regulação (para constar): iniciar pagamentos = ser/usar um **PISP** com autorização do Banco de Portugal + **certificado eIDAS**. Ler contas = **AISP** (mais leve, sem capital) — é o que usamos para a reconciliação, via aggregador. Tudo o que **move dinheiro** está atrás desta barreira.

→ **Desproporcionado para uso familiar.** A recomendação mantém-se no Nível 1–3.

## 8. Decisão / árvore

```
Queres pagar uma conta?
├─ A app prepara tudo (entidade/ref/valor ou QR/IBAN)         → SIM (Nível 1–2, fazemos)
├─ O utilizador confirma no banco/MB Way dele?               → SIM (única via sem licença)
├─ A app marca como paga ao ver o movimento (read-only)?     → SIM (Nível 3, via aggregador AIS)
└─ A app paga sozinha sem o utilizador sair daqui?           → NÃO sem empresa + licença PISP (Nível 4)
```

## 9. Implicações para o resto da spec

- **Funcionalidades (`04`):** "Pagar conta" entra como **Nível 1–2 (lembrete + handoff assistido)**, não como pagamento automático. Atualizar a tabela "Agir".
- **Ecrãs (`17`):** o detalhe de uma conta a vencer mostra **entidade/referência/valor + botão "Pagar" que gera QR / copia dados / abre o banco**, com texto honesto ("confirmas no teu banco").
- **Bot (`06`):** o bot prepara o pagamento e faz o handoff; **nunca diz que pagou** se não pagou.
- **Deep-link:** já metemos o esquema `cmetech://` no `app.json` para receber o retorno do banco/QR no futuro.

## 10. Fontes (principais)

- SIBS API Market — Payments / Multibanco / MB Way / Gateway: pay.sibs.com/en/solutions/api-market (e docs.pay.sibs.com)
- Banco de Portugal — serviços de pagamento PSD2 (AIS/PIS): bportugal.pt/en/page/payment-services-under-psd2
- Regulamento (UE) 2024/886 (pagamentos instantâneos + VoP): eur-lex.europa.eu
- OpenBanking.org.uk / Open Banking Tracker — VRP e esquema comercial UKPI (UK-only)
- EPC — SPAA/DRP rulebook (UE, opcional, não em rollout)
- EPC069-12 — guidelines do QR SEPA (Girocode)
- TrueLayer / Yapily / GoCardless / Wise / Revolut — docs de sandbox vs produção e onboarding (KYB/agente/custos)

> Nota de honestidade: os preços de produção dos aggregadores são todos "sales-led" (sem números públicos); o suporte português ao QR EPC é o ponto fraco a validar com testes reais antes de confiar no handoff por QR.
