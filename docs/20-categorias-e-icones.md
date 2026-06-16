# 20 — Categorias e Ícones (Portugal)

> Taxonomia completa para uma família portuguesa, pronta para **seed data** (mãe → filha), com **ícone (Lucide)** e **família de cor** por grupo. Mais: o que é específico de Portugal (e-Fatura/IRS, 14 meses de ordenado, descritivos Multibanco). **Icon set: Lucide** (MIT, multiplataforma; cores nos tokens do `12`).
>
> ⚠️ **Nota:** percentagens/limites de IRS mudam a cada Orçamento do Estado — abaixo ficam como referência, mas **validar contra o Portal das Finanças/OE do ano na fase de construção** antes de fixar no código. O ícone `tooth` não existe na Lucide base (usar custom/Material Symbols ou `smile`).

## 1. Taxonomia (16 grupos: 15 de despesa + 1 de rendimento, ~110 subcategorias)

Convenção: cada grupo-mãe tem família de cor; subcategorias herdam tons. `[IRS: ...]` marca a rubrica de dedução.

### DESPESAS

**A. Habitação** — cor âmbar/terracota — `house`
Renda `key` **[IRS: arrendamento]** · Prestação crédito habitação `landmark` · Juros do crédito `percent` **[IRS pré-2012]** · Condomínio `building-2` · IMI `landmark` · Obras/remodelações `hammer` · Mobiliário/decoração `sofa` · Eletrodomésticos `washing-machine` · Seguro habitação `shield` · Renda de estudante deslocado `graduation-cap` **[IRS: Educação]**

**B. Serviços/Utilities** — cor ciano — `zap`
Eletricidade/Luz `lightbulb` (EDP, Galp, Endesa, Goldenergy) · Gás `flame` · Água `droplet` (EPAL, SMAS, Indaqua) · Internet/Telecom `wifi` (MEO, NOS, Vodafone, NOWO, Digi) · Telemóvel `smartphone` · TV/Pacotes `tv` · Resíduos/saneamento `trash-2` — **[IRS: despesas gerais familiares]**

**C. Alimentação** — cor verde — `shopping-cart`
Supermercado/Mercearia `shopping-cart` (Continente, Pingo Doce, Lidl, Auchan, Intermarché, Mercadona, Minipreço) · Talho/Peixaria/Padaria `beef`/`fish` · Mercado/Frutaria `apple` · Restaurantes `utensils` **[IRS: restauração 15% IVA]** · Cafés/pastelarias `coffee` · Takeaway/entregas `bike` (UberEats, Glovo, Bolt Food) · Bebidas/garrafeira `wine`

**D. Transportes** — cor índigo — `car`
Combustível `fuel` (Galp, BP, Repsol, Cepsa, Prio) · Portagens/Via Verde `arrow-big-right` · Transp. públicos/passes `train`/`bus` (Navegante, Andante, CP, Carris, Metro) **[IRS: passes 100% IVA]** · Estacionamento `square-parking` (EMEL) · Manutenção auto `wrench` **[IRS: reparação auto 15% IVA]** · Inspeção/pneus `gauge` · Seguro auto `shield` · IUC `car` · Táxi/TVDE `car-taxi-front` (Uber, Bolt, Free Now) · Aluguer `car`

**E. Saúde** — cor vermelho/coral — `heart-pulse` — **[IRS: Saúde 15%/1.000€]**
Farmácia/medicamentos `pill` · Médico/consultas `stethoscope` · Dentista `smile` · Análises/exames `microscope` · Hospital/cirurgias `cross` · Seguro saúde `shield-plus` (Médis, Multicare, AdvanceCare) · Ótica/óculos `glasses` · Fisioterapia `activity` · Psicologia/saúde mental `brain`

**F. Educação** — cor roxo — `graduation-cap` — **[IRS: Educação 30%/800€]**
Propinas/mensalidades `graduation-cap` · Creche/infantário/ama `baby` · Explicações `book-open` · Livros/manuais `book` **[novo IVA livros 15% 2026]** · Material escolar `pencil-ruler` · Refeições/transporte escolar `apple`/`bus` · Cursos/formação `presentation`

**G. Impostos e Estado** — cor cinzento-azulado — `landmark`
IRS `receipt-text` (AT) · IMI `landmark` · IUC `car` · Segurança Social `users` (ent. 21056) · Coimas/multas `triangle-alert` · Taxas/emolumentos `stamp`

**H. Lazer** — cor teal — `ticket`
Streaming vídeo `monitor-play` (Netflix, Disney+, HBO Max, Prime) · Streaming música `music` (Spotify, Apple Music) · Cinema/teatro/concertos `clapperboard` **[novo IRS 2026: espetáculos 15%]** · Museus/monumentos `landmark` **[novo IRS 2026]** · Ginásio/fitness `dumbbell` **[IRS: ginásios]** · Desporto `volleyball` · Viagens/férias/alojamento `plane`/`luggage` (Booking, TAP) · Hobbies/jogos `gamepad-2` · Livros lazer `book-open`

**I. Compras pessoais** — cor rosa — `shopping-bag`
Vestuário `shirt` (Zara, H&M) · Calçado `footprints` · Beleza/cosmética `sparkles` · Cabeleireiro/estética `scissors` **[IRS: cabeleireiros 15% IVA]** · Eletrónica/tecnologia `laptop` (Worten, FNAC, PCDiga) · Presentes `gift` · Casa/bricolage `hammer` (Leroy Merlin, IKEA, AKI)

**J. Animais** — cor castanho — `paw-print`
Veterinário `stethoscope` **[IRS: veterinário 35% IVA]** · Ração `bone` · Tosquia/estética `scissors` · Seguro animal `shield`

