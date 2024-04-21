#!/usr/bin/env node
// 指定 node 执行该文件

import { program } from 'commander'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import inquirer from 'inquirer'
import { checkPath, downloadTemp } from './utils.js'

const filePath = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'package.json')

let json = fs.readFileSync(filePath, 'utf-8')
json = JSON.parse(json)

program.version(json.version)

program
  .command('create <project>')
  .alias('ctrl')
  .description('create a new project')
  .action(project => {
    inquirer.prompt([
      {
        type: 'input',
        name: 'projectName',
        message: 'project name',
        default: project
      },
      {
        type: 'confirm',
        name: 'isTs',
        message: '是否支持 TypeScript',
      }
    ]).then(answers => {
      if (checkPath(answers.projectName)) {
        console.log('文件已存在');
        return
      }

      if (answers.isTs) {
        downloadTemp('ts', answers.projectName)
      } else {
        downloadTemp('js', answers.projectName)
      }
    })

  })

program.parse(process.argv);

