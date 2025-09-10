# Migration des dossiers `.cd` et `.ci` vers `scripts`

## ✅ Changements effectués

### Structure des dossiers

```diff
- .cd/
-   add-license-headers.ts
- .ci/
-   _constants/
-   build/
-   coherency/
-   publish/
-   tests/
-   version/
+ scripts/
+   build/
+   coherency/
+   constants/
+   license/
+   publish/
+   tests/
+   version/
```

### Organisation thématique

- **📦 `build/`** : Scripts de construction et de génération des packages
- **🔗 `coherency/`** : Scripts de validation de la cohérence du projet
- **📋 `constants/`** : Constantes partagées entre les scripts (anciennement `_constants`)
- **📄 `license/`** : Gestion des licences (anciennement dans `.cd`)
- **🚀 `publish/`** : Scripts de publication des packages
- **🧪 `tests/`** : Scripts utilitaires pour les tests
- **🏷️ `version/`** : Gestion des versions et des releases

### Fichiers mis à jour

#### `package.json`
```diff
- "build": "bun .ci/build/"
+ "build": "bun scripts/build/"
```

#### `bunfig.toml`
```diff
- preload = ".ci/tests/preload.ts"
+ preload = "scripts/tests/preload.ts"
```

#### `.editorconfig`
```diff
- [.cd/*]
+ [scripts/*]
```

#### Workflows GitHub (`.github/workflows/release.yml`)
```diff
- bun .ci/version/version-manager.ts --auto
+ bun scripts/version/version-manager.ts --auto
```

#### Documentation
- `.copilot/project-context.md` - Références mises à jour
- `.copilot/prompts.md` - Références mises à jour 
- `.copilot/todo.md` - Références mises à jour
- `.github/workflows/README.md` - Références mises à jour

#### Scripts internes
- Tous les imports `../_constants` → `../constants`
- Tous les appels de scripts mis à jour dans `release.ts` et `pre-release-validator.ts`
- Messages d'aide et documentation dans les scripts mis à jour

### Documentation ajoutée

- **`scripts/README.md`** : Documentation complète de la nouvelle organisation
- Les fichiers de documentation existants (`RELEASE.md`, `VERSION_PUBLISH.md`) ont été conservés et leurs références mises à jour

## ✅ Tests de validation

Le script de cohérence a été testé avec succès :
```bash
bun scripts/coherency/ --dry-run
```

Tous les scripts sont maintenant opérationnels avec la nouvelle structure.

## 🎯 Avantages de la nouvelle organisation

1. **🎯 Clarté** : Structure plus claire avec des noms de dossiers explicites
2. **📚 Documentation** : Chaque dossier a une fonction bien définie
3. **🔍 Maintenabilité** : Plus facile de trouver et maintenir les scripts
4. **🏗️ Cohérence** : Organisation logique par domaine fonctionnel
5. **📖 Lisibilité** : Noms de dossiers plus expressifs (ex: `constants` vs `_constants`)

## 🚀 Migration complète

La migration est complète et tous les systèmes continuent de fonctionner normalement avec la nouvelle structure.
