// source files being imported to build the dependency tree
import { checkForName } from './js/nameChecker'
import { handleSubmit } from './js/formHandler'
// importing all the sass styles to build up the dependency tree with relevant css for dist/index.html
import './styles/resets.scss'
import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'

console.log(checkForName);

alert("I EXIST")
console.log("CHANGE!!");

export{handleSubmit, checkForName} // exporting to be reused in the views/index.html file in order to be functional
// when distribution folder is created