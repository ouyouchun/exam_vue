import axios from '../utils/http'
import {base} from '../utils/common'
import qs from 'qs'

/**
 * post方法，对应post请求
 * @desc注册请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function queryTransData(fieldId,questionTypeId) {

    return axios({
        url: `${base.url}/exam/practice-test`,
        method: 'post',
        data: qs.stringify({"fieldId":fieldId,"questionTypeId":questionTypeId}) //form提交
    })
}

/**
 * 提交单题答案
 * @param questionId
 * @param questionTypeId
 * @param answer
 * @returns {AxiosPromise}
 */
export function commitQuestionAnswer(questionId,questionTypeId,answer) {
  return axios({
    url: `${base.url}/exam/practice-improve`,
    method: 'post',
    data: {"questionId":questionId,"questionTypeId":questionTypeId,"answer":answer} //json body提交
  })
}


/**
 * 获取题库类型
 * @returns {AxiosPromise}
 */
export function questionTypes() {
  return axios({
    url: `${base.url}/exam/field-list`,
    method: 'post',
  })
}

/**
 * post方法，对应post请求
 * @desc 用户注册请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function userRegister(userName, trueName, nationalId) {
  return axios({
      url: `${base.url}/user/student-add`,
      method: 'post',
      data: {
        "userName": userName,
        "trueName": trueName,
        "nationalId": nationalId
      } //form提交
  })
}