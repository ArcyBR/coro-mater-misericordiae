# Sito del Coro Polifonico "Mater Misericordiae"

Sito statico (Astro) con pannello di gestione contenuti online (Decap CMS),
pensato per essere aggiornato da una persona non tecnica.

## Come funziona

- Le pagine vengono generate come file statici (HTML puro): veloci, sicure,
  hosting gratuito.
- I contenuti (testi e foto) vivono come file in `src/content/` dentro questo
  stesso repository Git.
- La persona che gestisce il sito non tocca mai il codice: apre `/admin`
  nel browser, si logga con email e password, e da lì scrive testi, aggiunge
  o cancella foto, crea nuovi "temi" (concerti/eventi). Ogni salvataggio
  rigenera automaticamente il sito pubblico in 1-2 minuti.

## Pubblicazione (una tantum, da fare una volta sola)

1. **Crea un account GitHub** (gratuito) se non lo hai già, e crea un nuovo
   repository (es. `coro-mater-misericordiae`). Carica dentro tutto il
   contenuto di questa cartella.
2. **Crea un account Netlify** (gratuito) su netlify.com e collega il
   repository GitHub appena creato: Netlify legge `netlify.toml` e sa già
   come costruire il sito (comando `npm run build`, cartella `dist`).
3. Nel pannello Netlify del sito, vai su **Site configuration → Identity**
   e clicca "Enable Identity". Questo attiva il login per l'area `/admin`.
4. Sempre in Identity, vai su **Services → Git Gateway** e clicca "Enable
   Git Gateway": è ciò che permette a Decap CMS di scrivere i file nel
   repository al posto tuo.
5. In **Identity → Invite users**, invita l'indirizzo email della persona
   (segretaria/corista) che gestirà i contenuti. Riceverà un'email per
   impostare la password.
6. Da quel momento, quella persona apre `https://<nome-sito>.netlify.app/admin`,
   fa login, e gestisce tutto da lì: testi delle pagine (Chi siamo, Storia,
   Audizioni, Contatti), e i "Temi ed eventi" con le loro gallerie fotografiche
   (più foto per ogni tema, aggiungibili e rimovibili liberamente).

## Dominio personalizzato (facoltativo)

Netlify assegna gratis un indirizzo tipo `nome-a-scelta.netlify.app`. Se in
futuro si vuole un dominio proprio (es. `coromatermisericordiae.it`), si può
collegare in **Site configuration → Domain management** senza toccare nulla
del resto.

## Struttura del progetto

- `src/pages/` — le pagine del sito (Home, Chi siamo, Storia, Temi, Audizioni, Contatti)
- `src/content/pagine/` — i testi delle pagine fisse, editabili da `/admin`
- `src/content/temi/` — i "temi" (concerti/eventi), ognuno con una galleria
  fotografica; editabili e creabili liberamente da `/admin`
- `public/admin/` — il pannello di gestione (Decap CMS)
- `public/images/uploads/` — dove finiscono le foto caricate da `/admin`
