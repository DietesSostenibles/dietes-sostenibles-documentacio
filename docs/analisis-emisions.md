# ✔️ Analisis dels tipus d'emisions

## Panel 1: Introduccio

### Shiny Emissions v3

Dashboard en **RStudio (Shiny + shinydashboard)** per analitzar l'impacte ambiental de dietes, comparar dues solucions (A i B), desglossar emissions per ingredient i origen, i incorporar l'efecte del transport.

### Objectiu del projecte

L'aplicacio permet:

1. Carregar dades ambientals, de formulacio de dietes i de transport.
2. Comparar dos escenaris (Solucio A i Solucio B) per etapa productiva.
3. Analitzar impactes ambientals per dieta, per origen geografic i per ingredient.
4. Reassignar origens d'ingredients per a simulacio d'escenaris.
5. Exportar resums per al seu us extern.

### Estructura del dashboard

El dashboard s'organitza en:

1. **Bloc superior de configuracio**
2. **Bloc avancat col-lapsable**
3. **Tabset principal** amb les analisis

#### Bloc superior de configuracio

Inclou tres passos:

1. **Importar arxius** (`.xlsx`): `Ambiental`, `Dietes`, `Transport`.
2. **Seleccio d'etapa** per comparar: `stepA` (Solucio A) i `stepB` (Solucio B).
3. **Seleccio d'impactes** a visualitzar:
   - `climate_change`
   - `land_use`
   - `water_use`
   - `eutrophication_marine`
   - `acidification`
   - `particulate_matter`

#### Bloc avancat (col-lapsable)

Inclou:

1. **Reassignacio d'origens** per ingredient (nomes ingredients amb mes d'un origen disponible).
2. **Aplicar canvi** i **restablir overrides**.
3. **Descarrega de resum** en CSV (`resum_impactes_solucions_<data>.csv`).

### Dades d'entrada

El projecte fa servir 3 fitxers Excel:

1. **Ambiental**
2. **Dietes**
3. **Transport**

#### Format esperat (minim)

1. **Ambiental**
   - Columnes obligatories: `ingredient`, `group`, `origen`, `default_origen`.
   - Columnes d'impacte reconegudes (si existeixen): `climate_change`, `land_use`, `water_use`, `eutrophication_marine`, `acidification`, `particulate_matter`.
2. **Dietes**
   - Columnes obligatories: `step`, `ingredient`, `diet`, `prop`.
3. **Transport**
   - Columna obligatoria: `origen`.
   - Pot incloure columnes d'impacte per integrar l'efecte del transport per origen.

### Unitats d'impacte

Les unitats definides a l'app son:

- `climate_change`: `kg CO2 eq`
- `land_use`: `dimensionless (pt)`
- `water_use`: `m3 world eq`
- `eutrophication_marine`: `kg N eq`
- `acidification`: `mol H+ eq`
- `particulate_matter`: `disease incidence`

## Panel 2: TabPanels

### Visio general

- Que mostra: KPIs de recompte (`ingredients`, `origins`, `diets`, `steps`) i llistat de dietes per a Solucio A i Solucio B.
- Per a que serveix: validar rapidament la carrega de dades i tenir una foto inicial de la dimensio de l'analisi.

### Composicio per dieta

- Que mostra: grafic interactiu de composicio per a Solucio A i Solucio B.
- Per a que serveix: entendre proporcions d'ingredients per dieta i detectar canvis de formulacio entre escenaris.

### Impactes per dieta

- Que mostra: barres comparatives A vs B per dieta i un grafic per cada impacte seleccionat.
- Per a que serveix: comparar rendiment ambiental de les dues solucions i detectar en quines dietes apareix la diferencia mes gran.

### Contribucio per origen

- Que mostra: barres apilades per origen per a Solucio A i Solucio B, amb una analisi per cada impacte seleccionat.
- Per a que serveix: identificar paisos/origens mes contributors i avaluar la sensibilitat geografica de l'impacte.

### Top ingredients

- Que mostra: top 5 ingredients per dieta i impacte seleccionat, amb comparacio en paral-lel de Solucio A i Solucio B.
- Per a que serveix: prioritzar ingredients objectiu per a reduccio d'emissions i trobar palanques de millora d'alt impacte.

### Mapa d'origens

- Que mostra: mapa mundial d'origens d'ingredients per a Solucio A i Solucio B.
- Per a que serveix: visualitzar la distribucio geografica de la cadena de subministrament i detectar concentracions d'origen.

### Distribucio

- Que mostra: boxplots A vs B per impacte seleccionat i dispersio de valors entre dietes.
- Per a que serveix: analitzar variabilitat (no nomes mitjanes) i detectar outliers.

### Diferencia A - B

- Que mostra: diferencia directa d'impacte per dieta (`A - B`) per a cada impacte seleccionat, i missatge de control quan `stepA == stepB`.
- Per a que serveix: veure rapidament qui "guanya" per impacte i quantificar la magnitud/signe de la diferencia.

### Desglossament Impacte

- Que mostra: descomposicio de l'impacte en contribucio d'ingredients i de transport, amb vista comparativa A vs B.
- Per a que serveix: entendre d'on venen les emissions i decidir si convé actuar en formulacio, origen o logistica.

### Verificacio d'Ingredients

- Que mostra: ingredients presents en dietes pero absents a la base ambiental, o missatge correcte quan no hi ha faltants.
- Per a que serveix: control de qualitat de dades abans d'interpretar resultats i evitar conclusions esbiaixades.

### Contribucio Total

- Que mostra: taula editable de `kg_consum` per dieta/etapa i comparacio d'impacte total acumulat A vs B.
- Per a que serveix: escalar l'impacte a una realitat de consum i simular escenaris productius amb diferents kg consumits.

### Petjada Ambiental

- Estat actual: pestanya creada a UI, sense visualitzacions implementades a `server.R`.
- Us previst: espai reservat per a un resum addicional de petjada ambiental.

## Panel 3: Recomanacions d'us

### Flux recomanat

1. Carregar els tres fitxers (`Ambiental`, `Dietes`, `Transport`).
2. Revisar `Visio general` i `Verificacio d'Ingredients`.
3. Seleccionar `stepA` i `stepB`.
4. Triar impactes rellevants.
5. Analitzar `Impactes per dieta`, `Contribucio per origen`, `Top ingredients` i `Desglossament Impacte`.
6. Si cal, aplicar overrides d'origen i repetir la comparacio.
7. Ajustar `kg_consum` a `Contribucio Total` per a analisi acumulada.
8. Exportar el resum final.

### Estructura del projecte

- `global.R`: llibreries, constants globals, funcions de carrega/calc/plot.
- `ui.R`: estructura visual completa del dashboard.
- `server.R`: logica reactiva, validacions, calculs i renderitzat.
- `www/style.css`: estils personalitzats.
- `Dades/`: dades auxiliars (incloent coordenades i taules de paisos).

### Execucio

Des de RStudio, obrir el projecte `shiny_emissions_v3.Rproj` i executar l'app amb `Run App`.

