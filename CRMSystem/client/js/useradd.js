/**
 * 1.进入页面首先要获取部门信息和职务信息，绑定到执行的下拉框中
 * 2.获取到用户输入的信息
 *      -格式校验
 *      -发送服务器对应的请求
 */
let useraddModule = (function () {
    //获取表单中要操作的元素 8个
    let $username = $('.username'),
        $spanusername = $('.spanusername'),
        $man = $('#man'),
        $woman = $('#woman'),
        $useremail = $('.useremail'),
        $userphone = $('.userphone'),
        $spanuserphone = $('.spanuserphone'),
        $spanuseremail = $('.spanuseremail'),
        $userdepartment = $('.userdepartment'),
        $userjob = $('.userjob'),
        $userdesc = $('.userdesc'),
        $submit = $('.submit');
    let userId = null;
    //获取部门和职务，并绑定 ,需要发送请求，所以我们用async/await
    async function bindDepartAndJob() {

        // //获取本地存储，判断
        // let departmentData = null,
        //     jobData = null,
        //     isStorage = false;
        // let departmentANDjob = localStorage.getItem('departmentANDjob');
        // if (departmentANDjob) {
        //     departmentANDjob = JSON.parse(departmentANDjob);
        //     if (new Date().getTime() - departmentANDjob.time < 86400000) {
        //         [departmentData, jobData] = departmentANDjob.data;
        //         isStorage = true;
        //     }
        // }

        // if (!isStorage) {
        //     //ajax并行获取数据
        //     [departmentData, jobData] = await axios.all([
        //         axios.get('/department/list'),
        //         axios.get('/job/list')
        //     ]);
        //     //获取本地信息后先把他缓存到本地(时效1天)
        //     localStorage.setItem('departmentANDjob', JSON.stringify({
        //         time: new Date().getTime(),
        //         data: [departmentData, jobData]
        //     }));
        // }

        let departmentData = await queryDepart(),
            jobData = await queryJob();

        if (departmentData.code == 0) {
            departmentData = departmentData.data;
            let str = ``;
            departmentData.forEach(item => {
                str += `<option value="${item.id}">${item.name}</option>`;
            });
            $userdepartment.html(str);
        }

        if (jobData.code == 0) {
            jobData = jobData.data;
            let str = ``;
            jobData.forEach(item => {
                str += `<option value="${item.id}">${item.name}</option>`;
            })
            $userjob.html(str);
        }
    }

    //表单校验
    function checkName() {
        let val = $username.val().trim(),
            reg = /^[\u4E00-\u9FA5]{2,10}(・[\u4E00-\u9FA5]{2,10}){0,2}$/;
        if (val.length === 0) {
            $spanusername.html('小主，不能为空哦');
            return false;
        }
        if (!reg.test(val)) {
            $spanusername.html('小主，请填写2-10为汉字');
            return false;
        }
        $spanusername.html('');
        return true;
    }

    function checkEmail() {
        let val = $useremail.val().trim(),
            reg = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Zaz0-9]+)*\.[A-Za-z0-9]+$/;
        if (val.length === 0) {
            $spanuseremail.html('不能为空哦');
            return false;
        }
        if (!reg.test(val)) {
            $spanuseremail.html('请填写真实邮箱');
            return false;
        }
        $spanuseremail.html('');
        return true;
    }

    function checkPhone() {
        let val = $userphone.val().trim(),
            reg = /^1\d{10}$/;
        if (val.length === 0) {
            $spanuserphone.html('小主，不能为空哦');
            return false;
        }
        if (!reg.test(val)) {
            $spanuserphone.html('小主，请填写正确的手机号码');
            return false;
        }
        $spanuserphone.html('');
        return true;
    }

    async function submitHandle() {
        if (!checkName() || !checkEmail() || !checkPhone()) return;
        let params = {
            name: $username.val().trim(),
            sex: $man.prop('checked') ? 0 : 1,
            email: $useremail.val().trim(),
            phone: $userphone.val().trim(),
            departmentId: $userdepartment.val(),
            jobId: $userjob.val(),
            desc: $userdesc.val().trim()
        };

        //向服务器发送请求(区分是修改还是新增)
        if(userId){
            //修改
            params.userId=userId;
            let result=await axios.post('/user/update',params);
            if(result.code==0){
                alert('小主，您很棒，已经为你修改了这条数据');
                window.location.href='userlist.html';
                return;
            }
            alert('小主当前网络繁忙请稍后重试');
            return;
        }
        //新增
        let result = await axios.post('/user/add', params);
        if (result.code === 0) {
            alert('小主，您很棒，奴家已经成功为您新增一条数据--');
            window.location.href = 'userlist.html';
            return;
        }
        alert('小主，当前网络繁忙，请您刷新后重试--');
    }

    //从服务器获取员工的基本信息，绑定在对应的文本框中
    async function queryBaseInfo() {
        let result = await axios.get('/user/info', {
            params:{
                userId
            }
        });
        if (result.code == 0) {
            result=result.data;
            $username.val(result.name);
            result.sex==0?$man.prop('checked',true):$woman.prop('checked',true);
            $useremail.val(result.email);
            $userphone.val(result.phone);
            $userdepartment.val(result.departmentId);
            $userjob.val(result.jobId);
            $userdesc.val(result.desc);
            return;
        }
        alert('小主，员工不存在，请再次确认');
        userId=null;
    }
    return {
        init() {
            bindDepartAndJob();

            //获取到传递的员工id
            let params = window.location.href.queryURLParams();
            if (params.hasOwnProperty('id')) {
                userId = params.id;
                queryBaseInfo();
            }
            // alert(userId);


            $username.blur(checkName);
            $useremail.blur(checkEmail);
            $userphone.blur(checkPhone);

            $submit.click(submitHandle);
        }
    }
})();
useraddModule.init();