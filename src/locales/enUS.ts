import global from './lang/en-US/global.json'
import demo from './lang/en-US/demo.json'

export default {
  ...global,
  ...demo,
}
// const modules = await import.meta.glob('./en-US/*.json')
// console.log('modules', modules)
// export default {
//   ...modules
// }
