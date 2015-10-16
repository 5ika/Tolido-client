# Tolido

Tolido est un application NodeJS permettant de gérer des todo-lists classées par projet.
Elle est composée d'une partie serveur et d'une partie client.

## Installation
```
sudo apt-get install nodejs npm
git clone https://github.com/5ika/Tolido-client.git
cd tolido-client
npm install -g bower
npm install && bower install
npm start
```

Vous pouvez ensuite y accéder à l'adresse http://localhost:5050

## Serveur
Pour fonctionner, le client Tolido a besoin d'un serveur.
Vous pouvez soit utiliser le serveur http://5ika.ovh:3000, soit faire tourner votre propre serveur.
Vous pouvez trouver le dépôts du serveur [ici](https://github.com/5ika/Tolido-server).


## Chiffrement
Pour le moment, Tolido ne gère pas le chiffrement (c'est une version beta).
Cela signifie que vos données ne sont pas protégées sur la liaison Internet ainsi que dans la base de données.
Mais c'est en cours de développement :-)
