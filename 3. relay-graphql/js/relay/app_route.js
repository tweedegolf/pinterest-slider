import Relay from 'react-relay'

export default class AppRoute extends Relay.Route {
  static queries = {
    session: () => Relay.QL`
      query {
        session,
      }
    `
  }

  static routeName = 'AppRoute';
}
    // boards: () => Relay.QL`
    //   query {
    //     boards
    //   }
    // `


    // state: () => Relay.QL`
    //   query {
    //     state,
    //   }
    // `,