**K. Família/Filhos** — cor laranja-suave — `baby`
Fraldas/puericultura `baby` · Brinquedos `blocks` · Mesada/semanada `coins` · Atividades extracurriculares `palette`

**L. Seguros (gerais)** — cor azul-aço — `shield`
Vida `shield` · Saúde (ver E) · Auto (ver D) · Multirriscos (ver A) · PPR `piggy-bank` **[IRS: benefício fiscal]**

**M. Despesas bancárias** — cor cinzento-escuro — `credit-card`
Comissões de conta `landmark` · Comissões de cartão `credit-card` · Juros crédito/cartão `percent` · Crédito pessoal/auto (prestações) `banknote` · Comissões de transferência `arrow-left-right`

**N. Poupança/Investimento** — cor esmeralda — `piggy-bank`
Poupança/fundo de emergência `piggy-bank` · Certificados de Aforro/Tesouro `landmark` (IGCP) · PPR `target` · Ações/ETFs `trending-up` · Criptomoedas `bitcoin` · Metas de poupança `flag`

**O. Doações/Diversos** — cor neutro — `hand-heart`
Donativos/caridade `hand-heart` **[IRS: mecenato]** · Quotas/subscrições `users` · Por classificar `circle-help`

### RENDIMENTOS — cor verde-vivo — `trending-up`
Salário/Ordenado `wallet` · Subsídio de férias `sun` · Subsídio de Natal `gift` · Duodécimos `calendar-clock` · Subsídio de refeição `utensils` · Recibos verdes (Cat. B) `file-text` · Freelance/extra `briefcase` · Rendas recebidas (Cat. F) `house` · Reembolso de IRS `receipt-text` · Juros/dividendos `percent` · Pensões/reforma `armchair` · Subsídio desemprego/prestações `landmark` · Abono de família `baby` · Transferências recebidas (MB Way/entre contas) `arrow-down-left` · Outros `plus-circle`

## 2. O motor IRS / e-Fatura (o diferenciador português)

As famílias associam o **NIF** às compras → as faturas vão para o **e-Fatura** (AT) → é preciso **validar/classificar** as pendentes (até início de março do ano seguinte).

**Funcionalidade a construir ("modo IRS"):** ao classificar uma despesa numa categoria, **mapear automaticamente para a rubrica de dedução AT**, marcar "com NIF / sem NIF", e mostrar uma **barra de progresso por rubrica** ("já tens X€ de 1.000€ em Saúde") + estimativa de reembolso. Relatório anual pré-IRS.

**Rubricas e limites (referência — validar no ano):**

| Rubrica | % | Limite |
|---|---|---|
| Despesas gerais familiares | 35% (45% monoparental) | 250€/pessoa |
| Saúde | 15% | 1.000€ |
| Educação | 30% | 800€ |
| Renda de habitação | 15% | 900€ |
| Juros crédito habitação (pré-2012) | 15% | 296€ |
| Lares | 25% | ~404€ |
| PPR | 20% | 300/350/400€ (por idade) |
| Exigência de fatura (IVA por setor) | — | 250€ global |

**IVA por setor (rubrica exigência de fatura):** restauração/alojamento 15% · cabeleireiros 15% · reparação auto 15% · veterinários 35% · ginásios (15–30%) · passes 100% · **novo 2026:** livros, espetáculos, museus, bibliotecas 15%. Majoração +5% para 3+ dependentes. Limite global de deduções por escalão de rendimento.

## 3. Rendimento a 14 meses (Portugal)

Modelar o rendimento como **14 ordenados** (12 + subsídio de férias ~junho + subsídio de Natal ~dezembro), com opção **duodécimos ON/OFF** (subsídios diluídos 1/12 por mês). Prever os meses de subsídio no orçamento e nas projeções de tesouraria (runway). Considerar **IRS Jovem** e **recibos verdes (Cat. B)** + Segurança Social própria para quem é independente.

## 4. Descritivos Multibanco / MB Way (parser de categorização)

O motor de categorização deve reconhecer estes prefixos no extrato:
- **COMPRA / COMPRA TPA / COMPRA DEB** → compra com cartão (extrair comerciante após "COMPRA").
- **Pag Serviço / PG SV** → pagamento de serviços (entidade+referência) → mapear pela **entidade**.
- **DD / Débitos diretos** → recorrente.
- **TRF / TEI / MB WAY / TRF P2P** → transferências; **STN** → estorno/reembolso (crédito); **JUR** → juros; **DIV** → dividendos; **BX VALOR/BXV** → baixo valor (ex.: portagens).

**Dicionário entidade MB → faturador → categoria** (semente):
20174 EDP → Eletricidade · 21096 Galp → Gás/Combustível · 20341 Via Verde → Portagens · 21154 CTT → Portagens · 21159 MEO → Telecom · 21579 NOS → Telecom · 21056 Segurança Social → Impostos/Estado. (Acrescentar Vodafone, águas, seguradoras, AT.)

## 5. Outros pontos PT que uma app US/UK falharia
- **NIF** como conceito central das despesas (dedução IRS).
- **Certificados de Aforro/Tesouro** (IGCP) como poupança nacional.
- **Formato pt-PT:** `1 234,56 €` (vírgula decimal, € depois) — ver `13`.
- **IBAN PT50** e **DUC** (pagamentos ao Estado).
- **Tributação autónoma** dos subsídios (afeta o líquido mensal).

## 6. Implementação
- Inserir a taxonomia como **categorias de sistema** (`category.is_system=true`, doc 21) na 1.ª migração; a família pode adicionar/renomear.
- Mapa categoria→ícone (Lucide)→cor (tokens `12`) num ficheiro de seed/constantes.
- O "modo IRS" (rubricas/limites) num módulo à parte, **parametrizável por ano** (não hardcoded), para atualizar a cada OE.
