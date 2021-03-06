'use strict'

const spawn = require('child_process').spawn

module.exports = () => {
  return new Promise((resolve, reject) => {
    let started = false
    const relay = spawn('npm', ['run', 'start:rendezvous'], {
      stdio: ['inherit', 'pipe', 'inherit']
    })
    relay.stdout.on('data', (d) => {
      if (!started && d.toString().indexOf('Listening on') >= 0) {
        started = true
        resolve(relay)
      }
      process.stdout.write(d)
    })
  })
}
