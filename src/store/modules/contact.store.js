/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */

const emailValidator = require('email-validator')

const state = {
  mailEndpoint: 'https://dka.dgtek.net/api/frontend/mail',
  contactFormFields: {
    name: {
      type: 'input-with-validation',
      placeholder: 'Full name*',
      validator: val => val.length > 2,
      configured: false,
      value: '',
      error: false
    },
    email: {
      type: 'input-with-validation',
      placeholder: 'Email*',
      validator: emailValidator.validate,
      configured: false,
      value: '',
      error: false
    },
    phone: {
      type: 'phone-number',
      placeholder: 'Phone*',
      configured: false,
      value: '',
      error: false
    },
    address: {
      type: 'input-with-validation',
      placeholder: 'Address*',
      validator: val => val.length > 5,
      configured: false,
      value: '',
      error: false
    },
    postcode: {
      type: 'input-with-validation',
      placeholder: 'Postcode*',
      validator: val => Number(val) && Number(val) >= 3000 && Number(val) < 9999,
      configured: false,
      value: '',
      error: false
    },
    state: {
      type: 'selector',
      placeholder: 'State*',
      available: ['VIC', 'NSW', 'ACT', 'QLD', 'SA', 'WA', 'TAS', 'NT'],
      configured: true,
      value: '',
      error: false
    },
    list: {
      type: 'selector',
      placeholder: 'List',
      available: [],
      configured: true,
      value: '',
      error: false
    },
    number: {
      type: 'number',
      placeholder: 'Number',
      configured: true,
      value: '',
      error: false
    },
    combo: {
      type: 'combobox',
      placeholder: 'Combobox',
      available: [],
      configured: true,
      value: '',
      error: false
    },
    message: {
      type: 'textarea',
      placeholder: 'Enquiry',
      show: true,
      value: '',
      error: false
    }
  },
  emailSubject: '',
  emailText: '',
  messageForMail: ''
}

const getters = {
  //
}

const mutations = {
  UPDATE_USER_INFO: (state, payload) => { state.contactFormFields[payload.prop].value = payload.value },
  UPDATE_EMAIL_SUBJECT: (state, payload) => { state.emailSubject = payload },
  UPDATE_EMAIL_TEXT: (state, payload) => { state.emailText = payload },
  UPDATE_FIELD: (state, payload) => {
    state.contactFormFields[payload.field][payload.prop] = payload.value
  },

  CREATE_MESSAGE: (state) => {
    let details = ''
    // for (const field in state.contactFormFields) {
    //   details += state.contactFormFields[field].show ? `<p>${state.contactFormFields[field].placeholder}: ${state.contactFormFields[field].value}</p>` : ''
    // }
    // state.messageForMail = `
    //   <p>${state.emailText}</p>
    //   <h3>Name: ${state.contactFormFields.name.value}</h3>
    //   <h4>Email: ${state.contactFormFields.email.value}</h4>
    //   <fieldset>
    //     <legend>Details:</legend>
    //     ${details}
    //   </fieldset>
    //   <h4>Message:</h4>
    //   <p>${state.contactFormFields.message.value.split('\n').join('<br>')}</p>
    // `
    for (const field in state.contactFormFields) {
      details += state.contactFormFields[field].show ? `${state.contactFormFields[field].placeholder}: ${state.contactFormFields[field].value};\n` : ''
    }
    state.messageForMail = `
      ${state.emailText}\r\n
      Details:\r\n
      ${details}
    `
  },

  SET_ERROR: (state, payload) => {
    state.contactFormFields[payload.prop].error = payload.value
  },
  CLEAR_ALL_FIELDS: (state) => {
    for (const field in state.contactFormFields) {
      state.contactFormFields[field].value = ''
      state.contactFormFields[field].error = false
    }
  }
}

const actions = {

  async SEND_EMAIL ({ state, commit }) {
    let error = false
    for (const field in state.contactFormFields) {
      if (state.contactFormFields[field].show) {
        error = error || state.contactFormFields[field].error || !state.contactFormFields[field].value
      }
    }
    if (error) return false
    commit('CREATE_MESSAGE')
    const response = await (await fetch(state.mailEndpoint, {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        subject: state.emailSubject,
        name: state.contactFormFields.name.value,
        email: state.contactFormFields.email.value,
        phone: state.contactFormFields.phone.show ? state.contactFormFields.phone.value : '...',
        message: state.messageForMail
      })
    })).json()
    commit('CLEAR_ALL_FIELDS')
    return true
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
