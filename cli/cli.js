#!/usr/bin/env node

const cli = require('commander')
const package = require('./package.json')
const fs = require('fs')
const shell = require('shelljs')

function cloneStarter(dir) {
  if(!shell.which('git')) {
    shell.echo('Uh oh, looks like you don\'t have git installed!!')
    shell.exit(1)
  }
  shell.exec(`git clone https://github.com/DonSeannelly/express-ts.git ${dir}`)
}
function installDependencies(appname) {
  shell.cd(`${appname}`)
  if(!shell.which('npm')) {
    // TODO: Add detailed message with how to resolve
    shell.echo('npm must be installed!')
    shell.exit(1);
  }
  shell.exec('npm i')
}

cli
  .version(package.version)
  .description(package.description)

cli
  .command('new <appname>')
  .alias('n')
  .description('Scaffold a new Oriented app eg. "oriented-cli new [appname]')
  .option('-s, --skip-install', 'Skip installing packages.')
  .action((appname, options) => {
    const dir = `./${appname}`

    if(!fs.existsSync(dir)) {
      fs.mkdirSync(dir)
      cloneStarter(dir)
      options.skipInstall ? console.log('skipping install') : installDependencies(appname)
    } else console.log('It looks like there\'s already something in that directory!');
  })

cli.parse(process.argv)