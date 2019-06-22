<template>
    <div>
        <div class="contain-head">
            <div class="head-pre"></div>
            <span class="head-title">安全管理</span>
        </div>
        <edit-password></edit-password>
        <edit-telephone></edit-telephone>
        <bind-hot-coin-adress></bind-hot-coin-adress>
    </div>
</template>
<script>
import BindHotCoinAdress from './components/BindHotCoinAdress'
import EditPassword from './components/EditPassword'
import EditTelephoneVue from './components/EditTelephone.vue';
export default {
    components:{
        "bind-hot-coin-adress": BindHotCoinAdress,
        "edit-password": EditPassword,
        "edit-telephone": EditTelephoneVue,
    },
    data() {
        return {
        }
    },
    methods: {

    },
}
</script>
<style lang="less" scoped>
.manageList{
    height: 150px;
}

</style>
<style lang="less" >
.manageOption{
    display: flex;
    margin-bottom: 1.666667rem;
    border-radius: .416667rem;
    align-items: center;
    justify-content: space-between;
    padding: 0 4.166667rem;
    height: 12.5rem;
    background-color: #fff;
    .manage-title{
        font-size: 1.333333rem;
        color: #333333;
    }
}
</style>

