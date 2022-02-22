# tc_web_front_end

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### i18n
在.vue
```
$t('sys_department.name')
```
在.js
```
import i18n from '@/common/plugins/vue-i18n'
i18n.tc('GENERAL.DEPARTMENT')
```

test