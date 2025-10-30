# ✔️ Validació de Dades a Excel

## Creació de Taules i Validació de Dades entre Fulls a Excel

Aquest document explica els passos per crear una `Taula` a Excel, i com utilitzar dades d'una taula en un full per a una `Validació de Dades` en un altre full.

---

## 1. Com Crear una Taula a Excel

Una **Taula d'Excel** no és només un rang amb vores; proporciona funcionalitats addicionals com filtres automàtics, referències estructurades i la capacitat d'expandir-se automàticament.

### Passos per crear una taula:

1.  **Seleccionar les Dades:** Fes clic a qualsevol cel·la dins del rang de dades que vols convertir en taula.
2.  **Activar l'Eina:**
    * Vés a la pestanya **Insereix** i fes clic al botó **Taula** (o utilitza la drecera de teclat: `Ctrl + T`).
    * *Alternativament:* Vés a la pestanya **Inici** i al grup "Estils", fes clic a **Dona format com a taula** i tria un estil.
3.  **Confirmar Rang:** Apareixerà la finestra "Crea taula". Assegura't que el **rang de cel·les** sigui correcte.
4.  **Capçaleres:** Marca la casella **"La taula té capçaleres"** si les teves dades inclouen una fila de títols per a les columnes. És **altament recomanable** que sempre utilitzis capçaleres.
5.  **Acceptar:** Fes clic a **Accepta**.

> **⭐ Resultat:** El teu rang de cel·les ara té format de taula, incloent-hi **filtres automàtics** i una nova pestanya contextual anomenada **Disseny de Taula** (o similar, depenent de la teva versió d'Excel), on pots canviar el seu nom.

---

## 2. Validació de Dades (Llista Desplegable) des d'un Altre Full

Per a una validació de dades que es basa en el contingut d'una taula d'un altre full, és millor utilitzar la característica de **"Nom de Rang"** o, idealment, una **Referència Estructurada** al nom de la taula.

### 2.1. Preparació de la Llista d'Origen

Primer, assegura't que la llista que utilitzaràs per a la validació sigui una **Taula** amb un **Nom Únic**.

1.  **Vés al Full d'Origen:** Navega al full on es troba la taula de la qual vols obtenir les dades (ex: `Full2`).
2.  **Anomena la Taula:**
    * Fes clic a qualsevol cel·la de la taula.
    * Vés a la pestanya **Disseny de Taula**.
    * Al grup "Propietats", al camp **Nom de la taula**, dona-li un nom simple i sense espais (ex: `LlistaPaisos`).

### 2.2. Creació del Rang Anomenat (Opcional, però recomanat per a compatibilitat)

Encara que la referència estructurada és ideal, un **rang anomenat** acostuma a ser més fiable per a la Validació de Dades.

1.  **Seleccionar la Columna d'Origen:** A la taula (`LlistaPaisos`), selecciona **només la columna de dades** que s'utilitzarà per a la llista desplegable (ex: la columna `[Nom de País]`).
2.  **Anomena el Rang:**
    * Vés al **Quadre de noms** (la caixa petita just a sobre de la columna A, a l'esquerra de la barra de fórmules).
    * Escriu un nom de rang (ex: `PaisosValids`) i prem `Intro` (`Enter`).

### 2.3. Aplicar la Validació de Dades

1.  **Vés al Full de Destí:** Navega al full on vols la llista desplegable (ex: `Full1`).
2.  **Seleccionar Cel·la:** Fes clic a la cel·la o rang de cel·les on aplicaràs la llista.
3.  **Obrir Validació de Dades:**
    * Vés a la pestanya **Dades**.
    * Al grup "Eines de dades", fes clic a **Validació de dades**. 
4.  **Configurar la Llista:**
    * A la pestanya **Configuració**, a **Permet**, selecciona **Llista**.
    * Al camp **Origen**, escriu el símbol d'igual (`=`) seguit del nom de rang que has creat:
        ```excel
        =PaisosValids
        ```
    * *Si no vas utilitzar un rang anomenat, podries utilitzar la **Referència Estructurada** de la columna:*
        ```excel
        =INDIRECTE("LlistaPaisos[Nom de País]")
        ```
        > **⚠️ Nota:** La funció `INDIRECTE` permet que Excel llegeixi la referència a la taula d'un altre full en la validació de dades. És **crucial** utilitzar el nom de la taula i el nom exacte de la columna entre claudàtors.
5.  **Acceptar:** Fes clic a **Accepta**.

Ara, la cel·la a `Full1` tindrà una llista desplegable amb els valors de la columna de la teva taula a `Full2`. Si afegeixes o elimines elements a la taula d'origen, la llista desplegable s'**actualitzarà automàticament** (si has utilitzat una referència a la taula o un rang dinàmic).