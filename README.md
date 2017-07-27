# JSExtract

Dictionnaire de "commandes". Contient aussi une gestion des expressions régulières (précéder la regex par un @ pour qu'elle soit reconnue par le programme).

## Utilisation

```javascript
JSExtract.dynamic.append("insert pull @[a-zA-Z\\s\.,-_]{1,255}", callback);
JSExtract.dynamic.append("insert push @[a-zA-Z\\s\.,-_]{1,255}", callback);
JSExtract.dynamic.append("git status", callback);
JSExtract.dynamic.append("drop -db @[a-zA-Z\\s\.,-_]{1,255} @[a-zA-Z\\s\.,-_]{1,255}", callback);
JSExtract.dynamic.append("drop -db @[a-zA-Z\\s\.,-_]{1,255} force", callback);

JSExtract.dynamic.search("drop -db esgi password");

JSExtract.dynamic.statistic(JSExtract.dynamic.tree, 1);

function callback(command, occurences) {
  console.log(command, occurences);
}
```

Résultat obtenu : 
```
drop -db esgi password
Array [ "esgi", "password" ]
```

La fonction donnée en callback prend deux paramètres : la commande et un tableau contenant les résultats ayant matchés avec les expressions régulières.