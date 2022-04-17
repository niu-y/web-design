let userlistModule = (function () {
    let $deleteAll = $('.deleteAll'),
        $selectBox = $('.selectBox'),
        $searchInp = $('.searchInp'),
        $tableBox = $('.tableBox'),
        $tbody = $tableBox.find('tbody');

    //绑定部门信息
    async function bindDepart() {
        let result = await queryDepart();
        if (result.code === 0) {
            let str = ``;
            result.data.forEach(item => {
                str += `<option value="${item.id}">${item.name}</option>`
            })
            $selectBox.append(str);
        }
    }

    //从服务器获取员工列表进行绑定
    async function bindHTML() {
        let params = {
            departmentId: $selectBox.val(),
            search: $searchInp.val().trim()
        };
        let result = await axios.get('/user/list', {
            params
        });
        if (result.code != 0) return;
        let str = ``;
        result.data.forEach(item => {
            let {
                id,
                name,
                sex,
                email,
                phone,
                department,
                job,
                desc
            } = item;
            str += `<tr>
            <td class="w3"><input type="checkbox"></td>
            <td class="w10">${name}</td>
            <td class="w5">${sex==0?'男':'女'}</td>
            <td class="w10">${department}</td>
            <td class="w10">${job}</td>
            <td class="w15">${email}</td>
            <td class="w15">${phone}</td>
            <td class="w20">${desc}</td>
            <td class="w12" userId="${id}">
                <a href="javascript:;">编辑</a>
                <a href="javascript:;">删除</a>
                <a href="javascript:;">重置密码</a>
            </td>
        </tr>`
        });
        $tbody.html(str);
    }

    //更改，搜索触发数据的重新绑定
    function searchHandle() {
        $selectBox.change(bindHTML);
        $searchInp.on('keydown', ev => {
            if (ev.keyCode === 13) {
                bindHTML();
            }
        })
    }

    //基于事件委托来实现我的要处理的事情
    function delegate(){
        $tbody.click(async ev=>{
            let target=ev.target,
                $target=$(target),
                TAG=target.tagName,
                TEXT=target.innerHTML.trim();
            if(TAG==='A'){
                let userId=$target.parent().attr('userId');
                if(TEXT==='编辑'){
                    //跳转到新增页面,通过给页面地址问号传参来区分 新增还是编辑
                    window.location.href=`useradd.html?id=${userId}`;
                }
                if(TEXT==='删除'){
                    //删除之前确认是否删除
                    let flag=confirm(`您确定要删除编号为 [ ${userId} ] 这条信息吗？`);
                    if(!flag) return;
                    let result=await axios.get('/user/delete',{
                        params:{
                            userId
                        }
                    })
                    if(result.code==0){
                        alert('已经成功删除本条数据');
                        $target.parent().parent().remove();
                        return;
                    }
                    alert('当前网络繁忙请稍后重试');
                    return;
                }
                if(TEXT==='重置密码'){
                    let flag=confirm(`您确定为编号[${userId}]的员工重置密码吗`);
                    if(!flag)return;
                    let result=await axios.post('/user/resetpassword',{
                        userId
                    });
                    if(result.code==0){
                        alert('已经为您的员工重置了密码');
                        return;
                    }
                    alert('当前网络繁忙请稍后重试');
                    return;
                }
            }
        })
    }
    return {
        init() {
            bindDepart();
            bindHTML();
            searchHandle();
            delegate();
        }
    }
})()
userlistModule.init();