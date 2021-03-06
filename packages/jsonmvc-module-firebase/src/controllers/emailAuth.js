import stream from 'jsonmvc-helper-stream'
import observer from 'jsonmvc-helper-observer'

const controller = {
  args: {
    path: '/firebase/emailAuth/path',
    init: '/firebase/init'
  },
  fn: stream
    .filter(x => !!x.path && x.init === true)
    .chain((x, lib) => observer(o => {
      lib.on(x.path, y => {
        firebase.auth()
          .signInWithEmailAndPassword(y.email, y.password)
          .catch(function (error) {
            o.next({
              op: 'add',
              path: '/firebase/emailAuth/error',
              value: {
                code: error.code,
                message: error.message
              }
            })
          })
      })
    }))
}

export default controller
