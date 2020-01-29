export const QUESTION_TYPE = {
  RADIO:1, //单选
  CHECKLIST: 2,  //多选
  JUDGE: 3 //多选
}
export const getNumberPrefix = data => data > 9 ? data : "0" + data;
export const getCurrentDate = function(){
    const date = new Date();
    return `${getNumberPrefix(date.getFullYear())}-${getNumberPrefix(date.getMonth()+1)}-${getNumberPrefix(date.getDate())}`;
}
//域名统一管理
export const base = {
    url: 'http://127.0.0.1:8088/Portal/app'
}

/**
 * 检验身份证
 * @param {*} idCard 
 */
export const checkIdCard = function(idCard) {
    const regexpStr = /(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if(regexpStr.test(idCard) === false){
        return false;
    }
    return true;
}