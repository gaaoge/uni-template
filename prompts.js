module.exports = [
  {
    name: 'name',
    type: 'input',
    message: '项目名称'
  },
  {
    name: 'description',
    type: 'input',
    message: '项目描述'
  },
  {
    name: 'author',
    type: 'input',
    message: '项目作者'
  },
  {
    name: 'appid',
    type: 'input',
    message: '小程序Id'
  },
  {
    name: 'projectId',
    type: 'input',
    message: '蚂蚁统计Id'
  },
  {
    name: 'platform',
    type: 'list',
    message: '小程序平台',
    choices: ['mp-weixin', 'mp-alipay', 'mp-baidu', 'mp-toutiao'],
    default: 'mp-weixin'
  }
]
