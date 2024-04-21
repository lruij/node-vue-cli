### 手把手实现 [node-vue-cli]() 脚手架

##### 初始化项目并安装工具：

- commander：命令自定义
- inquirer：命令交互
- ora：加载动画
- download-git-repo：仓库下载

```sh

mkdir node-vue-cli
cd node-vue-cli
npm init -y
npm install commander inquirer ora download-git-repo
```

##### 实现步骤：


1. 设置 package.json 并获取数据

```json
{
  "type": "module", // es模式
  "bin": {
    "node-vue-cli": "src/index.js" // 自定义命令执行文件
  }
}
```

```js
#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'


const filePath = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'package.json')
const json = fs.readFileSync(filePath, 'utf8')
console.log(json.version)
```

```sh
#// 挂载 bin 下面的命令到全局
npm link

#// 执行命令
node-vue-cli -V
```

2. 命令自定义

```js
#!/usr/bin/env node

import {program} from 'commander'

//... 1.获取 json 步骤

program.version(json.version) // -V 或者 --version 获取版本号

program
  .command('create <project>') // create 命令
  .alias('ctrl') // create 简写
  .description('create a new project') // create 描述
  .action(project => {
    console.log(project); // project 值
  })
```

3. 命令交互自定义

```js
#!/usr/bin/env node

import inquirer from 'inquirer'

// ...2.命令自定义获取到 project

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
    message: '是否支持 TypeScript'
  }
]).then(answers => {
  console.log(answers) // 对象 {projectName: value, isTs: value}
})

```

4. 根据输入的值下载 git 仓库

```js
import download from 'download-git-repo'
import ora from 'ora'

const spinner = org('downloading ...')
export const downloadTemp = (branch, project) => {
  spinner.start()
  return new Promise((resolve, reject) => {
    download(
      `github:lruij/vue-template#${branch}`,
      project,
      {clone: true},
      err => {
        if (err) {
          reject(err)
          console.log(err)
        }
        resolve()

        spinner.succeed('download finished')
      }
    )
  })
}

```

```sh
#// 测试
node-vue-cli create test-project
```
