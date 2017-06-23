# Iniciando o projeto

## Criar o banco de dados com o nome do tema (tudo minúsculo e separado por underline)

## Entrar na pasta Sites do servidor e abrir o terminal
git clone git@github.com:iwwa/weskit.git nome_da_pasta_do_projeto.com.br
cd nome_da_pasta_do_projeto.com.br
cp -rv ../WordPress/* ./

//

## Configurando o gulpfile.js
### Alterando variáveis para o nome do tema em questão
const theme_label = 'My Theme';
const theme_name = 'mytheme';

//

## Iniciando o desenvolvimento do app
npm i
bower i
gulp init

//

# Outros comandos

## Continuando o desenvolvimento do app
gulp

## Gerando versão de produção
### Para subir versão quando fizer alguma alteração no app depois de pronto ou queira gerar versão com styles e scripts internos
#### Gerar html com style e script externo
gulp production
#### Gerar html com style e script interno (os argumentos podem ser passados individualmente)
gulp production --xjs --xcss

# Comandos adicionais

bower install swiper --save
