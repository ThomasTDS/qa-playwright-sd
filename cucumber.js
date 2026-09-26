require('dotenv').config();

module.exports = {
  default: {
    require: ['steps/**/*.ts'],
    paths: ['features/**/*.feature'],
    requireModule: ['ts-node/register'],
    // 'progress' e 'summary' nao convivem com allure-cucumberjs/reporter (em
    // qualquer ordem): os testes rodam normalmente, mas os arquivos em
    // allure-results/ simplesmente nao sao escritos. 'html' nao tem esse problema.
    format: ['allure-cucumberjs/reporter', 'html:reports/cucumber-report.html'],
    parallel: 4,
  },
};
