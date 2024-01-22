▶️ [Demo](https://weather-weblux.vercel.app)

## 📄 Description
Une application météo réalisée dans le cadre de ma formation à Simplon. Il s'agissait de notre projet final, mobilisant toutes nos connaissances d'Angular acquises jusqu'ici. Elle a été réalisé en une semaine, avec comme difficulté ajoutée que nous étions deux au lieu de trois dans notre groupe. 

- L'utilisateur est automatiquement géolocalisé en arrivant sur la page. S'il refuse de donner sa position, alors l'application recherche par défaut la météo de Paris.
- Sur la page "Aujourd'hui", il peut voir la température actuelle, la météo générale (Nuageux, pluvieux...), la date du jour, la vitesse du vent ainsi que sa direction. Dans l'UI, la flèche "Direction du vent" utilise la propriété CSS "transform: rotate" pour représenter la donnée plus clairement à l'utilisateur.
- Sur la page "7 jours", il peut voir les prévisions météo des 7 prochains jours ainsi que les températures minimum et maximum prévues.
- L'utilisateur peut manuellement rechercher une autre ville. Si sa recherche ne donne aucun résultat, il est averti par une alerte.
- L'application utilise trois API externes. Pour la météo, il s'agit d'[Open Meteo](https://open-meteo.com/). Pour la géolocalisation, on obtient la position géographique de l'utilisateur via le navigateur (s'il l'accepte) puis la latitude et longitude sont converties en ville par [Open Street Map](https://nominatim.openstreetmap.org/ui/search.html). Enfin, lorsque l'utilisateur recherche manuellement une ville, l'application utilise l'API _geocoding_ d'Open Meteo pour trouver les coordonnés qui lui correspondent.

![Gif de l'application](preview.gif)

## 🔨 Outils utilisés
- HTML
- SCSS
- TypeScript
- Angular
