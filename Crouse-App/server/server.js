const Koa = require('koa');
const Router = require('koa-router');
const router = new Router();
const bodyparser = require('koa-bodyparser');
const jwt = require('jwt-simple');

const app = new Koa();
const cors = require('koa2-cors');
const secret = 'jw'
app.use(cors());
app.use(bodyparser());


// 分类
const category = require('./category');
router.get('/course/category', async ctx => {
  let categories = category.map(cat => ({
    text: cat.name,
    value: cat.id
  }));
  ctx.body = {
    code: 0,
    data: categories
  }
});

const slides = require('./slides');
router.get('/slides', async ctx => {
  ctx.body = {
    code: 0,
    data: slides
  }
});

router.get('/course/lessonList/:id', async ctx => {
  let id = ctx.params.id;
  let {
    size,
    offset
  } = ctx.query;
  size = parseInt(size);
  offset = parseInt(offset)
  let item = category.find(c => c.id == id); // 找到对应分类
  let result = []
  if (!item) {
    let list = category.reduce((memo, current) => {
      return memo.concat(current.children)
    }, []);
    result = list.slice(offset, offset + size);
  } else {
    result = item.children.slice(offset, offset + size);

  }
  ctx.body = {
    code: 0,
    data: {
      result,
      hasMore: result.length == size
    },
  }
  //  ctx.body = {
  //      code: 0,
  //      data: slides
  //  }
});
let menuList = [
  {
    name: '购物车',
    auth: 'cart',
    path: '/cart'
  },
  {
  name: '联系我',
  auth: 'contact',
  path: '/contact'
}
// ,
//  {
//   name: '服务',
//   auth: 'service',
//   path: '/service'
// }
]

let userList = [{
  username: 'admin',
  password: 'admin'
}];
router.post('/user/login', async ctx => {
  // 登录接口
  let {
    username,
    password
  } = ctx.request.body;
  let user = userList.find(user => user.username === username && user.password === password);
  if (user) {
    let token = jwt.encode({
      username,
      menuList
    }, secret);
    ctx.body = {
      code: 0,
      data: {
        username,
        menuList,
        token
      }
    }
  } else {
    ctx.body = {
      code: 1,
      data: '登录失败，请检查账号密码'
    }
  }

})


router.get('/user/validate', async (ctx) => {
  let token = ctx.headers['token'];
  if (!token) {
ctx.body = {
code: 1,
data: '用户未登录'
}
  } else {
    try {
      let user = jwt.decode(token, secret);
      ctx.body = {
        code: 0,
        data: {
          ...user,
          menuList,
          token
        }
      }
    } catch (e) {
      ctx.body = {
        code: 1,
        data: 'token不正确'
      }
    }
  }
})
const courses = require('./course');
router.get('/course', async ctx => {
  ctx.body = {
    code: 0,
    data: courses
  }
});
router.get('/course/detail', async (ctx) => {
  let {id} = ctx.query;
  id = parseFloat(id);
  let item = courses.find(item => {
      return parseFloat(item.id) === id;
  });
  if (item) {
    ctx.body = {
          code: 0,
          msg: 'OK!',
          data: item
      };
      return;
  }
  ctx.body = {
      code: 1,
      msg: 'NO!',
      data: null
  };
});
app.use(router.routes()).use(router.allowedMethods());
app.listen(8000);
