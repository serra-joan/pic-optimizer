# Pic Optimizer

Eina web per optimitzar i convertir imatges a format **WebP**, construïda amb [Astro](https://astro.build).

## 🚀 Execució en local

```sh
pnpm run dev
```

El servidor de desenvolupament s'iniciarà a `localhost:4321`.

## ✨ Funcionalitats

### Conversió a WebP

Puja qualsevol imatge i l'eina la convertirà automàticament al format **WebP**.

### Redimensionament múltiple

Pots escollir diverses dimensions de sortida alhora. Per defecte, l'eina inclou tres mides predefinides:

- 📱 **Mòbil**
- 📟 **Tauleta**
- 🖥️ **Escriptori**

Pots afegir tantes dimensions addicionals com necessitis.

### Com funciona el redimensionament

En especificar les dimensions, indiques els **píxels màxims** del costat més gran. L'eina redimensiona de manera proporcional:

| Imatge original | Píxels màxims | Resultat    |
| :-------------- | :-----------: | ----------: |
| 1200 × 900      | 1000          | 1000 × 750  |
| 900 × 1200      | 1000          | 750 × 1000  |

### Qualitat de la conversió

Pots triar el percentatge de qualitat amb el qual es convertirà la imatge a WebP. El valor per defecte és **80%**.
