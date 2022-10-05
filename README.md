# TP JavaScript : formulaires avancés

Compétences mobilisées :

- Manipulation avancée du DOM
- Communication asynchrone avec une API Rest
- Utilisation de librairies externes JavaScript 

**L'utilisation de librairies tierces non spécifiée dans le TP est interdite.**



Ici, nous allons travailler pour une boutique en ligne. Le client nous demande d'ajouter un système de commentaires clients sur les fiches produits. Chaque commentaire aura :

- Un champ `content` qui contiendra le contenu du commentaire. Ce champ sera :
  - **facultatif**
  - **ne pourra excéder une longueur de 150 caractères**.

- Un champ `username` pour le pseudonyme de l'utilisateur. Celui-ci sera :
  - **obligatoire**
  - **devra contenir que des lettres**
  - avoir une longueur située entre **5 et 15 caractères**.

- Un champ de `rating` pour la note de l'utilisateur. Celle-ci sera :
  - **obligatoire**
  - **un entier compris entre 1 et 5**




Jean-Michel, qui travaille à la compta, sait programmer en HTML. Il a donc préparé pour vous quelques commentaires qui vous serviront de base pour le design. 



## Comment lancer le TP

- Ouvrez un terminal dans le dossier `api` et lancez les commandes `npm i `, `npm run build` puis la commande `npm run start:prod`. Vous devriez pouvoir ouvrir http://localhost:3030 dans votre navigateur. Vous devriez voir une page *API Commentaires*. L'API servira plus tard dans le TP, mais ce serveur s'occupe aussi de fournir certaines images, il doit donc être lancé.
- Ouvrez un terminal à la racine du dossier et exécutez la commande `npx serve` et accédez à l'URL http://localhost:3000



## Exercices :

1. Récupérez le fichier de base HTML et **créez ce formulaire en HTML** à partir des spécifications ci-dessus.



