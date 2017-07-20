
# Weskit - Commands

## Instalando o Weskit
Entrar na pasta Sites do servidor e abrir o terminal.

`$ cd pasta_do_projeto`
`$ git clone git@github.com:iwwa/weskit.git`
`$ cp -rv weskit/* ./`
`$ rm -rf weskit`

## Configurando o gulpfile.js
Alterar variáveis para o nome do tema em questão
`const theme_label = 'My Theme';`
`const theme_name = 'mytheme';`

## Iniciando o desenvolvimento do app
`$ npm i`
`$ bower i`
`$ gulp init`

## Continuando o desenvolvimento do app
`$ gulp`

### Gerando versão de produção
##### Gerar versão com styles e scripts internos

**Gerar html com style e script externo**
`$ gulp production`

**Gerar html com style e script interno (os argumentos podem ser passados individualmente)**
`$ gulp production --xjs --xcss`

## Comandos adicionais
`$ bower install swiper --save`
