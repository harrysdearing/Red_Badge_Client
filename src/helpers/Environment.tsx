let APIURL = ''

switch (window.location.hostname) {
    case 'localhost':
    case '127.0.0.1':
        APIURL = 'http://localhost:3000'
        break
    case 'e-z-billing.herokuapp.com':
        APIURL = 'https://e-z-billing.herokuapp.com'
}

export default APIURL