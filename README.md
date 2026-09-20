# Sito del Coro Polifonico "Mater Misericordiae"

Sito statico (Astro) con pannello di gestione contenuti online (Decap CMS),
ospitato su **Cloudflare Pages** (banda illimitata, piano gratuito) con login
diretto tramite **account GitHub**.

## Come funziona

- Le pagine vengono generate come file statici (HTML puro): veloci, sicure,
  hosting gratuito senza limiti di banda.
- I contenuti (testi e foto) vivono come file in `src/content/` dentro questo
  stesso repository GitHub.
- Chi gestisce il sito non tocca il codice: apre `/admin` nel browser, clicca
  "Login with GitHub", autorizza l'accesso con il proprio account GitHub, e da
  lì scrive testi, aggiunge o cancella foto, crea nuovi "temi" e tappe della
  "Storia". Ogni salvataggio aggiorna automaticamente il sito pubblico in
  1-2 minuti.
- **Importante**: a differenza della versione precedente (Netlify Identity),
  ogni persona che deve gestire i contenuti ha bisogno di un proprio account
  GitHub personale (gratuito), e va aggiunta come collaboratrice del
  repository (vedi sotto).

## Pubblicazione (una tantum)

### 1. Crea l'app OAuth su GitHub

Il pannello `/admin` deve autenticarsi con GitHub. Serve un piccolo "ponte"
(un Cloudflare Worker) e un'app OAuth:

1. Vai su GitHub → foto profilo → **Settings** → **Developer settings** →
   **OAuth Apps** → **New OAuth App**.
2. Compila: *Application name* (es. "Coro Mater Misericordiae CMS"),
   *Homepage URL* (l'indirizzo del sito su Cloudflare Pages, anche
   provvisorio va bene, si può cambiare dopo), *Authorization callback URL*:
   `https://IL-TUO-WORKER.workers.dev/callback` (il nome esatto lo avrai dopo
   il passo 2 — per ora puoi mettere un indirizzo provvisorio e tornare a
   modificarlo).
3. Salva e annota **Client ID** e genera un **Client Secret** (mostrato una
   sola volta: copialo subito).

### 2. Pubblica il "ponte" OAuth (Cloudflare Worker)

Serve un piccolo servizio che gestisce l'autorizzazione tra `/admin` e
GitHub. Il progetto pronto all'uso più diffuso per Decap CMS si chiama
**sveltia-cms-auth**:

1. Vai su `https://github.com/sveltia/sveltia-cms-auth` e segui il pulsante
   "Deploy to Cloudflare" nel loro README (richiede solo di collegare il tuo
   account Cloudflare gratuito).
2. Durante il deploy, imposta le variabili d'ambiente richieste:
   `GITHUB_CLIENT_ID` e `GITHUB_CLIENT_SECRET` (quelli ottenuti al passo 1),
   e `ALLOWED_DOMAINS` con il dominio del tuo sito Cloudflare Pages (per
   sicurezza, evita che altri usino il tuo ponte OAuth).
3. A fine deploy otterrai un indirizzo tipo
   `https://sveltia-cms-auth.tuo-account.workers.dev`.
4. Torna nell'app OAuth creata al passo 1 e correggi la *Authorization
   callback URL* con l'indirizzo vero: `https://sveltia-cms-auth.tuo-account.workers.dev/callback`.

### 3. Aggiorna `public/admin/config.yml`

Nel repository, apri `public/admin/config.yml` e sostituisci la riga
`base_url` con l'indirizzo del tuo Worker (senza `/callback` in fondo):

```yaml
backend:
  name: github
  repo: ArcyBR/coro-mater-misericordiae
  branch: main
  base_url: https://sveltia-cms-auth.tuo-account.workers.dev
  auth_endpoint: auth
```

Salva (commit) questa modifica.

### 4. Pubblica il sito su Cloudflare Pages

1. Vai su `dash.cloudflare.com` → **Workers & Pages** → **Create** →
   **Pages** → **Connect to Git**.
2. Autorizza Cloudflare ad accedere al tuo account GitHub e scegli il
   repository `coro-mater-misericordiae`.
3. Impostazioni di build: *Framework preset* → **Astro** (Cloudflare
   riconosce automaticamente comando `npm run build` e cartella `dist`).
4. Clicca **Save and Deploy**. In 1-2 minuti il sito sarà online su un
   indirizzo tipo `coro-mater-misericordiae.pages.dev`.

### 5. Aggiungi le persone che gestiranno i contenuti

Su GitHub, nel repository → **Settings** → **Collaborators** → **Add
people**, invita l'account GitHub di chi gestirà i contenuti (deve prima
essersi creato un account gratuito su github.com). Una volta accettato
l'invito, quella persona potrà aprire `https://<tuo-sito>.pages.dev/admin`,
cliccare "Login with GitHub" e gestire tutto da lì.

## Dominio personalizzato (facoltativo)

Cloudflare Pages assegna gratis un indirizzo tipo `nome.pages.dev`. Per un
dominio proprio, si collega in **Custom domains** nel pannello del progetto
Pages.

## Struttura del progetto

- `src/pages/` — le pagine del sito (Home, Chi siamo, Storia, Temi, Audizioni, Contatti)
- `src/content/pagine/` — i testi delle pagine fisse, editabili da `/admin`
- `src/content/temi/` — i "temi" (concerti/eventi), ognuno con galleria fotografica e video
- `src/content/storia/` — le tappe della Storia, con foto proprie o collegate a un Tema
- `src/content/impostazioni/` — impostazioni generali (es. foto di sfondo della home)
- `public/admin/` — il pannello di gestione (Decap CMS)
- `public/images/uploads/` — dove finiscono le foto caricate da `/admin`

## Ingrandimento foto (lightbox)

Tutte le gallerie del sito permettono di cliccare su una foto per vederla
ingrandita a schermo intero, con frecce per scorrere tra le foto dello stesso
gruppo e tasto Esc per chiudere.