2. Lorsque le formulaire est soumis, **créez un nouveau commentaire dans le DOM à partir des données extraites du formulaire et ajoutez-le à la liste**. Vous viderez également tous les champs du formulaire.

   > **Concepts clés :**
   >
   > - [Balise `<template>`](https://developer.mozilla.org/fr/docs/Web/HTML/Element/template) (vous pouvez récupérer le contenu et le manipuler comme du DOM classique avant de l'append)
   >
   > **Fonctions clés :**
   >
   > - [`element.append()`](https://developer.mozilla.org/fr/docs/Web/API/Element/append)
   > - [`element.prepend()`](https://developer.mozilla.org/fr/docs/Web/API/Element/prepend)
   > - [`element.addEventListener()`](https://developer.mozilla.org/fr/docs/Web/API/EventTarget/addEventListener), event `submit` (ouais je suis sympa)
   > - [`event.preventDefault()`](https://developer.mozilla.org/fr/docs/Web/API/Event/preventDefault)
   > - [`element.cloneNode()`](https://developer.mozilla.org/en-US/docs/Web/API/Node/cloneNode)



3. Ajoutez de l'interactivité à votre formulaire en **implémentant une validation temps réel en JavaScript** :

   1. Validez en temps réel le **format du pseudonyme saisi** par l'utilisateur sans passer par la validation HTML fournie par nativement par l'attribut `pattern`.
   2. **Ajoutez un compteur de caractère en bas à droite de la zone de texte** `content` qui indiquera en temps réel le nombre de caractères présent dans le commentaire.


   ![Aperçu attendu du champ de note](https://github.com/arthur-eudeline-cours/javascript-tp-formulaires-avances/blob/main/field-screenshot.png?raw=true)

   4. Pour le champ `rating`, vous **implémenterez un champ avec 5 icônes d'étoiles**, lorsque l'utilisateur cliquera sur l'une d'elle, cela attribuera une note entre 1 et 5 et remplira l'étoile sélectionnée et les étoiles précédentes. (Vous pourriez le faire uniquement en CSS si vous étiez énervé, mais pour s'entrainer à manipuler le DOM, vous le ferez en JS).

   > Expression régulière à utiliser pour valider le pseudonyme `/^[a-zA-Z]+$/`, pour voir comment elle fonctionne, insérez-la sur le site [Regxr](https://regexr.com/).
   >
   > **Fonctions clés** :
   >
   > - [`element.addEventListener()`](https://developer.mozilla.org/fr/docs/Web/API/EventTarget/addEventListener), event `input` (oui, si vous utilisez `change` l'event ne sera trigger que lorsque l'utilisateur désélectionnera le champ)
   > - [`string.match()`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/String/match) 
   > - [`element.innerHTML`](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML)
   > - [`element.classList`](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList)
   > - [`event.currentTarget`](https://developer.mozilla.org/en-US/docs/Web/API/Event/currentTarget)
   > - [`element.previousElementSibling`](https://developer.mozilla.org/en-US/docs/Web/API/Element/previousElementSibling)





4. Pour éviter que des bots puissent abuser de notre système, vous ajouterez un **système de Recaptcha à la soumission du formulaire**.

   1. Connectez-vous avec un compte Google et générer une paire de clé Client/Serveur via l'interface située à l'adresse suivante https://www.google.com/recaptcha/admin
      - Cliquez que le "+" en haut à droite
      - Remplissez les champs
      - Pour le **type** sélectionnez **reCAPTCHA version 2** puis "*Case à cocher*"
      - Pour le domaine ajoutez `localhost` 
      - Générez les clés et **gardez la page ouverte**

   2. Consultez la documentation suivante Google reCAPTCHA V2 Checkbox https://developers.google.com/recaptcha/docs/display pour savoir comment afficher un reCAPTCHA. **Incluez le script et le code HTML requis pour l'affichage**.

   3. Copiez les clés données et **utilisez la clé du site dans l'attribut HTML** `data-sitekey` et saisissez la **clé privée dans le fichier **`.env` à la racine du projet (faites une copie du fichier `.env.sample` et renommez-le en `.env`)

   4. Actualisez votre page, à cette étape, votre reCAPTCHA devrait être visible !

   5. Consultez cette documentation https://developers.google.com/recaptcha/docs/display#js_api puis ouvrez une console dans votre page, remarquez que vous avez maintenant accès à l'objet global `grecaptcha`, observez-le et testez ses méthodes.

   6. À la soumission du formulaire, récupérez la réponse du reCAPTCHA et incluez-la à vos données sous la clé `grecaptcha`. 

      - Si le reCAPTCHA n'est pas soumis, affichez un message d'erreur spécifiant que le reCAPTCHA est requis.

      - Une fois le formulaire soumis, **réinitialisez également le reCAPTCHA.**

      > **Fonction clés**
      >
      > - [`grecaptcha.reset()`](https://developers.google.com/recaptcha/docs/display#js_api)



5. À présent que le système est implémenté côté client, il est temps de le faire **communiquer avec un serveur !** Ce sujet étant nouveau pour vous, je vous recommande vivement de lire l'aide sous cette question.

   1. Première étape, **comprendre comment communiquer avec le serveur et ce qu'il vous est possible de faire**. Rendez-vous sur http://localhost:3030 pour y trouver une documentation OpenAPI Swagger. *Pro tips de gamer, ne restez pas sur les onglets "Example Value", allez plutôt sur les onglets "Schema"*. 
      Pour observer les requêtes que vous qui partent de votre navigateur à destination de l'API, utilisez les devtools du navigateur onglet *network* et filtrez vos requêtes sur *Fetch/XHR*. Lorsque vous cliquez sur une requête, focalisez vous sur les onglets *Preview* et *Payload* (si vous avez vos devtools en français, je vous recommande de les passer en anglais).
   2. À la soumission du formulaire, **vous enverrez les données saisies dans le formulaire au serveur au format JSON via une requête HTTP POST**. Vous afficherez un **indicateur de chargement** le temps que la requête soit complétée et, une fois que le serveur aura répondu, vous **ajouterez le commentaire fournit à la liste des commentaires publiés**.
   3. Essayez de transmettre une note de 2.5 au serveur, ou de réutiliser un email déjà soumis. Notre système côté client autorise tout nombre compris entre 1 et 5, mais le serveur exige quant à lui un entier. Ce dernier s'assure aussi qu'un utilisateur n'écrit qu'un seul commentaire. Le retour serveur indique quels champs sont en erreur. **Implémentez l'affichage des messages d'erreurs retournés par le serveur.** 
   4. Remarquez que le serveur vous fournit une information supplémentaire, la date de publication du commentaire dans un format ISO. **Vous afficherez cette date au format français et relatif ("il y a 1j", "le 20/09/2022") dans chaque commentaire.**
   5. Lorsque vous rafraichissez la page, vous perdez les commentaires que vous avez ajoutés. Pourtant, depuis que vous les transmettez au serveur, ils sont sauvegardés en base de données ! **Effectuez une requête AJAX pour charger les commentaires déjà publiés sur votre page.** 
   6. (*BONUS*) Remarquez le retour du listing des commentaires affiche des données liée à la pagination des commentaires, eh oui si on affichait directement tous les commentaires présents en base de données, il se pourrait que le navigateur rame un peu. Pour contrer ça, on met en place des systèmes de pagination ou d'*infinite scrolling*. **Ajoutez un bouton à la fin de la liste des commentaires pour lister plus de commentaires**. Pour se faire, reportez vous à la documentation OpenAPI du projet.

   > **Qu'est-ce qu'une API Rest ?** Une API Rest est un moyen de faire communiquer deux programmes disctint via l'utilisation de requêtes HTTP. Pour faire simple, on va envoyer des requêtes spécifiques à un serveur qui nous répondra en JSON. 
   >
   > **Quelques notions à savoir**
   >
   > - **Codes HTTP**
   >   - 2xx → tout est OK
   >     - 200 : la requête est OK
   >     - 201 : la ressource a été créée (c'est ce que devra vous répondre le serveur à la création d'un commentaire)
   >   - 4xx → y a un problème dans l'interaction que fait le client avec le serveur
   >     - 400 : la requête transmise contient des erreurs 
   >     - 404 : la ressource n'existe pas
   >   - 5xx → il y a un problème au niveau du serveur ou l'application est en erreur
   >     - 500 : une erreur inconnue est survenue (souvent c'est l'application côté serveur qui plante)
   > - **Méthodes HTTP** : quand on fait une requête HTTP, il y a plusieurs méthodes `GET` et  `POST` (ça devrait vous évoquer quelque chose), mais aussi `PUT`, `PATCH`, `DELETE`, ... Chaque méthode aura des actions différentes en fonction de l'URL sur laquelle elle est envoyée.
   >   - `GET` lecture, si on fait `GET http://localhost:3030/comment` on listera tous les commentaires, si on fait `GET http://localhost:3030/comment/52`, on récupérera le commentaire avec l'ID 52.
   >   - `POST` création, si on envoie des données à `POST http://localhost:3030/comment` on va créer un commentaire
   >   - `PUT` & `PATCH` modification : 
   >     - `PUT` on remplacera l'intégralité des valeurs d'une ressource avec celles transmises
   >     - `PATCH` on ne remplacera que les champs transmis sur la ressource (par exemple que le contenu d'un commentaire)
   >   - `DELETE` suppression d'une ressource
   >
   > **URL de l'API Rest**
   >
   > **⚠️ ATTENTION : n'utilisez pas https pour communiquer avec l'API en local**.
   >
   > - `POST http://localhost:3030/comment/` : créer un nouveau commentaire
   > - `GET http://localhost:3030/comment/` : liste les commentaires
   >
   > **Fonctions clés :**
   >
   > - [`fetch()`](https://developer.mozilla.org/fr/docs/Web/API/Fetch_API/Using_Fetch), attention par défaut les requêtes sont envoyées en `GET` 
   > - [YouTube - Tutoriel sur le formatage des dates](https://www.youtube.com/watch?v=acemrBKuDqw), utilisez des écouteurs !

   

6. Le client étant satisfait de votre travail avec les commentaires, il vous demande une autre amélioration de la page produit : **transformez la gallerie d'images du produit en carrousel**. Pour cela, vous utiliserez la librairie Swiper.js, en utilisant un CDN (et non pas NPM ! nous verrons ça plus tard, juré craché). 

   1. Vous implémenterez d'abord un **carousel horizontal** de toutes les images produit, et **si l'utilisateur arrive à la dernière image, vous retournerez à la première image**.
   1. Ensuite, vous ajouterez des **flèches de navigation**, pour qu'au clic nous puissions changer d'image.
   1. Par défaut, **le carrousel se lancera de lui-même avec un délai de 5sec** entre chaque image au chargement de la page. Cependant, **si l'utilisateur passe une slide, la lecture automatique s'arrêtera**.
   1. Vous **ajouterez une pagination** au swiper pour indiquer à l'utilisateur le nombre d'images qu'il y a.
   1. Enfin, vous **ajouterez un système de zoom sur les images**. Au clic sur l'une d'elle, l'image s'ouvrira en agrandi au centre de la page

   > **Librairies à utiliser**
   >
   > - [Swiper.JS](https://letmegooglethat.com/?q=swiperjs)
   > - [MediumZoom](https://github.com/francoischalifour/medium-zoom)

