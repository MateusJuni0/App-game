# 24 — Revisão Crítica: o que falta para ser "de primeira"

> Chefe, aqui está a resposta honesta a "está tudo fechado? está muito simples?". Pensei nisto como se fosse o **meu** app. **Veredicto:** a *largura* está fechada (funcionalidades, design, ecrãs, categorias); o que faltava em *profundidade* era (1) o **motor financeiro** — agora fechado no `23` — e (2) os **casos extremos** que separam um app de primeira de um amador. Estão aqui, com o tratamento de cada um, mais a régua de lançamento.

## 1. "Está fechado?" — resposta direta

- **Sim, em largura:** docs `00–22` cobrem estratégia, design, funcionalidades-união, categorias PT, dados, plano de construção.
- **Faltava em profundidade:**
  - o **núcleo do dinheiro** (representação, transferências, reembolsos, dedup, reconciliação, categorização garantida) → **fechado no `23`**.
  - os **casos extremos** abaixo → este documento.
- **Conclusão:** com `23` + `24`, está pronto para construir um v1 **de primeira**, não um protótipo simples.

## 2. Casos extremos que separam "de primeira" de "amador"

### Rendimento (em Portugal isto é diferente)
- **14 meses (subsídios de férias/Natal):** o orçamento e o runway têm de saber que em ~junho e ~dezembro entra ~1 ordenado extra. Modelar rendimento como 14 meses; opção **duodécimos ON/OFF** (diluído 1/12). Se ignorarmos isto, o runway mente nesses meses.
- **Rendimento variável / freelance (recibos verdes):** não assumir ordenado fixo. Usar média móvel + mínimo conservador para o "seguro-para-gastar". Provisionar IRS/Segurança Social do trabalhador independente (uma % de cada recibo a "guardar").
- **Múltiplas fontes / datas irregulares:** detetar cada fonte de rendimento e a sua cadência; o "por dia até ao ordenado" usa a **próxima entrada prevista**, não um dia fixo.

### Gastos
- **Dinheiro (cash):** não tem rasto bancário. Um levantamento no multibanco é uma **transferência** para uma conta "Dinheiro"; os gastos em cash registam-se aí (entrada rápida). Não tratar o levantamento como despesa (senão duplica quando se gasta o cash).
- **Prestações / "compra agora paga depois" (BNPL):** uma compra a 3x não é 1 gasto de X nem 3 gastos; modelar como um **compromisso** com instâncias futuras que entram no runway (doc 14). Klarna/etc. no calendário.
- **Gasto partilhado / quem-pagou-o-quê / acerto:** dividir (split) entre membros; ledger de "quem deve a quem"; acertar com um toque (doc 15). Não inflacionar o gasto de quem pagou tudo.
- **Despesas reembolsáveis (trabalho):** marcar como "a reembolsar"; quando o reembolso chega, compensa (doc 23 §5).
- **Câmbio:** ver doc 23 §10 (taxa histórica).

### Contas
- **Cartão de crédito:** distinguir **saldo da fatura** vs **saldo atual**; o **pagamento da fatura é transferência, não despesa** (doc 23 §4) — este é o erro nº1. Mostrar **utilização %** e data de fecho/pagamento.
- **Contas conjuntas:** uma conta pode ser "nossa"; as transações herdam, com override (doc 15).
- **Descoberto / saldo negativo:** suportar saldos negativos (não assumir ≥0); avisar.
- **Conta manual a ficar desatualizada:** lembrar de atualizar; marcar dados como "podem estar velhos".
- **Conta fechada/arquivada:** arquivar sem apagar histórico (o passado conta para relatórios).

### Orçamentos
- **Rollover / overspend / mudança a meio do mês:** já em `04`/`19`; garantir que overspend não "desaparece" — passa para o mês seguinte ou avisa.
- **Fundos para gastos irregulares (sinking funds):** seguro do carro anual ÷ 12 → guardar todos os meses (doc 19 §3).
- **Orçamento com rendimento variável:** orçamentar sobre o que **já entrou** (estilo base-zero do YNAB), não sobre o previsto.
- **Partilhado vs pessoal em simultâneo:** cada adulto pode ter o seu orçamento + o familiar (doc 15) — não forçar um só.

### Qualidade das transações
- **Recategorizar em escala:** uma correção vira regra para todas as semelhantes (doc 23 §11). Sem isto, o utilizador corrige a mesma coisa 50 vezes e desiste.
- **Falsos positivos/negativos de recorrentes:** deixar confirmar/rejeitar um "recorrente" detetado.
- **Transferência detetada como gasto:** heurística + confirmação (doc 23 §4) — o pior bug, tratado no motor.
- **Falha de dedup:** dar ao utilizador "isto é duplicado de aquilo?" para fundir manualmente.
- **Ruído nos nomes de comerciante:** enriquecimento + correção colaborativa (doc 19).

