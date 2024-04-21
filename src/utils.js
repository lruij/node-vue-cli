import fs from 'node:fs'
import download from 'download-git-repo'
import ora from 'ora'

const spinner = ora('donwloading...')

export const checkPath = path => fs.existsSync(path)

export const downloadTemp = (branch, project) => {
  spinner.start()

  return new Promise((resolve, reject) => {
    download(`github:lruij/vue-template#${branch}`, project, err => {
      if (err) {
        reject(err)
        console.log(err);
      }
      resolve()
      spinner.succeed('download finished')
    })
  })
}
