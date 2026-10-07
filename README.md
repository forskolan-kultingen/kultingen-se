# kultingen.se

Hemsidan för Föräldrakooperativet Kultingen. Den publiceras med GitHub Pages,
som bygger sidorna automatiskt varje gång något ändras här.

## Ändra text eller bilder (för alla)

1. Gå till **https://app.pagescms.org** och logga in med ditt GitHub-konto.
   Du behöver ha fått tillgång till repot `forskolan-kultingen/kultingen-se`.
2. Välj repot. Till vänster finns sidorna: Startsidan, Pedagogik,
   Om Kooperativet, Anmälan och kö, Kontakta oss med flera.
3. Ändra i fälten och klicka **Save**.
4. Efter någon minut syns ändringen på sajten.

Bra att veta:

- **Kontaktuppgifter** (öppettider, adress, telefon, mejl) ändras på ett ställe,
  under "Kontaktuppgifter", och syns sedan överallt.
- På **Anmälan och kö** står `[termin]` i första stycket. Där visar sidan
  automatiskt den termin det är (juli till november HT, december VT året efter,
  januari till juni VT).
- I formaterad text betyder `**ord**` fetstil.
- Allt sparas med historik i GitHub. Blev något fel går det att backa till en
  tidigare version under fliken "History" eller här i repot.

## Hur sajten är byggd (för den som kodar)

- Ingen kod behöver köras lokalt. GitHub Pages bygger med Jekyll.
- `*.md` innehåller sidornas text, som fält överst (front matter) och som text
  under. `_data/` innehåller kontaktuppgifter och menyn.
- `_layouts/` innehåller HTML-mallarna. Sidhuvud och sidfot finns i `default.html`.
- `assets/` innehåller stilmallen, skriptet för bildgalleriet, typsnittet (Jost)
  och alla bilder. Allt ligger här i repot, inget hämtas från andra sajter.
- `.pages.yml` bestämmer vilka fält som går att redigera i Pages CMS.
- `tools/bubblor.mjs` ritar de handritade såpbubblorna och `tools/fetch-images.sh`
  hämtade originalbilderna från gamla kultingen.se. Båda behövs bara om det
  ska göras om.

## Publicering

1. Repot måste vara publikt (GitHub Pages är gratis för publika repon).
2. Settings → Pages → Source: **Deploy from a branch**, branch `main`, mapp `/ (root)`.
3. Sajten syns på https://forskolan-kultingen.github.io/kultingen-se/

### Byta till kultingen.se

1. I `_config.yml`: sätt `url: "https://kultingen.se"` och `baseurl: ""`.
2. Lägg till en fil som heter `CNAME` med raden `kultingen.se`.
3. Hos domänleverantören (ZoneEdit), ändra **bara** följande:
   - A-posterna för `kultingen.se` till 185.199.108.153, 185.199.109.153,
     185.199.110.153, 185.199.111.153;
   - `www` som CNAME till `forskolan-kultingen.github.io`.
4. **Rör inte MX-posterna.** De skickar mejlen till info@kultingen.se via Google.
5. Settings → Pages: fyll i kultingen.se som Custom domain och kryssa i
   **Enforce HTTPS** när certifikatet är klart.
6. Säg upp Squarespace först när kultingen.se visar den nya sajten.