### Dados e sincronização
- **Ligação Open Banking expira (180 dias PSD2):** fluxo de re-consentimento com aviso antes de expirar (doc 08/16). Sem isto, "o app parou de atualizar" e o utilizador acha que está avariado.
- **Backfill de histórico:** ao ligar uma conta, importar o máximo de histórico (12–24 meses) para os gráficos terem substância no dia 1.
- **Fonte em baixo / lacunas:** marcar período como "incompleto", não mostrar números falsos.
- **Edições em conflito entre dispositivos da família:** ledger append-only + UUID no dispositivo → sem conflitos destrutivos (doc 23 §8); última-escrita-vence só para metadados (categoria/nota).
- **Offline:** entrada e edições offline, sincroniza depois (doc 16).

### O bot (riscos específicos de finanças)
- **Número errado:** impossível por design — números só do motor (doc 23 §13).
- **Conselho alucinado / regulado:** disclaimers, lado informativo (doc 06/08).
- **Notificar demais:** limites de frequência/relevância/horas de silêncio (doc 04).
- **Privacidade dentro da família:** o bot respeita a privacidade por conta/transação (doc 15) — não revela a um membro o que outro escondeu.

## 3. O que o torna "impressionante" (não simples) — o que NÃO podemos falhar no v1

Não é ter mais features — é a **coerência e o polimento**:
1. **O "aha" em <2 minutos:** ligar uma conta (ou importar/entrada rápida) e ver **imediatamente** os gastos categorizados + o número "seguro para gastar". Se o primeiro ecrã já estiver vivo e bonito, impressiona.
2. **Um motor coerente** (doc 23): tudo bate certo — saldos, gastos, orçamento, runway — porque saem todos do mesmo razão. Quando os números **batem sempre**, sente-se "a sério".
3. **O bot que percebe de dinheiro** e responde com números certos + dá dicas com o tom esperto/simpático — o diferenciador.
4. **Gráficos lindos e interativos** (Sankey, runway, scrub com háptico) — o "wow" visual (doc 13).
5. **Runway com aviso de dia negativo** + **modo IRS/e-Fatura** — coisas que os apps de fora não fazem para PT.
6. **Família com privacidade a sério** — confiança.
7. **Detalhe e polimento** (modo escuro, animações com bom gosto, estados vazios bonitos, tudo categorizado com ícone) — doc 12/17.

## 4. Guardas contra erros em cascata (o teu medo, tratado)

| Risco de cascata | Guarda |
|---|---|
| Dinheiro em float → cêntimos errados | **Cêntimos inteiros**, nunca float (`23` §2) |
| Transferência/pagamento de cartão contado como gasto | **Netting de transferências** (`23` §4) |
| Mesma compra contada 2–3× (multi-fonte) | **Dedup/idempotência** (`23` §8) |
| Transação sem categoria | **Categoria obrigatória** + "Por classificar" (`23` §11) |
| Histórico que "muda" sozinho (câmbio) | **Taxa histórica guardada** (`23` §10) |
| Bot inventa números | **Números só do motor** (`23` §13) |
| Saldo errado sem se notar | **Saldo derivado reconcilia com o banco** (`23` §9) |

## 5. Régua de lançamento v1 (lançar e testar com a família)

**Tem de ter (MVP de primeira):**
- Motor financeiro correto (`23`) — cêntimos, kinds, categorias, transferências, dedup.
- Captura: **entrada rápida** + (Android) **notificações**; Open Banking **quando** houver via grátis (senão, manual + notificações; doc 09).
- Categorização automática + correção que vira regra.
- Dashboard com "seguro para gastar" + lista de transações + orçamento básico.
- Gráficos essenciais (gasto por categoria, tendência, sparkline de saldo).
- Família: vários membros + privacidade por conta.
- Bot v1 (responder com números do motor) — mesmo que simples.
- Modo escuro, pt-PT/EUR, acessibilidade base.

**Pode ficar para v1.x (não bloqueia o lançamento):**
- Runway dia-a-dia com BNPL, modo IRS completo, voz no bot, viagens auto-detetadas, jovens/mesadas, widgets/atalhos, OCR de recibo, negociação/cancelamento de subscrições.

**Porque é que MVPs de finanças falham (a evitar):**
- Sincronização frágil → números errados → perda de confiança (a queixa nº1 do mercado).
- Pedir trabalho manual a mais no início → desistência.
- Prometer "100% automático" e falhar em silêncio → frustração. (Sempre honesto: "best-effort + corrige aqui".)

## 6. Coerência entre documentos (afinações para não haver contradição)

- **`21` (modelo de dados):** alinhar com `23` — `transaction.amount` em **cêntimos inteiros (bigint)**; `category_id NOT NULL`; transferências por `transfer_group_id`; estados `pending/posted/reconciled`; campos de FX. *(Nota adicionada no `21`.)*
- **`19`/`14`:** as funcionalidades de dinheiro (safe-to-spend, runway, orçamento) referem o motor `23` como fonte.
- **`06` (bot):** reforçado que os números vêm das funções do motor.

## 7. Próximo passo

Com `23` (motor) + `24` (esta revisão), o raciocínio do núcleo está fechado e à prova de cascata. Quando disseres "bora", arranco a construção pelo `22` (WS0), já com o motor financeiro como primeira peça sólida (parte do WS2 — camada de dados).
