# Weskit - commands

## Instalando o Weskit
### Entrar na pasta Sites do servidor e abrir o terminal
1. `$ cd pasta_do_projeto`
2. `$ git clone git@github.com:iwwa/weskit.git`
3. `$ cp -rv weskit/* ./`
4. `$ rm -rf weskit`

## Configurando o gulpfile.js
### Alterando variáveis para o nome do tema em questão
const theme_label = 'My Theme';
const theme_name = 'mytheme';

## Iniciando o desenvolvimento do app
npm i
bower i
gulp init

## Outros comandos
### Continuando o desenvolvimento do app
gulp

## Gerando versão de produção
### Para subir versão quando fizer alguma alteração no app depois de pronto ou queira gerar versão com styles e scripts internos
#### Gerar html com style e script externo
gulp production
#### Gerar html com style e script interno (os argumentos podem ser passados individualmente)
gulp production --xjs --xcss

# Comandos adicionais

bower install swiper --save
