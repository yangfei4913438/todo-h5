const path = require('path');

module.exports = {
  extends: [
    'taro/react',
    // eslint-plugin-import
    'plugin:import/recommended',
    // eslint-plugin-prettier eslint-config-prettier
    'plugin:prettier/recommended',
  ],
  settings: {
    // eslint-import-resolver-typescript
    'import/resolver': {
      typescript: {
        project: path.join(__dirname, './tsconfig.json'), // 读取ts配置文件
        alwaysTryTypes: true, // always try to resolve types under
      },
    },
  },
  rules: {
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'no-unused-vars': 'off',
    'no-mixed-spaces-and-tabs': 'off', // 禁止空格和 tab 的混合缩进
    'no-debugger': 'off', // 禁止 debugger
    'space-infix-ops': 'off', // 要求操作符周围有空格
    'space-before-blocks': 'off', // 要求语句块之前有空格
    indent: ['error', 2, { SwitchCase: 1 }], // 缩进使用 2 个空格
    'import/first': 'off', // 消除绝对路径，必须要在相对路径前引入的问题
    'import/no-commonjs': 'off',
  },
};
