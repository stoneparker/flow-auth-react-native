// simulação de chamada à API
interface Response {
   token: string;
   user: {
      name: string;
      email: string;
   }
}

export function signIn(): Promise<Response> {
   return new Promise(resolve => {
      setTimeout(() => {
         resolve({
            token: 'fhdsye9wq32qi3hjfds92qhdo9832hjkdsa',
            user: {
               name: 'Vitória',
               email: 'heyvitoria.lopes@gmail.com'
            }
         })
      }, 2000)
   })
}