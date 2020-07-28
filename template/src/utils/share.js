let callbacks = []

function shareRegister(callback) {
  callbacks.push(callback)
}

function shareCallback() {
  callbacks.forEach((callback) => {
    callback()
  })
  callbacks = []
}

export { shareRegister, shareCallback }
