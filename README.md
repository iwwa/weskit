# Weskit

Weskit is an template for use to start the development of web projects.

## Dependencies

1. [Sass](http://sass-lang.com/install)

2. [NPM](https://nodejs.org/en/)

3. Gulp

```
npm i -g gulp
```

## Instalando o Weskit
Entrar na pasta do projeto e abrir o terminal.

```
$ git clone https://github.com/iwwa/weskit.git
```

```
$ cp -rT weskit/ ./
```

```
$ rm -rf weskit
```

## Configurando o gulpfile.js

Alterar variáveis para o nome do tema.

```
const theme_label = 'My Theme';
const theme_name = 'mytheme';
```

## Iniciando o desenvolvimento do app

```
$ npm i
```

```
$ bower i
```

```
$ gulp init
```

## Continuando o desenvolvimento do app

```
$ gulp
```

## Gerando versão de produção

**Gerar html com style e script externo**

```
$ gulp production
```

**Gerar html com style e script interno**

```
$ gulp production --xjs --xcss
```

## Comandos adicionais

```
$ bower install swiper --save
```
